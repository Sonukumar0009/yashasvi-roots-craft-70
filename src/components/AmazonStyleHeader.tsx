import { useState, useEffect, useRef } from "react";
import { MapPin, ChevronDown, User, Heart, Users, ShoppingCart, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabaseClient";

const AmazonStyleHeader = () => {
  const [selectedLocation, setSelectedLocation] = useState("Bengaluru");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [autoScrollIndex, setAutoScrollIndex] = useState(0);
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showRegion, setShowRegion] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  // ——— Auth: get current session + listen for changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    // navigate('/'); // optional
  };

  // Keep existing scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll for mobile and tablet
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;
    
    let interval: NodeJS.Timeout;
    let touchPauseTimeout: NodeJS.Timeout;
    let isUserTouching = false;
    let isPaused = false;

    const navItems = [
      "Store", "Our Story", "Significance", "Campaigns", "Events", 
      "Portfolio", "Support", "Contact", "Custom Sculpture Request"
    ];

    const startAutoScroll = () => {
      if (isPaused || isUserTouching) return;
      
      interval = setInterval(() => {
        if (isPaused || isUserTouching) return;
        
        setAutoScrollIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % navItems.length;
          
          if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const itemWidth = container.scrollWidth / navItems.length;
            container.scrollTo({
              left: itemWidth * nextIndex,
              behavior: 'smooth'
            });
          }
          
          return nextIndex;
        });
      }, 2000); // 2 second delay
    };

    const handleTouchStart = () => {
      isUserTouching = true;
      clearInterval(interval);
      clearTimeout(touchPauseTimeout);
    };

    const handleTouchEnd = () => {
      isUserTouching = false;
      isPaused = true;
      
      // Resume auto-scroll after 5 seconds
      touchPauseTimeout = setTimeout(() => {
        isPaused = false;
        startAutoScroll();
      }, 5000);
    };

    // Add touch event listeners
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    // Start initial auto-scroll
    startAutoScroll();

    return () => {
      clearInterval(interval);
      clearTimeout(touchPauseTimeout);
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile]);

  const locations = [
    "Bengaluru",
    "Mumbai", 
    "Delhi",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad"
  ];

  // Helpers for logged-in trigger badge
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    (user?.email ? user.email.split("@")[0] : "Account");
  const initials = (displayName || "A")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50 no-print">
        {/* Main Header */}
        <div className="bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-hero rounded-full"></div>
                <span className="text-sm sm:text-lg font-bold">Yashasv</span>
                <span className="text-xs sm:text-sm hidden md:block">.charitable.trust</span>
              </Link>

              {/* Location Selector */}
              <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors text-left">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <div className="hidden sm:block">
                      <div className="text-xs opacity-80">Serving in</div>
                      <div className="text-xs sm:text-sm font-medium flex items-center">
                        {selectedLocation} <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
                      </div>
                    </div>
                    {/* Mobile - show just the location name */}
                    <div className="block sm:hidden">
                      <div className="text-xs font-medium flex items-center">
                        {selectedLocation.slice(0, 3)} <ChevronDown className="w-2 h-2 ml-1" />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 bg-background border border-border shadow-lg z-50">
                  <div className="text-sm font-medium mb-2">Choose your location</div>
                  <div className="space-y-1">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-accent transition-colors ${
                          selectedLocation === location ? "bg-accent font-medium" : ""
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Search Icon for Mobile and Tablet */}
              <div className="block lg:hidden">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 rounded hover:bg-primary/80 transition-colors">
                      <Search className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3 bg-background border border-border shadow-lg z-50" align="center">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search initiatives, programs..."
                        className="w-full pl-4 pr-10 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                      />
                      <button className="absolute right-0 top-0 h-full px-3 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
                        <Search className="w-4 h-4 text-accent-foreground" />
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden lg:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search our initiatives, programs, reports..."
                    className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-1.5 sm:py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                  <button className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4 text-accent-foreground" />
                  </button>
                </div>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">

                {/* Volunteer Button */}
                <Link to="/volunteer">
                  <Button variant="outline" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent h-7 sm:h-8 px-1.5 sm:px-2 md:px-3">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 md:mr-1" />
                    <span className="hidden md:inline text-xs sm:text-sm">Volunteer</span>
                  </Button>
                </Link>

                {/* Account Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {user ? (
                      // Logged-in: compact user chip
                      <button className="flex items-center gap-2 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
                        <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                          {initials}
                        </div>
                      </button>
                    ) : (
                      // Logged-out: original trigger
                      <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <div className="hidden lg:block text-left">
                          <div className="text-xs opacity-80">Hello, Sign in</div>
                          <div className="text-xs sm:text-sm font-medium flex items-center">
                            Account & Impact <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
                          </div>
                        </div>
                      </button>
                    )}
                  </DropdownMenuTrigger>
                  
                  {user ? (
                    // Logged-in small card (Orders + Sign out)
                    <DropdownMenuContent className="w-72 p-0" align="end">
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{displayName}</div>
                            <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-2">
                          <Link to="/orders">
                            <Button variant="outline" className="w-full">My Orders</Button>
                          </Link>
                          <Button variant="destructive" className="w-full" onClick={handleLogout}>
                            Sign out
                          </Button>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  ) : (
                    // Your existing logged-out content
                    <DropdownMenuContent className="w-80 p-0 max-h-96 overflow-y-auto" align="end">
                      <div className="p-4 border-b">
                        <div className="flex gap-3">
                          <Link to="/login" className="flex-1">
                            <Button className="w-full bg-accent hover:bg-accent/90">
                              Sign In
                            </Button>
                          </Link>
                          <Link to="/register" className="flex-1">
                            <Button variant="outline" className="w-full">
                              New? Register
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <div className="p-2">
                        <div className="grid grid-cols-2 gap-1">
                          {/* Your Contributions */}
                          <div>
                            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
                              Your Contributions
                            </DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link to="/volunteer-hours" className="text-sm">Volunteer Hours Logged</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/sponsorships" className="text-sm">Sponsored Children / Projects</Link>
                            </DropdownMenuItem>
                          </div>

                          {/* Your Account */}
                          <div>
                            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
                              Your Account
                            </DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link to="/profile" className="text-sm">My Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/preferences" className="text-sm">Communication Preferences</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/tax-receipts" className="text-sm">Tax Receipts & Certificates</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/transparency" className="text-sm">Transparency Reports</Link>
                            </DropdownMenuItem>
                          </div>
                        </div>

                        <DropdownMenuSeparator />

                        <div className="grid grid-cols-2 gap-1">
                          {/* Get Involved */}
                          <div>
                            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
                              Get Involved
                            </DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link to="/become-volunteer" className="text-sm">Become a Volunteer</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/partner" className="text-sm">Partner with Us (CSR)</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/sponsor-program" className="text-sm">Sponsor a Program</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/fundraising" className="text-sm">Fundraising Campaigns</Link>
                            </DropdownMenuItem>
                          </div>

                          {/* Help Center */}
                          <div>
                            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
                              Help Center
                            </DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link to="/seeking-assistance" className="text-sm">Seeking Assistance</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/customer-care" className="text-sm">Customer Care</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/ticket-raising" className="text-sm">Ticket Raising</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to="/guides" className="text-sm">Awareness Guides & eBooks</Link>
                            </DropdownMenuItem>
                          </div>
                        </div>

                        <DropdownMenuSeparator />
                        
                        <div>
                          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
                            Digital Resources
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            className="text-sm cursor-pointer"
                            onSelect={(e) => {
                              e.preventDefault();            // keep dropdown open
                              setShowRegion((s) => !s);      // toggle Region button
                            }}
                          >
                            Employee login
                          </DropdownMenuItem>

                          {/* Region button appears here */}
                          {showRegion && (
                            <div className="px-3 py-2">
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate('/region')}
                              >
                                Select Region
                              </Button>
                            </div>
                          )}
                          <DropdownMenuItem asChild>
                            <Link to="/videos" className="text-sm">Video Library</Link>
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem asChild>
                            <Link to="/research" className="text-sm">Research Papers & Reports</Link>
                          </DropdownMenuItem>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>

                {/* Cart */}
                <Link to="/cart" className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline md:hidden lg:inline">Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation Bar */}
        <div className="bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div 
              ref={scrollContainerRef}
              className="flex items-center h-8 sm:h-10 space-x-3 sm:space-x-6 text-xs sm:text-sm overflow-x-auto scrollbar-hide"
            >
              <Link to="/products" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
                Store
              </Link>
              <Link to="/our-story" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Our Story
              </Link>
              <Link to="/significance" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Significance
              </Link>
              <Link to="/annual-campaigns" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Campaigns
              </Link>
              <Link to="/events" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Events
              </Link>
              <Link to="/portfolio" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Portfolio
              </Link>
              <Link to="/support" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Support
              </Link>
              <Link to="/contact" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Contact
              </Link>
              <Link to="/products#custom-sculpture-section" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
                Custom Sculpture Request
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AmazonStyleHeader;

