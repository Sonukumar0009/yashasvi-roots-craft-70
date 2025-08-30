import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface PromotionalOffer {
  id: number;
  title: string;
  subtitle: string;
  discount: number;
  originalPrice: string;
  salePrice: string;
  productId: number;
  image: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  category: string;
  validUntil: string;
}

interface PromotionalBannerProps {
  onCategoryFilter?: (category: string) => void;
  onDiscountFilter?: (hasDiscount: boolean) => void;
}

const promotionalOffers: PromotionalOffer[] = [
  {
    id: 1,
    title: "Wedding Season Special",
    subtitle: "Blessed Wedding Hamper",
    discount: 22,
    originalPrice: "₹16,000",
    salePrice: "₹12,500",
    productId: 85,
    image: "/lovable-uploads/a2d8b022-d725-4b13-8b49-6ee507837efe.png",
    bgColor: "bg-gradient-to-r from-rose-100 to-pink-100",
    textColor: "text-rose-900",
    accentColor: "bg-rose-600",
    category: "Wedding Gifts",
    validUntil: "Dec 31, 2024"
  },
  {
    id: 2,
    title: "Festive Collection",
    subtitle: "Five Buddha Statues Set",
    discount: 23,
    originalPrice: "₹20,000",
    salePrice: "₹15,500",
    productId: 87,
    image: "/lovable-uploads/059f3d5d-7f5e-48ba-9fdd-4d1d0275d393.png",
    bgColor: "bg-gradient-to-r from-amber-100 to-yellow-100",
    textColor: "text-amber-900",
    accentColor: "bg-amber-600",
    category: "Spiritual Items",
    validUntil: "Jan 15, 2025"
  },
  {
    id: 3,
    title: "Heritage Sale",
    subtitle: "Ornate Wall Clock",
    discount: 29,
    originalPrice: "₹12,000",
    salePrice: "₹8,500",
    productId: 56,
    image: "/lovable-uploads/08a092f9-f7e6-447f-a843-83d7c374ba77.png",
    bgColor: "bg-gradient-to-r from-blue-100 to-indigo-100",
    textColor: "text-blue-900",
    accentColor: "bg-blue-600",
    category: "Home Décor",
    validUntil: "Dec 25, 2024"
  },
  {
    id: 4,
    title: "Luxury Collection",
    subtitle: "Master Craftsman Fountain Pen",
    discount: 25,
    originalPrice: "₹10,000",
    salePrice: "₹7,500",
    productId: 70,
    image: "/lovable-uploads/72c9804e-5d37-4e66-91c8-ef1add1b6e8f.png",
    bgColor: "bg-gradient-to-r from-emerald-100 to-green-100",
    textColor: "text-emerald-900",
    accentColor: "bg-emerald-600",
    category: "Office & Legal",
    validUntil: "Dec 20, 2024"
  },
  {
    id: 5,
    title: "Limited Edition",
    subtitle: "Vintage Sailing Ships",
    discount: 25,
    originalPrice: "₹16,000",
    salePrice: "₹12,000",
    productId: 88,
    image: "/lovable-uploads/35fb368b-d4c2-4095-bbe0-b123cd8abbc8.png",
    bgColor: "bg-gradient-to-r from-slate-100 to-gray-100",
    textColor: "text-slate-900",
    accentColor: "bg-slate-600",
    category: "Art & Portraits",
    validUntil: "Jan 10, 2025"
  }
];

const PromotionalBanner = ({ onCategoryFilter, onDiscountFilter }: PromotionalBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOfferClick = (offer: PromotionalOffer) => {
    // Apply category filter
    onCategoryFilter?.(offer.category);
    // Apply discount filter
    onDiscountFilter?.(true);
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // Increased width for larger cards
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 280; // Increased width
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % promotionalOffers.length;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? promotionalOffers.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  return (
    <div className="relative bg-background">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Special Offers</h2>
          <p className="text-sm text-muted-foreground">Limited time deals</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-10 w-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-10 w-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        onScroll={handleScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {promotionalOffers.map((offer) => (
          <Card 
            key={offer.id} 
            className={`flex-shrink-0 w-70 h-32 ${offer.bgColor} border-none shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer`}
            onClick={() => handleOfferClick(offer)}
          >
            <CardContent className="p-0 h-full">
              <div className="flex h-full">
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-base font-bold ${offer.textColor} leading-tight mb-1`}>
                      {offer.title}
                    </h3>
                    <p className={`text-sm ${offer.textColor} opacity-80 leading-tight`}>
                      {offer.subtitle}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`${offer.accentColor} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {offer.discount}% OFF
                      </span>
                      <span className={`text-xs ${offer.textColor} opacity-60`}>
                        {offer.validUntil}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-bold ${offer.textColor}`}>
                        {offer.salePrice}
                      </span>
                      <span className={`text-xs ${offer.textColor} opacity-60 line-through`}>
                        {offer.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="w-32 flex-shrink-0 relative overflow-hidden rounded-r-lg">
                  <img 
                    src={offer.image} 
                    alt={offer.subtitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-2 right-2">
                    <ArrowRight className={`w-4 h-4 ${offer.textColor} opacity-60`} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {promotionalOffers.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary w-8' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionalBanner;