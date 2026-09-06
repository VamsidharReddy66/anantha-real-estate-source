import React, { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyListingCard from "@/components/PropertyListingCard";
import { propertyCategories, properties } from "@/data/properties";

const PropertiesPage: React.FC = () => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const listings = useMemo(() => {
    const query = search.trim().toLowerCase();
    return properties.filter((property) => {
      const matchesCategory = category === "all" || property.type === category;
      const matchesSearch = !query || [
        property.name,
        property.location,
        property.city,
        property.projectName,
        property.shortDescription,
      ].filter(Boolean).some((value) => value!.toLowerCase().includes(query));
      return matchesCategory && matchesSearch && property.status !== "unavailable";
    });
  }, [category, search]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Properties for Sale in Nellore | Anantha Real Estate"
        description="Browse customer-facing property listings in Nellore including plots, apartments, villas, commercial property and land from Anantha Real Estate."
        path="/properties"
      />
      <Navbar />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">Properties in Nellore</h1>
            <p className="text-cream/70 max-w-2xl mx-auto">
              Browse customer-ready listings published by Anantha Real Estate. Availability and pricing are confirmed with our team before you proceed.
            </p>
          </div>
        </section>

        <section className="py-12 border-b border-border bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by property, project or location"
                  className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none focus:border-accent"
                />
              </div>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent"
                aria-label="Filter properties by category"
              >
                <option value="all">All property types</option>
                {propertyCategories.map((item) => (
                  <option key={item.slug} value={item.slug}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Customer listings</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Available properties</h2>
              </div>
              <span className="text-sm text-muted-foreground">{listings.length} listing{listings.length === 1 ? "" : "s"}</span>
            </div>

            {listings.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center max-w-3xl mx-auto">
                <h3 className="font-display text-2xl font-bold mb-3">Listings are being updated</h3>
                <p className="text-muted-foreground mb-6">
                  We are adding verified customer listings as inventory is approved. If you already have a requirement, tell us the property type, preferred location and budget and our team can help identify suitable options.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-accent">
                  Share your requirement <ArrowRight size={16} />
                </Link>
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

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold mb-6">Browse by property type</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyCategories.map((categoryItem) => (
                <Link
                  key={categoryItem.slug}
                  to={`/properties/${categoryItem.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-elevated transition-all"
                >
                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{categoryItem.name}</h3>
                  <p className="text-muted-foreground mb-6">{categoryItem.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Explore {categoryItem.name} <ArrowRight size={16} />
                  </span>
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
