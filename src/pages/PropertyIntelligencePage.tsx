import { ArrowRight, BarChart3, Building2, Map, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const topics = [
  { title: "Nellore Market Updates", description: "Track supply, buyer activity, new projects and major development signals across Nellore.", icon: BarChart3 },
  { title: "Location Guides", description: "Understand micro-markets, property types and current inventory area by area.", icon: Map },
  { title: "Project Intelligence", description: "Explore project-level information, developer context and available customer inventory.", icon: Building2 },
  { title: "Buyer Education", description: "Learn what to verify before paying an advance, registering property or making an investment decision.", icon: ShieldCheck },
];

const PropertyIntelligencePage = () => (
  <div className="min-h-screen">
    <SEO title="Nellore Property Intelligence | Anantha Real Estate" description="Property market updates, area guides, buyer education, project intelligence and investment insights for Nellore real estate." path="/property-intelligence" />
    <Navbar />
    <main className="pt-24">
      <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16 text-cream">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Anantha Property Intelligence</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">Understand the market before you buy.</h1>
          <p className="text-cream/75 mt-5 text-lg max-w-3xl">A growing knowledge hub for Nellore real estate: locality guides, project information, buyer education, market updates and investment context.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          {topics.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-7">
              <Icon className="text-accent mb-5" />
              <h2 className="font-display text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          <Link to="/locations" className="rounded-2xl bg-muted/50 p-6 hover:shadow-elevated transition-all"><h3 className="font-display text-xl font-bold">Explore Nellore Areas</h3><span className="inline-flex items-center gap-2 text-accent font-semibold mt-5">View location guides <ArrowRight size={16} /></span></Link>
          <Link to="/projects" className="rounded-2xl bg-muted/50 p-6 hover:shadow-elevated transition-all"><h3 className="font-display text-xl font-bold">Explore Projects</h3><span className="inline-flex items-center gap-2 text-accent font-semibold mt-5">View project inventory <ArrowRight size={16} /></span></Link>
          <Link to="/buy-property" className="rounded-2xl bg-muted/50 p-6 hover:shadow-elevated transition-all"><h3 className="font-display text-xl font-bold">Need Property Matching?</h3><span className="inline-flex items-center gap-2 text-accent font-semibold mt-5">Share requirement <ArrowRight size={16} /></span></Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default PropertyIntelligencePage;