// import { useState, useEffect, useRef } from "react";
// import { MapPin, ChevronDown, User, Users, ShoppingCart, Search } from "lucide-react";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabaseClient"; // ← add this
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// const AmazonStyleHeader = () => {
//   const [selectedLocation, setSelectedLocation] = useState("Bengaluru");
//   const [isLocationOpen, setIsLocationOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [autoScrollIndex, setAutoScrollIndex] = useState(0);
//   const [showRegion, setShowRegion] = useState(false);
//   const [user, setUser] = useState<null | any>(null); // ← track auth user
//   const isMobile = useIsMobile();
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   // --- auth wiring: check once + listen for changes
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data.session?.user ?? null);
//     });
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });
//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     // optional: navigate to home
//     // navigate('/');
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 100);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (!isMobile || !scrollContainerRef.current) return;
//     let interval: NodeJS.Timeout;
//     let touchPauseTimeout: NodeJS.Timeout;
//     let isUserTouching = false;
//     let isPaused = false;

//     const navItems = [
//       "Store","Our Story","Significance","Campaigns","Events",
//       "Portfolio","Support","Contact","Custom Sculpture Request",
//     ];

//     const startAutoScroll = () => {
//       if (isPaused || isUserTouching) return;
//       interval = setInterval(() => {
//         if (isPaused || isUserTouching) return;
//         setAutoScrollIndex((prev) => {
//           const next = (prev + 1) % navItems.length;
//           const container = scrollContainerRef.current!;
//           const itemWidth = container.scrollWidth / navItems.length;
//           container.scrollTo({ left: itemWidth * next, behavior: "smooth" });
//           return next;
//         });
//       }, 2000);
//     };

