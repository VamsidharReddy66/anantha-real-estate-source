import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { propertyCategories } from "@/data/properties";

type PortfolioProps = {
  limit?: number;
  buttonText?: string;
  buttonLink?: string;
  external?: boolean;
};

const Portfolio: React.FC<PortfolioProps> = ({
  limit,
  buttonText = "View All Properties",
  buttonLink = "/properties",
  external = false,
}) => {
  const list = limit ? propertyCategories.slice(0, limit) : propertyCategories;

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
              Explore Properties
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Find Your
              <span className="text-accent block">Property</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md mt-4 md:mt-0 font-body">
            Browse property opportunities in Nellore by property type. Individual listings are added as verified inventory becomes available.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((category, index) => (
            <Link
              key={category.slug}
              to={`/properties/${category.slug}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-elevated"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.1),transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl text-accent/20 font-bold text-center px-6">
                    {category.name}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mt-2 mb-5">{category.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Explore {category.name} <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

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
