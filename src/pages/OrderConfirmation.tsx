// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { CheckCircle, Package, MapPin, CreditCard, ArrowRight } from 'lucide-react';

// const OrderConfirmation: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const orderDetails = location.state?.orderDetails;

//   if (!orderDetails) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardContent className="text-center p-6">
//             <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
//             <h2 className="text-xl font-semibold mb-2">No Order Found</h2>
//             <p className="text-muted-foreground mb-4">Please complete your purchase first</p>
//             <Button onClick={() => navigate('/products')} className="w-full">
//               Continue Shopping
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const { items, total, customerInfo, billingAddress, deliveryAddress, paymentId } = orderDetails;

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Success Header */}
//           <Card className="mb-8 border-green-200 bg-green-50/50">
//             <CardContent className="text-center p-8">
//               <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
//               <h1 className="text-3xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
//               <p className="text-green-700 mb-4">
//                 Thank you for your purchase. Your order has been successfully placed.
//               </p>
//               <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-green-200">
//                 <span className="text-sm font-medium text-muted-foreground">Payment ID:</span>
//                 <span className="font-mono text-sm font-bold">{paymentId}</span>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Order Details */}
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Package className="h-5 w-5" />
//                     <span>Order Summary</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {items.map((item: any) => {
//                       const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
//                       return (
//                         <div key={item.id} className="flex items-center space-x-4 border-b border-border pb-4">
//                           <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
//                           <div className="flex-1">
//                             <h4 className="font-medium text-sm">{item.name}</h4>
//                             <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-semibold text-sm">₹{(price * item.quantity).toLocaleString()}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                     <div className="flex justify-between items-center pt-4 text-lg font-bold border-t border-border">
//                       <span>Total Paid:</span>
//                       <span>₹{total.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <CreditCard className="h-5 w-5" />
//                     <span>Payment Information</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Payment Method:</span>
//                       <span className="font-medium">Razorpay</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Payment ID:</span>
//                       <span className="font-mono text-sm">{paymentId}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Status:</span>
//                       <span className="text-green-600 font-medium">Paid</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground">Amount:</span>
//                       <span className="font-semibold">₹{total.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Customer & Address Details */}
//             <div className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Customer Information</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-2">
//                     <p><strong>Name:</strong> {customerInfo.name}</p>
//                     <p><strong>Email:</strong> {customerInfo.email}</p>
//                     <p><strong>Phone:</strong> {customerInfo.phone}</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <MapPin className="h-5 w-5" />
//                     <span>Delivery Address</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-sm">
//                     <p className="font-medium">{deliveryAddress.name}</p>
//                     <p>{deliveryAddress.addressLine1}</p>
//                     {deliveryAddress.addressLine2 && <p>{deliveryAddress.addressLine2}</p>}
//                     <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}</p>
//                     <p>{deliveryAddress.country}</p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Billing Address</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-sm">
//                     <p className="font-medium">{billingAddress.name}</p>
//                     <p>{billingAddress.addressLine1}</p>
//                     {billingAddress.addressLine2 && <p>{billingAddress.addressLine2}</p>}
//                     <p>{billingAddress.city}, {billingAddress.state} {billingAddress.pincode}</p>
//                     <p>{billingAddress.country}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           {/* Next Steps */}
//           <Card className="mt-8 no-print">
//             <CardHeader >
//               <CardTitle>What's Next?</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
//                   <div>
//                     <h4 className="font-medium">Order Processing</h4>
//                     <p className="text-sm text-muted-foreground">Your order is being prepared for shipment.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">2</div>
//                   <div>
//                     <h4 className="font-medium">Shipment</h4>
//                     <p className="text-sm text-muted-foreground">You'll receive tracking information via email once shipped.</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-3">
//                   <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">3</div>
//                   <div>
//                     <h4 className="font-medium">Delivery</h4>
//                     <p className="text-sm text-muted-foreground">Your order will be delivered to the address provided.</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-8 no-print">
//             <Button onClick={() => navigate('/products')} className="flex-1">
//               Continue Shopping
//               <ArrowRight className="h-4 w-4 ml-2" />
//             </Button>
//             <Button variant="outline" onClick={() => window.print()} className="flex-1">
//               Print Invoice
//             </Button>
//           </div>