//     const handleTouchStart = () => { isUserTouching = true; clearInterval(interval); clearTimeout(touchPauseTimeout); };
//     const handleTouchEnd = () => {
//       isUserTouching = false; isPaused = true;
//       touchPauseTimeout = setTimeout(() => { isPaused = false; startAutoScroll(); }, 5000);
//     };

//     const container = scrollContainerRef.current;
//     container.addEventListener("touchstart", handleTouchStart, { passive: true });
//     container.addEventListener("touchend", handleTouchEnd, { passive: true });
//     startAutoScroll();

//     return () => {
//       clearInterval(interval);
//       clearTimeout(touchPauseTimeout);
//       container.removeEventListener("touchstart", handleTouchStart);
//       container.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [isMobile]);

//   const locations = ["Bengaluru","Mumbai","Delhi","Chennai","Kolkata","Hyderabad","Pune","Ahmedabad"];

//   // small helpers for display
//   const displayName =
//     user?.user_metadata?.full_name ||
//     user?.user_metadata?.name ||
//     (user?.email ? user.email.split("@")[0] : "Account");
//   const initials = (displayName || "A")
//     .split(" ")
//     .map((w: string) => w[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

//   return (
//     <header className="bg-card border-b border-border sticky top-0 z-50">
//       {/* Main Header */}
//       <div className="bg-primary text-primary-foreground">
//         <div className="max-w-7xl mx-auto px-2 sm:px-4">
//           <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
//             {/* Logo */}
//             <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
//               <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-hero rounded-full" />
//               <span className="text-sm sm:text-lg font-bold">Yashasv</span>
//               <span className="text-xs sm:text-sm hidden md:block">.charitable.trust</span>
//             </Link>

//             {/* Location */}
//             <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
//               <PopoverTrigger asChild>
//                 <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors text-left">
//                   <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <div className="hidden sm:block">
//                     <div className="text-xs opacity-80">Serving in</div>
//                     <div className="text-xs sm:text-sm font-medium flex items-center">
//                       {selectedLocation} <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
//                     </div>
//                   </div>
//                   <div className="block sm:hidden">
//                     <div className="text-xs font-medium flex items-center">
//                       {selectedLocation.slice(0, 3)} <ChevronDown className="w-2 h-2 ml-1" />
//                     </div>
//                   </div>
//                 </button>
//               </PopoverTrigger>
//               <PopoverContent className="w-56 p-2 bg-background border border-border shadow-lg z-50">
//                 <div className="text-sm font-medium mb-2">Choose your location</div>
//                 <div className="space-y-1">
//                   {locations.map((location) => (
//                     <button
//                       key={location}
//                       onClick={() => { setSelectedLocation(location); setIsLocationOpen(false); }}
//                       className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-accent transition-colors ${
//                         selectedLocation === location ? "bg-accent font-medium" : ""
//                       }`}
//                     >
//                       {location}
//                     </button>
//                   ))}
//                 </div>
//               </PopoverContent>
//             </Popover>

//             {/* Mobile search */}
//             <div className="block lg:hidden">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <button className="p-2 rounded hover:bg-primary/80 transition-colors">
//                     <Search className="w-4 h-4 text-primary-foreground" />
//                   </button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80 p-3 bg-background border border-border shadow-lg z-50" align="center">
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search initiatives, programs..."
//                       className="w-full pl-4 pr-10 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
//                     />
//                     <button className="absolute right-0 top-0 h-full px-3 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
//                       <Search className="w-4 h-4 text-accent-foreground" />
//                     </button>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             </div>

//             {/* Desktop search */}
//             <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden lg:block">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search our initiatives, programs, reports..."
//                   className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-1.5 sm:py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
//                 />
//                 <button className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
//                   <Search className="w-3 h-3 sm:w-4 sm:h-4 text-accent-foreground" />
//                 </button>
//               </div>
//             </div>

//             {/* Right side */}
//             <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
//               {/* Volunteer */}
//               <Link to="/volunteer">
//                 <Button variant="outline" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent h-7 sm:h-8 px-1.5 sm:px-2 md:px-3">
//                   <Users className="w-3 h-3 sm:w-4 sm:h-4 md:mr-1" />
//                   <span className="hidden md:inline text-xs sm:text-sm">Volunteer</span>
//                 </Button>
//               </Link>

//               {/* Account / User */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   {user ? (
//                     // Logged-in trigger: just a circular user chip
//                     <button className="flex items-center gap-2 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
//                       <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
//                         {initials}
//                       </div>
//                     </button>
//                   ) : (
//                     // Logged-out trigger: text like Amazon
//                     <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
//                       <User className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <div className="hidden lg:block text-left">
//                         <div className="text-xs opacity-80">Hello, Sign in</div>
//                         <div className="text-xs sm:text-sm font-medium flex items-center">
//                           Account &amp; Impact <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
//                         </div>
//                       </div>
//                     </button>
//                   )}
//                 </DropdownMenuTrigger>

