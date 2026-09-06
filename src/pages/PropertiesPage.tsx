import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { propertyCategories, properties } from "@/data/properties";

const PropertiesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Properties for Sale in Nellore | Anantha Real Estate"
        description="Explore plots, apartments, villas, commercial property and land opportunities in Nellore through Anantha Real Estate."
        path="/properties"
      />
      <Navbar />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Properties in Nellore
            </h1>
            <p className="text-cream/70 max-w-2xl mx-auto">
              Browse property opportunities by type. Individual verified listings will be added here as they become available.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/properties/${category.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-elevated transition-all"
                >
                  <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Explore {category.name} <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-16">
              <h2 className="font-display text-3xl font-bold mb-6">Featured Property</h2>
              {properties.map((property) => (
                <Link
                  key={property.slug}
                  to={`/property/${property.slug}`}
                  className="block rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-elevated transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin size={15} /> {property.location}
                      </div>
                      <h3 className="font-display text-2xl font-bold">{property.name}</h3>
                      <p className="text-muted-foreground mt-2">{property.shortDescription}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-accent font-semibold">
                      View Property <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertiesPage;
