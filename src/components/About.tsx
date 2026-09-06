import { ShieldCheck, Handshake, Map, LineChart } from "lucide-react";
import statBg from "@/assets/hero-property.jpg";

const About = () => {
  const points = [
    { icon: Map, title: "Local market knowledge", description: "Focused on Nellore, its neighbourhoods and surrounding growth corridors." },
    { icon: ShieldCheck, title: "Clear information", description: "We present available property information carefully and keep owner details private." },
    { icon: Handshake, title: "Personal guidance", description: "From first enquiry to site visit, negotiation and documentation support." },
    { icon: LineChart, title: "Investment context", description: "Practical market insight to help buyers compare opportunities with more confidence." },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-background section-rule">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">About Anantha</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] text-foreground max-w-xl">
              A local real estate company built around clarity, access and long-term relationships.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-6 max-w-xl">
              We help people buy, sell and understand property opportunities in Nellore. The aim is simple: make the process easier to follow, easier to compare and easier to act on.
            </p>

            <div className="mt-10 aspect-[4/3] overflow-hidden bg-muted">
              <img src={statBg} alt="Property advisory in Nellore" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="border-t border-border">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="grid sm:grid-cols-[56px_1fr] gap-4 sm:gap-6 py-7 border-b border-border">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-accent">
                    <Icon size={19} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{point.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed max-w-xl">{point.description}</p>
                  </div>
                </div>
              );
            })}

            <div className="pt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-3xl font-semibold">2018</p>
                <p className="text-sm text-muted-foreground mt-1">Working in real estate since</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold">Nellore</p>
                <p className="text-sm text-muted-foreground mt-1">Primary market focus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
