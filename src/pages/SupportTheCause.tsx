import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Building, Clock, BookOpen, Hammer } from "lucide-react";

const SupportTheCause = () => {
  const volunteerOpportunities = [
    {
      icon: BookOpen,
      title: "Education & Awareness",
      commitment: "2-4 hours/week",
      description: "Help conduct awareness sessions for farmers about legal sandalwood cultivation and sustainable practices.",
      skills: ["Public speaking", "Local language knowledge", "Passion for agriculture"]
    },
    {
      icon: Hammer,
      title: "Craft Training Assistant",
      commitment: "4-6 hours/week",
      description: "Assist in training rural artisans in traditional sandalwood crafting techniques and modern finishing methods.",
      skills: ["Craftsmanship interest", "Teaching ability", "Patience with learners"]
    },
    {
      icon: Users,
      title: "Community Outreach",
      commitment: "3-5 hours/week",
      description: "Help organize events, workshops, and farmer meetups across Karnataka districts.",
      skills: ["Event coordination", "Community engagement", "Travel flexibility"]
    },
    {
      icon: Heart,
      title: "Digital Marketing Support",
      commitment: "2-3 hours/week",
      description: "Support our digital presence through content creation, social media management, and online campaigns.",
      skills: ["Social media expertise", "Content writing", "Photography/videography"]
    }
  ];


  const partnerships = [
    {
      type: "NGO Collaboration",
      description: "Partner with us for joint initiatives in rural development and farmer empowerment",
      benefits: ["Shared expertise", "Resource pooling", "Wider reach"]
    },
    {
      type: "Corporate CSR",
      description: "Align your CSR goals with sustainable agriculture and rural artisan development",
      benefits: ["Tax benefits", "Brand alignment", "Impact measurement"]
    },
    {
      type: "Government Bodies",
      description: "Collaborate on policy implementation and farmer welfare programs",
      benefits: ["Policy support", "Scale of impact", "Official recognition"]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Support the Cause
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our mission to empower Karnataka's sandalwood farmers and preserve our rich cultural heritage. Every contribution makes a difference.
          </p>
        </div>

        {/* Volunteer Opportunities */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Volunteer Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your skills and time to make a meaningful impact in the lives of farmers and artisans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <opportunity.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{opportunity.title}</h3>
                      <Badge variant="secondary" className="mb-4">
                        <Clock className="w-3 h-3 mr-1" />
                        {opportunity.commitment}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{opportunity.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Skills Needed:</h4>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Apply to Volunteer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


        {/* Partnership Opportunities */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Partnership Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Collaborate with us to create lasting impact and build sustainable rural communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4 text-center">{partnership.type}</h3>
                  <p className="text-muted-foreground mb-6 text-center">{partnership.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {partnership.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-hero rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Whether through volunteering or partnerships, your involvement helps preserve Karnataka's sandalwood heritage while empowering rural communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white/20 backdrop-blur-sm border border-orange-300/50 text-orange-300 hover:bg-orange-100/30 hover:text-orange-200 shadow-lg shadow-orange-300/40 hover:shadow-orange-300/60">
              Contact Us Today
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Download Information Pack
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportTheCause;