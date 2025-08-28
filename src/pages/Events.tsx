import { Calendar, MapPin, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const events = [
    {
      year: "2021",
      title: "Sandalwood Awareness Drive",
      location: "Mandya & Mysuru Districts",
      participants: "500+ Farmers",
      description: "Comprehensive awareness campaign across Mandya and Mysuru districts educating farmers about legal rights for private sandalwood cultivation and sustainable farming practices.",
      achievements: [
        "Reached 500+ sandalwood farmers",
        "Distributed legal documentation guides",
        "Established farmer support network",
        "Created awareness about government policies"
      ],
      status: "completed"
    },
    {
      year: "2022",
      title: "From Tree to Treasure Workshop",
      location: "Bangalore & Rural Karnataka",
      participants: "150+ Artisans",
      description: "Intensive workshop series training rural artisans in traditional sandalwood crafting techniques, modern finishing methods, and business skills for sustainable livelihoods.",
      achievements: [
        "Trained 150+ rural artisans",
        "Introduced modern tools and techniques",
        "Created artisan certification program",
        "Established craft quality standards"
      ],
      status: "completed"
    },
    {
      year: "2023",
      title: "AYUSH Collaboration Initiative",
      location: "Karnataka State",
      participants: "200+ Stakeholders",
      description: "Strategic collaboration with AYUSH ministry to promote sandalwood oil in wellness and traditional medicine, creating new market opportunities for farmers.",
      achievements: [
        "Partnership with AYUSH ministry",
        "Wellness product certification",
        "New market channels established",
        "Traditional medicine applications documented"
      ],
      status: "completed"
    },
    {
      year: "2024",
      title: "Know Your Sandalwood Rights Campaign",
      location: "Across Karnataka",
      participants: "1000+ Beneficiaries",
      description: "State-wide legal awareness campaign helping farmers understand their rights, documentation requirements, and legal processes for sandalwood cultivation and trade.",
      achievements: [
        "1000+ farmers educated on legal rights",
        "Legal documentation workshops",
        "Government liaison support",
        "Rights awareness materials distributed"
      ],
      status: "completed"
    },
    {
      year: "2025",
      title: "Sandalwood Craft Exhibition",
      location: "Bangalore Exhibition Center",
      participants: "50+ Farmer Artisans",
      description: "Grand exhibition showcasing the finest sandalwood crafts from 50+ farmer artisans, connecting them directly with customers and highlighting Karnataka's rich sandalwood heritage.",
      achievements: [
        "50+ farmer artisans participation",
        "Direct customer connections",
        "Heritage craft showcase",
        "Media coverage and recognition"
      ],
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Events & Initiatives
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our journey of empowering farmers, preserving traditions, and building a sustainable sandalwood ecosystem across Karnataka
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent"></div>

          {events.map((event, index) => (
            <div key={event.year} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-hero rounded-full border-4 border-background flex items-center justify-center z-10">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <Card className="bg-gradient-card shadow-card hover:shadow-warm transition-smooth">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={event.status === 'completed' ? 'default' : 'secondary'} className="text-sm">
                        {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </Badge>
                      <span className="text-2xl font-bold text-accent">{event.year}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-4">{event.title}</h3>
                    <p className="text-muted-foreground mb-6">{event.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-accent" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 text-accent" />
                        {event.participants}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-accent" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {event.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Summary */}
        <section className="mt-20 bg-gradient-warm rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Cumulative Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2000+</div>
              <div className="text-muted-foreground">Farmers Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">300+</div>
              <div className="text-muted-foreground">Artisans Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Workshops Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Districts Covered</div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Teaser */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">What's Next?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're continuously planning new initiatives to support our farming community and preserve sandalwood heritage. Stay connected to be part of our upcoming events.
          </p>
          <div className="bg-gradient-hero rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-primary-foreground mb-4">2025 & Beyond</h3>
            <p className="text-primary-foreground/90">
              Expanding our reach to more districts, launching online training programs, and creating sustainable market linkages for all sandalwood farmers in Karnataka.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;