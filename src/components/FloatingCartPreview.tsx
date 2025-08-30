import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const FloatingCartPreview = () => {
    const navigate = useNavigate()
  const { state, updateQuantity, removeItem, getItemCount } = useCart();
  const [isExpanded, setIsExpanded] = useState(true);

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₹,]/g, '').split(' - ')[0]);
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateSavings = () => {
    // Mock savings calculation
    return Math.floor(calculateTotal() * 0.15);
  };

 const handleProceedToBuy = () => {
    if (getItemCount() === 0) return;
  //    if (!user) {
  //   navigate(`/login?redirect=${encodeURIComponent("/checkout")}`);
  //   return;
  // }
       navigate("/checkout"); 
  };
  // Mobile: Floating Cart Icon
  const MobileCartIcon = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-gradient-orange hover:bg-amazon-orange shadow-warm lg:hidden"
        >
          <ShoppingCart className="w-6 h-6 text-white" />
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({getItemCount()} items)</SheetTitle>
        </SheetHeader>
        <CartContent />
      </SheetContent>
    </Sheet>
  );

  // Desktop: Full Cart Preview
  const DesktopCartPreview = () => (
    <div className="w-80 flex-shrink-0 hidden lg:block">
      <Card className="sticky top-24 bg-card border shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="w-5 h-5 text-accent" />
              Cart ({getItemCount()})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CartContent />
        </CardContent>
      </Card>
    </div>
  );

  // Shared Cart Content
  const CartContent = () => {
    if (getItemCount() === 0) {
      return (
        <div className="text-center py-8">
          <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-sm">Your cart is empty</p>
          <p className="text-xs text-muted-foreground mt-2">Add items to see them here</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Cart Items */}
        {isExpanded && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-secondary/30 rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs leading-tight mb-1 truncate">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="w-2 h-2" />
                      </Button>
                      <span className="text-xs font-medium px-2">{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="w-2 h-2" />
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-2 h-2" />
                    </Button>
                  </div>
                  <p className="text-xs font-semibold text-accent mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Separator />
        
        {/* Cart Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({getItemCount()} items):</span>
            <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>You save:</span>
            <span className="font-semibold">₹{calculateSavings().toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span className="text-green-600 font-semibold">FREE</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span className="text-accent">₹{calculateTotal().toLocaleString()}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button className="w-full bg-gradient-orange hover:bg-amazon-orange text-white font-semibold"  onClick={handleProceedToBuy} // ⬅️ go to checkout
            disabled={getItemCount() === 0}>
            Proceed to Buy ({getItemCount()})
          </Button>
          <Button variant="outline" className="w-full">
            Add to Wishlist
          </Button>
        </div>
        
        {/* Trust Badges */}
        <div className="pt-2 border-t">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Badge variant="secondary" className="justify-center">
              ✓ Authentic Products
            </Badge>
            <Badge variant="secondary" className="justify-center">
              ✓ 30-Day Returns
            </Badge>
            <Badge variant="secondary" className="justify-center">
              ✓ Free Shipping
            </Badge>
            <Badge variant="secondary" className="justify-center">
              ✓ Secure Payment
            </Badge>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <DesktopCartPreview />
    </>
  );
};

export default FloatingCartPreview;