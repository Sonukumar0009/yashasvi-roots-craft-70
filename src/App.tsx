import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingScrollButtons from "./components/FloatingScrollButtons";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Significance from "./pages/Significance";
import AnnualCampaigns from "./pages/AnnualCampaigns";
import Products from "./pages/Products";
import Events from "./pages/Events";
import SupportTheCause from "./pages/SupportTheCause";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Donate from "./pages/Donate";
import CustomerSupport from "./pages/CustomerSupport";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/significance" element={<Significance />} />
                <Route path="/annual-campaigns" element={<AnnualCampaigns />} />
                <Route path="/products" element={<Products />} />
                <Route path="/events" element={<Events />} />
                <Route path="/support" element={<SupportTheCause />} />
                <Route path="/customer-support" element={<CustomerSupport />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingScrollButtons />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
