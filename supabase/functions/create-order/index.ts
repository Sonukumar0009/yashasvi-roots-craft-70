// // // supabase/functions/create-order/index.ts
// // import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// // const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
// // const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");

// // const CORS_HEADERS = {
// //   "Access-Control-Allow-Origin": "*",
// //   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// //   "Access-Control-Allow-Methods": "POST, OPTIONS",
// //   "Content-Type": "application/json",
// // };

// // serve(async (req) => {
// //   if (req.method === "OPTIONS") {
// //     return new Response(null, { headers: CORS_HEADERS });
// //   }

// //   if (req.method !== "POST") {
// //     return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
// //       status: 405,
// //       headers: CORS_HEADERS,
// //     });
// //   }

// //   try {
// //     if (!KEY_ID || !KEY_SECRET) {
// //       return new Response(JSON.stringify({ error: "Missing Razorpay credentials on server" }), {
// //         status: 500,
// //         headers: CORS_HEADERS,
// //       });
// //     }

// //     const body = await req.json().catch(() => ({}));
// //     const amount = Number(body?.amount);
// //     const currency = (body?.currency ?? "INR") as string;

// //     if (!Number.isInteger(amount) || amount <= 0) {
// //       return new Response(JSON.stringify({ error: "Amount must be a positive integer in paise" }), {
// //         status: 400,
// //         headers: CORS_HEADERS,
// //       });
// //     }

// //     const r = await fetch("https://api.razorpay.com/v1/orders", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: "Basic " + btoa(`${KEY_ID}:${KEY_SECRET}`),
// //       },
// //       body: JSON.stringify({
// //         amount,                // paise
// //         currency,
// //         receipt: crypto.randomUUID(),
// //         notes: {},
// //       }),
// //     });

// //     const data = await r.json();

// //     if (!r.ok) {
// //       console.error("Razorpay order error:", data);
// //       return new Response(JSON.stringify({ error: data?.error ?? data }), {
// //         status: 400,
// //         headers: CORS_HEADERS,
// //       });
// //     }

// //     return new Response(JSON.stringify({ order: data, key_id: KEY_ID }), {
// //       status: 200,
// //       headers: CORS_HEADERS,
// //     });
// //   } catch (e) {
// //     console.error("Server error:", e);
// //     return new Response(JSON.stringify({ error: "Server error" }), {
// //       status: 500,
// //       headers: CORS_HEADERS,
// //     });
// //   }
// // });


// // supabase/functions/create-order/index.ts
// import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
// const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

// serve(async (req) => {
//   try {
//     const { amount, notes } = await req.json(); // amount in paise, notes = { user_id, items, address }
//     if (!amount || amount < 100) {
//       return new Response(JSON.stringify({ error: "Invalid amount" }), { status: 400 });
//     }

//     const res = await fetch("https://api.razorpay.com/v1/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Basic " + btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`),
//       },
//       body: JSON.stringify({
//         amount,
//         currency: "INR",
//         receipt: `rcpt_${Date.now()}`,
//         payment_capture: 1,
//         notes: notes ?? {}, // 👈 stash metadata here
//       }),
//     });

//     if (!res.ok) {
//       const txt = await res.text();
//       return new Response(JSON.stringify({ error: txt }), { status: 500 });
//     }

//     const order = await res.json();
//     return new Response(JSON.stringify({ order, key_id: RZP_KEY_ID }), {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (e) {
//     return new Response(JSON.stringify({ error: e?.message ?? "Unknown error" }), { status: 500 });
//   }
// });
// supabase/functions/create-order/index.ts
// import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
// const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

// serve(async (req) => {
//   try {
//     const { amount, notes } = await req.json(); // amount in paise
//     if (!amount || amount < 100) {
//       return new Response(JSON.stringify({ error: "Invalid amount" }), { status: 400 });
//     }

//     const res = await fetch("https://api.razorpay.com/v1/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Basic " + btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`),
//       },
//       body: JSON.stringify({
//         amount,
//         currency: "INR",
//         receipt: `rcpt_${Date.now()}`,
//         payment_capture: 1,
//         notes: notes ?? {},
//       }),
//     });

//     if (!res.ok) {
//       const txt = await res.text();
//       return new Response(JSON.stringify({ error: txt }), { status: 500 });
//     }

//     const order = await res.json();
//     return new Response(JSON.stringify({ order, key_id: RZP_KEY_ID }), {
//       headers: { "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (e) {
//     return new Response(JSON.stringify({ error: e?.message ?? "Unknown error" }), { status: 500 });
//   }
// });

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

const allowedOrigins = [
  "http://localhost:8080",
  "http://192.168.36.1:8080",
  "https://yourdomain.com", // add your production domain here
];

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount, notes } = await req.json();
    if (!amount || amount < 100) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`),
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        payment_capture: 1,
        notes: notes ?? {},
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return new Response(JSON.stringify({ error: txt }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = await res.json();
    return new Response(JSON.stringify({ order, key_id: RZP_KEY_ID }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
