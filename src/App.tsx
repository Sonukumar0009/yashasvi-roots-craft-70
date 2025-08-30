// src/App.tsx
import { Routes, Route } from "react-router-dom";

import AmazonStyleHeader from "./components/AmazonStyleHeader";
import Footer from "./components/Footer";
import FloatingScrollButtons from "./components/FloatingScrollButtons";

import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import Significance from "./pages/Significance";
import AnnualCampaigns from "./pages/AnnualCampaigns";
import Products from "./pages/Products";
import Events from "./pages/Events";
import Portfolio from "./pages/Portfolio";
import SupportTheCause from "./pages/SupportTheCause";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import CustomerSupport from "./pages/CustomerSupport";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Cart from "./pages/Cart";
import About from "./pages/About";
import SeekingAssistance from "./pages/SeekingAssistance";
import CustomerCare from "./pages/CustomerCare";
import TicketRaising from "./pages/TicketRaising";
import CustomSculptureRequest from "./pages/CustomSculptureRequest";
import Region from "./pages/Region";
import EmployeeRegionLogin from "./pages/EmployeeRegionLogin";
import EmployeeRegionSignup from "./pages/EmployeeRegionSignup";
import Login from "./pages/Login";
import PayButton from "./components/PayButton";

import ProtectedRoute from "./auth/ProtectedRoute";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AmazonStyleHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pay" element={<PayButton />} />

          <Route path="/about" element={<About />} />
          <Route path="/region" element={<Region />} />
          <Route path="/employee-login/:region" element={<EmployeeRegionLogin />} />
          <Route path="/employee-signup/:region" element={<EmployeeRegionSignup />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />

          {/* Public pages */}
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/significance" element={<Significance />} />
          <Route path="/annual-campaigns" element={<AnnualCampaigns />} />
          <Route path="/products" element={<Products />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/events" element={<Events />} />
          <Route path="/support" element={<SupportTheCause />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Cart & Checkout */}
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
       
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

          {/* Help / Misc */}
          <Route path="/seeking-assistance" element={<SeekingAssistance />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/ticket-raising" element={<TicketRaising />} />
          <Route path="/custom-sculpture" element={<CustomSculptureRequest />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingScrollButtons />
    </div>
  );
};

export default App;
