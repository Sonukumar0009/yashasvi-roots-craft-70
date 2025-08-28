import { ArrowRight, Leaf, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import sandalwoodElephant from "@/assets/sandalwood-elephant.jpg";
import sandalwoodBeads from "@/assets/sandalwood-beads.jpg";
import sandalwoodOil from "@/assets/sandalwood-oil.jpg";

const Home = () => {
  const featuredProducts = [
    {
      name: "Sandalwood Elephant Sculptures",
      image: sandalwoodElephant,
      description: "Handcrafted spiritual sculptures from farmer-grown sandalwood"
    },
    {
      name: "Sandalwood Bead Chains",
      image: sandalwoodBeads,
      description: "Premium wearable items for meditation and spiritual practice"
    },
    {
      name: "Pure Sandalwood Oil",
      image: sandalwoodOil,
      description: "Authentic essential oils extracted from Karnataka sandalwood"
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Supporting private sandalwood cultivation with legal clarity"
    },
    {
      icon: Heart,
      title: "Cultural Heritage",
      description: "Preserving traditional craftsmanship and spiritual values"
    },
    {
      icon: Users,
      title: "Rural Empowerment",
      description: "Creating livelihood opportunities for local artisans"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Yashasv Charitable Trust
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 leading-relaxed">
            Rooted in love, carved with care – bringing farmer-grown sandalwood to the world.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 mb-8 border border-primary-foreground/20">
            <h2 className="text-lg md:text-xl font-semibold text-primary-foreground mb-2">
              🌳 Celebrating 20 Years of Trust and Tradition 🌳
            </h2>
            <p className="text-primary-foreground/80">2004 - 2024: Two decades of empowering farmers and preserving heritage</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/products">
                Explore Our Products <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-orange-500 hover:bg-white/20 hover:text-orange-400">
              <Link to="/our-story">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handcrafted sandalwood products, each piece telling a story of tradition and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-warm transition-smooth group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Farmer Grown
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building a sustainable future through traditional wisdom and modern innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Help us empower Karnataka's sandalwood farmers and preserve our cultural heritage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/20 backdrop-blur-sm border border-orange-300/50 text-orange-300 hover:bg-orange-100/30 hover:text-orange-200 shadow-lg shadow-orange-300/40 hover:shadow-orange-300/60">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;