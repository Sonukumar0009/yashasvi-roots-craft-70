import { Calendar, Scale, Users, BookOpen, Award, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AnnualCampaigns = () => {
  const campaigns = [
    {
      year: "2005",
      theme: "The Beginning",
      participants: "First Ceremony",
      description: "The inaugural ceremony marking the planting of the first sandalwood sapling on Vishukumar's son's birthday, establishing the tradition that would grow into our annual campaign.",
      achievements: ["Sacred tree planting ceremony", "Foundation of annual tradition", "Family commitment to farmers", "Symbol of growth established"],
      highlight: "🌱 The Sacred Beginning"
    },
    {
      year: "2006-2010",
      theme: "Building Awareness",
      participants: "50+ Farmers",
      description: "Early years focused on spreading awareness among local farmers about their legal rights to cultivate and sell privately grown sandalwood.",
      achievements: ["Legal documentation workshops", "Farmer rights education", "Local community building", "Traditional knowledge sharing"],
      highlight: "📚 Foundation Years"
    },
    {
      year: "2011-2015",
      theme: "Expanding Reach",
      participants: "500+ Farmers",
      description: "Campaign expanded across multiple districts, reaching hundreds of farmers with comprehensive legal awareness programs and sustainable cultivation guidance.",
      achievements: ["Multi-district coverage", "Legal aid partnerships", "Craft training programs", "Market linkage development"],
      highlight: "🌍 Regional Growth"
    },
    {
      year: "2016-2020",
      theme: "Digital Transformation",
      participants: "2,000+ Farmers",
      description: "Leveraged digital platforms to reach more farmers, created online resources, and established partnerships with government agencies for wider impact.",
      achievements: ["Digital resource portal", "Government partnerships", "Online legal guidance", "Farmer certification programs"],
      highlight: "💻 Digital Era"
    },
    {
      year: "2021",
      theme: "Post-Pandemic Resilience",
      participants: "1,500+ Farmers",
      description: "Adapted to pandemic challenges by providing essential support to farmers, conducting virtual workshops, and ensuring continued legal awareness during difficult times.",
      achievements: ["Virtual workshops", "Emergency farmer support", "Health safety protocols", "Digital documentation help"],
      highlight: "🛡️ Resilience"
    },
    {
      year: "2022",
      theme: "Artisan Empowerment",
      participants: "2,500+ Farmers & Artisans",
      description: "Special focus on connecting farmers with skilled artisans, providing comprehensive training in sandalwood crafting, and establishing quality standards.",
      achievements: ["Artisan-farmer partnerships", "Quality certification", "Advanced craft training", "Market expansion"],
      highlight: "🎨 Craft Excellence"
    },
    {
      year: "2023",
      theme: "Sustainable Future",
      participants: "3,000+ Farmers",
      description: "Emphasized environmental sustainability, climate-resilient farming practices, and long-term planning for sandalwood cultivation across Karnataka.",
      achievements: ["Sustainability workshops", "Climate adaptation training", "Long-term planning tools", "Environmental partnerships"],
      highlight: "🌿 Sustainability"
    },
    {
      year: "2024",
      theme: "20 Years Strong",
      participants: "3,500+ Farmers",
      description: "Celebrated two decades of service with a grand campaign focusing on legal clarity, farmer prosperity, and cultural preservation. The largest campaign to date.",
      achievements: ["20-year celebration", "Comprehensive legal guide", "Farmer prosperity stories", "Cultural heritage documentation"],
      highlight: "🎉 Milestone Celebration"
    },
    {
      year: "2025",
      theme: "Future Generations",
      participants: "4,000+ Expected",
      description: "Looking ahead to the next generation of farmers, this campaign will focus on youth engagement, modern technology integration, and ensuring sandalwood heritage continues.",
      achievements: ["Youth farmer programs", "Technology integration", "Next-gen training", "Heritage preservation"],
      highlight: "🚀 Future Ready"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            "Know Your Sandalwood Rights" Annual Campaign
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Every July since 2005, we commemorate the planting of our first sandalwood tree and continue our mission to educate farmers about their legal rights.
          </p>
          <div className="bg-gradient-warm rounded-lg p-6 max-w-2xl mx-auto">
            <TreePine className="w-12 h-12 text-accent mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">Annual Tradition Since 2005</p>
            <p className="text-muted-foreground">
              Celebrating the birthday of both Vishukumar's son and our first sandalwood tree, this campaign has educated thousands of farmers across Karnataka.
            </p>
          </div>
        </div>

        {/* Campaign Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Campaign Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent"></div>

            {campaigns.map((campaign, index) => (
              <div key={campaign.year} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-10 h-10 bg-gradient-hero rounded-full border-4 border-background flex items-center justify-center z-10">
                  <Calendar className="w-5 h-5 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-accent">{campaign.year}</span>
                        <Badge className="bg-accent text-accent-foreground">
                          {campaign.highlight}
                        </Badge>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-2">{campaign.theme}</h3>
                      <p className="text-muted-foreground mb-6">{campaign.description}</p>

                      <div className="flex items-center mb-6 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 text-accent" />
                        {campaign.participants}
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-accent" />
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {campaign.achievements.map((achievement, achievementIndex) => (
                            <div key={achievementIndex} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campaign Impact */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">20 Years of Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">20,000+</div>
              <div className="text-muted-foreground">Farmers Educated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Legal Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">150+</div>
              <div className="text-muted-foreground">Villages Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Districts Reached</div>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">What Our Campaign Covers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-6 text-center">
                <Scale className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">Legal Rights Education</h3>
                <p className="text-muted-foreground">Understanding laws around private sandalwood cultivation, harvesting, and selling</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">Documentation Support</h3>
                <p className="text-muted-foreground">Helping farmers with proper documentation and certification processes</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">Community Building</h3>
                <p className="text-muted-foreground">Creating networks of informed farmers who support each other</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-hero rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">Join Our Next Campaign</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Be part of our 2025 campaign focusing on future generations. Help us continue the tradition of empowering farmers and preserving sandalwood heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Register for July 2025
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Become a Volunteer
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnnualCampaigns;