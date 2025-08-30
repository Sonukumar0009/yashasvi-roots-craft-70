import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Filter } from 'lucide-react';

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedMaterials: string[];
  onMaterialChange: (materials: string[]) => void;
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  hasDiscount: boolean;
  onDiscountChange: (hasDiscount: boolean) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
}

const FilterSidebar = ({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedMaterials,
  onMaterialChange,
  selectedBrands,
  onBrandChange,
  hasDiscount,
  onDiscountChange,
  minRating,
  onRatingChange
}: FilterSidebarProps) => {
  const categories = [
    "All Products",
    "Sculptures & Idols", 
    "Jewelry & Accessories", 
    "Wellness & Aromatherapy", 
    "Spiritual Items", 
    "Pooja Items",
    "Art & Portraits",
    "Wildlife Art",
    "Wall Art",
    "Luxury Accessories",
    "Religious Art",
    "Furniture",
    "Home Décor",
    "Games & Recreation",
    "Patriotic Art",
    "Jewelry Storage",
    "Office & Legal",
    "Bookmarks & Stationery",
    "Architectural Models",
    "Storage Solutions",
    "Historical Portraits",
    "Perfume Accessories",
    "Candle Diffusers",
    "Cigar Accessories",
    "Watch Storage",
    "Wedding Gifts",
    "Musical Instruments",
    "Astrology & Zodiac",
    "Globe Collection",
    "Temple Curtains",
    "Awards & Trophies",
    "Fashion Accessories",
    "Kitchen & Dining"
  ];

  const materials = ["Pure Sandalwood", "Mixed Wood", "Essential Oil", "Incense"];
  const brands = ["Yashasv Artisans", "Karnataka Craft", "Traditional Works", "Premium Collection"];

  const handleMaterialToggle = (material: string) => {
    const updated = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    onMaterialChange(updated);
  };

  const handleBrandToggle = (brand: string) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    onBrandChange(updated);
  };

  return (
    <div className="w-72 flex-shrink-0 lg:block">
      <Card className="sticky top-24 bg-filter-bg border shadow-card hidden lg:block">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5 text-accent" />
            Filters
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <FilterContent />
        </CardContent>
      </Card>
      
      {/* Mobile version without card wrapper */}
      <div className="lg:hidden">
        <FilterContent />
      </div>
    </div>
  );

  function FilterContent() {
    return (
      <>
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-sm text-foreground mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategory === category}
                  onCheckedChange={() => onCategoryChange(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold text-sm text-foreground mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              max={20000}
              min={0}
              step={100}
              className="mb-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Materials */}
        <div>
          <h3 className="font-semibold text-sm text-foreground mb-3">Materials</h3>
          <div className="space-y-2">
            {materials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={material}
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={() => handleMaterialToggle(material)}
                />
                <label
                  htmlFor={material}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                >
                  {material}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Brands */}
        <div>
          <h3 className="font-semibold text-sm text-foreground mb-3">Brands</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
                <label
                  htmlFor={brand}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Discount */}
        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="discount"
              checked={hasDiscount}
              onCheckedChange={onDiscountChange}
            />
            <label
              htmlFor="discount"
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
            >
              Special Offers & Discounts
            </label>
          </div>
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <h3 className="font-semibold text-sm text-foreground mb-3">Minimum Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                 id={`rating-${rating}`}
                  checked={minRating <= rating}
                  onCheckedChange={() => onRatingChange(rating)}
                />
                <label
htmlFor={`rating-${rating}`}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-smooth flex items-center"
                >
                  <div className="flex items-center mr-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rating ? 'text-rating-yellow fill-current' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  & up
                </label>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default FilterSidebar;