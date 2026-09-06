import React, { FC } from "react";
import type { LucideIcon } from "lucide-react";
import { Building, Key, FileText, PiggyBank, Search, Briefcase, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServicesProps {
  showSmallIntro?: boolean;
  showCTA?: boolean;
}

const Services: FC<ServicesProps> = ({ showSmallIntro = true, showCTA = true }) => {
  const services: ServiceItem[] = [
    { icon: Search, title: "Property Search", description: "Shortlist residential, commercial and land opportunities based on your location, budget and purpose." },
    { icon: Building, title: "Property Valuation", description: "Understand asking prices and market context before making a decision." },
    { icon: Key, title: "Buying & Selling", description: "Support through property discovery, site visits, negotiation and transaction coordination." },
    { icon: FileText, title: "Documentation Support", description: "Guidance through the documentation process with appropriate legal and registration professionals." },
    { icon: PiggyBank, title: "Loan Assistance", description: "Help navigating home-loan options and the information lenders typically require." },
    { icon: Briefcase, title: "Investment Advisory", description: "Compare opportunities using location, use case, market conditions and long-term suitability." },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-secondary section-rule">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
          <div>
            {showSmallIntro && <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">What we do</p>}
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] text-foreground">
              Real estate support from first search to final decision.
            </h2>
            {showSmallIntro && (
              <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
                Straightforward help for buyers, sellers and investors who want local support without unnecessary complexity.
              </p>
            )}
            {showCTA && (
              <div className="mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">View all services <ArrowUpRight size={16} /></Link>
                </Button>
              </div>
            )}
          </div>

          <div className="border-t border-border">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="grid grid-cols-[44px_1fr] gap-4 py-6 border-b border-border">
                  <div className="pt-1 text-accent"><Icon size={19} strokeWidth={1.6} /></div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mt-2 max-w-2xl">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
