import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Youtube, MessageSquare, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";


const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Property Search",
    "Buy & Sell",
    "Property Valuation",
    "Legal Assistance",
    "Loan Support",
    "Investment Advisory",
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/16ss1z5ioL/" },
    { icon: Instagram, href: "https://www.instagram.com/anantha_real_estate?igsh=NGJseHloa3FmNGRw" },
    { icon: MessageCircle, href: "https://wa.me/916302966604" },
    { icon: Youtube, href: "https://youtube.com/@ananthaconsultancy?si=PVbAeP6iJdaSpN_n" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={logo} alt="Anantha Real Estate" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-primary-foreground/70 mb-6 font-body leading-relaxed">
              Your trusted partner in finding the perfect property. We bring expertise,
              transparency, and dedication to every transaction.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/70 font-body">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent flex-shrink-0 mt-1" size={18} />
                <span className="text-primary-foreground/70 font-body">
                 <a
                   href="https://share.google/87CxiXWo8OARA9nx8"
                   target="_blank"
                  rel="noopener noreferrer"
                   className="text-primary-foreground/70 font-body hover:text-accent transition-colors"
  >
                 Sathyanarayanapuram center, mypadu road, Nellore, Andhra Pradesh - 524002
                 </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent" size={18} />
                <span className="text-primary-foreground/70 font-body">
                  +91 6302966604, 
                  +91 9391675372.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent" size={18} />
                <span className="text-primary-foreground/70 font-body">
                 <a
                   href="mailto:jvk.aconsultancy@gmail.com"
                  className="text-primary-foreground/70 font-body hover:text-accent transition-colors"
                 >
                  jvk.aconsultancy@gmail.com
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm font-body">
            © {new Date().getFullYear()} Anantha Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors font-body">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors font-body">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
