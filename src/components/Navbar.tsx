import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  const isHomePage = location.pathname === "/";
  const showTransparent = isHomePage && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? "bg-transparent py-4"
          : "bg-card/95 backdrop-blur-md shadow-elevated py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* LEFT — Navigation */}
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`font-body text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent ${
                showTransparent ? "text-cream/90" : "text-foreground"
              } ${location.pathname === link.href ? "text-accent" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CENTER — Logo (BIGGER) */}
        <div className="flex justify-center flex-1">
          <Link to="/" className="flex items-center justify-center">
            <img
              src={logo}
              alt="Anantha Real Estate Logo"
              className="h-20 w-auto"  // <-- Increased size from h-12 to h-16
            />
          </Link>
        </div>

        {/* RIGHT — Phone + Button */}
        <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
          <a
            href="tel:+919391675372"
            className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
              showTransparent ? "text-cream" : "text-foreground"
            }`}
          >
            <Phone size={16} />
            <span>+91 93916 75372</span>
          </a>

          <Button variant={showTransparent ? "hero" : "brand"} size="lg" asChild>
            <Link to="https://calendly.com/jvk-aconsultancy/30min">
              Get Consultation
            </Link>
          </Button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`lg:hidden p-2 transition-colors ${
            showTransparent ? "text-cream" : "text-foreground"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-card shadow-elevated animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-body text-foreground hover:text-accent py-2 transition-colors ${
                  location.pathname === link.href ? "text-accent" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="brand" className="mt-4 w-full" asChild>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Get Consultation
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
