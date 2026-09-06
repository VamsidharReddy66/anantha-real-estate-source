import React, { useMemo, useState } from "react";
import { ArrowRight, RotateCcw, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyListingCard from "@/components/PropertyListingCard";
import { propertyCategories, properties } from "@/data/properties";

const PropertiesPage: React.FC = () => {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [status, setStatus] = useState("available");
  const [project, setProject] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const locations = useMemo(
    () => Array.from(new Set(properties.map((property) => property.location))).sort(),
    [],
  );

  const projects = useMemo(
    () => Array.from(new Set(properties.map((property) => property.projectName).filter(Boolean) as string[])).sort(),
    [],
  );

  const listings = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = properties.filter((property) => {
      const matchesCategory = category === "all" || property.type === category;
      const matchesLocation = location === "all" || property.location === location;
      const matchesStatus = status === "all" || property.status === status;
      const matchesProject = project === "all" || property.projectName === project;
      const matchesSearch = !query || [
        property.name,
        property.location,
        property.city,
        property.projectName,
        property.developer,
        property.shortDescription,
      ].filter(Boolean).some((value) => value!.toLowerCase().includes(query));
      return matchesCategory && matchesLocation && matchesStatus && matchesProject && matchesSearch && property.status !== "unavailable";
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
      if (sort === "price-high") return (b.price ?? -1) - (a.price ?? -1);
      if (sort === "area-high") return (b.areaValue ?? -1) - (a.areaValue ?? -1);
      return new Date(b.updatedAt || b.publishedAt || 0).getTime() - new Date(a.updatedAt || a.publishedAt || 0).getTime();
    });
  }, [category, location, status, project, search, sort]);

  const resetFilters = () => {
    setCategory("all");
    setLocation("all");
    setStatus("available");
    setProject("all");
    setSearch("");
    setSort("latest");
  };

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
              Browse customer-ready listings published by Anantha Real Estate. Availability and pricing are reconfirmed with our team before you proceed.
            </p>
          </div>
        </section>

        <section className="py-10 border-b border-border bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 lg:grid-cols-6">
              <div className="relative lg:col-span-2">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search property, project or location"
                  className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 outline-none focus:border-accent"
                />
              </div>

              <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent" aria-label="Filter properties by category">
                <option value="all">All property types</option>
                {propertyCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>

              <select value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent" aria-label="Filter properties by location">
                <option value="all">All locations</option>
                {locations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>

              <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent" aria-label="Filter properties by availability">
                <option value="available">Available</option>
                <option value="under-negotiation">Under negotiation</option>
                <option value="sold">Sold</option>
                <option value="all">All statuses</option>
              </select>

              <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent" aria-label="Sort property listings">
                <option value="latest">Latest updated</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="area-high">Area: largest first</option>
              </select>
            </div>

            {projects.length > 0 && (
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <select value={project} onChange={(event) => setProject(event.target.value)} className="rounded-xl border border-border bg-card px-4 py-3 outline-none focus:border-accent sm:max-w-xs" aria-label="Filter properties by project">
                  <option value="all">All projects</option>
                  {projects.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
                  <RotateCcw size={15} /> Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Customer listings</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Property inventory</h2>
              </div>
              <span className="text-sm text-muted-foreground">{listings.length} listing{listings.length === 1 ? "" : "s"}</span>
            </div>

            {listings.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center max-w-3xl mx-auto">
                <h3 className="font-display text-2xl font-bold mb-3">No matching public listings right now</h3>
                <p className="text-muted-foreground mb-6">
                  We publish inventory only after the customer-facing details are approved. Share your property type, preferred location and budget and our team can check current options that may not yet be published online.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 font-semibold text-accent">Share your requirement <ArrowRight size={16} /></Link>
                  <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><RotateCcw size={15} /> Clear filters</button>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => <PropertyListingCard key={property.slug} property={property} />)}
              </div>
            )}
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold mb-6">Browse by property type</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyCategories.map((categoryItem) => (
                <Link key={categoryItem.slug} to={`/properties/${categoryItem.slug}`} className="group rounded-2xl border border-border bg-card p-6 hover:border-accent/40 hover:shadow-elevated transition-all">
                  <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{categoryItem.name}</h3>
                  <p className="text-muted-foreground mb-6">{categoryItem.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">Explore {categoryItem.name} <ArrowRight size={16} /></span>
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
