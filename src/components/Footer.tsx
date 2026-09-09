import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MessageCircle, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Property Intelligence", href: "/property-intelligence" },
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
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#17105e] via-[#322093] to-[#2189e8] text-white border-t border-white/10">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_12%_20%,white,transparent_20%),radial-gradient(circle_at_86%_70%,#5eb1e3,transparent_24%)]" />
      <div className="container relative z-10 mx-auto px-4 py-14 md:py-16">
        <div className="grid lg:grid-cols-[1.25fr_0.8fr_0.9fr_1fr] gap-10 lg:gap-12">
          <div>
            <Link to="/" className="inline-block rounded-xl bg-white p-3"><img src={logo} alt="Anantha Real Estate" className="h-14 w-auto" /></Link>
            <p className="mt-5 text-white/72 leading-relaxed max-w-sm">Property search, project marketing and real estate advisory with a strong focus on Nellore and surrounding markets.</p>
            <p className="mt-3 text-sm font-semibold text-[#a8dcff]">Spaces for a Brighter Tomorrow</p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#3b229d] transition-colors"><Icon size={16} /></a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-5 text-white">Quick Links</p>
            <nav className="grid gap-3 text-sm">
              {links.map((link) => <Link key={link.name} to={link.href} className="text-white/68 hover:text-white transition-colors">{link.name}</Link>)}
            </nav>
          </div>

          <div>
            <p className="font-semibold mb-5 text-white">Our Services</p>
            <div className="grid gap-3 text-sm text-white/68">
              <span>Property Search</span><span>Property Selling Support</span><span>Investment Advisory</span><span>Documentation</span><span>Commercial Real Estate</span><span>Consultation</span>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-5 text-white">Contact Us</p>
            <a href="https://share.google/87CxiXWo8OARA9nx8" target="_blank" rel="noopener noreferrer" className="text-sm text-white/68 hover:text-white leading-relaxed block">Sathyanarayanapuram Center, Mypadu Road,<br />Nellore, Andhra Pradesh 524002 <ArrowUpRight size={13} className="inline" /></a>
            <div className="mt-5 grid gap-2 text-sm text-white/68">
              <a href="tel:+916302966604" className="hover:text-white">+91 63029 66604</a>
              <a href="tel:+919391675372" className="hover:text-white">+91 93916 75372</a>
              <a href="mailto:jvk.aconsultancy@gmail.com" className="hover:text-white">jvk.aconsultancy@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/14">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-white/55">
          <p>© {new Date().getFullYear()} Anantha Real Estate. All rights reserved.</p>
          <p>Designed for a Brighter Tomorrow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
