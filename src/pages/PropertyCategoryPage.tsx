import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { properties, propertyCategories } from "@/data/properties";

const PropertyCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const categoryInfo = propertyCategories.find((item) => item.slug === category);
  const listings = properties.filter((property) => property.type === category);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen">
        <SEO title="Property Category | Anantha Real Estate" description="Explore property categories in Nellore." path={`/properties/${category ?? "unknown"}`} />
        <Navbar />
        <main className="pt-32 pb-24 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/properties" className="text-accent font-semibold">Browse all properties</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`${categoryInfo.name} in Nellore | Anantha Real Estate`}
        description={`${categoryInfo.description} Explore current opportunities with Anantha Real Estate in Nellore.`}
        path={`/properties/${categoryInfo.slug}`}
      />
      <Navbar />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16">
          <div className="container mx-auto px-4">
            <Link to="/properties" className="text-cream/70 hover:text-cream text-sm">← All Properties</Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mt-6 mb-4">{categoryInfo.name} in Nellore</h1>
            <p className="text-cream/70 max-w-2xl">{categoryInfo.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {listings.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-8 text-center max-w-2xl mx-auto">
                <h2 className="font-display text-2xl font-bold mb-3">Listings are being updated</h2>
                <p className="text-muted-foreground mb-6">
                  We are adding verified {categoryInfo.name.toLowerCase()} opportunities as they become available. Contact Anantha Real Estate for current requirements.
                </p>
                <Link to="/contact" className="text-accent font-semibold">Contact our team →</Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {listings.map((property) => (
                  <Link key={property.slug} to={`/property/${property.slug}`} className="group rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-elevated transition-all">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3"><MapPin size={15} /> {property.location}</div>
                    <h2 className="font-display text-2xl font-bold group-hover:text-accent transition-colors">{property.name}</h2>
                    <p className="text-muted-foreground mt-2 mb-5">{property.shortDescription}</p>
                    <span className="inline-flex items-center gap-2 text-accent font-semibold">View property <ArrowRight size={16} /></span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyCategoryPage;
