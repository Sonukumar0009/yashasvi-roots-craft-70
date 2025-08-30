// components/PayButton.tsx
import { supabase } from "../lib/supabaseClient";
import { loadRazorpay } from "../lib/loadRazorpay";

declare global { interface Window { Razorpay: any } }

export default function PayButton({ rupees = 199 }: { rupees?: number }) {
  const handlePay = async () => {
    const ok = await loadRazorpay();
    if (!ok) return alert("Failed to load Razorpay");

    const { data, error } = await supabase.functions.invoke("create-order", {
      body: { amount: Math.round(rupees * 100) } // paise
    });
    if (error || !data?.order) {
      console.error(error ?? data);
      return alert("Failed to create order");
    }

    const { order, key_id } = data;

    const rzp = new window.Razorpay({
      key: key_id,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Yashasvi Charitable Trust",
      description: "Donation",
      handler: async (resp: any) => {
        // optional: call verify-payment; webhook will be the source of truth
        alert("Payment submitted! We’ll confirm once it’s captured.");
      },
    });

    rzp.on("payment.failed", () => alert("Payment failed, please try again."));
    rzp.open();
  };

  return <button onClick={handlePay}>Pay ₹{rupees}</button>;
}
