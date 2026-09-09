import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyListingCard from "@/components/PropertyListingCard";
import { getLocalityBySlug } from "@/data/localities";
import { properties } from "@/data/properties";

const SITE_URL = "https://www.anantharealestate.in";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const locality = slug ? getLocalityBySlug(slug) : undefined;

  if (!locality) {
    return (
      <div className="min-h-screen"><Navbar /><main className="pt-32 pb-24 container mx-auto px-4 text-center"><h1 className="font-display text-4xl font-bold">Location not found</h1><Link to="/locations" className="text-accent font-semibold mt-6 inline-block">Browse locations</Link></main><Footer /></div>
    );
  }

  const listings = properties.filter((property) => `${property.location} ${property.city}`.toLowerCase().includes(locality.name.toLowerCase()) && property.status !== "unavailable");
  const locationUrl = `${SITE_URL}/locations/${locality.slug}`;
  const structuredData = [
    {
      "@type": "WebPage",
      "@id": `${locationUrl}#webpage`,
      url: locationUrl,
      name: locality.seoTitle,
      description: locality.seoDescription,
      about: { "@type": "Place", name: `${locality.name}, ${locality.city}, Andhra Pradesh` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "FAQPage",
      mainEntity: locality.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO title={locality.seoTitle} description={locality.seoDescription} path={`/locations/${locality.slug}`} structuredData={structuredData} />
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16 text-cream">
          <div className="container mx-auto px-4 max-w-5xl">
            <Link to="/locations" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream"><ArrowLeft size={16} /> All locations</Link>
            <div className="flex items-center gap-2 text-accent mt-8"><MapPin size={18} /> {locality.city}, Andhra Pradesh</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">Properties in {locality.name}, Nellore</h1>
            <p className="text-cream/75 mt-5 text-lg max-w-3xl">{locality.intro}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-6">
              <article className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Buyer focus</p>
                <h2 className="font-display text-2xl font-bold mt-2">What buyers commonly explore</h2>
                <ul className="mt-5 space-y-3">{locality.buyerFocus.map((item) => <li key={item} className="rounded-xl border border-border p-4">{item}</li>)}</ul>
              </article>
              <article className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Local context</p>
                <h2 className="font-display text-2xl font-bold mt-2">How to evaluate this area</h2>
                <ul className="mt-5 space-y-3">{locality.marketContext.map((item) => <li key={item} className="text-muted-foreground leading-relaxed">• {item}</li>)}</ul>
              </article>
              <article className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">Due diligence</p>
                <h2 className="font-display text-2xl font-bold mt-2">Before you commit</h2>
                <ul className="mt-5 space-y-3">{locality.dueDiligence.map((item) => <li key={item} className="text-muted-foreground leading-relaxed">• {item}</li>)}</ul>
              </article>
            </div>
            <p className="text-sm text-muted-foreground mt-6">Locality pages are informational. Current price, availability, approvals, legal status and property-specific facts must be reconfirmed before any transaction.</p>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-end justify-between gap-4 mb-6"><div><p className="text-sm font-semibold uppercase tracking-wider text-accent">Current inventory</p><h2 className="font-display text-3xl font-bold mt-2">Available properties in {locality.name}</h2></div><span className="text-sm text-muted-foreground">{listings.length} listings</span></div>
            {listings.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{listings.map((property) => <PropertyListingCard key={property.slug} property={property} />)}</div> : <div className="rounded-2xl border border-border bg-card p-8"><p className="text-muted-foreground">No public listings are published for this locality yet. Share your requirement and we can check current options from our available network.</p><div className="flex flex-wrap gap-5 mt-5"><Link to="/buy-property" className="inline-flex items-center gap-2 text-accent font-semibold">Share requirement <ArrowRight size={16} /></Link><Link to="/sell-your-property" className="inline-flex items-center gap-2 text-accent font-semibold">List a property <ArrowRight size={16} /></Link></div></div>}
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Local buyer questions</p>
            <h2 className="font-display text-3xl font-bold mt-2">Frequently asked questions about {locality.name}</h2>
            <div className="mt-7 space-y-4">
              {locality.faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-border bg-card p-6"><h3 className="font-semibold text-lg">{faq.question}</h3><p className="text-muted-foreground mt-3 leading-relaxed">{faq.answer}</p></article>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-5"><Link to="/property-consultation" className="inline-flex items-center gap-2 text-accent font-semibold">Get property guidance <ArrowRight size={16} /></Link><Link to="/locations" className="inline-flex items-center gap-2 text-accent font-semibold">Explore more Nellore locations <ArrowRight size={16} /></Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