//           {/* Support Information */}
//           <Card className="mt-8 bg-muted/50 no-print">
//             <CardContent className="text-center p-6">
//               <h3 className="font-semibold mb-2">Need Help?</h3>
//               <p className="text-sm text-muted-foreground mb-4">
//                 If you have any questions about your order, please contact our support team.
//               </p>
//               <Button variant="outline" onClick={() => navigate('/contact')}>
//                 Contact Support
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;

 import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, MapPin, CreditCard, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Order Found</h2>
            <p className="text-muted-foreground mb-4">Please complete your purchase first</p>
            <Button onClick={() => navigate('/products')} className="w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { items, total, customerInfo, billingAddress, deliveryAddress, paymentId, paymentMethod } = orderDetails;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <Card className="mb-8 border-green-200 bg-green-50/50">
            <CardContent className="text-center p-8">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <h1 className="text-3xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
              <p className="text-green-700 mb-4">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
              {paymentMethod !== "COD" ? (
                <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-muted-foreground">Payment ID:</span>
                  <span className="font-mono text-sm font-bold">{paymentId}</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-green-200">
                  <span className="text-sm font-medium text-muted-foreground">Payment Method:</span>
                  <span className="font-mono text-sm font-bold">Cash on Delivery</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Order Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item: any) => {
                      const price = parseFloat(
                        String(item.price).replace(/[₹,]/g, '').split(' - ')[0]
                      ) || 0;
                      return (
                        <div key={item.id} className="flex items-center space-x-4 border-b border-border pb-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">₹{(price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex justify-between items-center pt-4 text-lg font-bold border-t border-border">
                      <span>Total {paymentMethod === "COD" ? "Payable:" : "Paid:"}</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span className="font-medium">
                        {paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment ID:</span>
                      <span className="font-mono text-sm">
                        {paymentMethod === "COD" ? "N/A (COD)" : paymentId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={paymentMethod === "COD" ? "text-orange-600 font-medium" : "text-green-600 font-medium"}>
                        {paymentMethod === "COD" ? "Pending (Pay on Delivery)" : "Paid"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-semibold">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer & Address Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <p><strong>Phone:</strong> {customerInfo.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Delivery Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="font-medium">{deliveryAddress.name}</p>
                    <p>{deliveryAddress.addressLine1}</p>
                    {deliveryAddress.addressLine2 && <p>{deliveryAddress.addressLine2}</p>}
                    <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}</p>
                    <p>{deliveryAddress.country}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="font-medium">{billingAddress.name}</p>
                    <p>{billingAddress.addressLine1}</p>
                    {billingAddress.addressLine2 && <p>{billingAddress.addressLine2}</p>}
                    <p>{billingAddress.city}, {billingAddress.state} {billingAddress.pincode}</p>
                    <p>{billingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Next Steps */}
          <Card className="mt-8 no-print">
            <CardHeader >
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Order Processing</h4>
                    <p className="text-sm text-muted-foreground">Your order is being prepared for shipment.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Shipment</h4>
                    <p className="text-sm text-muted-foreground">You'll receive tracking information via email once shipped.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Delivery</h4>
                    <p className="text-sm text-muted-foreground">Your order will be delivered to the address provided.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 no-print">
            <Button onClick={() => navigate('/products')} className="flex-1">
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            {/* Hide invoice for COD */}
            {paymentMethod !== "COD" && (
              <Button variant="outline" onClick={() => window.print()} className="flex-1">
                Print Invoice
              </Button>
            )}
          </div>

          {/* Support Information */}
          <Card className="mt-8 bg-muted/50 no-print">
            <CardContent className="text-center p-6">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about your order, please contact our support team.
              </p>
              <Button variant="outline" onClick={() => navigate('/contact')}>
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