//                 {/* Dropdown content changes based on auth */}
//                 {user ? (
//                   <DropdownMenuContent className="w-72 p-0" align="end">
//                     <div className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
//                           {initials}
//                         </div>
//                         <div className="min-w-0">
//                           <div className="font-medium truncate">{displayName}</div>
//                           <div className="text-xs text-muted-foreground truncate">{user.email}</div>
//                         </div>
//                       </div>

//                       <div className="mt-4 grid gap-2">
//                         <Link to="/orders">
//                           <Button variant="outline" className="w-full">My Orders</Button>
//                         </Link>
//                         <Button variant="destructive" className="w-full" onClick={handleLogout}>
//                           Sign out
//                         </Button>
//                       </div>
//                     </div>

//                     <DropdownMenuSeparator />
//                     <div className="px-4 py-2">
//                       <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-0">
//                         Quick Links
//                       </DropdownMenuLabel>
//                       <div className="grid grid-cols-2 gap-1 mt-1">
//                         <DropdownMenuItem asChild><Link to="/profile" className="text-sm">Profile</Link></DropdownMenuItem>
//                         <DropdownMenuItem asChild><Link to="/tax-receipts" className="text-sm">Tax Receipts</Link></DropdownMenuItem>
//                       </div>
//                     </div>
//                   </DropdownMenuContent>
//                 ) : (
//                   <DropdownMenuContent className="w-80 p-0 max-h-96 overflow-y-auto" align="end">
//                     <div className="p-4 border-b">
//                       <div className="flex gap-3">
//                         <Link to="/login" className="flex-1">
//                           <Button className="w-full bg-accent hover:bg-accent/90">Sign In</Button>
//                         </Link>
//                         <Link to="/register" className="flex-1">
//                           <Button variant="outline" className="w-full">New? Register</Button>
//                         </Link>
//                       </div>
//                     </div>
//                     {/* ... keep your existing logged-out sections here ... */}
//                   </DropdownMenuContent>
//                 )}
//               </DropdownMenu>

//               {/* Cart */}
//               <Link to="/cart" className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
//                 <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span className="text-xs sm:text-sm font-medium hidden sm:inline md:hidden lg:inline">Cart</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Secondary Nav */}
//       <div className="bg-background border-t border-border">
//         <div className="max-w-7xl mx-auto px-2 sm:px-4">
//           <div
//             ref={scrollContainerRef}
//             className="flex items-center h-8 sm:h-10 space-x-3 sm:space-x-6 text-xs sm:text-sm overflow-x-auto scrollbar-hide"
//           >
//             <Link to="/products" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
//               Store
//             </Link>
//             <Link to="/our-story" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//               Our Story
//             </Link>
//             <Link to="/significance" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//               Significance
//             </Link>
//             <Link to="/annual-campaigns" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//               Campaigns
//             </Link>
//             <Link to="/events" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//               Events
//             </Link>
//             <Link to="/portfolio" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//               Portfolio
//             </Link>
//             <Link to="/support" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//               Support
//             </Link>
//             <Link to="/contact" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//               Contact
//             </Link>
//             <Link to="/products#custom-sculpture-section" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
//               Custom Sculpture Request
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AmazonStyleHeader;

//monu2
// import { useState, useEffect, useRef } from "react";
// import { MapPin, ChevronDown, User, Heart, Users, ShoppingCart, Search } from "lucide-react";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";


// const AmazonStyleHeader = () => {
//   const [selectedLocation, setSelectedLocation] = useState("Bengaluru");
//   const [isLocationOpen, setIsLocationOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [autoScrollIndex, setAutoScrollIndex] = useState(0);
//   const isMobile = useIsMobile();
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const [showRegion, setShowRegion] = useState(false); 
//   const navigate = useNavigate();
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolled = window.scrollY > 100;
//       setIsScrolled(scrolled);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-scroll for mobile and tablet
//   useEffect(() => {
//     if (!isMobile || !scrollContainerRef.current) return;
    
//     let interval: NodeJS.Timeout;
//     let touchPauseTimeout: NodeJS.Timeout;
//     let isUserTouching = false;
//     let isPaused = false;

//     const navItems = [
//       "Store", "Our Story", "Significance", "Campaigns", "Events", 
//       "Portfolio", "Support", "Contact", "Custom Sculpture Request"
//     ];

//     const startAutoScroll = () => {
//       if (isPaused || isUserTouching) return;
      
//       interval = setInterval(() => {
//         if (isPaused || isUserTouching) return;
        
//         setAutoScrollIndex((prevIndex) => {
//           const nextIndex = (prevIndex + 1) % navItems.length;
          
//           if (scrollContainerRef.current) {
//             const container = scrollContainerRef.current;
//             const itemWidth = container.scrollWidth / navItems.length;
//             container.scrollTo({
//               left: itemWidth * nextIndex,
//               behavior: 'smooth'
//             });
//           }
          
//           return nextIndex;
//         });
//       }, 2000); // 2 second delay
//     };

//     const handleTouchStart = () => {
//       isUserTouching = true;
//       clearInterval(interval);
//       clearTimeout(touchPauseTimeout);
//     };

