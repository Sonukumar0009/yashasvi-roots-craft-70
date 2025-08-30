 
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function hmacSha256Hex(message: string, key: string) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const expected = await hmacSha256Hex(`${razorpay_order_id}|${razorpay_payment_id}`, KEY_SECRET);
    const valid = expected === razorpay_signature;

    if (valid) {
      await supabase
        .from("payments")
        .update({ status: "paid", payment_id: razorpay_payment_id })
        .eq("order_id", razorpay_order_id)
        .eq("user_id", user.id);
    }

    return new Response(JSON.stringify({ valid }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
// import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// const cors = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
// };

// function toHex(buf: ArrayBuffer) {
//   return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
// }

// async function hmacSHA256Hex(message: string, secret: string) {
//   const enc = new TextEncoder();
//   const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
//   const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
//   return toHex(sig);
// }

// serve(async (req) => {
//   if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

//   try {
//     const { order_id, payment_id, signature } = await req.json();

//     if (!order_id || !payment_id || !signature) {
//       return new Response(JSON.stringify({ error: "Missing order_id/payment_id/signature" }), {
//         status: 400, headers: { ...cors, "Content-Type": "application/json" }
//       });
//     }

//     const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
//     const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
//     const adminUrl = Deno.env.get("SUPABASE_URL")!;
//     const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

//     // 1) Verify client signature
//     const expected = await hmacSHA256Hex(`${order_id}|${payment_id}`, keySecret);
//     if (expected !== signature) {
//       return new Response(JSON.stringify({ error: "Invalid signature" }), {
//         status: 400, headers: { ...cors, "Content-Type": "application/json" }
//       });
//     }

//     // 2) Fetch order from Razorpay to get trusted details/notes
//     const basic = "Basic " + btoa(`${keyId}:${keySecret}`);
//     const r = await fetch(`https://api.razorpay.com/v1/orders/${order_id}`, {
//       headers: { Authorization: basic },
//     });
//     if (!r.ok) {
//       const txt = await r.text();
//       return new Response(JSON.stringify({ error: "Failed to fetch order", details: txt }), {
//         status: 502, headers: { ...cors, "Content-Type": "application/json" }
//       });
//     }
//     const order = await r.json();

//     // Extract details
//     const amount = Number(order.amount ?? 0);
//     const currency = (order.currency ?? "INR") as string;
//     const notes = (order.notes ?? {}) as Record<string, unknown>;
//     const user_id = (notes.user_id as string) ?? null;
//     const items = (notes.items as unknown[]) ?? [];
//     const address = (notes.address as Record<string, unknown>) ?? null;

//     // 3) Insert/Upsert to Supabase
//     const supabase = createClient(adminUrl, serviceKey); // service role bypasses RLS
//     const { error } = await supabase.from("orders").upsert({
//       user_id,
//       razorpay_order_id: order_id,
//       razorpay_payment_id: payment_id,
//       amount,
//       currency,
//       status: "paid",
//       customer: null,               // add if you want
//       billing_address: address,
//       delivery_address: address,
//       items,
//       raw_payload: { order, from: "verify-payment" },
//     }, { onConflict: "razorpay_order_id" });

//     if (error) {
//       console.error("DB upsert error:", error);
//       return new Response(JSON.stringify({ error: "DB error" }), {
//         status: 500, headers: { ...cors, "Content-Type": "application/json" }
//       });
//     }

//     return new Response(JSON.stringify({ ok: true }), {
//       status: 200, headers: { ...cors, "Content-Type": "application/json" }
//     });
//   } catch (e) {
//     console.error(e);
//     return new Response(JSON.stringify({ error: "Server error", details: String(e) }), {
//       status: 500, headers: { ...cors, "Content-Type": "application/json" }
//     });
//   }
// });
