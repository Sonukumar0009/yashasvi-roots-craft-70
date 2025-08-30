 

// import React, { useState } from 'react';
// import { useCart } from '@/contexts/CartContext';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { ArrowLeft, ArrowRight, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from "@/lib/supabaseClient";
// import { loadRazorpay } from "@/lib/loadRazorpay";
// import { useAuth } from '@/auth/AuthProvider';

// declare global { interface Window { Razorpay: any } }

// interface CustomerInfo {
//   name: string;
//   email: string;
//   phone: string;
// }
// interface Address {
//   name: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   pincode: string;
//   country: string;
// }

// const Checkout: React.FC = () => {
//   const { state: cartState } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);

//   const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ name: '', email: '', phone: '' });
//   const [billingAddress, setBillingAddress] = useState<Address>({
//     name: '', addressLine1: '', addressLine2: '',
//     city: '', state: '', pincode: '', country: 'India'
//   });
//   const [deliveryAddress, setDeliveryAddress] = useState<Address>({
//     name: '', addressLine1: '', addressLine2: '',
//     city: '', state: '', pincode: '', country: 'India'
//   });
//   const [sameAsBilling, setSameAsBilling] = useState(false);

//   const total = cartState.items.reduce((sum, item) => {
//     const price = parseFloat(String(item.price).replace(/[₹,]/g, '').split(' - ')[0]);
//     return sum + price * item.quantity;
//   }, 0);

//   const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) =>
//     setCustomerInfo(prev => ({ ...prev, [field]: value }));
//   const handleBillingAddressChange = (field: keyof Address, value: string) => {
//     setBillingAddress(prev => ({ ...prev, [field]: value }));
//     if (sameAsBilling) setDeliveryAddress(prev => ({ ...prev, [field]: value }));
//   };
//   const handleDeliveryAddressChange = (field: keyof Address, value: string) =>
//     setDeliveryAddress(prev => ({ ...prev, [field]: value }));
//   const handleSameAsBillingChange = (checked: boolean) => {
//     setSameAsBilling(checked);
//     if (checked) setDeliveryAddress({ ...billingAddress });
//   };

//   const validateStep1 = () => {
//     return customerInfo.name && customerInfo.email && customerInfo.phone &&
//            billingAddress.name && billingAddress.addressLine1 && billingAddress.city &&
//            billingAddress.state && billingAddress.pincode &&
//            deliveryAddress.name && deliveryAddress.addressLine1 && deliveryAddress.city &&
//            deliveryAddress.state && deliveryAddress.pincode;
//   };

//   // Success redirect (optional)
//   const handlePaymentSuccess = (paymentId?: string) => {
//     const pid = paymentId ?? ('pay_' + Math.random().toString(36).slice(2, 11));
//     navigate('/order-confirmation', {
//       state: {
//         orderDetails: {
//           items: cartState.items,
//           total,
//           customerInfo,
//           billingAddress,
//           deliveryAddress,
//           paymentId: pid,
//         },
//       },
//     });
//   };

//   // 🟢 Razorpay payment with notes → Supabase function
//   const handlePayment = async () => {
//     try {
//       const ok = await loadRazorpay();
//       if (!ok || !window.Razorpay) {
//         alert("Failed to load Razorpay.");
//         return;
//       }

//       // 1) Build notes (user, items, address snapshot)
//       const amountPaise = Math.max(100, Math.round(total * 100)); // paise, ≥ ₹1
//       const itemsSnapshot = cartState.items.map((it) => {
//         const priceNum = Number(String(it.price).replace(/[^\d.]/g, '').split('.')[0]);
//         return {
//           id: it.id,
//           name: it.name,
//           price: priceNum,                          // rupees
//           quantity: it.quantity,
//           amount: priceNum * it.quantity,           // rupees
//           image: it.image,
//           category: it.category,
//         };
//       });
//       const addr = {
//         firstName: billingAddress.name?.split(' ')[0] ?? '',
//         lastName: billingAddress.name?.split(' ').slice(1).join(' ') ?? '',
//         email: customerInfo.email,
//         street: billingAddress.addressLine1 + (billingAddress.addressLine2 ? `, ${billingAddress.addressLine2}` : ''),
//         city: billingAddress.city,
//         state: billingAddress.state,
//         zipcode: billingAddress.pincode,
//         country: billingAddress.country,
//         phone: customerInfo.phone,
//       };
//       const notes = { user_id: user?.id ?? null, items: itemsSnapshot, address: addr };

