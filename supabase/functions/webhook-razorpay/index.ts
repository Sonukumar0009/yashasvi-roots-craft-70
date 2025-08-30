// supabase/functions/webhook-razorpay/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

function verifySignature(body: string, signature: string, secret: string) {
  // Razorpay webhook uses HMAC SHA256 on payload using WEBHOOK_SECRET
  const encoder = new TextEncoder();
  const key = crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  return key.then(async (cryptoKey) => {
    const sig = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(body));
    const digestHex = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    // Razorpay sends signature in hex
    return digestHex === signature;
  });
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  try {
    const valid = await verifySignature(rawBody, signature, WEBHOOK_SECRET);
    if (!valid) {
      return new Response("Invalid signature", { status: 400 });
    }

    const payload = JSON.parse(rawBody);

    // Common events: payment.authorized, payment.captured, payment.failed
    const event = payload.event as string;
    const entity = payload.payload?.payment?.entity ?? payload.payload?.order?.entity;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (event.startsWith("payment.")) {
      const payment = payload.payload.payment.entity;
      const order_id = payment.order_id as string;
      const payment_id = payment.id as string;
      const amount = payment.amount as number;
      const currency = payment.currency as string;

      const status =
        event === "payment.captured" || payment.status === "captured"
          ? "paid"
          : event === "payment.failed" || payment.status === "failed"
          ? "failed"
          : "created";

      const { error } = await supabase
        .from("payments")
        .upsert(
          {
            order_id,
            payment_id,
            amount,
            currency,
            status,
            signature,
            notes: payment.notes ?? {},
          },
          { onConflict: "order_id" },
        );

      if (error) {
        console.error("DB upsert error:", error);
        return new Response("DB error", { status: 500 });
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Webhook error", { status: 500 });
  }
});
