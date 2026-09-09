import { ReactNode } from "react";
import { stockImages } from "@/data/stockImages";

type PremiumPageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  compact?: boolean;
};

const PremiumPageHero = ({ eyebrow, title, description, actions, compact = false }: PremiumPageHeroProps) => {
  return (
    <section className={`relative overflow-hidden border-b border-white/10 text-white ${compact ? "pt-28 pb-14" : "pt-32 pb-20 md:pb-24"}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#17105e] via-[#35219d] to-[#2289e8]" />
      <div className="absolute right-0 top-0 h-full w-full lg:w-[48%] opacity-25">
        <img src={stockImages.villaPool} alt="" className="h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#2289e8]/20 via-[#2b208d]/55 to-[#17105e]" />
      </div>
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#5eb1e3]/25 blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {eyebrow && <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#a7ddff] mb-5">{eyebrow}</p>}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.03] tracking-tight max-w-4xl">
            {title}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed max-w-3xl">{description}</p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
};

export default PremiumPageHero;
