import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.png";

const Hero = () => {

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Luxury property" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto px-4 relative z-10 pt-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-gold-light text-sm font-medium">Trusted Real Estate Partner Since 2018</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7.5xl font-bold text-cream leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Find Your<span className="block text-accent text-6xl md:text-7xl lg:text-8xl">Dream Property</span>
          </h1>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-cream leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Buy, Sell, or Invest
          </p>
          <p className="text-cream/80 text-lg md:text-xl mb-8 max-w-xl font-body leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            We simplify every step of your Real Estate journey, ensuring a seamless experience from start to finish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild><Link to="/portfolio">Explore Properties<ArrowRight size={20} /></Link></Button>
            <Button variant="heroOutline" size="xl" asChild><Link to="/contact">Contact Us</Link></Button>
          </div>
          <div className="pt-4" />
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