//       // 2) Create order on server (saves notes inside Razorpay Order)
//       const { data, error } = await supabase.functions.invoke('create-order', {
//         body: { amount: amountPaise, notes },
//       });
//       if (error || !data?.order?.id || !data?.key_id) {
//         console.error("create-order error:", error ?? data);
//         alert("Failed to create order.");
//         return;
//       }

//       // 3) Open Razorpay modal
//       const { order, key_id } = data;
//       const rzp = new window.Razorpay({
//         key: key_id,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         name: "Yashasvi Charitable Trust",
//         description: "Donation",
//         prefill: {
//           name: customerInfo.name || billingAddress.name,
//           email: customerInfo.email,
//           contact: customerInfo.phone,
//         },
//         notes, // optional (client side)
//         handler: (resp: any) => {
//           // Webhook will do the DB insert; this is for UX
//           handlePaymentSuccess(resp?.razorpay_payment_id);
//         },
//         modal: { ondismiss: () => {} },
//       });

//       rzp.on("payment.failed", (resp: any) => {
//         const err = resp?.error ?? {};
//         console.error("Payment failed:", err);
//         alert(`Payment failed: ${err.description ?? "Unknown error"}`);
//       });

//       rzp.open();
//     } catch (e) {
//       console.error(e);
//       alert("Unexpected error starting payment.");
//     }
//   };

//   if (cartState.items.length === 0) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardContent className="text-center p-6">
//             <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//             <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-4">Add some items to your cart before checkout</p>
//             <Button onClick={() => navigate('/products')} className="w-full">Continue Shopping</Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Steps UI */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="flex items-center space-x-4">
//               <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
//                   <MapPin className="h-4 w-4" />
//                 </div>
//                 <span className="hidden sm:block">Address</span>
//               </div>
//               <div className="w-8 h-0.5 bg-muted-foreground"></div>
//               <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
//                   <ShoppingBag className="h-4 w-4" />
//                 </div>
//                 <span className="hidden sm:block">Review</span>
//               </div>
//               <div className="w-8 h-0.5 bg-muted-foreground"></div>
//               <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
//                   <CreditCard className="h-4 w-4" />
//                 </div>
//                 <span className="hidden sm:block">Payment</span>
//               </div>
//             </div>
//           </div>

