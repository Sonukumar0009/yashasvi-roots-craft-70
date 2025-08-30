import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Users, Headphones, Star, MessageSquare } from "lucide-react";

const CustomerCare = () => {
  const supportStats = [
    { label: "Response Time", value: "< 2 hours", icon: Clock },
    { label: "Resolution Rate", value: "98.5%", icon: CheckCircle },
    { label: "Happy Customers", value: "2,500+", icon: Users },
    { label: "Support Rating", value: "4.9/5", icon: Star }
  ];

  const careServices = [
    {
      title: "Product Support",
      description: "Get help with product selection, authenticity verification, and quality concerns",
      features: [
        "Product authentication",
        "Quality assurance",
        "Care instructions",
        "Warranty claims"
      ],
      availability: "24/7"
    },
    {
      title: "Order Assistance",
      description: "Track orders, manage deliveries, and handle return requests",
      features: [
        "Order tracking",
        "Delivery updates",
        "Return processing",
        "Refund status"
      ],
      availability: "Business Hours"
    },
    {
      title: "Account Management",
      description: "Manage your profile, preferences, and subscription settings",
      features: [
        "Profile updates",
        "Communication preferences",
        "Subscription management",
        "Password reset"
      ],
      availability: "Self-service + Support"
    },
    {
      title: "Technical Support",
      description: "Website issues, mobile app problems, and technical troubleshooting",
      features: [
        "Website navigation",
        "Mobile app support",
        "Browser compatibility",
        "Feature explanations"
      ],
      availability: "Business Hours"
    }
  ];

  return (
    <div className="min-h-screen py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Customer Care
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated support for all your needs - from product questions to technical assistance
          </p>
        </div>

        {/* Support Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {supportStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card shadow-card text-center">
              <CardContent className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-accent mb-1 md:mb-2">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Phone Support</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">Speak directly with our care team</p>
              <p className="font-semibold text-accent mb-4">+91 98765 43210</p>
              <Badge variant="secondary" className="text-xs">Available 9 AM - 6 PM</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">Instant messaging support</p>
              <Button className="mb-4 text-sm">Start Chat</Button>
              <Badge variant="secondary" className="text-xs">Usually responds in 2 minutes</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">Detailed assistance via email</p>
              <p className="font-semibold text-accent mb-4 text-sm md:text-base">care@yashasv.org</p>
              <Badge variant="secondary" className="text-xs">Response within 2 hours</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Care Services */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
            Our Care Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {careServices.map((service, index) => (
              <Card key={index} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">{service.availability}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm md:text-base">What we help with:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-xs md:text-sm text-muted-foreground flex items-center">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-accent mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Self-Service Resources */}
        <Card className="bg-gradient-warm">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center">Self-Service Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-background/60 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">FAQ Center</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Find quick answers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-background/60 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">User Guides</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Step-by-step help</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-background/60 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Order Tracking</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Track your orders</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-background/60 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Account Portal</h3>
                <p className="text-xs md:text-sm text-muted-foreground">Manage your account</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction Guarantee */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-gradient-hero rounded-lg p-6 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-4">
              100% Satisfaction Guarantee
            </h2>
            <p className="text-sm md:text-base text-primary-foreground/90 mb-6">
              We're committed to providing exceptional customer care. If you're not completely satisfied with our support, we'll make it right.
            </p>
            <Button variant="outline" className="bg-white/20 backdrop-blur-sm border border-white/30 text-primary-foreground hover:bg-white/30">
              Share Your Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;