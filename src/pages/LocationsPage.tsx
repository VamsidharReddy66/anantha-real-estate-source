import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { localities } from "@/data/localities";

const LocationsPage = () => (
  <div className="min-h-screen">
    <SEO title="Nellore Property Locations | Area Guides | Anantha Real Estate" description="Explore Nellore locality guides, property opportunities and buyer information across key residential and investment areas." path="/locations" />
    <Navbar />
    <main className="pt-24">
      <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16 text-cream">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Explore Nellore</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">Property guides by location.</h1>
          <p className="text-cream/75 mt-5 text-lg">Use our locality pages to understand property types, current inventory and buyer considerations before shortlisting.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localities.map((locality) => (
            <Link key={locality.slug} to={`/locations/${locality.slug}`} className="rounded-2xl border border-border bg-card p-6 hover:shadow-elevated transition-all group">
              <MapPin className="text-accent mb-5" />
              <h2 className="font-display text-2xl font-bold group-hover:text-accent">{locality.name}</h2>
              <p className="text-muted-foreground mt-3">{locality.intro}</p>
              <span className="inline-flex items-center gap-2 text-accent font-semibold mt-6">Explore area <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default LocationsPage;