//     const handleTouchEnd = () => {
//       isUserTouching = false;
//       isPaused = true;
      
//       // Resume auto-scroll after 5 seconds
//       touchPauseTimeout = setTimeout(() => {
//         isPaused = false;
//         startAutoScroll();
//       }, 5000);
//     };

//     // Add touch event listeners
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('touchstart', handleTouchStart, { passive: true });
//       container.addEventListener('touchend', handleTouchEnd, { passive: true });
//     }

//     // Start initial auto-scroll
//     startAutoScroll();

//     return () => {
//       clearInterval(interval);
//       clearTimeout(touchPauseTimeout);
//       if (container) {
//         container.removeEventListener('touchstart', handleTouchStart);
//         container.removeEventListener('touchend', handleTouchEnd);
//       }
//     };
//   }, [isMobile]);

//   const locations = [
//     "Bengaluru",
//     "Mumbai", 
//     "Delhi",
//     "Chennai",
//     "Kolkata",
//     "Hyderabad",
//     "Pune",
//     "Ahmedabad"
//   ];

//   return (
//     <>
//       <header className="bg-card border-b border-border sticky top-0 z-50">
//         {/* Main Header */}
//         <div className="bg-primary text-primary-foreground">
//           <div className="max-w-7xl mx-auto px-2 sm:px-4">
//             <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
//               {/* Logo */}
//               <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
//                 <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-hero rounded-full"></div>
//                 <span className="text-sm sm:text-lg font-bold">Yashasv</span>
//                 <span className="text-xs sm:text-sm hidden md:block">.charitable.trust</span>
//               </Link>

//               {/* Location Selector */}
//               <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
//                 <PopoverTrigger asChild>
//                   <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors text-left">
//                     <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <div className="hidden sm:block">
//                       <div className="text-xs opacity-80">Serving in</div>
//                       <div className="text-xs sm:text-sm font-medium flex items-center">
//                         {selectedLocation} <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
//                       </div>
//                     </div>
//                     {/* Mobile - show just the location name */}
//                     <div className="block sm:hidden">
//                       <div className="text-xs font-medium flex items-center">
//                         {selectedLocation.slice(0, 3)} <ChevronDown className="w-2 h-2 ml-1" />
//                       </div>
//                     </div>
//                   </button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-56 p-2 bg-background border border-border shadow-lg z-50">
//                   <div className="text-sm font-medium mb-2">Choose your location</div>
//                   <div className="space-y-1">
//                     {locations.map((location) => (
//                       <button
//                         key={location}
//                         onClick={() => {
//                           setSelectedLocation(location);
//                           setIsLocationOpen(false);
//                         }}
//                         className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-accent transition-colors ${
//                           selectedLocation === location ? "bg-accent font-medium" : ""
//                         }`}
//                       >
//                         {location}
//                       </button>
//                     ))}
//                   </div>
//                 </PopoverContent>
//               </Popover>

//               {/* Search Icon for Mobile and Tablet */}
//               <div className="block lg:hidden">
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <button className="p-2 rounded hover:bg-primary/80 transition-colors">
//                       <Search className="w-4 h-4 text-primary-foreground" />
//                     </button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-80 p-3 bg-background border border-border shadow-lg z-50" align="center">
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="Search initiatives, programs..."
//                         className="w-full pl-4 pr-10 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
//                       />
//                       <button className="absolute right-0 top-0 h-full px-3 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
//                         <Search className="w-4 h-4 text-accent-foreground" />
//                       </button>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               {/* Search Bar */}
//               <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden lg:block">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search our initiatives, programs, reports..."
//                     className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-1.5 sm:py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
//                   />
//                   <button className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
//                     <Search className="w-3 h-3 sm:w-4 sm:h-4 text-accent-foreground" />
//                   </button>
//                 </div>
//               </div>


//               {/* Right Navigation */}
//               <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">

//                 {/* Volunteer Button */}
//                 <Link to="/volunteer">
//                   <Button variant="outline" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent h-7 sm:h-8 px-1.5 sm:px-2 md:px-3">
//                     <Users className="w-3 h-3 sm:w-4 sm:h-4 md:mr-1" />
//                     <span className="hidden md:inline text-xs sm:text-sm">Volunteer</span>
//                   </Button>
//                 </Link>

//                 {/* Account Dropdown */}
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
//                       <User className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <div className="hidden lg:block text-left">
//                         <div className="text-xs opacity-80">Hello, Sign in</div>
//                         <div className="text-xs sm:text-sm font-medium flex items-center">
//                           Account & Impact <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
//                         </div>
//                       </div>
//                     </button>
                 
//                   </DropdownMenuTrigger>
                  
//                   <DropdownMenuContent className="w-80 p-0 max-h-96 overflow-y-auto" align="end">
//                     <div className="p-4 border-b">
//                       <div className="flex gap-3">
//                         <Link to="/login" className="flex-1">
//                           <Button className="w-full bg-accent hover:bg-accent/90">
//                             Sign In
//                           </Button>
//                         </Link>
//                         <Link to="/register" className="flex-1">
//                           <Button variant="outline" className="w-full">
//                             New? Register
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>