//           {/* Step 1: Address */}
//           {currentStep === 1 && (
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor="name">Full Name *</Label>
//                       <Input id="name" value={customerInfo.name} onChange={(e) => handleCustomerInfoChange('name', e.target.value)} />
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email *</Label>
//                       <Input id="email" type="email" value={customerInfo.email} onChange={(e) => handleCustomerInfoChange('email', e.target.value)} />
//                     </div>
//                     <div>
//                       <Label htmlFor="phone">Phone Number *</Label>
//                       <Input id="phone" value={customerInfo.phone} onChange={(e) => handleCustomerInfoChange('phone', e.target.value)} />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader><CardTitle>Billing Address</CardTitle></CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="billing-name">Full Name *</Label>
//                       <Input id="billing-name" value={billingAddress.name} onChange={(e) => handleBillingAddressChange('name', e.target.value)} />
//                     </div>
//                     <div>
//                       <Label htmlFor="billing-country">Country *</Label>
//                       <Input id="billing-country" value={billingAddress.country} onChange={(e) => handleBillingAddressChange('country', e.target.value)} />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="billing-address1">Address Line 1 *</Label>
//                     <Input id="billing-address1" value={billingAddress.addressLine1} onChange={(e) => handleBillingAddressChange('addressLine1', e.target.value)} />
//                   </div>
//                   <div>
//                     <Label htmlFor="billing-address2">Address Line 2</Label>
//                     <Input id="billing-address2" value={billingAddress.addressLine2} onChange={(e) => handleBillingAddressChange('addressLine2', e.target.value)} />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor="billing-city">City *</Label>
//                       <Input id="billing-city" value={billingAddress.city} onChange={(e) => handleBillingAddressChange('city', e.target.value)} />
//                     </div>
//                     <div>
//                       <Label htmlFor="billing-state">State *</Label>
//                       <Input id="billing-state" value={billingAddress.state} onChange={(e) => handleBillingAddressChange('state', e.target.value)} />
//                     </div>
//                     <div>
//                       <Label htmlFor="billing-pincode">Pincode *</Label>
//                       <Input id="billing-pincode" value={billingAddress.pincode} onChange={(e) => handleBillingAddressChange('pincode', e.target.value)} />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <div className="flex items-center space-x-2">
//                     <CardTitle>Delivery Address</CardTitle>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="same-as-billing" checked={sameAsBilling} onCheckedChange={handleSameAsBillingChange} />
//                       <Label htmlFor="same-as-billing" className="text-sm">Same as billing address</Label>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="delivery-name">Full Name *</Label>
//                       <Input id="delivery-name" value={deliveryAddress.name} onChange={(e) => handleDeliveryAddressChange('name', e.target.value)} disabled={sameAsBilling} />
//                     </div>
//                     <div>
//                       <Label htmlFor="delivery-country">Country *</Label>
//                       <Input id="delivery-country" value={deliveryAddress.country} onChange={(e) => handleDeliveryAddressChange('country', e.target.value)} disabled={sameAsBilling} />
//                     </div>
//                   </div>
//                   <div>
//                     <Label htmlFor="delivery-address1">Address Line 1 *</Label>
//                     <Input id="delivery-address1" value={deliveryAddress.addressLine1} onChange={(e) => handleDeliveryAddressChange('addressLine1', e.target.value)} disabled={sameAsBilling} />
//                   </div>
//                   <div>
//                     <Label htmlFor="delivery-address2">Address Line 2</Label>
//                     <Input id="delivery-address2" value={deliveryAddress.addressLine2} onChange={(e) => handleDeliveryAddressChange('addressLine2', e.target.value)} disabled={sameAsBilling} />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div>
//                       <Label htmlFor="delivery-city">City *</Label>
//                       <Input id="delivery-city" value={deliveryAddress.city} onChange={(e) => handleDeliveryAddressChange('city', e.target.value)} disabled={sameAsBilling} />
//                     </div>
//                     <div>
//                       <Label htmlFor="delivery-state">State *</Label>
//                       <Input id="delivery-state" value={deliveryAddress.state} onChange={(e) => handleDeliveryAddressChange('state', e.target.value)} disabled={sameAsBilling} />
//                     </div>
//                     <div>
//                       <Label htmlFor="delivery-pincode">Pincode *</Label>
//                       <Input id="delivery-pincode" value={deliveryAddress.pincode} onChange={(e) => handleDeliveryAddressChange('pincode', e.target.value)} disabled={sameAsBilling} />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="flex justify-between">
//                 <Button variant="outline" onClick={() => navigate('/products')}>
//                   <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
//                 </Button>
//                 <Button onClick={() => setCurrentStep(2)} disabled={!validateStep1()}>
//                   Continue to Review <ArrowRight className="h-4 w-4 ml-2" />
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Review */}
//           {currentStep === 2 && (
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {cartState.items.map((item) => {
//                       const price = parseFloat(String(item.price).replace(/[₹,]/g, '').split(' - ')[0]);
//                       return (
//                         <div key={item.id} className="flex items-center space-x-4 border-b border-border pb-4">
//                           <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                           <div className="flex-1">
//                             <h3 className="font-semibold">{item.name}</h3>
//                             <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
//                           </div>
//                           <div className="text-right font-semibold">₹{(price * item.quantity).toLocaleString()}</div>
//                         </div>
//                       );
//                     })}
//                     <div className="flex justify-between items-center pt-4 text-lg font-semibold">
//                       <span>Total:</span>
//                       <span>₹{total.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card>
//                   <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
//                   <CardContent>
//                     <p><strong>Name:</strong> {customerInfo.name}</p>
//                     <p><strong>Email:</strong> {customerInfo.email}</p>
//                     <p><strong>Phone:</strong> {customerInfo.phone}</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardHeader><CardTitle>Billing Address</CardTitle></CardHeader>
//                   <CardContent>
//                     <p>{billingAddress.name}</p>
//                     <p>{billingAddress.addressLine1}</p>
//                     {billingAddress.addressLine2 && <p>{billingAddress.addressLine2}</p>}
//                     <p>{billingAddress.city}, {billingAddress.state} {billingAddress.pincode}</p>
//                     <p>{billingAddress.country}</p>
//                   </CardContent>
//                 </Card>
//               </div>

//               <Card>
//                 <CardHeader><CardTitle>Delivery Address</CardTitle></CardHeader>
//                 <CardContent>
//                   <p>{deliveryAddress.name}</p>
//                   <p>{deliveryAddress.addressLine1}</p>
//                   {deliveryAddress.addressLine2 && <p>{deliveryAddress.addressLine2}</p>}
//                   <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}</p>
//                   <p>{deliveryAddress.country}</p>
//                 </CardContent>
//               </Card>

//               <div className="flex justify-between">
//                 <Button variant="outline" onClick={() => setCurrentStep(1)}>
//                   <ArrowLeft className="h-4 w-4 mr-2" /> Back to Address
//                 </Button>
//                 <Button onClick={() => setCurrentStep(3)}>
//                   Proceed to Payment <ArrowRight className="h-4 w-4 ml-2" />
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Step 3: Payment */}
//           {currentStep === 3 && (
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
//                 <CardContent className="text-center space-y-4">
//                   <div className="p-8 border-2 border-dashed border-border rounded-lg">
//                     <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//                     <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
//                     <p className="text-muted-foreground mb-4">
//                       Your payment will be processed securely through Razorpay
//                     </p>
//                     <p className="text-lg font-semibold mb-4">
//                       Total Amount: ₹{total.toLocaleString()}
//                     </p>
//                     <Button onClick={handlePayment} size="lg" className="w-full max-w-xs">
//                       Pay Now with Razorpay
//                     </Button>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     * Demo mode: order is recorded via webhook after payment capture.
//                   </p>
//                 </CardContent>
//               </Card>

//               <div className="flex justify-between">
//                 <Button variant="outline" onClick={() => setCurrentStep(2)}>
//                   <ArrowLeft className="h-4 w-4 mr-2" /> Back to Review
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/lib/supabaseClient";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { useAuth } from '@/auth/AuthProvider';

declare global { interface Window { Razorpay: any } }

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}
interface Address {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const Checkout: React.FC = () => {
  const { state: cartState } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ name: '', email: '', phone: '' });
  const [billingAddress, setBillingAddress] = useState<Address>({
    name: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', country: 'India'
  });
  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    name: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '', country: 'India'
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);

  // ---- totals (₹) -----------------------------------------------------------
  const total = cartState.items.reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace(/[₹,]/g, '').split(' - ')[0]) || 0;
    return sum + price * item.quantity;
  }, 0);

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) =>
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  const handleBillingAddressChange = (field: keyof Address, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
    if (sameAsBilling) setDeliveryAddress(prev => ({ ...prev, [field]: value }));
  };
  const handleDeliveryAddressChange = (field: keyof Address, value: string) =>
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) setDeliveryAddress({ ...billingAddress });
  };

  const validateStep1 = () => {
    return !!(
      customerInfo.name && customerInfo.email && customerInfo.phone &&
      billingAddress.name && billingAddress.addressLine1 && billingAddress.city &&
      billingAddress.state && billingAddress.pincode &&
      deliveryAddress.name && deliveryAddress.addressLine1 && deliveryAddress.city &&
      deliveryAddress.state && deliveryAddress.pincode
    );
  };

  // Success redirect (optional)
  // const handlePaymentSuccess = (paymentId?: string) => {
  //   const pid = paymentId ?? ('pay_' + Math.random().toString(36).slice(2, 11));
  //   navigate('/order-confirmation', {
  //     state: {
  //       orderDetails: {
  //         items: cartState.items,
  //         total,
  //         customerInfo,
  //         billingAddress,
  //         deliveryAddress,
  //         paymentId: pid,
  //       },
  //     },
  //   });
  // };
