import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Portfolio = () => {
  const [currentTrustMember, setCurrentTrustMember] = useState(0);
  const [currentAmbassador, setCurrentAmbassador] = useState(0);
  const isMobile = useIsMobile();
  const trustContainerRef = useRef<HTMLDivElement>(null);
  const ambassadorContainerRef = useRef<HTMLDivElement>(null);

  const trustMembers = [
    {
      name: "Member 1",
      role: "Trustee",
      image: "/lovable-uploads/placeholder-person.jpg",
      description: "Dedicated to preserving sandalwood heritage"
    },
    {
      name: "Member 2", 
      role: "Secretary",
      image: "/lovable-uploads/placeholder-person.jpg",
      description: "Leading conservation efforts"
    },
    {
      name: "Member 3",
      role: "Treasurer", 
      image: "/lovable-uploads/placeholder-person.jpg",
      description: "Managing trust resources"
    }
  ];

  const brandAmbassadors = [
    {
      name: "Dr. H.S. Anantha Padmanabha",
      role: "Chief Brand Ambassador",
      image: "/lovable-uploads/77384e40-7b9d-4695-936d-1d553625ac96.png",
      description: "Dr. H.S. Anantha Padmanabha is a distinguished Indian scientist with over 50 years of experience in sandalwood, specializing in research, cultivation, and management of the species."
    }
  ];

  const nextTrustMember = () => {
    setCurrentTrustMember((prev) => (prev + 1) % trustMembers.length);
  };

  const prevTrustMember = () => {
    setCurrentTrustMember((prev) => (prev - 1 + trustMembers.length) % trustMembers.length);
  };

  const nextAmbassador = () => {
    setCurrentAmbassador((prev) => (prev + 1) % brandAmbassadors.length);
  };

  const prevAmbassador = () => {
    setCurrentAmbassador((prev) => (prev - 1 + brandAmbassadors.length) % brandAmbassadors.length);
  };

  // Touch handling for mobile/tablet
  useEffect(() => {
    const handleTouchNavigation = (containerRef: React.RefObject<HTMLDivElement>, nextFunction: () => void, prevFunction: () => void) => {
      if (!containerRef.current) return;
      
      let startX = 0;
      let startY = 0;
      let isSwiping = false;
      
      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = false;
      };
      
      const handleTouchMove = (e: TouchEvent) => {
        if (isSwiping) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(startX - currentX);
        const diffY = Math.abs(startY - currentY);
        
        // If horizontal movement is dominant, start swiping and prevent scroll
        if (diffX > diffY && diffX > 15) {
          isSwiping = true;
          e.preventDefault();
        }
      };
      
      const handleTouchEnd = (e: TouchEvent) => {
        if (!isSwiping) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Only trigger if horizontal swipe is significant
        if (Math.abs(diffX) > 80) {
          if (diffX > 0) {
            nextFunction(); // Swipe left - next card
          } else {
            prevFunction(); // Swipe right - previous card
          }
        }
        
        isSwiping = false;
      };
      
      const container = containerRef.current;
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    };
    
    const cleanupTrust = handleTouchNavigation(trustContainerRef, nextTrustMember, prevTrustMember);
    const cleanupAmbassador = handleTouchNavigation(ambassadorContainerRef, nextAmbassador, prevAmbassador);
    
    return () => {
      cleanupTrust?.();
      cleanupAmbassador?.();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our dedicated team members and distinguished brand ambassadors who champion our sandalwood conservation mission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Trust Members Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Trust Members</h2>
            <div 
              ref={trustContainerRef}
              className="relative h-96 flex justify-center items-center touch-none select-none cursor-grab active:cursor-grabbing"
            >
              {trustMembers.map((member, index) => (
                <Card 
                  key={index} 
                  className={`absolute w-72 bg-card border-border shadow-warm transition-all duration-500 ${
                    index === currentTrustMember 
                      ? 'z-30 scale-110 hover:scale-115' 
                      : index === (currentTrustMember + 1) % trustMembers.length 
                        ? 'z-20 scale-105' 
                        : 'z-10 scale-100'
                  }`}
                  style={{
                    transform: `rotate(${(index - currentTrustMember) * 8}deg) translateY(${(index - currentTrustMember) * 4}px)`,
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-hero">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgcj0iNjQiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI2NCIgY3k9IjUyIiByPSIyMCIgZmlsbD0iIzllYTNhOCIvPjxwYXRoIGQ9Ik0zMiA5NmMwLTE3LjY3MyAxNC4zMjctMzIgMzItMzJzMzIgMTQuMzI3IDMyIDMyIiBmaWxsPSIjOWVhM2E4Ii8+PC9zdmc+';
                        }}
                      />
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground">{member.name}</CardTitle>
                    <CardDescription className="text-accent font-medium text-sm">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
              
              {/* Navigation Buttons for Trust Members */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTrustMember}
                  className="rounded-full bg-background/80 hover:bg-background"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTrustMember}
                  className="rounded-full bg-background/80 hover:bg-background"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* Brand Ambassadors Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Brand Ambassadors</h2>
            <div 
              ref={ambassadorContainerRef}
              className="relative h-96 flex justify-center items-center touch-none select-none cursor-grab active:cursor-grabbing"
            >
              {brandAmbassadors.map((ambassador, index) => (
                <Card 
                  key={index} 
                  className={`absolute w-72 bg-card border-border shadow-warm transition-all duration-500 ${
                    index === currentAmbassador 
                      ? 'z-30 scale-110 hover:scale-115' 
                      : index === (currentAmbassador + 1) % brandAmbassadors.length 
                        ? 'z-20 scale-105' 
                        : 'z-10 scale-100'
                  }`}
                  style={{
                    transform: `rotate(${(index - currentAmbassador) * 10}deg) translateY(${(index - currentAmbassador) * 6}px)`,
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-hero">
                      <img 
                        src={ambassador.image} 
                        alt={ambassador.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iODAiIGN5PSI4MCIgcj0iODAiIGZpbGw9IiNmM2Y0ZjYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjY1IiByPSIyNSIgZmlsbD0iIzllYTNhOCIvPjxwYXRoIGQ9Ik00MCA4MDAiLz4KPC9zdmc+';
                        }}
                      />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{ambassador.name}</CardTitle>
                    <CardDescription className="text-accent font-medium">{ambassador.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm leading-relaxed">{ambassador.description}</p>
                  </CardContent>
                </Card>
              ))}
              
              {/* Navigation Buttons for Brand Ambassadors */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevAmbassador}
                  className="rounded-full bg-background/80 hover:bg-background"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextAmbassador}
                  className="rounded-full bg-background/80 hover:bg-background"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;