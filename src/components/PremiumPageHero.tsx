import { ReactNode } from "react";
import heroImage from "@/assets/hero.png";

type PremiumPageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  compact?: boolean;
};

const PremiumPageHero = ({ eyebrow, title, description, actions, compact = false }: PremiumPageHeroProps) => {
  return (
    <section className={`relative overflow-hidden border-b border-border ${compact ? "pt-28 pb-14" : "pt-32 pb-20 md:pb-24"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,177,227,0.2),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(128,124,183,0.18),transparent_34%),linear-gradient(135deg,#ffffff_0%,#f7f9ff_52%,#eef4ff_100%)]" />
      <div className="absolute right-0 top-0 h-full w-[46%] opacity-[0.12] hidden lg:block">
        <img src={heroImage} alt="" className="h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/50 to-white" />
      </div>
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {eyebrow && <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-accent mb-5">{eyebrow}</p>}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.03] tracking-tight max-w-4xl">
            {title}
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">{description}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
};

export default PremiumPageHero;
