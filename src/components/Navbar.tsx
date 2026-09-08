import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Properties", href: "/properties" },
    { name: "Projects", href: "/projects" },
    { name: "Buy", href: "/buy-property" },
    { name: "Sell", href: "/sell-your-property" },
    { name: "Locations", href: "/locations" },
    { name: "Intelligence", href: "/property-intelligence" },
    { name: "Contact", href: "/contact" },
  ];

  const isHomePage = location.pathname === "/";
  const transparent = isHomePage && !isScrolled;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${transparent ? "bg-transparent" : "bg-background/95 backdrop-blur border-b border-border"}`}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        <Link to="/" className="shrink-0 flex items-center">
          <img src={logo} alt="Anantha Real Estate" className="h-14 w-auto" />
        </Link>

        <nav className="hidden xl:flex items-center gap-5 ml-auto">
          {navLinks.map((link) => {
            const active = location.pathname === link.href || location.pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${transparent ? "text-cream/85 hover:text-cream" : "text-foreground/75 hover:text-foreground"} ${active ? (transparent ? "text-cream" : "text-foreground") : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <a href="tel:+919391675372" className={`text-sm font-medium ${transparent ? "text-cream/85 hover:text-cream" : "text-foreground/75 hover:text-foreground"}`}>
            +91 93916 75372
          </a>
          <Button variant={transparent ? "heroOutline" : "brand"} size="lg" asChild>
            <Link to="/property-consultation">Get Matched</Link>
          </Button>
        </div>

        <button
          className={`xl:hidden p-2 ${transparent ? "text-cream" : "text-foreground"}`}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden bg-background border-t border-border max-h-[78vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-6 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-base font-medium border-b border-border last:border-0"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-5 grid gap-3">
              <a href="tel:+919391675372" className="text-sm text-muted-foreground">+91 93916 75372</a>
              <Button variant="brand" asChild>
                <Link to="/property-consultation" onClick={() => setIsMobileMenuOpen(false)}>Free Consultation</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
