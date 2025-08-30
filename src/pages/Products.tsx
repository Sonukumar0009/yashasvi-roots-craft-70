import { useState, useEffect } from 'react';
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
import PromotionalBanner from '@/components/PromotionalBanner';
import sandalwoodElephant from "@/assets/sandalwood-elephant.jpg";
import sandalwoodBeads from "@/assets/sandalwood-beads.jpg";
import sandalwoodOil from "@/assets/sandalwood-oil.jpg";

const Products = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Scroll state for hiding promotional banner
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  // Scroll effect for hiding promotional banner
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 150;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
      id: 56,
      name: "Ornate Sandalwood Wall Clock",
      category: "Home Décor",
      image: "/lovable-uploads/08a092f9-f7e6-447f-a843-83d7c374ba77.png",
      price: "₹8,500",
      originalPrice: "₹12,000",
      discount: 29,
      description: "Exquisite handcrafted wall clock with intricate sandalwood carvings and Roman numerals for timeless elegance.",
      features: ["Silent quartz movement", "Hand-carved ornate frame", "Roman numeral dial", "Premium finish"],
      rating: 4.9,
      reviews: 78
    },
    {
      id: 57,
      name: "Carved Sandalwood Walking Cane",
      category: "Luxury Accessories",
      image: "/lovable-uploads/103fbb01-6b0e-4e7e-8564-5220a91008cd.png",
      price: "₹4,200",
      originalPrice: "₹5,500",
      discount: 24,
      description: "Elegant walking cane with intricately carved sandalwood handle featuring traditional motifs.",
      features: ["Ergonomic grip", "Brass fittings", "Hand-carved details", "Durable construction"],
      rating: 4.6,
      reviews: 34
    },
    {
      id: 58,
      name: "Luxury Wooden Board Game Set",
      category: "Games & Recreation",
      image: "/lovable-uploads/f1d51fca-8a84-441e-9f95-b040e13a48c5.png",
      price: "₹6,800",
      originalPrice: "₹9,200",
      discount: 26,
      description: "Premium wooden board game collection in ornately carved storage boxes with traditional games.",
      features: ["Multiple games included", "Carved storage boxes", "Premium wooden pieces", "Traditional designs"],
      rating: 4.8,
      reviews: 92
    },
    {
      id: 59,
      name: "Sacred Sandalwood Prayer Mala",
      category: "Spiritual Items",
      image: "/lovable-uploads/4140b97f-0340-4a8f-a64b-1c97f8af6aa2.png",
      price: "₹1,800",
      originalPrice: "₹2,400",
      discount: 25,
      description: "Authentic 108-bead sandalwood mala with brass accents for meditation and spiritual practice.",
      features: ["108 sacred beads", "Brass spacer beads", "Guru bead included", "Natural fragrance"],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 60,
      name: "Carved Sandalwood Folding Fan",
      category: "Art & Portraits",
      image: "/lovable-uploads/bf5681c0-05e1-4951-9b31-ce6e24552bc9.png",
      price: "₹3,200",
      originalPrice: "₹4,200",
      discount: 24,
      description: "Traditional Japanese-style folding fan with intricate sandalwood carving and artistic patterns.",
      features: ["Hand-carved ribs", "Traditional patterns", "Compact design", "Artistic craftsmanship"],
      rating: 4.7,
      reviews: 67
    },
    {
      id: 66,
      name: "Three Horses Display Box",
      category: "Home Décor",
      image: "/lovable-uploads/7a5bbfdd-0f27-4c7f-bd3b-6227cc900b99.png",
      price: "₹12,500",
      originalPrice: "₹16,000",
      discount: 22,
      description: "Elegant carved wooden display box featuring three galloping horses in high relief with ornate border work.",
      features: ["3D horse relief carving", "Ornate border design", "Premium wood finish", "Display stand included"],
      rating: 4.8,
      reviews: 64
    },
    {
      id: 67,
      name: "Carved Elephant Paperweight",
      category: "Office & Legal",
      image: "/lovable-uploads/3218c9d8-169c-44c9-8466-7dee3dcddb28.png",
      price: "₹2,800",
      originalPrice: "₹3,500",
      discount: 20,
      description: "Exquisite sandalwood elephant with intricate floral carvings, perfect as a paperweight or desk accessory.",
      features: ["Hand-carved floral motifs", "Natural sandalwood", "Desk accessory", "Traditional craftsmanship"],
      rating: 4.7,
      reviews: 89
    },
    {
      id: 68,
      name: "Executive Business Card Holder",
      category: "Office & Legal",
      image: "/lovable-uploads/3f6f0ab1-0233-4bf0-b7a0-bd23f4d84224.png",
      price: "₹3,500",
      originalPrice: "₹4,500",
      discount: 22,
      description: "Premium wooden business card holder with laser-engraved paisley designs and brass hardware.",
      features: ["Laser engraved patterns", "Brass hardware", "Professional design", "Holds 50+ cards"],
      rating: 4.6,
      reviews: 42
    },
    {
      id: 69,
      name: "Ceremonial Letter Opener",
      category: "Office & Legal",
      image: "/lovable-uploads/3757ba4f-8e55-4adc-ae41-293c663d3fd7.png",
      price: "₹2,200",
      originalPrice: "₹2,800",
      discount: 21,
      description: "Ornate wooden letter opener with carved handle and brass blade, includes wax seal for formal correspondence.",
      features: ["Carved wooden handle", "Brass blade", "Wax seal included", "Gift presentation"],
      rating: 4.5,
      reviews: 28
    },
    {
      id: 70,
      name: "Master Craftsman Fountain Pen",
      category: "Office & Legal",
      image: "/lovable-uploads/72c9804e-5d37-4e66-91c8-ef1add1b6e8f.png",
      price: "₹7,500",
      originalPrice: "₹10,000",
      discount: 25,
      description: "Premium fountain pen with hand-engraved sandalwood body and gold fittings in luxury presentation box.",
      features: ["Hand-engraved body", "Gold plated fittings", "Luxury gift box", "Limited edition"],
      rating: 4.9,
      reviews: 67
    },
    {
      id: 76,
      name: "Peacock Perfume Bottle Deluxe",
      category: "Perfume Accessories",
      image: "/lovable-uploads/f208f096-28cf-4920-b90a-fd46bb2cf5b7.png",
      price: "₹8,500",
      originalPrice: "₹11,500",
      discount: 26,
      description: "Exquisite carved wooden perfume bottle with peacock motif and pearl inlays in luxury velvet presentation case.",
      features: ["Peacock carved design", "Pearl inlay work", "Velvet presentation case", "Limited edition"],
      rating: 4.9,
      reviews: 72
    },
    {
      id: 77,
      name: "Executive Cologne Bottle",
      category: "Perfume Accessories",
      image: "/lovable-uploads/ddb2e34f-08ad-4b90-8ab1-e8fbd809731b.png",
      price: "₹4,500",
      originalPrice: "₹6,000",
      discount: 25,
      description: "Modern wooden cologne bottle with minimalist design and premium leather case for the discerning gentleman.",
      features: ["Minimalist design", "Premium leather case", "Refillable bottle", "Executive style"],
      rating: 4.7,
      reviews: 58
    },
    {
      id: 78,
      name: "Heritage Whiskey Glass",
      category: "Luxury Accessories",
      image: "/lovable-uploads/4e878d97-e304-49c2-a1cd-e182789523ff.png",
      price: "₹3,200",
      originalPrice: "₹4,200",
      discount: 24,
      description: "Handcrafted wooden whiskey tumbler with intricate geometric patterns and stainless steel insert.",
      features: ["Geometric carved patterns", "Stainless steel insert", "Unique design", "Bar accessory"],
      rating: 4.8,
      reviews: 84
    },
    {
      id: 79,
      name: "Traditional Scroll Holder",
      category: "Office & Legal",
      image: "/lovable-uploads/3a12cc5b-4783-4a70-bae9-466512b2c61b.png",
      price: "₹5,500",
      originalPrice: "₹7,200",
      discount: 24,
      description: "Ornate wooden scroll holder with carved floral base for displaying certificates and important documents.",
      features: ["Floral carved base", "Document display", "Traditional craftsmanship", "Ceremonial use"],
      rating: 4.6,
      reviews: 43
    },
    {
      id: 80,
      name: "Judge's Ceremonial Gavel",
      category: "Office & Legal",
      image: "/lovable-uploads/bc07e75c-87a6-4a52-a423-546233b3a503.png",
      price: "₹6,800",
      originalPrice: "₹8,800",
      discount: 23,
      description: "Premium ceremonial gavel with brass rings and carved base for legal professionals and formal occasions.",
      features: ["Brass ring accents", "Carved decorative base", "Professional quality", "Ceremonial use"],
      rating: 4.9,
      reviews: 29
    },
    {
      id: 81,
      name: "Celtic Pattern Cologne",
      category: "Perfume Accessories",
      image: "/lovable-uploads/0f2f0011-0183-4a32-a9bd-1a25ba8a5000.png",
      price: "₹7,200",
      originalPrice: "₹9,500",
      discount: 24,
      description: "Luxurious wooden cologne bottle with Celtic knotwork patterns and gold spray pump in presentation box.",
      features: ["Celtic knotwork design", "Gold spray pump", "Presentation box", "Premium craftsmanship"],
      rating: 4.8,
      reviews: 61
    },
    {
      id: 82,
      name: "Rose Garden Hair Comb",
      category: "Fashion Accessories",
      image: "/lovable-uploads/1709e729-9a54-4a69-a00a-faba711136d1.png",
      price: "₹2,800",
      originalPrice: "₹3,600",
      discount: 22,
      description: "Beautifully carved sandalwood hair comb featuring intricate rose and vine patterns for elegant styling.",
      features: ["Rose and vine carvings", "Sandalwood material", "Smooth finish", "Hair styling accessory"],
      rating: 4.7,
      reviews: 95
    },
    {
      id: 83,
      name: "Dragon Comb Display Set",
      category: "Fashion Accessories",
      image: "/lovable-uploads/a8bb93ec-56a8-4a7c-97ff-da4182b375a6.png",
      price: "₹4,500",
      originalPrice: "₹5,800",
      discount: 22,
      description: "Ornate wooden comb with dragon motif on decorative carved stand for display and functional use.",
      features: ["Dragon motif carving", "Decorative display stand", "Functional comb", "Artistic design"],
      rating: 4.8,
      reviews: 56
    },
    {
      id: 84,
      name: "Gentleman's Accessory Set",
      category: "Fashion Accessories",
      image: "/lovable-uploads/49a01e11-9896-45d5-b31e-d28dbaa119c5.png",
      price: "₹6,500",
      originalPrice: "₹8,500",
      discount: 24,
      description: "Complete gentleman's set with wooden cufflinks and tie clip featuring floral engravings in presentation box.",
      features: ["Cufflinks and tie clip set", "Floral engravings", "Presentation box", "Gold accents"],
      rating: 4.9,
      reviews: 73
    },
    {
      id: 85,
      name: "Blessed Wedding Hamper",
      category: "Wedding Gifts",
      image: "/lovable-uploads/a2d8b022-d725-4b13-8b49-6ee507837efe.png",
      price: "₹12,500",
      originalPrice: "₹16,000",
      discount: 22,
      description: "Complete wedding gift hamper with carved Ganesha, decorative pots, jewelry box, and traditional items in wicker basket.",
      features: ["Ganesha blessing statue", "Decorative wooden pots", "Jewelry storage box", "Complete gift set"],
      rating: 5.0,
      reviews: 118
    },
    {
      id: 86,
      name: "Carved World Globe Sculpture",
      category: "Home Décor",
      image: "/lovable-uploads/e1a065a8-290e-4ad8-8862-ae46cffcff0d.png",
      price: "₹8,500",
      originalPrice: "₹11,000",
      discount: 23,
      description: "Exquisite handcrafted wooden globe featuring intricately carved continents and countries on a classic pedestal stand.",
      features: ["Hand-carved continents", "Premium wood finish", "Educational display", "Classic pedestal stand"],
      rating: 4.8,
      reviews: 67
    },
    {
      id: 87,
      name: "Five Buddha Statues Set",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/059f3d5d-7f5e-48ba-9fdd-4d1d0275d393.png",
      price: "₹15,500",
      originalPrice: "₹20,000",
      discount: 23,
      description: "Sacred collection of five handcrafted wooden Buddha statues in traditional robes, perfect for meditation spaces.",
      features: ["Set of 5 Buddha statues", "Traditional robes design", "Meditation quality", "Spiritual significance"],
      rating: 4.9,
      reviews: 142
    },
    {
      id: 88,
      name: "Vintage Sailing Ships Collection",
      category: "Art & Portraits",
      image: "/lovable-uploads/35fb368b-d4c2-4095-bbe0-b123cd8abbc8.png",
      price: "₹12,000",
      originalPrice: "₹16,000",
      discount: 25,
      description: "Magnificent collection of three handcrafted wooden sailing ships with detailed rigging and authentic design.",
      features: ["Three ship models", "Detailed rigging", "Authentic period design", "Display stands included"],
      rating: 4.8,
      reviews: 89
    },
    {
      id: 89,
      name: "Satyameva Jayate Lion Sculpture",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/c998bdc4-7aa7-47c0-88df-87fe84dd1fb6.png",
      price: "₹6,500",
      originalPrice: "₹8,500",
      discount: 24,
      description: "Majestic wooden lion sculpture with 'Satyameva Jayate' engraving, symbolizing truth and justice.",
      features: ["National emblem inspired", "Hand-carved details", "Sanskrit inscription", "Symbol of justice"],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 90,
      name: "Ornate Wooden Bowl Set",
      category: "Home Décor",
      image: "/lovable-uploads/3abb27b8-3df4-4629-8077-8ca4d98ca137.png",
      price: "₹4,500",
      originalPrice: "₹6,000",
      discount: 25,
      description: "Set of three beautifully carved wooden bowls with intricate patterns, perfect for serving or decoration.",
      features: ["Set of 3 bowls", "Intricate carved patterns", "Food safe finish", "Versatile use"],
      rating: 4.7,
      reviews: 98
    },
    {
      id: 91,
      name: "Traditional Hanging Bells Set",
      category: "Spiritual Items",
      image: "/lovable-uploads/e1f3f3ce-f570-40a3-b77f-bdf7e35b5e03.png",
      price: "₹3,800",
      originalPrice: "₹5,000",
      discount: 24,
      description: "Beautiful set of wooden hanging bells with carved leaf decorations and natural rope, creating melodious sounds.",
      features: ["Hand-carved leaf details", "Natural rope hanging", "Melodious tones", "Traditional craftsmanship"],
      rating: 4.8,
      reviews: 112
    },
    {
      id: 92,
      name: "Sacred Elephant with Lotus",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/a09caa39-d31e-4469-ba36-5b76c876923d.png",
      price: "₹9,500",
      originalPrice: "₹12,500",
      discount: 24,
      description: "Magnificent wooden elephant sculpture adorned with lotus flowers and intricate traditional jewelry patterns.",
      features: ["Ornate jewelry details", "Lotus flower accents", "Traditional symbolism", "Museum quality carving"],
      rating: 4.9,
      reviews: 134
    },
    {
      id: 93,
      name: "Wisdom Turtle Sculpture",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/57b38f78-7209-4f4d-81e3-64a0ce7eb266.png",
      price: "₹5,500",
      originalPrice: "₹7,200",
      discount: 24,
      description: "Detailed wooden turtle sculpture with intricate shell patterns symbolizing wisdom and longevity.",
      features: ["Detailed shell carving", "Symbol of wisdom", "Premium wood finish", "Feng shui significance"],
      rating: 4.7,
      reviews: 87
    },
    {
      id: 94,
      name: "Sacred Cow Relief Panel",
      category: "Religious Art",
      image: "/lovable-uploads/b4da9bd1-3a1a-4dac-93ea-3fcb8d3a66f9.png",
      price: "₹18,500",
      originalPrice: "₹24,000",
      discount: 23,
      description: "Exquisite relief carving featuring sacred cow with calf surrounded by traditional Hindu symbols and Sanskrit inscriptions.",
      features: ["Deep relief carving", "Sanskrit inscriptions", "Traditional Hindu symbols", "Sacred significance"],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 95,
      name: "Shiva Lingam on Ornate Base",
      category: "Spiritual Items",
      image: "/lovable-uploads/c5c90c9f-c4e2-403a-9684-87f4e684cbb6.png",
      price: "₹7,500",
      originalPrice: "₹9,800",
      discount: 23,
      description: "Sacred Shiva Lingam with beautifully carved ornate base featuring traditional motifs and spiritual symbolism.",
      features: ["Sacred Shiva Lingam", "Ornate carved base", "Traditional motifs", "Spiritual worship item"],
      rating: 4.9,
      reviews: 178
    },
    {
      id: 71,
      name: "Decorative Wooden Pistol",
      category: "Art & Portraits",
      image: "/lovable-uploads/0aab7490-7151-4d7d-945c-d780389a670b.png",
      price: "₹8,500",
      originalPrice: "₹11,000",
      discount: 23,
      description: "Intricately carved decorative wooden pistol with floral motifs and brass accents for collectors.",
      features: ["Detailed carved motifs", "Brass hardware", "Collector's item", "Display worthy"],
      rating: 4.8,
      reviews: 45
    },
    {
      id: 72,
      name: "Vintage Rifle Display Model",
      category: "Art & Portraits",
      image: "/lovable-uploads/e51038dc-5b9d-4c13-af26-43afa5e7bac5.png",
      price: "₹15,500",
      originalPrice: "₹20,000",
      discount: 23,
      description: "Museum-quality wooden rifle replica with carved stock and brass fittings in glass display case.",
      features: ["Museum quality replica", "Glass display case", "Carved wooden stock", "Historical accuracy"],
      rating: 4.9,
      reviews: 38
    },
    {
      id: 73,
      name: "Geometric Essential Oil Diffuser",
      category: "Candle Diffusers",
      image: "/lovable-uploads/3da4cd64-7c83-4555-9e05-b9c8e3ec90c4.png",
      price: "₹4,200",
      originalPrice: "₹5,500",
      discount: 24,
      description: "Contemporary wooden essential oil diffuser with geometric lattice pattern and brass accents.",
      features: ["Geometric design", "Brass accents", "Essential oil compatible", "Ambient lighting"],
      rating: 4.7,
      reviews: 76
    },
    {
      id: 74,
      name: "Lotus Bloom Candle Holder",
      category: "Candle Diffusers",
      image: "/lovable-uploads/b530f3a5-1961-48bb-a373-b8b685fd801f.png",
      price: "₹3,800",
      originalPrice: "₹4,800",
      discount: 21,
      description: "Beautiful carved lotus flower candle holder with layered petals design for tea lights or votives.",
      features: ["Lotus petal design", "Layered construction", "Tea light compatible", "Spiritual symbolism"],
      rating: 4.8,
      reviews: 92
    },
    {
      id: 75,
      name: "Royal Perfume Bottle Set",
      category: "Perfume Accessories",
      image: "/lovable-uploads/eda72b17-8268-423e-9674-1a48ad6458a2.png",
      price: "₹9,500",
      originalPrice: "₹12,500",
      discount: 24,
      description: "Luxury set of three carved wooden perfume bottles with ornate designs and gold spray pumps on wooden tray.",
      features: ["Set of 3 bottles", "Ornate carved designs", "Gold spray pumps", "Wooden display tray"],
      rating: 4.9,
      reviews: 54
    },
    {
      id: 61,
      name: "Luxury Sandalwood Fountain Pen Set",
      category: "Office & Legal",
      image: "/lovable-uploads/72eb500e-4909-4180-8583-cd90c633632c.png",
      price: "₹5,500",
      originalPrice: "₹7,500",
      discount: 27,
      description: "Premium fountain pen with sandalwood body and gold fittings in a carved presentation case.",
      features: ["24k gold plated nib", "Sandalwood barrel", "Carved presentation case", "Refillable cartridge"],
      rating: 4.8,
      reviews: 45
    },
    {
      id: 62,
      name: "Elegant Sandalwood Tie Clip",
      category: "Fashion Accessories",
      image: "/lovable-uploads/f04d43d4-36ee-468f-ab5b-2ec2d527b297.png",
      price: "₹1,200",
      originalPrice: "₹1,600",
      discount: 25,
      description: "Sophisticated tie clip featuring premium sandalwood inlay with gold-tone metal frame.",
      features: ["Premium sandalwood inlay", "Gold-tone finish", "Professional design", "Gift box included"],
      rating: 4.6,
      reviews: 28
    },
    {
      id: 63,
      name: "Sacred Couple Relief Carving",
      category: "Religious Art",
      image: "/lovable-uploads/c175f519-f07b-40a3-9b6e-bdb9a78b431c.png",
      price: "₹15,500",
      originalPrice: "₹20,000",
      discount: 23,
      description: "Exquisite relief carving depicting spiritual figures with intricate floral border work.",
      features: ["Deep relief carving", "Traditional iconography", "Hand-finished details", "Spiritual significance"],
      rating: 4.9,
      reviews: 89
    },
    {
      id: 64,
      name: "Seven Horses Wall Panel",
      category: "Wall Art",
      image: "/lovable-uploads/15561c57-2e15-4485-be10-6df70061c671.png",
      price: "₹18,500",
      originalPrice: "₹24,000",
      discount: 23,
      description: "Magnificent carved wall panel featuring seven horses with sun rays symbolizing success and prosperity.",
      features: ["3D carved relief", "Prosperity symbolism", "Large wall art", "Museum quality"],
      rating: 5.0,
      reviews: 112
    },
    {
      id: 65,
      name: "Galloping Horses Relief Art",
      category: "Wall Art",
      image: "/lovable-uploads/c175f519-f07b-40a3-9b6e-bdb9a78b431c.png",
      price: "₹16,800",
      originalPrice: "₹22,000",
      discount: 24,
      description: "Dynamic carved relief panel showcasing galloping horses with flowing manes and intricate border.",
      features: ["Dynamic composition", "Flowing artistic lines", "Premium carving", "Statement piece"],
      rating: 4.8,
      reviews: 76
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
    },
    {
      id: 7,
      name: "Divine Radha Krishna Sculpture",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/5113999c-be3f-4b25-bf32-10d2bf69fb33.png",
      price: "₹12,500",
      originalPrice: "₹15,000",
      discount: 17,
      description: "Exquisite hand-carved wooden sculpture of Radha and Krishna, representing divine love and devotion. Perfect centerpiece for your sacred space.",
      features: ["Master artisan crafted", "Intricate architectural details", "Premium hardwood", "Sacred iconography", "Hand-polished finish"],
      rating: 4.9,
      reviews: 43
    },
    {
      id: 8,
      name: "Majestic Wooden Elephant",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/0554a4c0-a3a5-4552-a757-0eaf9b3d0621.png",
      price: "₹4,500",
      originalPrice: "₹5,500",
      discount: 18,
      description: "Beautifully carved wooden elephant sculpture with ornate base detailing. Symbol of wisdom, strength, and good fortune.",
      features: ["Hand-carved details", "Ornate decorative base", "Natural wood finish", "Symbol of prosperity", "Perfect for home décor"],
      rating: 4.7,
      reviews: 78
    },
    {
      id: 9,
      name: "Portrait Relief Sculpture",
      category: "Art & Portraits",
      image: "/lovable-uploads/28b00917-e813-410b-b780-b1667ef348ca.png",
      price: "₹8,900",
      description: "Masterfully carved wooden portrait relief with ornate frame detailing. Custom portraits available on request.",
      features: ["3D relief carving", "Ornate frame design", "Detailed facial features", "Custom options available", "Museum quality finish"],
      rating: 4.8,
      reviews: 29
    },
    {
      id: 10,
      name: "Sacred Ganesha Wooden Idol",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/7299f4b5-056d-4329-9e15-2ede8715d9cc.png",
      price: "₹6,800",
      originalPrice: "₹8,500",
      discount: 20,
      description: "Magnificent Lord Ganesha sculpture with intricate traditional iconography. Hand-carved with blessing mudras and detailed ornamentation.",
      features: ["Traditional four-armed pose", "Intricate crown detailing", "Blessing hand gestures", "Sacred symbols", "Spiritual significance"],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 11,
      name: "Royal Elephant with Tusks",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/1fa00b7c-769a-4149-93a3-51e6cf3a0d29.png",
      price: "₹5,200",
      description: "Majestic elephant sculpture with prominent tusks and ornate carved base. Symbol of royal power and wisdom.",
      features: ["Detailed tusk carving", "Realistic proportions", "Decorative base platform", "Royal symbolism", "Premium wood quality"],
      rating: 4.6,
      reviews: 92
    },
    {
      id: 12,
      name: "Fierce Tiger Sculpture",
      category: "Wildlife Art",
      image: "/lovable-uploads/1254e96c-93cb-4a22-ba38-47dda31088b5.png",
      price: "₹7,500",
      originalPrice: "₹9,000",
      discount: 17,
      description: "Powerful tiger sculpture capturing the majestic beauty and strength of this magnificent big cat. Hand-carved with incredible detail.",
      features: ["Lifelike features", "Detailed fur texture", "Powerful stance", "Ornate base", "Symbol of strength"],
      rating: 4.8,
      reviews: 67
    },
    {
      id: 13,
      name: "Elegant Peacock Wall Art",
      category: "Wall Art",
      image: "/lovable-uploads/62f6dc8a-a8b5-4370-a797-d8fa33395866.png",
      price: "₹9,200",
      description: "Stunning peacock sculpture with spread feathers showcasing intricate carved details. Perfect statement piece for walls or display.",
      features: ["Spread feather display", "Intricate feather details", "Wall mountable", "National bird symbolism", "Artistic excellence"],
      rating: 4.9,
      reviews: 34
    },
    {
      id: 14,
      name: "Carved Perfume Box with Crystal Bottle",
      category: "Luxury Accessories",
      image: "/lovable-uploads/88dbe965-5149-47c2-8771-231698dc5e77.png",
      price: "₹3,800",
      originalPrice: "₹4,500",
      discount: 16,
      description: "Exquisite carved wooden box housing premium crystal perfume bottle. Perfect for storing precious fragrances or as a luxury gift.",
      features: ["Intricate carved detailing", "Crystal perfume bottle included", "Luxury presentation", "Handcrafted wooden box", "Perfect gift item"],
      rating: 4.8,
      reviews: 45
    },
    {
      id: 15,
      name: "Ornate Perfume Frame Display",
      category: "Luxury Accessories",
      image: "/lovable-uploads/c38875da-a1ed-4a36-bce9-1981500c86b3.png",
      price: "₹4,200",
      description: "Beautifully carved wooden frame designed to showcase perfume bottles. Features intricate scroll work and elegant design.",
      features: ["Ornate baroque styling", "Perfume bottle display", "Hand-carved scrollwork", "Luxury home décor", "Unique conversation piece"],
      rating: 4.7,
      reviews: 23
    },
    {
      id: 16,
      name: "Sacred Dvarapala Relief Panel",
      category: "Religious Art",
      image: "/lovable-uploads/1514c509-f5c9-43c2-8134-29eea32c98aa.png",
      price: "₹15,500",
      originalPrice: "₹18,000",
      discount: 14,
      description: "Magnificent relief carving of divine guardians (Dvarapala) with intricate temple architecture backdrop. Masterpiece of traditional craftsmanship.",
      features: ["Traditional temple iconography", "Detailed architectural elements", "Master artisan crafted", "Sacred guardian figures", "Museum quality carving"],
      rating: 4.9,
      reviews: 18
    },
    {
      id: 17,
      name: "Executive Carved Wooden Desk Set",
      category: "Furniture",
      image: "/lovable-uploads/e40ca03a-c318-48b8-b3c9-be05e91cb177.png",
      price: "₹25,000",
      originalPrice: "₹30,000",
      discount: 17,
      description: "Luxury executive desk with matching chair featuring intricate carved details. Perfect for home office or study room.",
      features: ["Executive desk design", "Matching carved chair", "Multiple storage compartments", "Premium wood construction", "Ergonomic design"],
      rating: 4.8,
      reviews: 12
    },
    {
      id: 18,
      name: "Artisan Photo Frame Collection",
      category: "Home Décor",
      image: "/lovable-uploads/8986e84a-f6c5-4d7a-a9db-fde0e9b29125.png",
      price: "₹2,800",
      description: "Beautiful collection of handcrafted wooden photo frames in various sizes. Perfect for displaying cherished memories.",
      features: ["Multiple frame sizes", "Natural wood finish", "Various design styles", "Handcrafted quality", "Perfect for gifting"],
      rating: 4.6,
      reviews: 87
    },
    {
      id: 19,
      name: "Floral Relief Wall Panel",
      category: "Wall Art",
      image: "/lovable-uploads/94f1cd6b-4dd9-42e5-9220-2baa6a1bed5f.png",
      price: "₹11,800",
      originalPrice: "₹14,000",
      discount: 16,
      description: "Stunning floral relief carving with intricate botanical motifs. Perfect statement piece for wall decoration.",
      features: ["Intricate floral patterns", "Deep relief carving", "Ornate frame design", "Natural botanical motifs", "Artistic excellence"],
      rating: 4.9,
      reviews: 31
    },
    {
      id: 20,
      name: "Sacred Symbol Pendant Set",
      category: "Spiritual Items",
      image: "/lovable-uploads/a571f258-ae4b-4b96-bd92-d5680f7549b4.png",
      price: "₹1,800",
      description: "Collection of carved wooden pendants featuring sacred symbols and religious motifs. Perfect for meditation and spiritual practice.",
      features: ["Sacred symbol carvings", "Lightweight design", "Natural wood material", "Spiritual significance", "Meditation accessories"],
      rating: 4.5,
      reviews: 76
    },
    {
      id: 21,
      name: "Premium Wooden Chess Set",
      category: "Games & Recreation",
      image: "/lovable-uploads/c2edf900-ed46-4410-9722-f55a1d3f4cfa.png",
      price: "₹6,500",
      originalPrice: "₹8,000",
      discount: 19,
      description: "Luxury wooden chess set with beautifully carved pieces and elegant wooden board. Perfect for chess enthusiasts.",
      features: ["Hand-carved chess pieces", "Premium wooden board", "Felt-lined storage", "Tournament quality", "Heirloom piece"],
      rating: 4.8,
      reviews: 54
    },
    {
      id: 22,
      name: "Grand Temple Shrine",
      category: "Religious Art",
      image: "/lovable-uploads/fb1dded1-2f8f-4237-9166-2a2a08ec945e.png",
      price: "₹45,000",
      originalPrice: "₹55,000",
      discount: 18,
      description: "Magnificent multi-deity temple shrine with architectural columns and detailed carvings. Centerpiece for devotional spaces.",
      features: ["Multiple deity compartments", "Temple architecture design", "Intricate column details", "Traditional iconography", "Sacred space centerpiece"],
      rating: 4.9,
      reviews: 8
    },
    {
      id: 23,
      name: "Divine Durga Shakti Sculpture",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/2bdb1e4f-1361-4106-a231-c34b9527519b.png",
      price: "₹18,500",
      originalPrice: "₹22,000",
      discount: 16,
      description: "Majestic multi-armed Durga Mata sculpture with intricate detailing. Symbol of divine feminine power and protection.",
      features: ["Eight-armed divine form", "Ornate crown and jewelry", "Sacred lotus base", "Traditional iconography", "Divine protection symbol"],
      rating: 4.9,
      reviews: 42
    },
    {
      id: 24,
      name: "Serene Buddha Meditation Statue",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/efaa36e2-1af7-4ea1-bc81-b55777971468.png",
      price: "₹14,800",
      originalPrice: "₹17,500",
      discount: 15,
      description: "Peaceful Buddha in meditation pose with ornate mandala backdrop. Perfect for meditation spaces and spiritual practice.",
      features: ["Classic meditation pose", "Ornate aureole backdrop", "Lotus throne base", "Peaceful expression", "Meditation enhancer"],
      rating: 4.8,
      reviews: 67
    },
    {
      id: 25,
      name: "Krishna with Flute Sculpture",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/365d81f4-b56f-4966-b279-9d3a248f7a2d.png",
      price: "₹11,200",
      originalPrice: "₹13,500",
      discount: 17,
      description: "Charming Lord Krishna playing his divine flute in seated position. Beautifully carved with intricate details and ornaments.",
      features: ["Playing flute pose", "Detailed jewelry and crown", "Peacock feather crown", "Sacred vessel beside", "Divine love symbol"],
      rating: 4.9,
      reviews: 89
    },
    {
      id: 26,
      name: "Peaceful Deity Collection",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/89e7056d-ae9b-4d13-a4fe-8b94bd958251.png",
      price: "₹8,900",
      description: "Beautiful collection of meditation deities with lotus bases. Perfect for creating a sacred space for spiritual practice.",
      features: ["Multiple deity figures", "Lotus throne bases", "Meditation poses", "Peaceful expressions", "Sacred collection"],
      rating: 4.7,
      reviews: 54
    },
    {
      id: 27,
      name: "Mighty Hanuman Sculpture",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/03b09029-3960-4b72-a3c5-8f7165baf5d8.png",
      price: "₹9,800",
      originalPrice: "₹12,000",
      discount: 18,
      description: "Powerful Lord Hanuman sculpture in blessing pose with ornate aureole. Symbol of strength, devotion, and protection.",
      features: ["Blessing hand gesture", "Ornate circular aureole", "Detailed muscular form", "Sacred ornaments", "Protection symbol"],
      rating: 4.8,
      reviews: 76
    },
    {
      id: 28,
      name: "Sacred Buddha Shrine Collection",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/46b6d867-824a-4694-92dc-9e4bd1a36ccb.png",
      price: "₹16,500",
      originalPrice: "₹19,500",
      discount: 15,
      description: "Comprehensive collection of Buddha figures in meditation and blessing poses. Perfect for creating a complete shrine setup.",
      features: ["Multiple Buddha poses", "Various sizes included", "Meditation and blessing gestures", "Lotus bases", "Complete shrine set"],
      rating: 4.9,
      reviews: 38
    },
    {
      id: 29,
      name: "Hanuman Relief Wall Panel",
      category: "Wall Art",
      image: "/lovable-uploads/8babe28f-192c-478d-82b8-4ebb6fb3a563.png",
      price: "₹13,200",
      originalPrice: "₹15,500",
      discount: 15,
      description: "Magnificent relief carving of Lord Hanuman in meditation pose with ornate frame and decorative elements.",
      features: ["Deep relief carving", "Ornate decorative frame", "Meditation pose", "Flying birds motifs", "Wall mountable"],
      rating: 4.8,
      reviews: 29
    },
    {
      id: 30,
      name: "Divine Portrait Relief",
      category: "Religious Art",
      image: "/lovable-uploads/42ea4c98-997a-43db-8cf7-87fb49992040.png",
      price: "₹19,800",
      originalPrice: "₹23,500",
      discount: 16,
      description: "Exquisite relief carving featuring divine portrait with ornate crown and traditional ornamentation. Masterpiece of sacred art.",
      features: ["Detailed portrait carving", "Ornate crown design", "Traditional jewelry", "Sacred symbols", "Museum quality"],
      rating: 4.9,
      reviews: 22
    },
    {
      id: 31,
      name: "Premium Sandalwood Incense Set",
      category: "Wellness & Aromatherapy",
      image: "/lovable-uploads/323a5ab1-4194-4a36-87c0-1921648cae03.png",
      price: "₹2,200",
      originalPrice: "₹2,800",
      discount: 21,
      description: "Elegant incense stick set with ornate holder featuring botanical carvings. Perfect for meditation and aromatherapy.",
      features: ["Premium sandalwood sticks", "Ornate carved holder", "Botanical motifs", "Long burning duration", "Meditation essential"],
      rating: 4.7,
      reviews: 134
    },
    {
      id: 32,
      name: "Buddha Ensemble Collection",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/b72d0d6b-6ccd-45a3-8c11-9a3667b7b8b8.png",
      price: "₹21,500",
      originalPrice: "₹26,000",
      discount: 17,
      description: "Complete collection of Buddha sculptures in various poses - standing, sitting, and meditation. Perfect shrine centerpiece.",
      features: ["Multiple Buddha poses", "Various sizes included", "Lotus pedestal bases", "Traditional iconography", "Complete shrine set"],
      rating: 4.9,
      reviews: 48
    },
    {
      id: 33,
      name: "Luxury Grooming Set in Carved Box",
      category: "Luxury Accessories",
      image: "/lovable-uploads/089ecd6d-cb55-4074-b2ba-61b8a3628228.png",
      price: "₹5,800",
      originalPrice: "₹7,200",
      discount: 19,
      description: "Exquisite wooden grooming accessories with intricate carved presentation box. Traditional craftsmanship meets luxury.",
      features: ["Hand-carved wooden combs", "Ornate storage box", "Scroll work patterns", "Natural wood finish", "Premium grooming tools"],
      rating: 4.8,
      reviews: 67
    },
    {
      id: 34,
      name: "Ornate Floral Hair Comb",
      category: "Jewelry & Accessories",
      image: "/lovable-uploads/5e8baeaf-4e0a-46da-a216-3fbbcfa0b922.png",
      price: "₹1,800",
      description: "Beautiful hand-carved wooden hair comb with intricate floral motifs. Natural and eco-friendly hair accessory.",
      features: ["Intricate floral carving", "Natural wood material", "Smooth polished finish", "Eco-friendly design", "Traditional craftsmanship"],
      rating: 4.6,
      reviews: 89
    },
    {
      id: 35,
      name: "Traditional Wooden Thali Set",
      category: "Pooja Items",
      image: "/lovable-uploads/9974da9d-34cf-4fb7-b98f-56de48d99625.png",
      price: "₹8,500",
      originalPrice: "₹10,500",
      discount: 19,
      description: "Magnificent carved wooden thali set with multiple bowls. Perfect for traditional ceremonies and special occasions.",
      features: ["Multiple serving bowls", "Intricate carved patterns", "Traditional design", "Ceremonial use", "Ornate craftsmanship"],
      rating: 4.8,
      reviews: 56
    },
    {
      id: 36,
      name: "Majestic King Throne Sculpture",
      category: "Sculptures & Idols",
      image: "/lovable-uploads/a596cf43-9a06-4846-a7bb-180c3ed53573.png",
      price: "₹35,000",
      originalPrice: "₹42,000",
      discount: 17,
      description: "Grand sculpture of a royal king seated on ornate throne. Masterpiece showcasing traditional monarchy and craftsmanship.",
      features: ["Royal throne design", "Detailed royal attire", "Ornate crown and jewelry", "Architectural backdrop", "Symbol of authority"],
      rating: 4.9,
      reviews: 23
    },
    {
      id: 37,
      name: "Bharat Mata Wall Panel with Ashoka Chakra",
      category: "Patriotic Art",
      image: "/lovable-uploads/c7bcc0ae-280c-4546-b21c-a5eace4316ea.png",
      price: "₹28,500",
      originalPrice: "₹34,000",
      discount: 16,
      description: "Magnificent carved panel featuring India's map with sacred Ashoka Chakra. Perfect patriotic art piece for offices and homes.",
      features: ["India map outline carving", "Central Ashoka Chakra", "Intricate border design", "Patriotic symbolism", "Large wall display"],
      rating: 4.9,
      reviews: 67
    },
    {
      id: 38,
      name: "Luxury Floral Inlay Jewelry Box",
      category: "Jewelry Storage",
      image: "/lovable-uploads/82d1f820-43f0-45bb-bea4-44de5f651602.png",
      price: "₹12,800",
      originalPrice: "₹15,500",
      discount: 17,
      description: "Exquisite wooden jewelry box with golden floral inlay work. Premium storage solution with elegant craftsmanship.",
      features: ["Golden floral inlay", "Multiple compartments", "Soft fabric lining", "Secure lid closure", "Artistic design"],
      rating: 4.8,
      reviews: 142
    },
    {
      id: 39,
      name: "Traditional Ceremonial Gavel Set",
      category: "Office & Legal",
      image: "/lovable-uploads/ba66eb0f-1063-4481-938e-e0883547c867.png",
      price: "₹6,500",
      originalPrice: "₹8,200",
      discount: 21,
      description: "Handcrafted wooden gavel with ornate base design. Perfect for legal ceremonies, meetings, and official functions.",
      features: ["Carved ceremonial base", "Balanced wooden handle", "Professional finish", "Traditional design", "Authority symbol"],
      rating: 4.7,
      reviews: 89
    },
    {
      id: 40,
      name: "Independence Day Commemorative Coins",
      category: "Patriotic Art",
      image: "/lovable-uploads/5da78bdd-0cc3-4172-b46b-7ebe6fbb2ed6.png",
      price: "₹3,200",
      originalPrice: "₹4,000",
      discount: 20,
      description: "Hand-carved wooden commemorative coins featuring Ashoka Chakra and Indian flag design. Perfect patriotic keepsake.",
      features: ["Dual coin set", "Ashoka Chakra carving", "Indian flag design", "Independence theme", "Collectible item"],
      rating: 4.6,
      reviews: 156
    },
    {
      id: 41,
      name: "Miniature Taj Mahal Bookmark",
      category: "Bookmarks & Stationery",
      image: "/lovable-uploads/0a964fdd-4339-4c4f-a2a3-9346d98795ab.png",
      price: "₹1,800",
      description: "Delicate wooden bookmark featuring miniature Taj Mahal design. Perfect for book lovers and students.",
      features: ["Taj Mahal architecture", "Compact bookmark size", "Detailed carving", "Educational value", "Cultural heritage"],
      rating: 4.5,
      reviews: 203
    },
    {
      id: 42,
      name: "Majestic Peacock Wall Art Panel",
      category: "Home Décor",
      image: "/lovable-uploads/d5ffc4c0-1d62-4b74-a922-1c225080b38e.png",
      price: "₹18,500",
      originalPrice: "₹23,000",
      discount: 20,
      description: "Stunning carved peacock wall panel with blue accent details. Symbol of grace and beauty for home decoration.",
      features: ["Detailed peacock feathers", "Blue accent highlights", "Floral corner motifs", "Large wall display", "Symbol of prosperity"],
      rating: 4.9,
      reviews: 78
    },
    {
      id: 43,
      name: "Himalayan Landscape with Flag Panel",
      category: "Patriotic Art",
      image: "/lovable-uploads/648c6f56-5c4e-4d32-81db-44206cce5eee.png",
      price: "₹22,000",
      originalPrice: "₹26,500",
      discount: 17,
      description: "Breathtaking carved panel depicting Himalayan mountains with Indian flag. Represents national pride and natural beauty.",
      features: ["Mountain landscape carving", "Indian flag display", "Intricate border work", "Patriotic theme", "Natural scenery"],
      rating: 4.8,
      reviews: 94
    },
    {
      id: 44,
      name: "Gateway of India Architectural Model",
      category: "Architectural Models",
      image: "/lovable-uploads/f678575f-c9ac-4ad0-9f76-bb8f3a918cc2.png",
      price: "₹15,500",
      originalPrice: "₹18,800",
      discount: 18,
      description: "Detailed miniature model of Mumbai's iconic Gateway of India. Perfect decorative piece celebrating Indian architecture.",
      features: ["Accurate architectural details", "Monument replica", "Display base included", "Historical significance", "Tourist landmark"],
      rating: 4.7,
      reviews: 112
    },
    {
      id: 45,
      name: "Patriotic Flag Storage Box",
      category: "Storage Solutions",
      image: "/lovable-uploads/011b0b5c-8efb-4e80-b38b-ed98d1d293a0.png",
      price: "₹8,500",
      originalPrice: "₹10,200",
      discount: 17,
      description: "Elegant wooden storage box with carved Indian flag design. Perfect for storing documents, jewelry, or keepsakes.",
      features: ["Indian flag carving", "Geometric border pattern", "Spacious interior", "Secure closure", "Patriotic design"],
      rating: 4.6,
      reviews: 128
    },
    {
      id: 46,
      name: "Mahatma Gandhi Portrait Relief",
      category: "Historical Portraits",
      image: "/lovable-uploads/310d2675-3e48-4027-b46f-6b7ff6527b83.png",
      price: "₹24,500",
      originalPrice: "₹29,000",
      discount: 16,
      description: "Masterfully carved relief portrait of Mahatma Gandhi. Tribute to the Father of the Nation with exceptional detail work.",
      features: ["Detailed facial features", "Traditional dhoti carving", "Iconic spectacles", "Historical tribute", "Wall mount ready"],
      rating: 4.9,
      reviews: 187
    },
    {
      id: 47,
      name: "Patriotic Tricolor Perfume Diffuser",
      category: "Perfume Accessories",
      image: "/lovable-uploads/19c525b0-8dbb-4ce0-b606-2bf2af5b5831.png",
      price: "₹8,500",
      originalPrice: "₹10,200",
      discount: 17,
      description: "Exquisite carved wooden perfume diffuser with tricolor design and geometric lattice work. Perfect patriotic aromatherapy piece.",
      features: ["Tricolor patriotic design", "Intricate lattice carving", "Perfume diffuser function", "Geometric patterns", "Wooden craftsmanship"],
      rating: 4.7,
      reviews: 92
    },
    {
      id: 48,
      name: "Palm Symbol Cufflinks & Tie Pin Set",
      category: "Office & Legal",
      image: "/lovable-uploads/be6e8f96-d8d9-4820-829b-c4f16c636af6.png",
      price: "₹5,200",
      originalPrice: "₹6,500",
      discount: 20,
      description: "Premium wooden cufflink set with carved palm symbol. Perfect for professional and formal occasions with political significance.",
      features: ["Gold-plated finish", "Palm symbol carving", "Complete set included", "Professional accessory", "Political symbolism"],
      rating: 4.6,
      reviews: 134
    },
    {
      id: 49,
      name: "Executive Palm Symbol Nameplate",
      category: "Office & Legal",
      image: "/lovable-uploads/f16d16d5-755d-4f2b-8c52-0c8dc43f9074.png",
      price: "₹4,800",
      originalPrice: "₹6,000",
      discount: 20,
      description: "Elegant wooden desk nameplate featuring carved palm symbol with floral borders. Perfect for office and professional settings.",
      features: ["Customizable nameplate", "Palm symbol design", "Floral border carving", "Desk display", "Professional quality"],
      rating: 4.5,
      reviews: 88
    },
    {
      id: 50,
      name: "Sacred Lotus Coaster Set",
      category: "Home Décor",
      image: "/lovable-uploads/243e18d3-3d7b-4c9a-8a48-c3024d961ccd.png",
      price: "₹3,500",
      originalPrice: "₹4,200",
      discount: 17,
      description: "Beautiful wooden coaster with detailed lotus carving and floral border. Symbol of purity and spiritual significance.",
      features: ["Lotus flower carving", "Detailed border work", "Protective coaster", "Spiritual symbolism", "Fine craftsmanship"],
      rating: 4.8,
      reviews: 167
    },
    {
      id: 51,
      name: "Lotus Flag Holder with Stand",
      category: "Patriotic Art",
      image: "/lovable-uploads/6c4f6602-ce1c-4fff-9d96-efe15f0e800b.png",
      price: "₹7,500",
      originalPrice: "₹9,000",
      discount: 17,
      description: "Wooden flag holder with carved lotus base design. Perfect for displaying national or organizational flags with dignity.",
      features: ["Lotus carved base", "Flag holding design", "Stable wooden stand", "Political symbolism", "Display piece"],
      rating: 4.7,
      reviews: 76
    },
    {
      id: 52,
      name: "Grand Lotus Achievement Trophy",
      category: "Awards & Trophies",
      image: "/lovable-uploads/8332e953-8c0c-4af6-b244-ad227307131f.png",
      price: "₹12,500",
      originalPrice: "₹15,000",
      discount: 17,
      description: "Magnificent wooden lotus trophy with brass nameplate. Perfect for awards, recognition ceremonies, and achievements.",
      features: ["Large lotus design", "Wooden trophy base", "Brass nameplate", "Achievement award", "Ceremonial piece"],
      rating: 4.9,
      reviews: 54
    },
    {
      id: 53,
      name: "Professional Lotus Desk Nameplate",
      category: "Office & Legal",
      image: "/lovable-uploads/f24892f3-acc7-48b6-866b-d307c8f7e65f.png",
      price: "₹3,800",
      originalPrice: "₹4,500",
      discount: 16,
      description: "Elegant wooden desk nameplate with lotus symbol and personalized engraving. Perfect for professional office settings.",
      features: ["Lotus symbol carving", "Personalized engraving", "Professional design", "Desk accessory", "Custom text"],
      rating: 4.6,
      reviews: 198
    },
    {
      id: 54,
      name: "Distinguished Leader Portrait Frame",
      category: "Historical Portraits",
      image: "/lovable-uploads/23d5044a-2e3f-4956-a7f5-d1eaec130aa5.png",
      price: "₹18,500",
      originalPrice: "₹22,000",
      discount: 16,
      description: "Masterfully carved portrait with ornate floral frame. Tribute to distinguished leadership with exceptional artistic detail.",
      features: ["Detailed portrait carving", "Ornate floral frame", "Leadership tribute", "Museum quality", "Artistic masterpiece"],
      rating: 4.9,
      reviews: 143
    },
    {
      id: 55,
      name: "Lotus Trophy with Party Symbol",
      category: "Awards & Trophies",
      image: "/lovable-uploads/672e9da1-61e9-42cc-8386-6f6e1794678d.png",
      price: "₹9,500",
      originalPrice: "₹11,500",
      discount: 17,
      description: "Elegant lotus-shaped trophy with brass symbol plate. Perfect for political events, achievements, and recognition ceremonies.",
      features: ["Lotus trophy design", "Brass symbol plate", "Tiered wooden base", "Political significance", "Award ceremony"],
      rating: 4.8,
      reviews: 89
    },
    {
      id: 131,
      name: "Traditional Tabla Drum Set",
      category: "Musical Instruments",
      image: "/lovable-uploads/556af70d-446a-40bc-b7d0-76f531f5a050.png",
      price: "₹12,500",
      originalPrice: "₹16,000",
      discount: 22,
      description: "Authentic handcrafted tabla set with ornately carved bases and traditional rope tensioning system.",
      features: ["Hand-carved wooden bases", "Traditional rope tensioning", "Premium goatskin heads", "Includes tabla and bayan"],
      rating: 4.9,
      reviews: 145
    },
    {
      id: 132,
      name: "Wooden Percussion Drum",
      category: "Musical Instruments",
      image: "/lovable-uploads/26d0243d-b30a-4f8a-b396-457eea11b8ca.png",
      price: "₹5,800",
      originalPrice: "₹7,500",
      discount: 23,
      description: "Traditional single-headed percussion drum with intricately carved wooden body and rope tensioning.",
      features: ["Carved wooden body", "Natural skin head", "Rope tensioning system", "Rich resonant tone"],
      rating: 4.7,
      reviews: 78
    },
    {
      id: 133,
      name: "Handcrafted Wooden Harp",
      category: "Musical Instruments",  
      image: "/lovable-uploads/4bbed89e-dcdb-4b2b-8347-71f972788d19.png",
      price: "₹28,500",
      originalPrice: "₹35,000",
      discount: 19,
      description: "Exquisite wooden harp with ornate carved frame and professional-grade strings for beautiful music.",
      features: ["Ornate carved frame", "Professional strings", "Rich wood finish", "Concert quality sound"],
      rating: 4.9,
      reviews: 67
    },
    {
      id: 134,
      name: "Traditional Wooden Xylophone",
      category: "Musical Instruments",
      image: "/lovable-uploads/970480c6-4e4a-4403-8beb-f9ba561550e0.png",
      price: "₹8,200",
      originalPrice: "₹10,500",
      discount: 22,
      description: "Handcrafted wooden xylophone with carved support frame and precision-tuned wooden bars.",
      features: ["Precision-tuned bars", "Carved support frame", "Includes mallets", "Traditional craftsmanship"],
      rating: 4.8,
      reviews: 89
    },
    {
      id: 135,
      name: "Carved Wooden Flute Set",
      category: "Musical Instruments",
      image: "/lovable-uploads/77af40c6-21c2-42f5-b84f-d0cdc66cef40.png",
      price: "₹3,500",
      originalPrice: "₹4,800",
      discount: 27,
      description: "Set of traditional wooden flutes with intricate carved patterns and sweet melodious tones.",
      features: ["Intricate carved patterns", "Multiple sizes", "Sweet melodious tone", "Traditional designs"],
      rating: 4.6,
      reviews: 124
    },
    {
      id: 136,
      name: "Ornate Wooden Mortar & Pestle",
      category: "Kitchen & Dining",
      image: "/lovable-uploads/db87e69f-c9b1-4291-8268-0951d9661743.png",
      price: "₹6,500",
      originalPrice: "₹8,200",
      discount: 21,
      description: "Traditional wooden mortar and pestle set with intricate carved details for grinding spices and herbs.",
      features: ["Intricate carved details", "Traditional craftsmanship", "Smooth grinding surface", "Durable hardwood"],
      rating: 4.8,
      reviews: 156
    },
    {
      id: 137,
      name: "Sacred Temple Bell Stand",
      category: "Spiritual Items",
      image: "/lovable-uploads/b4c77bf1-7053-4441-9a4e-f6177864afcc.png",
      price: "₹15,500",
      originalPrice: "₹19,500",
      discount: 21,
      description: "Majestic temple bell with ornately carved pillars and traditional hanging bell for spiritual ceremonies.",
      features: ["Ornate carved pillars", "Traditional brass bell", "Temple architecture", "Spiritual ceremonies"],
      rating: 4.9,
      reviews: 198
    },
    {
      id: 138,
      name: "Ornate Ceremonial Bell Frame",
      category: "Spiritual Items",
      image: "/lovable-uploads/f034bd0a-af43-4125-8357-553336a79ab7.png",
      price: "₹12,800",
      originalPrice: "₹16,000",
      discount: 20,
      description: "Beautifully carved ceremonial bell frame with intricate traditional motifs and hanging brass bell.",
      features: ["Intricate carved motifs", "Brass bell included", "Traditional design", "Ceremonial use"],
      rating: 4.8,
      reviews: 142
    },
   {
      id: 84,
      name: "Zodiac Taurus Bull Relief Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/1004b2fc-fc01-4bb3-aa1a-716d47c33177.png",
      price: "₹14,500",
      originalPrice: "₹18,000",
      discount: 19,
      description: "Magnificent Taurus zodiac relief panel with intricate floral carvings and celestial symbols. Perfect for Taurus-born individuals.",
      features: ["Taurus zodiac symbol", "Ornate floral carvings", "Astrological significance", "Premium relief work", "Celestial motifs"],
      rating: 4.8,
      reviews: 67
    },
    {
      id: 85,
      name: "Divine Meditation Deity Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/5e89653a-31fb-42c4-8723-e0e3b3f7bb75.png",
      price: "₹16,800",
      originalPrice: "₹21,000",
      discount: 20,
      description: "Sacred meditation deity in lotus position with ornate aureole, representing spiritual awakening and inner peace.",
      features: ["Meditation pose", "Lotus throne", "Ornate aureole", "Spiritual symbolism", "Sacred art"],
      rating: 4.9,
      reviews: 89
    },
    {
      id: 186,
      name: "Zodiac Cancer Crab Circular Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/0f9e7715-9e43-4ecd-9be9-18d357dd992e.png",
      price: "₹13,200",
      originalPrice: "₹16,500",
      discount: 20,
      description: "Beautifully carved Cancer zodiac symbol in ornate circular frame with intricate shell and water motifs.",
      features: ["Cancer zodiac symbol", "Circular ornate frame", "Shell motifs", "Water elements", "Astrological art"],
      rating: 4.7,
      reviews: 54
    },
    {
      id: 87,
      name: "Zodiac Leo Lion Majesty Sculpture",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/8b8e2df8-09b2-45f9-921a-0714d5a7dc82.png",
      price: "₹19,500",
      originalPrice: "₹24,000",
      discount: 19,
      description: "Majestic Leo lion sculpture with flowing mane and intricate base carvings, representing strength and leadership.",
      features: ["Leo zodiac symbol", "Flowing mane detail", "Ornate base", "Royal symbolism", "Leadership energy"],
      rating: 4.9,
      reviews: 76
    },
    {
      id: 88,
      name: "Sacred Multi-Armed Deity Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/5fa80d86-4770-4692-80e5-9a5de5564475.png",
      price: "₹17,900",
      originalPrice: "₹22,500",
      discount: 20,
      description: "Divine multi-armed deity with ornate crown and sacred gestures, representing cosmic balance and divine protection.",
      features: ["Multiple arms", "Sacred mudras", "Ornate crown", "Divine protection", "Cosmic symbolism"],
      rating: 4.8,
      reviews: 92
    },
    {
      id: 89,
      name: "Zodiac Libra Scales Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/fd20c0c2-079d-482e-8129-6827d42b9de3.png",
      price: "₹12,800",
      originalPrice: "₹16,000",
      discount: 20,
      description: "Elegant Libra scales in ornate circular frame, symbolizing balance, justice, and harmony in relationships.",
      features: ["Libra zodiac symbol", "Balance scales", "Circular ornate frame", "Justice symbolism", "Harmony representation"],
      rating: 4.6,
      reviews: 48
    },
    {
      id: 190,
      name: "Celestial Garuda Relief Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/00867f8e-6cb5-4dba-a7e9-ed093d12a9a8.png",
      price: "₹18,200",
      originalPrice: "₹23,000",
      discount: 21,
      description: "Magnificent Garuda with spread wings and intricate feather details, representing freedom and divine messenger.",
      features: ["Garuda sculpture", "Spread wings", "Feather details", "Divine messenger", "Freedom symbol"],
      rating: 4.9,
      reviews: 83
    },
    {
      id: 91,
      name: "Zodiac Sagittarius Archer Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/c7ce4ce9-d10e-4fd7-9ac5-b925507b1712.png",
      price: "₹15,600",
      originalPrice: "₹19,500",
      discount: 20,
      description: "Dynamic Sagittarius archer with bow and arrow in ornate frame, representing adventure and spiritual quest.",
      features: ["Sagittarius archer", "Bow and arrow", "Dynamic pose", "Adventure spirit", "Spiritual quest"],
      rating: 4.8,
      reviews: 71
    },
    {
      id: 192,
      name: "Celestial Garuda Flight Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/063b5a33-d7e5-4283-90de-c31c44f29cf0.png",
      price: "₹16,900",
      originalPrice: "₹21,200",
      discount: 20,
      description: "Soaring Garuda in flight with detailed wings and celestial backdrop, representing transcendence and divine protection.",
      features: ["Flying Garuda", "Detailed wings", "Celestial elements", "Transcendence symbol", "Divine protection"],
      rating: 4.7,
      reviews: 64
    },
    {
      id: 193,
      name: "Divine Musical Deity Panel",
      category: "Astrology & Zodiac",
      image: "/lovable-uploads/be08cea5-6c29-469a-bd25-275344fba09b.png",
      price: "₹17,400",
      originalPrice: "₹21,800",
      discount: 20,
      description: "Sacred deity playing divine music with ornate instruments, representing harmony, creativity, and artistic expression.",
      features: ["Musical deity", "Divine instruments", "Artistic expression", "Harmony symbol", "Creative energy"],
      rating: 4.8,
      reviews: 58
    },
    {
      id: 94,
      name: "Sacred Sandalwood Shankh Sculpture",
      category: "Spiritual Items",
      image: "/lovable-uploads/c14ba44c-a91c-43bd-b490-18eba06f1304.png",
      price: "₹15,500",
      originalPrice: "₹19,500",
      discount: 21,
      description: "Exquisitely carved sandalwood conch shell (shankh) with intricate traditional patterns and ornate base design.",
      features: ["Hand-carved sandalwood", "Traditional sacred patterns", "Ornate ceremonial base", "Religious significance", "Natural fragrance"],
      rating: 4.9,
      reviews: 87
    },
    {
      id: 95,
      name: "Majestic Peacock Feather Wall Art",
      category: "Wall Art",
      image: "/lovable-uploads/961e638c-09e8-40f4-864b-fdc644f62059.png",
      price: "₹22,500",
      originalPrice: "₹28,000",
      discount: 20,
      description: "Stunning peacock wall sculpture with intricately carved feathers and ornate lotus base, symbolizing grace and beauty.",
      features: ["Detailed feather carving", "Lotus pedestal base", "Traditional craftsmanship", "Symbol of grace", "Large wall display"],
      rating: 4.9,
      reviews: 76
    },
    {
      id: 96,
      name: "Elegant Wooden Rose Bouquet Vase",
      category: "Home Décor",
      image: "/lovable-uploads/c0fbb490-2138-47af-81c5-1741c6467f4a.png",
      price: "₹8,500",
      originalPrice: "₹11,000",
      discount: 23,
      description: "Beautiful handcrafted wooden vase with blooming roses, each petal meticulously carved to perfection.",
      features: ["Hand-carved wooden roses", "Ornate decorative vase", "Realistic petal details", "Natural wood finish", "Perfect centerpiece"],
      rating: 4.8,
      reviews: 94
    },
    {
      id: 97,
      name: "Sacred Lotus Flower Collection",
      category: "Spiritual Items",
      image: "/lovable-uploads/409af636-14c6-46b1-afb2-3a261508518e.png",
      price: "₹12,800",
      originalPrice: "₹16,500",
      discount: 22,
      description: "Divine collection of carved lotus flowers with intricate petal work, representing purity and spiritual awakening.",
      features: ["Multiple lotus designs", "Detailed petal carving", "Spiritual symbolism", "Sacred significance", "Meditation focal point"],
      rating: 4.9,
      reviews: 112
    },
    {
      id: 98,
      name: "Traditional Wooden Wind Chime",
      category: "Home Décor",
      image: "/lovable-uploads/dbf2bfa7-6ab5-4a1e-a8ae-536c844b643d.png",
      price: "₹6,500",
      originalPrice: "₹8,200",
      discount: 21,
      description: "Melodious wooden wind chime with carved traditional patterns and hanging ornamental elements.",
      features: ["Traditional carved patterns", "Melodious sound", "Weather resistant", "Hanging ornaments", "Feng shui benefits"],
      rating: 4.7,
      reviews: 83
    },  
    {
      id: 99,
      name: "Multi-Tiered Temple Architectural Model",
      category: "Architectural Models",
      image: "/lovable-uploads/85c52b14-7b91-4c00-8628-1a4a830bce16.png",
      price: "₹35,000",
      originalPrice: "₹45,000",
      discount: 22,
      description: "Magnificent multi-tiered temple replica with intricate architectural details, columns, and traditional carvings.",
      features: ["Multi-tiered design", "Architectural accuracy", "Detailed columns", "Traditional temple art", "Museum quality piece"],
      rating: 4.9,
      reviews: 45
    },
    {
      id: 100,
      name: "Royal Lion Head Walking Stick",
      category: "Luxury Accessories",
      image: "/lovable-uploads/c44b5b79-26fd-4aaa-9f89-81e52c24c8b6.png",
      price: "₹12,500",
      originalPrice: "₹15,800",
      discount: 21,
      description: "Majestic lion head walking stick handle with detailed mane carving and premium black shaft.",
      features: ["Hand-carved lion head", "Detailed mane work", "Premium black shaft", "Ergonomic grip", "Symbol of strength"],
      rating: 4.8,
      reviews: 67
    },
    {
      id: 101,
      name: "Executive Cufflink & Accessories Box",
      category: "Fashion Accessories",
      image: "/lovable-uploads/60f85e7e-e8a1-4005-bec9-993c19831833.png",
      price: "₹9,500",
      originalPrice: "₹12,000",
      discount: 21,
      description: "Luxury wooden cufflink set with matching accessories in ornately carved presentation box with velvet lining.",
      features: ["Cufflinks and tie pin set", "Carved presentation box", "Velvet interior lining", "Executive quality", "Professional accessories"],
      rating: 4.8,
      reviews: 89
    },
    {
      id: 102,
      name: "Premium Jewelry Storage Box",
      category: "Jewelry Storage",
      image: "/lovable-uploads/8a24257f-52b7-4034-9574-7d6e2058d2b9.png",
      price: "₹14,500",
      originalPrice: "₹18,500",
      discount: 22,
      description: "Elegant wooden jewelry box with intricate carved designs and luxurious velvet-lined compartments.",
      features: ["Multiple compartments", "Carved wooden exterior", "Velvet interior lining", "Secure lock mechanism", "Luxury storage solution"],
      rating: 4.9,
      reviews: 156
    },
    {
      id: 103,
      name: "Artisan Wooden Buckle Leather Belt",
      category: "Fashion Accessories",
      image: "/lovable-uploads/8a8bd784-0595-481d-8eb8-afcfaffec098.png",
      price: "₹4,500",
      originalPrice: "₹5,800",
      discount: 22,
      description: "Premium leather belt with handcrafted wooden buckle featuring carved traditional patterns and brass accents.",
      features: ["Handcrafted wooden buckle", "Premium leather strap", "Traditional carved patterns", "Brass accent details", "Adjustable sizing"],
      rating: 4.7,
      reviews: 78
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
    <div className="min-h-screen bg-background">
      {/* Promotional Banner positioned right after header navigation */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isScrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-96 opacity-100 py-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <PromotionalBanner 
            onCategoryFilter={setSelectedCategory}
            onDiscountFilter={setHasDiscount}
          />
        </div>
      </div>

      {/* Enhanced Sticky Search & Filter Bar */}
      <div className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-16 z-50 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Mobile Filters Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="lg:hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-border/50 hover:border-accent/50 bg-background/80 backdrop-blur-sm"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  <span className="font-medium">Filters</span>
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

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for sandalwood products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 rounded-xl border-border/50 bg-background/80 backdrop-blur-sm focus:border-accent/50 focus:ring-accent/20 shadow-sm hover:shadow-md transition-all duration-200 text-sm placeholder:text-muted-foreground/70"
                />
              </div>
            </div>

            {/* Enhanced Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-12 hidden sm:flex rounded-xl border-border/50 bg-background/80 backdrop-blur-sm hover:border-accent/50 shadow-sm hover:shadow-md transition-all duration-200">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Sort by" className="font-medium" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50 shadow-lg bg-background/95 backdrop-blur-md z-[60]">
                <SelectItem value="featured" className="rounded-lg">Featured</SelectItem>
                <SelectItem value="price-low" className="rounded-lg">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="rounded-lg">Price: High to Low</SelectItem>
                <SelectItem value="rating" className="rounded-lg">Customer Rating</SelectItem>
                <SelectItem value="name" className="rounded-lg">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Sort Button */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-12 h-12 sm:hidden rounded-xl border-border/50 bg-background/80 backdrop-blur-sm hover:border-accent/50 shadow-sm hover:shadow-md transition-all duration-200">
                <SlidersHorizontal className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50 shadow-lg bg-background/95 backdrop-blur-md z-[60]">
                <SelectItem value="featured" className="rounded-lg">Featured</SelectItem>
                <SelectItem value="price-low" className="rounded-lg">Price: Low to High</SelectItem>
                <SelectItem value="price-high" className="rounded-lg">Price: High to Low</SelectItem>
                <SelectItem value="rating" className="rounded-lg">Customer Rating</SelectItem>
                <SelectItem value="name" className="rounded-lg">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>


      {/* Main Content with proper spacing */}
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
              <h2 className="text-lg font-semibold mb-4">
    Showing {filteredProducts.length} Products
  </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
               <div key={`${product.id}-${product.name}`}>
              
                <ProductCard
                  // key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
               </div>
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
        <Card id="custom-sculpture-section" className="mt-12 max-w-6xl mx-auto scroll-mt-20">
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