//                     <div className="p-2">
//                       <div className="grid grid-cols-2 gap-1">
//                         {/* Your Contributions */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Your Contributions
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/volunteer-hours" className="text-sm">Volunteer Hours Logged</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/sponsorships" className="text-sm">Sponsored Children / Projects</Link>
//                           </DropdownMenuItem>
//                         </div>

//                         {/* Your Account */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Your Account
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/profile" className="text-sm">My Profile</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/preferences" className="text-sm">Communication Preferences</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/tax-receipts" className="text-sm">Tax Receipts & Certificates</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/transparency" className="text-sm">Transparency Reports</Link>
//                           </DropdownMenuItem>
//                         </div>
//                       </div>

//                       <DropdownMenuSeparator />

//                       <div className="grid grid-cols-2 gap-1">
//                         {/* Get Involved */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Get Involved
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/become-volunteer" className="text-sm">Become a Volunteer</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/partner" className="text-sm">Partner with Us (CSR)</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/sponsor-program" className="text-sm">Sponsor a Program</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/fundraising" className="text-sm">Fundraising Campaigns</Link>
//                           </DropdownMenuItem>
//                         </div>

//                         {/* Help Center */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Help Center
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/seeking-assistance" className="text-sm">Seeking Assistance</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/customer-care" className="text-sm">Customer Care</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/ticket-raising" className="text-sm">Ticket Raising</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/guides" className="text-sm">Awareness Guides & eBooks</Link>
//                           </DropdownMenuItem>
//                         </div>
//                       </div>

//                       <DropdownMenuSeparator />
                      
//                       <div>
//                         <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                           Digital Resources
//                         </DropdownMenuLabel>
//                           {/* <DropdownMenuItem asChild>
//                           <Link to="/videos" className="text-sm">Employee login</Link>
//                         </DropdownMenuItem> */}
//                           <DropdownMenuItem
//                           className="text-sm cursor-pointer"
//                           onSelect={(e) => {
//                             e.preventDefault();            // keep dropdown open
//                             setShowRegion((s) => !s);      // toggle Region button
//                           }}
//                         >
//                           Employee login
//                         </DropdownMenuItem>

//                         {/* Region button appears here */}
//                         {showRegion && (
//                           <div className="px-3 py-2">
//                             <Button
//                               variant="outline"
//                               className="w-full"
//                               onClick={() => navigate('/region')} // optional: wire up navigation
//                             >
//                               Select Region
//                             </Button>
//                           </div>
//                         )}
//                         <DropdownMenuItem asChild>
//                           <Link to="/videos" className="text-sm">Video Library</Link>
//                         </DropdownMenuItem>
                        
//                         <DropdownMenuItem asChild>
//                           <Link to="/research" className="text-sm">Research Papers & Reports</Link>
//                         </DropdownMenuItem>
//                       </div>
//                     </div>
//                   </DropdownMenuContent>
//                 </DropdownMenu>

//                 {/* Cart */}
//                 <Link to="/cart" className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
//                   <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-xs sm:text-sm font-medium hidden sm:inline md:hidden lg:inline">Cart</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Secondary Navigation Bar */}
//         <div className="bg-background border-t border-border">
//           <div className="max-w-7xl mx-auto px-2 sm:px-4">
//             <div 
//               ref={scrollContainerRef}
//               className="flex items-center h-8 sm:h-10 space-x-3 sm:space-x-6 text-xs sm:text-sm overflow-x-auto scrollbar-hide"
//             >
//               <Link to="/products" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
//                 Store
//               </Link>
//               <Link to="/our-story" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Our Story
//               </Link>
//               <Link to="/significance" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Significance
//               </Link>
//               <Link to="/annual-campaigns" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Campaigns
//               </Link>
//               <Link to="/events" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Events
//               </Link>
//               <Link to="/portfolio" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Portfolio
//               </Link>
//               <Link to="/support" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Support
//               </Link>
//               <Link to="/contact" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Contact
//               </Link>
//               <Link to="/products#custom-sculpture-section" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
//                 Custom Sculpture Request
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default AmazonStyleHeader;

//monu 1


// import { useState, useEffect, useRef } from "react";
// import { MapPin, ChevronDown, User, Users, ShoppingCart, Search } from "lucide-react";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const AmazonStyleHeader = () => {
//   const [selectedLocation, setSelectedLocation] = useState("Bengaluru");
//   const [isLocationOpen, setIsLocationOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [autoScrollIndex, setAutoScrollIndex] = useState(0);
//   const [showRegion, setShowRegion] = useState(false); // NEW: controls Region button visibility

//   const isMobile = useIsMobile();
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolled = window.scrollY > 100;
//       setIsScrolled(scrolled);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Auto-scroll for mobile and tablet
//   useEffect(() => {
//     if (!isMobile || !scrollContainerRef.current) return;
    
//     let interval: NodeJS.Timeout;
//     let touchPauseTimeout: NodeJS.Timeout;
//     let isUserTouching = false;
//     let isPaused = false;

//     const navItems = [
//       "Store", "Our Story", "Significance", "Campaigns", "Events", 
//       "Portfolio", "Support", "Contact", "Custom Sculpture Request"
//     ];

