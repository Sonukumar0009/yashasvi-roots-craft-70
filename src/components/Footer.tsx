import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Yashasv Charitable Trust</h3>
            <p className="text-primary-foreground/80 mb-4">
              Rooted in love, carved with care – bringing farmer-grown sandalwood to the world.
            </p>
            <p className="text-sm text-primary-foreground/60 italic">
              "Every tree planted is a life remembered."
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="/our-story" className="hover:text-primary-foreground transition-smooth">Our Story</a></li>
              <li><a href="/annual-campaigns" className="hover:text-primary-foreground transition-smooth">Annual Campaigns</a></li>
              <li><a href="/products" className="hover:text-primary-foreground transition-smooth">Products</a></li>
              <li><a href="/events" className="hover:text-primary-foreground transition-smooth">Events</a></li>
              <li><a href="/support" className="hover:text-primary-foreground transition-smooth">Support the Cause</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/60">
              WhatsApp orders: +91 XXXXX XXXXX
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2025 Yashasv Charitable Trust. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;