import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Sparkles, ShoppingBag, Globe, Leaf, Star } from "lucide-react";

const Significance = () => {
  const religions = [
    {
      name: "Hinduism",
      icon: "🕉️",
      description: "Chandan used in tilak, poojas, homas. Offered to deities like Vishnu, Shiva, Ganesha. Mixed with water for temple rituals. Symbol of purity and devotion."
    },
    {
      name: "Buddhism", 
      icon: "☸️",
      description: "Burned in monasteries and homes. Used during meditation and offerings. Symbolizes calmness and non-attachment."
    },
    {
      name: "Jainism",
      icon: "🙏",
      description: "Offered to idols of Tirthankaras. Used in ceremonies for spiritual elevation."
    },
    {
      name: "Christianity",
      icon: "✝️",
      description: "Used in incense and oil-based anointing in Eastern/Coptic traditions. Symbolizes prayer and sanctity."
    },
    {
      name: "Islam",
      icon: "☪️",
      description: "Used as ittar/perfume, especially in Sufi traditions. Applied on graves and sacred objects."
    }
  ];

  const categories = [
    {
      title: "Spiritual & Daily Use",
      icon: <Heart className="w-6 h-6" />,
      items: [
        "Cycle Pure, Mangaldeep – incense sticks",
        "Herbal Strategi, Pathanjali Pooja sprays", 
        "ISKCON & Mutts – daily temple chandan rituals"
      ]
    },
    {
      title: "Ayurveda & Personal Care",
      icon: <Leaf className="w-6 h-6" />,
      items: [
        "Dabur Chyawanprash – immunity booster",
        "Patanjali, Biotique, Khadi, Ayush – soaps, face packs, creams",
        "Forest Essentials, Kama Ayurveda – luxury wellness products"
      ]
    },
    {
      title: "Health & Wellness", 
      icon: <Sparkles className="w-6 h-6" />,
      items: [
        "Used in Zandu Balm, Navratna oil, Ayurvedic massage oils"
      ]
    },
    {
      title: "Flavor/Fragrance Industry",
      icon: <Star className="w-6 h-6" />,
      items: [
        "Rajnigandha, Vimal, Tulsi – claim sandalwood essence",
        "(Often synthetic now, but sandalwood made it iconic)"
      ]
    },
    {
      title: "Luxury Gifting & Artifacts",
      icon: <ShoppingBag className="w-6 h-6" />,
      items: [
        "Sandalwood idols, beads, pens, sculptures",
        "Sold via Karnataka State Emporiums & exhibitions"
      ]
    },
    {
      title: "Global Perfume Industry",
      icon: <Globe className="w-6 h-6" />,
      items: [
        "Key note in luxury brands like Chanel, Le Labo, Tom Ford",
        "Essential oils used in aromatherapy and skincare"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            From Sacred Temples to Daily Essentials
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            The Journey of Sandalwood
          </p>
          <div className="w-24 h-1 bg-gradient-hero mx-auto rounded-full"></div>
        </div>

        {/* Spiritual & Religious Importance */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">🕉️</span>
              Spiritual & Religious Importance
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              For centuries, sandalwood has been more than a tree—it is sacred, healing, and divine across major world religions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {religions.map((religion, index) => (
              <Card key={index} className="hover:shadow-warm transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{religion.icon}</span>
                    <h3 className="text-xl font-semibold text-foreground">{religion.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{religion.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-warm rounded-lg p-8 text-center">
            <blockquote className="text-xl md:text-2xl font-medium text-foreground italic">
              "A scent that crosses all boundaries – of faith, geography, and time."
            </blockquote>
          </div>
        </section>

        <Separator className="my-20" />

        {/* Modern-Day Products & Market Uses */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">🧴</span>
              Modern-Day Products & Market Uses
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Today, sandalwood continues its legacy through a wide range of consumer goods, spiritual items, and luxury brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-warm transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-primary-foreground">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Market Snapshot */}
          <div className="bg-gradient-card rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Market Snapshot (2025)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Raw Wood</h4>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  ₹12,000–₹15,000 per kg
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Essential Oil</h4>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  ₹2.5–₹4 lakh per litre
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Handicrafts</h4>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  Up to ₹1 lakh+
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Significance;