 
// import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
// const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
// const RZP_WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET")!;

// const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
// const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// // Verify Razorpay webhook signature (HMAC SHA256 hex of raw body)
// async function verifySignature(raw: string, signature: string) {
//   const key = await crypto.subtle.importKey(
//     "raw",
//     new TextEncoder().encode(RZP_WEBHOOK_SECRET),
//     { name: "HMAC", hash: "SHA-256" },
//     false,
//     ["sign", "verify"],
//   );
//   const sigBytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
//   const digest = Array.from(new Uint8Array(sigBytes))
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
//   return digest === signature;
// }

// serve(async (req) => {
//   try {
//     const rawBody = await req.text();
//     const signature = req.headers.get("x-razorpay-signature") ?? "";

//     const ok = await verifySignature(rawBody, signature);
//     if (!ok) return new Response("Invalid signature", { status: 400 });

//     const event = JSON.parse(rawBody);

//     // Focus on successful captures
//     if (event.event !== "payment.captured") {
//       return new Response("Ignored", { status: 200 });
//     }

//     const payment = event.payload.payment.entity;
//     const razorpay_payment_id = payment.id as string;
//     const razorpay_order_id = payment.order_id as string;
//     const amount = payment.amount as number; // paise

//     // Fetch Order to get notes we stored earlier
//     const r = await fetch(`https://api.razorpay.com/v1/orders/${razorpay_order_id}`, {
//       headers: { Authorization: "Basic " + btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`) },
//     });
//     if (!r.ok) {
//       const t = await r.text();
//       console.error("Order fetch failed:", t);
//       return new Response("Order fetch failed", { status: 500 });
//     }

//     const orderJson = await r.json();
//     const notes = orderJson.notes ?? {};
//     const user_id = notes.user_id ?? null;
//     const items = notes.items ?? [];
//     const address = notes.address ?? {};

//     const { error } = await supabase.from("orders").insert({
//       razorpay_order_id,
//       razorpay_payment_id,
//       user_id,
//       items,
//       address,
//       amount,
//       status: "paid",
//     });

//     if (error) {
//       console.error("DB insert error:", error);
//       return new Response("Insert failed", { status: 500 });
//     }

//     return new Response("OK", { status: 200 });
//   } catch (e) {
//     console.error(e);
//     return new Response("Server error", { status: 500 });
//   }
// });
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

function toHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Verify webhook signature (Razorpay docs)
async function verifySignature(bodyText: string, signature: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(bodyText));
  const expected = toHex(mac);
  // Razorpay sends hex lowercase signature in header
  return expected === signature;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const text = await req.text(); // raw body needed for signature
    const sig = req.headers.get("x-razorpay-signature") ?? "";
    const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ?? "";
    if (!secret) {
      return new Response("Webhook secret not configured", { status: 500, headers: corsHeaders });
    }

    const valid = await verifySignature(text, sig, secret);
    if (!valid) {
      return new Response("Invalid signature", { status: 400, headers: corsHeaders });
    }

    const payload = JSON.parse(text);

    // We care about successful payments (both test & live):
    // Typical events: "payment.captured", or "order.paid"
    const event: string = payload?.event || "";
    if (!["payment.captured", "order.paid"].includes(event)) {
      return new Response("Ignored", { status: 200, headers: corsHeaders });
    }

    // Extract useful fields
    const entity = payload?.payload?.payment?.entity ?? payload?.payload?.order?.entity ?? {};
    const payment = payload?.payload?.payment?.entity ?? {};
    const order = payload?.payload?.order?.entity ?? {};
    const r_order_id = entity.order_id || order.id;
    const r_payment_id = payment.id ?? null;
    const amount = Number(entity.amount ?? order.amount ?? 0);
    const currency = (entity.currency ?? order.currency ?? "INR") as string;
    const status = payment.status ?? order.status ?? "paid";

    // Notes we attached at order creation (user_id, items, address)
    const notes = (entity.notes ?? order.notes ?? {}) as Record<string, unknown>;
    const user_id = (notes.user_id as string) ?? null;
    const items = (notes.items as unknown[]) ?? [];
    const address = (notes.address as Record<string, unknown>) ?? null;
// ✅ use the renamed secrets you set with `supabase secrets set`
const supabaseUrl = Deno.env.get("SB_URL")!;
const serviceRole = Deno.env.get("SB_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, serviceRole);

 
    // Upsert order
    const { error } = await supabase.from("orders").upsert({
      user_id,
      razorpay_order_id: r_order_id,
      razorpay_payment_id: r_payment_id,
      amount,
      currency,
      status: status === "captured" ? "paid" : status, // normalize
      customer: null,                  // optionally put your customerInfo if you pass it in notes
      billing_address: address,        // you used one 'address' object; split if you want
      delivery_address: address,
      items,
      raw_payload: payload,
    }, { onConflict: "razorpay_order_id" });

    if (error) {
      console.error("DB upsert error:", error);
      return new Response("DB error", { status: 500, headers: corsHeaders });
    }

    return new Response("ok", { status: 200, headers: corsHeaders });
  } catch (e) {
    console.error(e);
    return new Response("error", { status: 500, headers: corsHeaders });
  }
});
