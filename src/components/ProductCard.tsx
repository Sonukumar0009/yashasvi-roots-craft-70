import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  description: string;
  features: string[];
  rating?: number;
  reviews?: number;
  discount?: number;
  originalPrice?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const rating = product.rating || 4.5;
  const reviews = product.reviews || Math.floor(Math.random() * 500) + 50;
  const discount = product.discount || 0;

  return (
    <Card className="overflow-hidden hover:shadow-warm transition-smooth group bg-card border">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
            -{discount}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
        <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
          {product.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating) ? 'text-rating-yellow fill-current' : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        
        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-price-red">{product.price}</span>
            {discount > 0 && product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
          {discount > 0 && (
            <p className="text-xs text-green-600 font-medium">Save ₹{Math.floor(parseInt(product.price.replace(/[₹,]/g, '').split(' - ')[0]) * discount / 100)}</p>
          )}
        </div>
        
        {/* Prime/Free Shipping */}
        <div className="mb-3">
          <Badge className="text-xs bg-accent text-accent-foreground">
            FREE Shipping
          </Badge>
        </div>
        
        {/* Key Features */}
        <div className="space-y-1 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center text-xs text-muted-foreground">
              <span className="w-1 h-1 bg-accent rounded-full mr-2 flex-shrink-0"></span>
              {feature}
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-gradient-orange hover:bg-amazon-orange text-white font-semibold"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" className="w-full text-xs">
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;