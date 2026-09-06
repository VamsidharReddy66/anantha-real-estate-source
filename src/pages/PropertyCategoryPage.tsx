import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyListingCard from "@/components/PropertyListingCard";
import { properties, propertyCategories } from "@/data/properties";

const PropertyCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const categoryInfo = propertyCategories.find((item) => item.slug === category);
  const listings = properties.filter((property) => property.type === category && property.status !== "unavailable");

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
        description={`${categoryInfo.description} Browse customer-facing ${categoryInfo.name.toLowerCase()} listings from Anantha Real Estate in Nellore.`}
        path={`/properties/${categoryInfo.slug}`}
      />
      <Navbar />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16">
          <div className="container mx-auto px-4">
            <Link to="/properties" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream text-sm">
              <ArrowLeft size={15} /> All Properties
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mt-6 mb-4">{categoryInfo.name} in Nellore</h1>
            <p className="text-cream/70 max-w-2xl">{categoryInfo.description} Browse verified customer listings below.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {listings.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center max-w-2xl mx-auto">
                <h2 className="font-display text-2xl font-bold mb-3">No customer listings published yet</h2>
                <p className="text-muted-foreground mb-6">
                  We publish listings here only after the relevant public property details have been confirmed. Contact Anantha Real Estate for current requirements.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-accent font-semibold">Share your requirement <ArrowRight size={16} /></Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => (
                  <PropertyListingCard key={property.slug} property={property} />
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