//     const startAutoScroll = () => {
//       if (isPaused || isUserTouching) return;
      
//       interval = setInterval(() => {
//         if (isPaused || isUserTouching) return;
        
//         setAutoScrollIndex((prevIndex) => {
//           const nextIndex = (prevIndex + 1) % navItems.length;
          
//           if (scrollContainerRef.current) {
//             const container = scrollContainerRef.current;
//             const itemWidth = container.scrollWidth / navItems.length;
//             container.scrollTo({
//               left: itemWidth * nextIndex,
//               behavior: 'smooth'
//             });
//           }
          
//           return nextIndex;
//         });
//       }, 2000); // 2 second delay
//     };

//     const handleTouchStart = () => {
//       isUserTouching = true;
//       clearInterval(interval);
//       clearTimeout(touchPauseTimeout);
//     };

//     const handleTouchEnd = () => {
//       isUserTouching = false;
//       isPaused = true;
      
//       // Resume auto-scroll after 5 seconds
//       touchPauseTimeout = setTimeout(() => {
//         isPaused = false;
//         startAutoScroll();
//       }, 5000);
//     };

//     // Add touch event listeners
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('touchstart', handleTouchStart, { passive: true });
//       container.addEventListener('touchend', handleTouchEnd, { passive: true });
//     }

//     // Start initial auto-scroll
//     startAutoScroll();

//     return () => {
//       clearInterval(interval);
//       clearTimeout(touchPauseTimeout);
//       if (container) {
//         container.removeEventListener('touchstart', handleTouchStart);
//         container.removeEventListener('touchend', handleTouchEnd);
//       }
//     };
//   }, [isMobile]);

//   const locations = [
//     "Bengaluru",
//     "Mumbai", 
//     "Delhi",
//     "Chennai",
//     "Kolkata",
//     "Hyderabad",
//     "Pune",
//     "Ahmedabad"
//   ];

//   return (
//     <>
//       <header className="bg-card border-b border-border sticky top-0 z-50">
//         {/* Main Header */}
//         <div className="bg-primary text-primary-foreground">
//           <div className="max-w-7xl mx-auto px-2 sm:px-4">
//             <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
//               {/* Logo */}
//               <Link to="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
//                 <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-hero rounded-full"></div>
//                 <span className="text-sm sm:text-lg font-bold">Yashasv</span>
//                 <span className="text-xs sm:text-sm hidden md:block">.charitable.trust</span>
//               </Link>

//               {/* Location Selector */}
//               <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
//                 <PopoverTrigger asChild>
//                   <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors text-left">
//                     <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <div className="hidden sm:block">
//                       <div className="text-xs opacity-80">Serving in</div>
//                       <div className="text-xs sm:text-sm font-medium flex items-center">
//                         {selectedLocation} <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
//                       </div>
//                     </div>
//                     {/* Mobile - show just the location name */}
//                     <div className="block sm:hidden">
//                       <div className="text-xs font-medium flex items-center">
//                         {selectedLocation.slice(0, 3)} <ChevronDown className="w-2 h-2 ml-1" />
//                       </div>
//                     </div>
//                   </button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-56 p-2 bg-background border border-border shadow-lg z-50">
//                   <div className="text-sm font-medium mb-2">Choose your location</div>
//                   <div className="space-y-1">
//                     {locations.map((location) => (
//                       <button
//                         key={location}
//                         onClick={() => {
//                           setSelectedLocation(location);
//                           setIsLocationOpen(false);
//                         }}
//                         className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-accent transition-colors ${
//                           selectedLocation === location ? "bg-accent font-medium" : ""
//                         }`}
//                       >
//                         {location}
//                       </button>
//                     ))}
//                   </div>
//                 </PopoverContent>
//               </Popover>

//               {/* Search Icon for Mobile and Tablet */}
//               <div className="block lg:hidden">
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <button className="p-2 rounded hover:bg-primary/80 transition-colors">
//                       <Search className="w-4 h-4 text-primary-foreground" />
//                     </button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-80 p-3 bg-background border border-border shadow-lg z-50" align="center">
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="Search initiatives, programs..."
//                         className="w-full pl-4 pr-10 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
//                       />
//                       <button className="absolute right-0 top-0 h-full px-3 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
//                         <Search className="w-4 h-4 text-accent-foreground" />
//                       </button>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               {/* Search Bar */}
//               <div className="flex-1 max-w-2xl mx-2 sm:mx-4 hidden lg:block">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search our initiatives, programs, reports..."
//                     className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-1.5 sm:py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
//                   />
//                   <button className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-accent hover:bg-accent/90 rounded-r-md border border-l-0 border-input">
//                     <Search className="w-3 h-3 sm:w-4 sm:h-4 text-accent-foreground" />
//                   </button>
//                 </div>
//               </div>

//               {/* Right Navigation */}
//               <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">

//                 {/* Volunteer Button */}
//                 <Link to="/volunteer">
//                   <Button variant="outline" size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent h-7 sm:h-8 px-1.5 sm:px-2 md:px-3">
//                     <Users className="w-3 h-3 sm:w-4 sm:h-4 md:mr-1" />
//                     <span className="hidden md:inline text-xs sm:text-sm">Volunteer</span>
//                   </Button>
//                 </Link>

