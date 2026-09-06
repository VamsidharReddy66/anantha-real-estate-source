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
    <section id="portfolio" className="py-20 md:py-28 bg-background section-rule">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-20 items-end mb-12 md:mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">Browse by property type</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.1] text-foreground">
              Start with what you are looking for.
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
            Explore property opportunities across Nellore by category. Individual listings appear as inventory is verified and made available for customers.
          </p>
        </div>

        <div className="border-t border-border">
          {list.map((category, index) => (
            <Link
              key={category.slug}
              to={`/properties/${category.slug}`}
              className="group grid md:grid-cols-[90px_1fr_auto] gap-4 md:gap-8 items-center py-7 border-b border-border"
            >
              <span className="text-sm text-muted-foreground">0{index + 1}</span>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl">{category.description}</p>
              </div>
              <div className="hidden md:flex h-10 w-10 items-center justify-center border border-border group-hover:border-accent group-hover:text-accent transition-colors">
                <ArrowRight size={17} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Button variant="brand" size="lg" asChild>
            {external ? (
              <a href={buttonLink} target="_blank" rel="noopener noreferrer">
                {buttonText} <ArrowRight size={17} />
              </a>
            ) : (
              <Link to={buttonLink}>
                {buttonText} <ArrowRight size={17} />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