// Modify handlePaymentSuccess
const handlePaymentSuccess = (paymentId?: string, method: "Razorpay" | "COD" = "Razorpay") => {
  const pid = paymentId ?? ('pay_' + Math.random().toString(36).slice(2, 11));
  navigate('/order-confirmation', {
    state: {
      orderDetails: {
        items: cartState.items,
        total,
        customerInfo,
        billingAddress,
        deliveryAddress,
        paymentId: pid,
        paymentMethod: method,   // 👈 add this
      },
    },
  });
};

  // Format & sanitize cart items for notes
  const mapItemsForNotes = () => {
    return cartState.items.map((it) => {
      const rupeePrice = Number(String(it.price).replace(/[^\d.]/g, '').split('.')[0]) || 0;
      return {
        id: it.id,
        name: it.name,
        price: rupeePrice,                 // rupees
        quantity: it.quantity,
        amount: rupeePrice * it.quantity,  // rupees
        image: it.image,
        category: it.category,
      };
    });
  };

  // ---- MAIN PAYMENT HANDLER -------------------------------------------------
  // const handlePayment = async () => {
  //   try {
  //     if (!total || total <= 0) {
  //       alert("Your cart total must be greater than ₹0.");
  //       return;
  //     }

  //     const ok = await loadRazorpay();
  //     if (!ok || !window.Razorpay) {
  //       alert("Failed to load Razorpay SDK.");
  //       return;
  //     }

  //     // amount in paise (≥ ₹1 == 100 paise)
  //     const amountPaise = Math.max(100, Math.round(total * 100));

  //     const addr = {
  //       firstName: billingAddress.name?.split(' ')[0] ?? '',
  //       lastName: billingAddress.name?.split(' ').slice(1).join(' ') ?? '',
  //       email: customerInfo.email,
  //       street: billingAddress.addressLine1 + (billingAddress.addressLine2 ? `, ${billingAddress.addressLine2}` : ''),
  //       city: billingAddress.city,
  //       state: billingAddress.state,
  //       zipcode: billingAddress.pincode,
  //       country: billingAddress.country,
  //       phone: customerInfo.phone,
  //     };
  //     const notes = { user_id: user?.id ?? null, items: mapItemsForNotes(), address: addr };

  //     // --- Create order via Supabase Edge Function (UPDATED) -----------------
  //     console.time("create-order");
  //     const { data, error } = await supabase.functions.invoke('create-order', {
  //       body: { amount: amountPaise, notes },
  //     });
  //     console.timeEnd("create-order");

  //     // Better diagnostics for the 2 common failure modes
  //     if (error) {
  //       console.error("create-order error:", error);

  //       // If this triggers, the browser couldn't reach your edge function:
  //       // (CORS, wrong project URL/key, not deployed, or network)
  //       if ((error as any).name === 'FunctionsFetchError') {
  //         alert(
  //           "Could not reach the server function (network/CORS/deploy). " +
  //           "Check: function deployed, correct SUPABASE_URL/ANON_KEY, and CORS headers in the function."
  //         );
  //       } else {
  //         // Function ran but returned non-2xx
  //         alert("Failed to create order. See console for details.");
  //       }
  //       return;
  //     }

  //     if (!data?.order?.id || !data?.key_id) {
  //       console.error("Unexpected response from create-order:", data);
  //       alert("Failed to create order (bad response).");
  //       return;
  //     }

  //     const { order, key_id } = data;

  //     // --- Open Razorpay modal ------------------------------------------------
  //     const rzp = new window.Razorpay({
  //       key: key_id,
  //       amount: order.amount,            // in paise
  //       currency: order.currency,
  //       order_id: order.id,
  //       name: "Yashasvi Charitable Trust",
  //       description: "Donation",
  //       prefill: {
  //         name: customerInfo.name || billingAddress.name,
  //         email: customerInfo.email,
  //         contact: customerInfo.phone,
  //       },
  //       notes,
  //       handler: (resp: any) => {
  //         // Webhook should persist to DB; this just gives instant UX
  //         handlePaymentSuccess(resp?.razorpay_payment_id);
  //       },
  //       modal: { ondismiss: () => {} },
  //     });

  //     rzp.on("payment.failed", (resp: any) => {
  //       const err = resp?.error ?? {};
  //       console.error("Payment failed:", err);
  //       alert(`Payment failed: ${err.description ?? "Unknown error"}`);
  //     });

  //     rzp.open();
  //   } catch (e: any) {
  //     console.error("Unexpected error starting payment:", e);
  //     alert(e?.message ?? "Unexpected error starting payment.");
  //   }
  // };
