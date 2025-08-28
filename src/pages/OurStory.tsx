import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreePine, Heart, Calendar, Sprout, Users, Leaf } from "lucide-react";

const OurStory = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey that began with love, grew with tradition, and blossomed into a movement that empowers farmers across Karnataka.
          </p>
        </div>

        {/* The Beginning */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-accent text-accent-foreground">The Beginning - 2004</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">Seeds of a Dream</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  In 2004, Vishukumar's vision began to take shape. Coming from a family deeply rooted in Karnataka's agricultural heritage, he witnessed the struggles of sandalwood farmers who lacked awareness about their legal rights to cultivate and sell privately grown sandalwood.
                </p>
                <p>
                  The foundation of what would become Yashasv Charitable Trust was built on a simple yet powerful belief: every farmer deserves to know their rights, and every traditional craft deserves to be preserved for future generations.
                </p>
              </div>
            </div>
            <div className="bg-gradient-card rounded-lg p-8 shadow-card">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-hero rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Sprout className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">The Vision</h3>
                <p className="text-muted-foreground">
                  "To create a world where farmers are empowered with knowledge, artisans thrive with traditional skills, and sandalwood culture continues to flourish legally and sustainably."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Sacred Moment - July 2005 */}
        <section className="mb-20">
          <div className="bg-gradient-warm rounded-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <Calendar className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">July 2005: A Sacred Beginning</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The moment that would define our mission and mark the beginning of our annual tradition
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-background/60 rounded-lg p-6 mb-6">
                  <TreePine className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">The First Sapling</h3>
                  <p className="text-muted-foreground">
                    On the first birthday of Vishukumar's son in July 2005, a special sandalwood sapling was planted. This wasn't just any tree – it became a living symbol of hope, growth, and the deep connection between family and nature.
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-background/60 rounded-lg p-6">
                  <Heart className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">A Symbol of Love</h3>
                  <p className="text-muted-foreground">
                    This sapling came to represent not just Vishukumar's own children, but all the generations of farmers who care for sandalwood trees like family members. Each tree planted became a life remembered, a future secured.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Values & Heritage */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Built on Personal Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our trust is founded on the deep cultural heritage and personal values that have guided our family for generations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-8 text-center">
                <Leaf className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">Respect for Nature</h3>
                <p className="text-muted-foreground">
                  Every tree is treated as a family member, nurtured with love and respect for the gifts it will provide.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">Community First</h3>
                <p className="text-muted-foreground">
                  Supporting fellow farmers and artisans is not just our mission – it's our family tradition.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">Cultural Heritage</h3>
                <p className="text-muted-foreground">
                  Preserving traditional craftsmanship and passing it on to future generations with pride.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How the Trust Grew */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-card rounded-lg p-8 shadow-card">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">From Family to Community</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-accent-foreground text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Family Tradition</h4>
                    <p className="text-muted-foreground text-sm">Started with our own family's sandalwood cultivation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-accent-foreground text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Neighbor Support</h4>
                    <p className="text-muted-foreground text-sm">Helped neighboring farmers understand their rights</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-accent-foreground text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Village Outreach</h4>
                    <p className="text-muted-foreground text-sm">Expanded to villages across Karnataka districts</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-accent-foreground text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">State-wide Movement</h4>
                    <p className="text-muted-foreground text-sm">Now supporting farmers across all of Karnataka</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Growing Into a Movement</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  What started as a personal mission to educate farmers about their rights gradually became a community movement. Word spread from village to village about the trust that actually cared about farmers' welfare and legal rights.
                </p>
                <p>
                  Farmers began approaching Vishukumar for guidance on legal documentation, sustainable cultivation practices, and connecting with artisans who could transform their sandalwood into valuable products.
                </p>
                <p>
                  The trust's approach was unique – it wasn't just about business or charity. It was about building lasting relationships based on mutual respect, cultural pride, and shared prosperity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Symbol Lives On */}
        <section className="bg-gradient-hero rounded-lg p-8 md:p-12 text-center">
          <TreePine className="w-20 h-20 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">The Symbol Lives On</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            That first sandalwood tree planted in July 2005 still stands strong today, just like our commitment to farmers. Every July, during our "Know Your Sandalwood Rights" campaign, we remember that sacred beginning and renew our promise to serve the farming community.
          </p>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-primary-foreground italic text-lg">
              "Every tree planted is a life remembered, every farmer empowered is a family strengthened, and every craft preserved is a culture honored."
            </p>
            <p className="text-primary-foreground/80 mt-4">— Vishukumar, Founder</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurStory;