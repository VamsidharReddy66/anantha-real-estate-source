import React, { FC } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building,
  Key,
  FileText,
  PiggyBank,
  Search,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServicesProps {
  showSmallIntro?: boolean; // hide small intro text only
  showCTA?: boolean;        // toggle View All Services button
}

const Services: FC<ServicesProps> = ({
  showSmallIntro = true,
  showCTA = true,
}) => {
  const services: ServiceItem[] = [
    { icon: Search, title: "Property Search", description: "Find the perfect property from our extensive database of residential and commercial listings." },
    { icon: Building, title: "Property Valuation", description: "Get accurate market valuations backed by comprehensive analysis and expert insights." },
    { icon: Key, title: "Buy & Sell Assistance", description: "End-to-end support for buying or selling properties with best market prices." },
    { icon: FileText, title: "Legal Documentation", description: "Complete legal assistance including title verification and registration support." },
    { icon: PiggyBank, title: "Loan Assistance", description: "Help with home loans and financial planning to make your purchase easier." },
    { icon: Briefcase, title: "Investment Advisory", description: "Strategic advice on real estate investments for maximum returns." },
  ];

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">

          {/* Small intro – HIDE on Services page */}
          {showSmallIntro && (
            <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
              Our Services
            </span>
          )}

          {/* BIG HEADING – ALWAYS VISIBLE */}
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive Real Estate
            <span className="text-accent block">Solutions</span>
          </h2>

          {/* Paragraph – HIDE on Services page */}
          {showSmallIntro && (
            <p className="text-muted-foreground text-lg font-body">
              From property search to final handover, we provide complete support
              for all your real estate needs.
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Icon className="text-accent" size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA BUTTON – show/hide by prop */}
        {showCTA && (
          <div className="text-center mt-12">
            <Button variant="brand" size="lg" asChild>
              <Link to="/services">View all services</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
