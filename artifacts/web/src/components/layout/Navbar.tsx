import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const logoUrl = `${import.meta.env.BASE_URL}images/skyrich-logo.png`;

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Industries", path: "/industries" },
  { 
    name: "Products", 
    path: "/products",
    dropdown: [
      { name: "AIDA", path: "/products/aida", desc: "Data Analytics Platform" },
      { name: "AIVA", path: "/products/aiva", desc: "Visual Analytics Platform" },
      { name: "Orbit CRM", path: "/products/orbit-crm", desc: "Smart CRM for SMEs" },
    ]
  },
  { name: "Insights", path: "/insights" },
  { name: "About", path: "/about" },
  { name: "Careers", path: "/careers" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm py-2" : "bg-white/70 backdrop-blur-md py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center z-50">
          <img src={logoUrl} alt="SkyRich Tech Solutions" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
                  location === link.path || (location.startsWith(link.path) && link.path !== '/') 
                    ? "text-primary bg-primary/10" 
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
              </Link>

              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl p-2 flex flex-col gap-1 shadow-xl border border-gray-200"
                    >
                      {link.dropdown.map(drop => (
                        <Link key={drop.path} href={drop.path} className="block p-3 rounded-lg hover:bg-primary/5 transition-colors group">
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{drop.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{drop.desc}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="font-bold bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] hover:from-[#FF8A2A] hover:to-[#FF5D10] text-white shadow-lg shadow-orange-500/20">
            <Link href="/contact">Talk to Expert</Link>
          </Button>
        </div>

        <button 
          className="lg:hidden p-2 text-foreground/80 hover:text-foreground z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 lg:hidden overflow-y-auto pt-24 px-6 pb-12 flex flex-col"
          >
            <div className="flex flex-col gap-4 mb-8">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col border-b border-gray-200 pb-4">
                  <Link 
                    href={link.path}
                    className="text-2xl font-bold text-foreground py-2 flex items-center justify-between"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-col gap-3 pl-4 mt-2 border-l-2 border-primary/30">
                      {link.dropdown.map(drop => (
                        <Link key={drop.path} href={drop.path} className="text-lg text-foreground/80 py-1">
                          {drop.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <Button asChild size="lg" className="w-full bg-gradient-to-r from-[#FF7A1A] to-[#FF4D00] text-white">
                <Link href="/contact">Talk to Expert</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
