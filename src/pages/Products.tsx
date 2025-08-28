import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from '@/contexts/CartContext';
import { Search, SlidersHorizontal, Filter, HeadphonesIcon, MessageSquareIcon, Upload, Camera, Palette, Ruler, DollarSign, FileText, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import FilterSidebar from '@/components/FilterSidebar';
import FloatingCartPreview from '@/components/FloatingCartPreview';
import ProductCard from '@/components/ProductCard';
import sandalwoodElephant from "@/assets/sandalwood-elephant.jpg";
import sandalwoodBeads from "@/assets/sandalwood-beads.jpg";
import sandalwoodOil from "@/assets/sandalwood-oil.jpg";

const Products = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Custom sculpture request states
  const [sculptureImage, setSculptureImage] = useState<File | null>(null);
  const [sculptureImagePreview, setSculptureImagePreview] = useState<string>("");
  const [sculptureModel3D, setSculptureModel3D] = useState<File | null>(null);
  const [sculptureMaterial, setSculptureMaterial] = useState("");
  const [sculptureSize, setSculptureSize] = useState("");
  const [sculptureNotes, setSculptureNotes] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const products = [
    {
      id: 1,
      name: "Handcrafted Sandalwood Elephant",
      category: "Sculptures & Idols",
      image: sandalwoodElephant,
      price: "₹2,500",
      originalPrice: "₹3,000",
      discount: 17,
      description: "Beautifully carved sandalwood elephants in various sizes, perfect for home decoration and spiritual practice.",
      features: ["Hand-carved by skilled artisans", "Available in multiple sizes", "Natural fragrance", "Spiritual significance"],
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: "Premium Sandalwood Bead Chain",
      category: "Jewelry & Accessories",
      image: sandalwoodBeads,
      price: "₹800",
      originalPrice: "₹1,200",
      discount: 33,
      description: "Elegant sandalwood bead chains for meditation, prayer, and daily wear. Each bead is carefully selected and polished.",
      features: ["108 beads for meditation", "Smooth polished finish", "Natural cooling properties", "Unisex design"],
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: "Pure Sandalwood Essential Oil",
      category: "Wellness & Aromatherapy",
      image: sandalwoodOil,
      price: "₹1,200",
      description: "100% pure sandalwood essential oil extracted from farmer-grown sandalwood trees using traditional methods.",
      features: ["Steam distilled", "No synthetic additives", "Therapeutic grade", "Traditional extraction methods"],
      rating: 4.9,
      reviews: 234
    },
    {
      id: 4,
      name: "Sandalwood Ganesha Statue",
      category: "Sculptures & Idols",
      image: sandalwoodElephant,
      price: "₹1,800",
      originalPrice: "₹2,400",
      discount: 25,
      description: "Sacred Ganesha sculptures carved from premium sandalwood, bringing prosperity and removing obstacles.",
      features: ["Traditional iconography", "Hand-carved details", "Various sizes available", "Blessed by artisans"],
      rating: 4.7,
      reviews: 67
    },
    {
      id: 5,
      name: "Sandalwood Prayer Mala",
      category: "Spiritual Items",
      image: sandalwoodBeads,
      price: "₹600",
      description: "Traditional prayer malas made from authentic sandalwood beads, perfect for meditation and spiritual practice.",
      features: ["108 beads + guru bead", "Natural fragrance", "Smooth texture", "Spiritual significance"],
      rating: 4.5,
      reviews: 123
    },
    {
      id: 6,
      name: "Sandalwood Incense Sticks",
      category: "Pooja Items",
      image: sandalwoodOil,
      price: "₹300",
      originalPrice: "₹450",
      discount: 33,
      description: "Premium incense sticks made from pure sandalwood powder, creating a divine atmosphere for prayers.",
      features: ["100% natural ingredients", "Long burning", "Authentic fragrance", "Handmade quality"],
      rating: 4.4,
      reviews: 298
    }
  ];

  const filteredProducts = products
    .filter(product => {
      // Price filter
      const price = parseInt(product.price.replace(/[₹,]/g, ''));
      const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
      
      // Category filter
      const categoryMatch = selectedCategory === "All Products" || product.category === selectedCategory;
      
      // Search filter
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Rating filter
      const ratingMatch = (product.rating || 0) >= minRating;
      
      // Discount filter
      const discountMatch = !hasDiscount || (product.discount && product.discount > 0);
      
      return inPriceRange && categoryMatch && searchMatch && ratingMatch && discountMatch;
    })
    .sort((a, b) => {
      if (sortBy === "featured") return b.rating! - a.rating!;
      if (sortBy === "price-low") return parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''));
      if (sortBy === "price-high") return parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''));
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      features: product.features
    });
  };

  // Custom sculpture request handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSculptureImage(file);
      const reader = new FileReader();
      reader.onload = () => setSculptureImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      calculatePrice(file, sculptureModel3D, sculptureMaterial, sculptureSize);
    }
  };

  const handle3DModelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSculptureModel3D(file);
      calculatePrice(sculptureImage, file, sculptureMaterial, sculptureSize);
    }
  };

  const calculatePrice = (image: File | null, model3D: File | null, material: string, size: string) => {
    let basePrice = 0;
    
    // Material pricing
    const materialPrices = {
      "premium-sandalwood": 3000,
      "mysore-sandalwood": 5000,
      "red-sandalwood": 4000,
      "white-sandalwood": 2500
    };
    
    // Size multipliers
    const sizeMultipliers = {
      "small": 1,
      "medium": 2.5,
      "large": 5,
      "xl": 8
    };
    
    if (material && size) {
      basePrice = (materialPrices[material as keyof typeof materialPrices] || 3000) * 
                  (sizeMultipliers[size as keyof typeof sizeMultipliers] || 1);
      
      // 3D model discount (more accurate design)
      if (model3D) basePrice *= 0.9;
      
      // Complex image surcharge
      if (image && image.size > 2000000) basePrice *= 1.2;
    }
    
    setEstimatedPrice(Math.round(basePrice));
  };

  const handleMaterialChange = (material: string) => {
    setSculptureMaterial(material);
    calculatePrice(sculptureImage, sculptureModel3D, material, sculptureSize);
  };

  const handleSizeChange = (size: string) => {
    setSculptureSize(size);
    calculatePrice(sculptureImage, sculptureModel3D, sculptureMaterial, size);
  };

  const handleSculptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sculptureImage && !sculptureModel3D) {
      toast({
        title: "Upload Required",
        description: "Please upload either an image or 3D model file.",
        variant: "destructive",
      });
      return;
    }
    
    if (!sculptureMaterial || !sculptureSize) {
      toast({
        title: "Details Required",
        description: "Please select material and size for your sculpture.",
        variant: "destructive",
      });
      return;
    }

    // Generate unique request ID
    const requestId = `SCR-${Date.now().toString(36).toUpperCase()}`;
    
    // Here you would normally send to backend/Supabase
    // For now, just show success message
    toast({
      title: "Request Submitted Successfully!",
      description: `Your sculpture request ID is: ${requestId}. We'll send a confirmation email shortly.`,
    });

    // Reset form
    setSculptureImage(null);
    setSculptureImagePreview("");
    setSculptureModel3D(null);
    setSculptureMaterial("");
    setSculptureSize("");
    setSculptureNotes("");
    setEstimatedPrice(0);
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      {/* Top Search Bar */}
      <div className="bg-card border-b shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile Filters Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-sm p-0 flex flex-col">
                <SheetHeader className="px-6 py-4 border-b">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <FilterSidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    selectedMaterials={selectedMaterials}
                    onMaterialChange={setSelectedMaterials}
                    selectedBrands={selectedBrands}
                    onBrandChange={setSelectedBrands}
                    hasDiscount={hasDiscount}
                    onDiscountChange={setHasDiscount}
                    minRating={minRating}
                    onRatingChange={setMinRating}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for sandalwood products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 hidden sm:flex">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Sort Button */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-10 sm:hidden">
                <SlidersHorizontal className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Left Sidebar - Filters (Hidden on mobile/tablet) */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedMaterials={selectedMaterials}
              onMaterialChange={setSelectedMaterials}
              selectedBrands={selectedBrands}
              onBrandChange={setSelectedBrands}
              hasDiscount={hasDiscount}
              onDiscountChange={setHasDiscount}
              minRating={minRating}
              onRatingChange={setMinRating}
            />
          </div>

          {/* Center - Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                Sandalwood Products
              </h1>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{selectedCategory}"
              </p>
            </div>

            {/* Responsive Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          {/* Desktop Right Sidebar - Cart Preview (Hidden on mobile/tablet) */}
          <FloatingCartPreview />
        </div>

        {/* Custom Sculpture Request Section */}
        <Card className="mt-12 max-w-6xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Palette className="w-6 h-6 text-accent" />
              <span>Custom Sculpture Request</span>
            </CardTitle>
            <CardDescription>
              Bring your vision to life with our custom sandalwood sculpture service. Upload your design and get instant pricing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSculptureSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Upload Section */}
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>Reference Image</span>
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                      {sculptureImagePreview ? (
                        <div className="space-y-3">
                          <img 
                            src={sculptureImagePreview} 
                            alt="Sculpture reference" 
                            className="max-h-48 mx-auto rounded-lg object-cover"
                          />
                          <p className="text-sm text-muted-foreground">{sculptureImage?.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Upload an image of what you want sculpted
                          </p>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-3"
                      />
                    </div>
                  </div>

                  {/* 3D Model Upload */}
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>3D Model (Optional)</span>
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors">
                      {sculptureModel3D ? (
                        <div className="space-y-2">
                          <FileText className="w-8 h-8 mx-auto text-accent" />
                          <p className="text-sm font-medium">{sculptureModel3D.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(sculptureModel3D.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <FileText className="w-8 h-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Upload 3D model for more accurate pricing
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports: OBJ, STL, BLEND, STEP
                          </p>
                        </div>
                      )}
                      <Input
                        type="file"
                        accept=".obj,.stl,.blend,.step,.stp"
                        onChange={handle3DModelUpload}
                        className="mt-3"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Specifications */}
                <div className="space-y-6">
                  {/* Material Selection */}
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <Palette className="w-4 h-4" />
                      <span>Sandalwood Type</span>
                    </Label>
                    <Select value={sculptureMaterial} onValueChange={handleMaterialChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sandalwood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="premium-sandalwood">Premium Sandalwood - ₹3,000 base</SelectItem>
                        <SelectItem value="mysore-sandalwood">Mysore Sandalwood - ₹5,000 base</SelectItem>
                        <SelectItem value="red-sandalwood">Red Sandalwood - ₹4,000 base</SelectItem>
                        <SelectItem value="white-sandalwood">White Sandalwood - ₹2,500 base</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Size Selection */}
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <Ruler className="w-4 h-4" />
                      <span>Sculpture Size</span>
                    </Label>
                    <Select value={sculptureSize} onValueChange={handleSizeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (up to 6 inches) - 1x price</SelectItem>
                        <SelectItem value="medium">Medium (6-12 inches) - 2.5x price</SelectItem>
                        <SelectItem value="large">Large (12-24 inches) - 5x price</SelectItem>
                        <SelectItem value="xl">Extra Large (24+ inches) - 8x price</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Estimate */}
                  {estimatedPrice > 0 && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-5 h-5 text-accent" />
                        <span className="font-semibold text-accent">Estimated Price</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">₹{estimatedPrice.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        *Final price may vary based on complexity and design requirements
                      </p>
                    </div>
                  )}

                  {/* Special Instructions */}
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Special Instructions (Optional)</span>
                    </Label>
                    <Textarea
                      value={sculptureNotes}
                      onChange={(e) => setSculptureNotes(e.target.value)}
                      placeholder="Any specific details, dimensions, or special requirements for your sculpture..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 border-t">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 min-w-[200px]"
                  disabled={!sculptureImage && !sculptureModel3D}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Sculpture Request
                </Button>
              </div>

              {/* Info Footer */}
              <div className="bg-muted/50 rounded-lg p-4 text-center space-y-2">
                <p className="text-sm font-medium text-foreground">What happens next?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">1. Review</span><br />
                    Our artisans review your design
                  </div>
                  <div>
                    <span className="font-medium">2. Quote</span><br />
                    Final pricing sent within 24 hours
                  </div>
                  <div>
                    <span className="font-medium">3. Create</span><br />
                    Handcrafted by skilled artisans
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Customer Support Section */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <HeadphonesIcon className="w-6 h-6 text-accent" />
              <span>Need Help with Your Purchase?</span>
            </CardTitle>
            <CardDescription>
              Our customer support team is here to assist you with any questions about our products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center space-y-4">
                <MessageSquareIcon className="w-12 h-12 mx-auto text-accent" />
                <h3 className="text-lg font-semibold">Product Support</h3>
                <p className="text-muted-foreground">
                  Get help with product selection, sizing, care instructions, and more
                </p>
                <Link to="/customer-support">
                  <Button className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
              <div className="text-center space-y-4">
                <HeadphonesIcon className="w-12 h-12 mx-auto text-accent" />
                <h3 className="text-lg font-semibold">Quick Assistance</h3>
                <p className="text-muted-foreground">
                  Live chat support available during business hours for immediate help
                </p>
                <Button variant="outline" className="w-full">
                  Start Live Chat
                </Button>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-muted-foreground">
                <strong>Support Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Response Time:</strong> Within 24 hours for email support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;