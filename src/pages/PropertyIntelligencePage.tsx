import { ArrowRight, BarChart3, Building2, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PremiumPageHero from "@/components/PremiumPageHero";
import PremiumCTA from "@/components/PremiumCTA";

const topics = [
  { title: "Nellore Market Updates", description: "Track supply, buyer activity, new projects and major development signals across Nellore.", icon: BarChart3 },
  { title: "Property Discovery", description: "Compare property types, availability and buyer-ready inventory with clearer context.", icon: Search },
  { title: "Project Intelligence", description: "Explore project-level information, developer context and available customer inventory.", icon: Building2 },
  { title: "Buyer Education", description: "Learn what to verify before paying an advance, registering property or making an investment decision.", icon: ShieldCheck },
];

const PropertyIntelligencePage = () => (
  <div className="min-h-screen bg-background">
    <SEO title="Nellore Property Intelligence | Anantha Real Estate" description="Property market updates, buyer education, project intelligence and investment insights for Nellore real estate." path="/property-intelligence" />
    <Navbar />
    <main>
      <PremiumPageHero
        eyebrow="Property Intelligence"
        title="Understand the market before you make the move."
        description="A practical knowledge hub for Nellore real estate: project information, buyer education, market updates and investment context designed to support better decisions."
      />

      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#f7f9ff]">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          {topics.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-border bg-white p-7 md:p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple/10 to-accent/15 text-brand-purple flex items-center justify-center mb-6">
                <Icon size={23} />
              </div>
              <h2 className="font-display text-2xl font-bold">{title}</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20 bg-[#f7f9ff]">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          <Link to="/properties" className="group rounded-2xl bg-white border border-border p-7 shadow-sm hover:shadow-xl transition-all">
            <h3 className="font-display text-xl font-bold">Explore Properties</h3>
            <span className="inline-flex items-center gap-2 text-accent font-semibold mt-5 group-hover:gap-3 transition-all">View inventory <ArrowRight size={16} /></span>
          </Link>
          <Link to="/projects" className="group rounded-2xl bg-white border border-border p-7 shadow-sm hover:shadow-xl transition-all">
            <h3 className="font-display text-xl font-bold">Explore Projects</h3>
            <span className="inline-flex items-center gap-2 text-accent font-semibold mt-5 group-hover:gap-3 transition-all">View project inventory <ArrowRight size={16} /></span>
          </Link>
          <Link to="/property-consultation" className="group rounded-2xl bg-gradient-to-br from-brand-purple to-accent text-cream p-7 shadow-lg hover:-translate-y-1 transition-all">
            <h3 className="font-display text-xl font-bold">Need Property Guidance?</h3>
            <span className="inline-flex items-center gap-2 text-cream font-semibold mt-5 group-hover:gap-3 transition-all">Start a consultation <ArrowRight size={16} /></span>
          </Link>
        </div>
      </section>

      <PremiumCTA title="Have a specific property question?" description="Share your requirement and our team will help you turn the information into a practical next step." />
    </main>
    <Footer />
  </div>
);

export default PropertyIntelligencePage;
