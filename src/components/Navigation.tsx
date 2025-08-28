import { useState } from "react";
import { Menu, X, User, ShoppingCart, BookOpen, Sparkles, Calendar, Store, Users, Heart, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/Cart";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Our Story", href: "/our-story", icon: BookOpen },
    { name: "Significance & Usage", href: "/significance", icon: Sparkles },
    { name: "Annual Campaigns", href: "/annual-campaigns", icon: Calendar },
    { name: "Our Store", href: "/products", icon: Store },
    { name: "Events", href: "/events", icon: Users },
    { name: "Support the Cause", href: "/support", icon: Heart },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-gradient-card shadow-warm sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-full"></div>
              <span className="text-xl font-bold text-primary">Yashasv Charitable Trust</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-smooth ${
                  item.name === "Contact"
                    ? "text-orange-400 bg-white/20 backdrop-blur-sm border border-orange-300/50 rounded-lg hover:bg-orange-100/30 shadow-lg shadow-orange-300/30 hover:shadow-orange-300/50"
                    : item.name === "Our Story"
                    ? "text-orange-500 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20"
                    : isActive(item.href)
                    ? "text-accent border-b-2 border-accent"
                    : "text-foreground hover:text-accent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Cart and User Actions */}
            <div className="flex items-center space-x-3 ml-4 border-l pl-4">
              <CartSheet />
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/donate">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Donate
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center space-x-2">
            <CartSheet />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 text-base font-medium transition-smooth ${
                    item.name === "Contact"
                      ? "text-orange-400 bg-white/20 backdrop-blur-sm border border-orange-300/50 rounded-lg hover:bg-orange-100/30 shadow-lg shadow-orange-300/30"
                      : isActive(item.href)
                      ? "text-accent bg-secondary"
                      : "text-foreground hover:text-accent hover:bg-secondary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile User Actions */}
              <div className="border-t pt-3 mt-3 space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/donate" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-start bg-accent hover:bg-accent/90">
                    Donate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;