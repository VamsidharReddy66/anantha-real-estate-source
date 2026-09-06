import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-end overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Real estate in Nellore"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-16 md:pb-24 pt-40">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-cream/80 text-sm mb-6">
            <MapPin size={16} />
            <span>Nellore, Andhra Pradesh</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[1.04] max-w-3xl">
            Real estate guidance built around the right property, not the pressure to buy.
          </h1>

          <p className="mt-7 text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl font-body">
            Explore residential, commercial and investment opportunities across Nellore with clear information, local market context and direct support from Anantha Real Estate.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <Button variant="hero" size="xl" asChild>
              <Link to="/properties">
                Explore Properties <ArrowRight size={18} />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/projects">View Projects</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/20 grid sm:grid-cols-3 gap-4 max-w-3xl text-cream/80 text-sm">
          <div><span className="text-cream font-medium block mb-1">Local Focus</span>Nellore and surrounding growth corridors</div>
          <div><span className="text-cream font-medium block mb-1">Property Types</span>Residential, commercial and land</div>
          <div><span className="text-cream font-medium block mb-1">Direct Support</span>Enquiry, site visit and advisory</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
