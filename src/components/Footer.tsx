import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const links = [
    { name: "Properties", href: "/properties" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/16ss1z5ioL/" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/anantha_real_estate?igsh=NGJseHloa3FmNGRw" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/916302966604" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@ananthaconsultancy?si=PVbAeP6iJdaSpN_n" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 py-14 md:py-18">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr_1fr] gap-10 lg:gap-16">
          <div>
            <Link to="/" className="inline-block">
              <img src={logo} alt="Anantha Real Estate" className="h-14 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-6 text-primary-foreground/65 leading-relaxed max-w-md">
              Property search, project marketing and real estate advisory with a strong focus on Nellore and its surrounding markets.
            </p>
            <div className="flex gap-3 mt-7">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground/50 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/45 mb-5">Explore</p>
            <nav className="grid gap-3">
              {links.map((link) => (
                <Link key={link.name} to={link.href} className="text-primary-foreground/75 hover:text-primary-foreground transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/45 mb-5">Nellore office</p>
            <a
              href="https://share.google/87CxiXWo8OARA9nx8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/75 hover:text-primary-foreground leading-relaxed block"
            >
              Sathyanarayanapuram Center, Mypadu Road,<br />Nellore, Andhra Pradesh 524002
            </a>
            <div className="mt-6 grid gap-2 text-primary-foreground/75">
              <a href="tel:+916302966604" className="hover:text-primary-foreground">+91 63029 66604</a>
              <a href="tel:+919391675372" className="hover:text-primary-foreground">+91 93916 75372</a>
              <a href="mailto:jvk.aconsultancy@gmail.com" className="hover:text-primary-foreground">jvk.aconsultancy@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-primary-foreground/45">
          <p>© {new Date().getFullYear()} Anantha Real Estate. All rights reserved.</p>
          <p>Nellore, Andhra Pradesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
