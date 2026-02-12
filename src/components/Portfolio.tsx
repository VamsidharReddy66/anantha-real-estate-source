import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type PortfolioProps = {
  limit?: number;
  buttonText?: string;
  buttonLink?: string;
  external?: boolean; // if true, render an <a> for external link, otherwise <Link>
};

const Portfolio: React.FC<PortfolioProps> = ({
  limit,
  buttonText = "View All Properties",
  buttonLink = "/portfolio",
  external = false,
}) => {
  const properties = [
    { id: 1, type: "Villa", status: "For Sale" },
    { id: 2, type: "Apartment", status: "For Sale" },
    { id: 3, type: "Commercial", status: "Available" },
    { id: 4, type: "Plots", status: "Available" },
    { id: 5, type: "Ventures", status: "Available" },
    { id: 6, type: "Farmlands", status: "For Sale" },
  ];

  const list = limit ? properties.slice(0, limit) : properties;

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
              Our Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured
              <span className="text-accent block">Properties</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-4 md:mt-0 font-body">
            Explore our handpicked selection of premium properties across prime locations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((property, index) => (
            <div
              key={property.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-elevated"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.1),transparent_70%)]" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  {property.status}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-card/90 text-foreground text-xs font-medium">
                  {property.type}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-accent/20 font-bold">
                    {property.id}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-center gap-4">
                  {/* Per-card small action stays as site-visit booking link */}
                  <Button
                   variant="ghost"
                    size="sm"
                    className="text-foreground hover:text-accent hover:bg-accent/10 hover:border hover:border-accent/40 hover:shadow-md transition-all"
                    asChild
                    >   
                      <a
                      href="https://calendly.com/jvk-aconsultancy/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                    Book your Site Visit <ArrowRight size={16} />
                    </a>
                  </Button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main button — dynamic behavior */}
        <div className="text-center mt-12">
          <Button variant="brand" size="lg" asChild>
            {external ? (
              <a href={buttonLink} target="_blank" rel="noopener noreferrer">
                {buttonText} <ArrowRight size={18} />
              </a>
            ) : (
              <Link to={buttonLink}>
                {buttonText} <ArrowRight size={18} />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
