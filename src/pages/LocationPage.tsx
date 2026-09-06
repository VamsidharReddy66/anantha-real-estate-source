import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyListingCard from "@/components/PropertyListingCard";
import { getLocalityBySlug } from "@/data/localities";
import { properties } from "@/data/properties";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const locality = slug ? getLocalityBySlug(slug) : undefined;

  if (!locality) {
    return (
      <div className="min-h-screen"><Navbar /><main className="pt-32 pb-24 container mx-auto px-4 text-center"><h1 className="font-display text-4xl font-bold">Location not found</h1><Link to="/locations" className="text-accent font-semibold mt-6 inline-block">Browse locations</Link></main><Footer /></div>
    );
  }

  const listings = properties.filter((property) => `${property.location} ${property.city}`.toLowerCase().includes(locality.name.toLowerCase()) && property.status !== "unavailable");

  return (
    <div className="min-h-screen">
      <SEO title={locality.seoTitle} description={locality.seoDescription} path={`/locations/${locality.slug}`} />
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16 text-cream">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link to="/locations" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream"><ArrowLeft size={16} /> All locations</Link>
            <div className="flex items-center gap-2 text-accent mt-8"><MapPin size={18} /> {locality.city}</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">Properties in {locality.name}</h1>
            <p className="text-cream/75 mt-5 text-lg max-w-3xl">{locality.intro}</p>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <h2 className="font-display text-3xl font-bold">What buyers commonly explore</h2>
              <ul className="mt-5 space-y-3">{locality.buyerFocus.map((item) => <li key={item} className="rounded-xl border border-border bg-card p-4">{item}</li>)}</ul>
              <p className="text-sm text-muted-foreground mt-6">Area pages are informational. Current price, availability, approvals and legal status should always be reconfirmed before a transaction.</p>
            </div>
            <div>
              <div className="flex items-end justify-between gap-4 mb-6"><div><p className="text-sm font-semibold uppercase tracking-wider text-accent">Current inventory</p><h2 className="font-display text-3xl font-bold mt-2">Available properties</h2></div><span className="text-sm text-muted-foreground">{listings.length} listings</span></div>
              {listings.length > 0 ? <div className="grid md:grid-cols-2 gap-6">{listings.map((property) => <PropertyListingCard key={property.slug} property={property} />)}</div> : <div className="rounded-2xl border border-border bg-card p-8"><p className="text-muted-foreground">No public listings are published for this locality yet. Share your requirement and we can check current options.</p><Link to="/buy-property" className="inline-flex items-center gap-2 text-accent font-semibold mt-5">Share requirement <ArrowRight size={16} /></Link></div>}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
