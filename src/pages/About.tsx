import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Yashasv Charitable Trust
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded by Vishukumar, our trust is dedicated to empowering Karnataka's sandalwood farmers and preserving our rich cultural heritage.
          </p>
        </div>

        {/* Founder Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">Our Founder</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">Vishukumar's Journey</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Vishukumar comes from a family of dedicated sandalwood cultivators in Karnataka. For generations, his family has been nurturing sandalwood trees on their private land, understanding the intricate process from planting to harvesting.
                </p>
                <p>
                  Witnessing the challenges faced by fellow farmers in marketing their sandalwood products and the lack of awareness about legal private cultivation, Vishukumar founded Yashasv Charitable Trust in 2020.
                </p>
                <p>
                  His vision was simple yet powerful: create a platform that empowers farmers, educates the public about sustainable sandalwood cultivation, and preserves the traditional craftsmanship that transforms raw sandalwood into beautiful, spiritual products.
                </p>
              </div>
            </div>
            <div className="bg-gradient-card rounded-lg p-8 shadow-card">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-hero rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Foundation</h3>
                <p className="text-muted-foreground">
                  "Every sandalwood tree we plant today is a legacy for tomorrow. Our trust ensures that this sacred tradition continues while providing sustainable livelihoods for our farming community."
                </p>
                <p className="text-sm text-muted-foreground mt-4 font-medium">- Vishukumar, Founder</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Leaf className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
                    Empower sandalwood farmers through fair trade and market access
                  </li>
                  <li className="flex items-start">
                    <Leaf className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
                    Preserve traditional craftsmanship and cultural heritage
                  </li>
                  <li className="flex items-start">
                    <Leaf className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
                    Educate about legal and sustainable sandalwood cultivation
                  </li>
                  <li className="flex items-start">
                    <Leaf className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
                    Create awareness about privately grown sandalwood benefits
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground mb-4">
                  To create a thriving ecosystem where Karnataka's sandalwood farmers are financially empowered, traditional crafts are preserved, and the world recognizes the value of sustainably grown sandalwood.
                </p>
                <p className="text-muted-foreground">
                  We envision a future where every sandalwood product tells a story of environmental responsibility, cultural pride, and economic prosperity for rural communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why We Started */}
        <section className="bg-gradient-warm rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Why We Started This Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">The Challenge</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Limited market access for small-scale sandalwood farmers</li>
                <li>• Confusion about legal rights for private sandalwood cultivation</li>
                <li>• Declining traditional craftsmanship skills</li>
                <li>• Lack of awareness about sustainable farming practices</li>
                <li>• Competition from illegal and forest-sourced products</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Our Solution</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Direct market platform for farmer-grown products</li>
                <li>• Legal awareness campaigns and documentation support</li>
                <li>• Training programs for traditional artisans</li>
                <li>• Educational workshops on sustainable cultivation</li>
                <li>• Clear certification and branding for legitimate products</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Impact So Far</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">150+</div>
              <div className="text-muted-foreground">Farmers Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Artisans Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-muted-foreground">Products Crafted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Awareness Programs</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;