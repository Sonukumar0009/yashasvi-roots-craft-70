import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingScrollButtons = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setScrollPosition(currentScrollY);
      setIsAtTop(currentScrollY <= 50); // Consider top if within 50px
      setIsAtBottom(currentScrollY + windowHeight >= documentHeight - 50); // Consider bottom if within 50px
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Don't render if page is too short to scroll
  if (document.documentElement.scrollHeight <= window.innerHeight + 100) {
    return null;
  }

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
      {/* Scroll to Top Button */}
      {!isAtTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-primary hover:bg-white/30 hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}

      {/* Scroll to Bottom Button */}
      {!isAtBottom && (
        <Button
          onClick={scrollToBottom}
          size="icon"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-primary hover:bg-white/30 hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default FloatingScrollButtons;