//                 {/* Account Dropdown */}
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <button className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
//                       <User className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <div className="hidden lg:block text-left">
//                         <div className="text-xs opacity-80">Hello, Sign in</div>
//                         <div className="text-xs sm:text-sm font-medium flex items-center">
//                           Account & Impact <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3 ml-1" />
//                         </div>
//                       </div>
//                     </button>
//                   </DropdownMenuTrigger>
                  
//                   <DropdownMenuContent className="w-80 p-0 max-h-96 overflow-y-auto" align="end">
//                     <div className="p-4 border-b">
//                       <div className="flex gap-3">
//                         <Link to="/login" className="flex-1">
//                           <Button className="w-full bg-accent hover:bg-accent/90">
//                             Sign In
//                           </Button>
//                         </Link>
//                         <Link to="/register" className="flex-1">
//                           <Button variant="outline" className="w-full">
//                             New? Register
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>

//                     <div className="p-2">
//                       <div className="grid grid-cols-2 gap-1">
//                         {/* Your Contributions */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Your Contributions
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/volunteer-hours" className="text-sm">Volunteer Hours Logged</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/sponsorships" className="text-sm">Sponsored Children / Projects</Link>
//                           </DropdownMenuItem>
//                         </div>

//                         {/* Your Account */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Your Account
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/profile" className="text-sm">My Profile</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/preferences" className="text-sm">Communication Preferences</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/tax-receipts" className="text-sm">Tax Receipts & Certificates</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/transparency" className="text-sm">Transparency Reports</Link>
//                           </DropdownMenuItem>
//                         </div>
//                       </div>

//                       <DropdownMenuSeparator />

//                       <div className="grid grid-cols-2 gap-1">
//                         {/* Get Involved */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Get Involved
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/become-volunteer" className="text-sm">Become a Volunteer</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/partner" className="text-sm">Partner with Us (CSR)</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/sponsor-program" className="text-sm">Sponsor a Program</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/fundraising" className="text-sm">Fundraising Campaigns</Link>
//                           </DropdownMenuItem>
//                         </div>

//                         {/* Help Center */}
//                         <div>
//                           <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                             Help Center
//                           </DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link to="/seeking-assistance" className="text-sm">Seeking Assistance</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/customer-care" className="text-sm">Customer Care</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/ticket-raising" className="text-sm">Ticket Raising</Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link to="/guides" className="text-sm">Awareness Guides & eBooks</Link>
//                           </DropdownMenuItem>
//                         </div>
//                       </div>

//                       <DropdownMenuSeparator />
                      
//                       <div>
//                         <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground px-3">
//                           Digital Resources
//                         </DropdownMenuLabel>

//                         {/* Employee login -> reveals Region button (and keeps menu open) */}
//                         <DropdownMenuItem
//                           className="text-sm cursor-pointer"
//                           onSelect={(e) => {
//                             e.preventDefault();            // keep dropdown open
//                             setShowRegion((s) => !s);      // toggle Region button
//                           }}
//                         >
//                           Employee login
//                         </DropdownMenuItem>

//                         {/* Region button appears here */}
//                         {showRegion && (
//                           <div className="px-3 py-2">
//                             <Button
//                               variant="outline"
//                               className="w-full"
//                               // onClick={() => navigate('/employee/region')} // optional: wire up navigation
//                             >
//                               Select Region
//                             </Button>
//                           </div>
//                         )}

//                         <DropdownMenuItem asChild>
//                           <Link to="/videos" className="text-sm">Video Library</Link>
//                         </DropdownMenuItem>
                        
//                         <DropdownMenuItem asChild>
//                           <Link to="/research" className="text-sm">Research Papers & Reports</Link>
//                         </DropdownMenuItem>
//                       </div>
//                     </div>
//                   </DropdownMenuContent>
//                 </DropdownMenu>

//                 {/* Cart */}
//                 <Link to="/cart" className="flex items-center space-x-1 p-1 sm:p-2 rounded hover:bg-primary/80 transition-colors">
//                   <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-xs sm:text-sm font-medium hidden sm:inline md:hidden lg:inline">Cart</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Secondary Navigation Bar */}
//         <div className="bg-background border-t border-border">
//           <div className="max-w-7xl mx-auto px-2 sm:px-4">
//             <div 
//               ref={scrollContainerRef}
//               className="flex items-center h-8 sm:h-10 space-x-3 sm:space-x-6 text-xs sm:text-sm overflow-x-auto scrollbar-hide"
//             >
//               <Link to="/products" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
//                 Store
//               </Link>
//               <Link to="/our-story" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Our Story
//               </Link>
//               <Link to="/significance" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Significance
//               </Link>
//               <Link to="/annual-campaigns" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Campaigns
//               </Link>
//               <Link to="/events" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Events
//               </Link>
//               <Link to="/portfolio" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Portfolio
//               </Link>
//               <Link to="/support" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Support
//               </Link>
//               <Link to="/contact" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
//                 Contact
//               </Link>
//               <Link to="/products#custom-sculpture-section" className="text-foreground hover:text-accent transition-colors whitespace-nowrap animate-pulse-orange">
//                 Custom Sculpture Request
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default AmazonStyleHeader;
