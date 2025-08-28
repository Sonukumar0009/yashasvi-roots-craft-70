import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

export const CartSheet = () => {
  const { state, updateQuantity, removeItem, getItemCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₹,]/g, '').split(' - ')[0]);
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <ShoppingCart className="w-4 h-4" />
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({getItemCount()} items)</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                          <p className="font-semibold text-accent mt-1">{item.price}</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => removeItem(item.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {state.items.length > 0 && (
            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};