const handlePayment = async () => {
  try {
    if (!total || total <= 0) {
      alert("Your cart total must be greater than ₹0.");
      return;
    }

    const ok = await loadRazorpay();
    if (!ok || !window.Razorpay) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    // Amount in paise (≥ ₹1 == 100 paise)
    const amountPaise = Math.max(100, Math.round(total * 100));

    // Build notes snapshot (optional but handy)
    const itemsSnapshot = cartState.items.map((it) => {
      const rupeePrice = Number(String(it.price).replace(/[^\d.]/g, '').split('.')[0]) || 0;
      return {
        id: it.id,
        name: it.name,
        price: rupeePrice,                 // rupees
        quantity: it.quantity,
        amount: rupeePrice * it.quantity,  // rupees
        image: it.image,
        category: it.category,
      };
    });
    const addr = {
      firstName: billingAddress.name?.split(' ')[0] ?? '',
      lastName: billingAddress.name?.split(' ').slice(1).join(' ') ?? '',
      email: customerInfo.email,
      street: billingAddress.addressLine1 + (billingAddress.addressLine2 ? `, ${billingAddress.addressLine2}` : ''),
      city: billingAddress.city,
      state: billingAddress.state,
      zipcode: billingAddress.pincode,
      country: billingAddress.country,
      phone: customerInfo.phone,
    };
    const notes = { user_id: user?.id ?? null, items: itemsSnapshot, address: addr };

    // 🔹 Call your Supabase Edge Function (this just worked via PowerShell)
    const { data, error } = await supabase.functions.invoke('create-order', {
      body: { amount: amountPaise, notes },
    });

    if (error) {
      console.error("create-order error:", error);
      // If you ever see FunctionsFetchError here: it's CORS/env/deploy
      alert("Failed to create order. See console for details.");
      return;
    }

    if (!data?.order?.id || !data?.key_id) {
      console.error("Unexpected response from create-order:", data);
      alert("Failed to create order (bad response).");
      return;
    }

    // 🔑 Open Razorpay Checkout using the order returned by your function
    const { order, key_id } = data;

    const rzp = new window.Razorpay({
      key: key_id,
      amount: order.amount,            // in paise
      currency: order.currency,        // "INR"
      order_id: order.id,
      name: "Yashasvi Charitable Trust",
      description: "Donation",
      prefill: {
        name: customerInfo.name || billingAddress.name,
        email: customerInfo.email,
        contact: customerInfo.phone,
      },
      notes,
      // handler: (resp: any) => {
      //   // Webhook should persist to DB; this is instant UX
      //   handlePaymentSuccess(resp?.razorpay_payment_id);
      // }
      handler: async (resp: any) => {
  // resp has: razorpay_payment_id, razorpay_order_id, razorpay_signature
  try {
    const { data, error } = await supabase.functions.invoke("verify-payment", {
      body: {
        order_id: resp.razorpay_order_id,
        payment_id: resp.razorpay_payment_id,
        signature: resp.razorpay_signature,
      },
    });

    if (error) {
      console.error("verify-payment error:", error);
      // still navigate if you want, but the DB insert failed
      alert("Payment ok, but failed to save order. We'll fix it.");
    }
  } catch (e) {
    console.error("verify-payment threw:", e);
  }

  // UX: go to confirmation either way
  handlePaymentSuccess(resp?.razorpay_payment_id);
},

      modal: { ondismiss: () => {} },
    });

    rzp.on("payment.failed", (resp: any) => {
      const err = resp?.error ?? {};
      console.error("Payment failed:", err);
      alert(`Payment failed: ${err.description ?? "Unknown error"}`);
    });

    rzp.open();
  } catch (e: any) {
    console.error("Unexpected error starting payment:", e);
    alert(e?.message ?? "Unexpected error starting payment.");
  }
};

  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">Add some items to your cart before checkout</p>
            <Button onClick={() => navigate('/products')} className="w-full">Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Steps UI */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="hidden sm:block">Address</span>
              </div>
              <div className="w-8 h-0.5 bg-muted-foreground"></div>
              <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="hidden sm:block">Review</span>
              </div>
              <div className="w-8 h-0.5 bg-muted-foreground"></div>
              <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="hidden sm:block">Payment</span>
              </div>
            </div>
          </div>

          {/* Step 1: Address */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" value={customerInfo.name} onChange={(e) => handleCustomerInfoChange('name', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={customerInfo.email} onChange={(e) => handleCustomerInfoChange('email', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" value={customerInfo.phone} onChange={(e) => handleCustomerInfoChange('phone', e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Billing Address</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billing-name">Full Name *</Label>
                      <Input id="billing-name" value={billingAddress.name} onChange={(e) => handleBillingAddressChange('name', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="billing-country">Country *</Label>
                      <Input id="billing-country" value={billingAddress.country} onChange={(e) => handleBillingAddressChange('country', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="billing-address1">Address Line 1 *</Label>
                    <Input id="billing-address1" value={billingAddress.addressLine1} onChange={(e) => handleBillingAddressChange('addressLine1', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="billing-address2">Address Line 2</Label>
                    <Input id="billing-address2" value={billingAddress.addressLine2} onChange={(e) => handleBillingAddressChange('addressLine2', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="billing-city">City *</Label>
                      <Input id="billing-city" value={billingAddress.city} onChange={(e) => handleBillingAddressChange('city', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="billing-state">State *</Label>
                      <Input id="billing-state" value={billingAddress.state} onChange={(e) => handleBillingAddressChange('state', e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="billing-pincode">Pincode *</Label>
                      <Input id="billing-pincode" value={billingAddress.pincode} onChange={(e) => handleBillingAddressChange('pincode', e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CardTitle>Delivery Address</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="same-as-billing" checked={sameAsBilling} onCheckedChange={handleSameAsBillingChange} />
                      <Label htmlFor="same-as-billing" className="text-sm">Same as billing address</Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="delivery-name">Full Name *</Label>
                      <Input id="delivery-name" value={deliveryAddress.name} onChange={(e) => handleDeliveryAddressChange('name', e.target.value)} disabled={sameAsBilling} />
                    </div>
                    <div>
                      <Label htmlFor="delivery-country">Country *</Label>
                      <Input id="delivery-country" value={deliveryAddress.country} onChange={(e) => handleDeliveryAddressChange('country', e.target.value)} disabled={sameAsBilling} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="delivery-address1">Address Line 1 *</Label>
                    <Input id="delivery-address1" value={deliveryAddress.addressLine1} onChange={(e) => handleDeliveryAddressChange('addressLine1', e.target.value)} disabled={sameAsBilling} />
                  </div>
                  <div>
                    <Label htmlFor="delivery-address2">Address Line 2</Label>
                    <Input id="delivery-address2" value={deliveryAddress.addressLine2} onChange={(e) => handleDeliveryAddressChange('addressLine2', e.target.value)} disabled={sameAsBilling} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="delivery-city">City *</Label>
                      <Input id="delivery-city" value={deliveryAddress.city} onChange={(e) => handleDeliveryAddressChange('city', e.target.value)} disabled={sameAsBilling} />
                    </div>
                    <div>
                      <Label htmlFor="delivery-state">State *</Label>
                      <Input id="delivery-state" value={deliveryAddress.state} onChange={(e) => handleDeliveryAddressChange('state', e.target.value)} disabled={sameAsBilling} />
                    </div>
                    <div>
                      <Label htmlFor="delivery-pincode">Pincode *</Label>
                      <Input id="delivery-pincode" value={deliveryAddress.pincode} onChange={(e) => handleDeliveryAddressChange('pincode', e.target.value)} disabled={sameAsBilling} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/products')}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
                </Button>
                <Button onClick={() => setCurrentStep(2)} disabled={!validateStep1()}>
                  Continue to Review <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartState.items.map((item) => {
                      const price = parseFloat(String(item.price).replace(/[₹,]/g, '').split(' - ')[0]) || 0;
                      return (
                        <div key={item.id} className="flex items-center space-x-4 border-b border-border pb-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right font-semibold">₹{(price * item.quantity).toLocaleString()}</div>
                        </div>
                      );
                    })}
                    <div className="flex justify-between items-center pt-4 text-lg font-semibold">
                      <span>Total:</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                  <CardContent>
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <p><strong>Phone:</strong> {customerInfo.phone}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Billing Address</CardTitle></CardHeader>
                  <CardContent>
                    <p>{billingAddress.name}</p>
                    <p>{billingAddress.addressLine1}</p>
                    {billingAddress.addressLine2 && <p>{billingAddress.addressLine2}</p>}
                    <p>{billingAddress.city}, {billingAddress.state} {billingAddress.pincode}</p>
                    <p>{billingAddress.country}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader><CardTitle>Delivery Address</CardTitle></CardHeader>
                <CardContent>
                  <p>{deliveryAddress.name}</p>
                  <p>{deliveryAddress.addressLine1}</p>
                  {deliveryAddress.addressLine2 && <p>{deliveryAddress.addressLine2}</p>}
                  <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}</p>
                  <p>{deliveryAddress.country}</p>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Address
                </Button>
                <Button onClick={() => setCurrentStep(3)}>
                  Proceed to Payment <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {/* {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="p-8 border-2 border-dashed border-border rounded-lg">
                    <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                    <p className="text-muted-foreground mb-4">
                      Your payment will be processed securely through Razorpay
                    </p>
                    <p className="text-lg font-semibold mb-4">
                      Total Amount: ₹{total.toLocaleString()}
                    </p>
                    <Button onClick={handlePayment} size="lg" className="w-full max-w-xs">
                      Pay Now with Razorpay
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    * Demo mode: order is recorded via webhook after payment capture.
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Review
                </Button>
              </div>
            </div>
          )} */}
          {/* Step 3: Payment */}
{currentStep === 3 && (
  <div className="space-y-6">
    <Card>
      <CardHeader><CardTitle>Payment</CardTitle></CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="p-8 border-2 border-dashed border-border rounded-lg">
          <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Choose Payment Method</h3>
          <p className="text-muted-foreground mb-4">
            Select a payment option below to complete your order
          </p>
          <p className="text-lg font-semibold mb-4">
            Total Amount: ₹{total.toLocaleString()}
          </p>

          <div className="grid gap-4 max-w-xs mx-auto">
            {/* Razorpay Button */}
            <Button onClick={handlePayment} size="lg" className="w-full">
              Pay Now with Razorpay
            </Button>

            {/* COD Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              // Inside COD Button onClick
onClick={() => {
  const codPaymentId = `COD_${Date.now()}`;
  handlePaymentSuccess(codPaymentId, "COD");
}}

            >
              Cash on Delivery (COD)
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          * Razorpay payments are processed securely online.  
          * COD orders will be confirmed and paid upon delivery.
        </p>
      </CardContent>
    </Card>

    <div className="flex justify-between">
      <Button variant="outline" onClick={() => setCurrentStep(2)}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Review
      </Button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Checkout;
