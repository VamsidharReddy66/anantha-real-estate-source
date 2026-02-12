import { Award, Shield, Handshake, TrendingUp } from "lucide-react";
import statBg from "@/assets/hero-property.jpg";

const About = () => {
  const features = [
    { icon: Award, title: "Industry Expertise", description: "Over 7 years of experience in the real estate market" },
    { icon: Shield, title: "Trusted Partner", description: "Transparent dealings with complete legal documentation" },
    { icon: Handshake, title: "Client First", description: "Personalized service tailored to your unique needs" },
    { icon: TrendingUp, title: "Market Insights", description: "Data-driven advice for maximum investment returns" },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">About Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Trusted <span className="text-accent block">Real Estate Experts</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-body">
              Anantha Real Estate has been at the forefront of property consultancy, helping thousands of clients find their perfect homes and make smart investment decisions.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-soft">
                  <feature.icon className="text-accent mb-3 group-hover:scale-110 transition-transform duration-300" size={28} />
                  <h3 className="font-display font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm font-body">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-square rounded-3xl p-8 relative overflow-hidden"
              style={{ backgroundImage: `url(${statBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* slightly stronger overlay for better contrast */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative h-full flex flex-col justify-center items-center text-center">
                <span className="font-display text-8xl md:text-9xl font-bold text-cream">7+</span>
                <span className="font-display text-2xl md:text-3xl font-semibold text-cream/90 mt-2">Years of Excellence</span>
                <p className="text-cream/80 mt-4 max-w-xs font-body">Building dreams and delivering exceptional value since 2018</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-elevated p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center"><Award className="text-accent" size={24} /></div>
                <div><p className="font-display font-bold text-foreground">Best Agency</p><p className="text-muted-foreground text-sm">Award 2023</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
