import { ArrowRight, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import PremiumPageHero from "@/components/PremiumPageHero";
import PremiumCTA from "@/components/PremiumCTA";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Real Estate Projects in Nellore | Anantha Real Estate"
        description="Explore residential, township and commercial projects marketed by Anantha Real Estate in Nellore. Discover project details, developer information and dedicated project landing pages."
        path="/projects"
      />
      <Navbar />

      <main>
        <PremiumPageHero
          eyebrow="Projects"
          title="Projects selected for better property decisions."
          description="Explore projects represented or marketed by Anantha Real Estate, with project-level information kept separate from individual customer inventory."
        />

        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#f7f9ff]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-2">Featured Projects</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold">Developer & project inventory</h2>
              </div>
              <p className="text-sm text-muted-foreground">{projects.length} project{projects.length === 1 ? "" : "s"}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {projects.map((project) => (
                <article key={project.slug} className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#eef4ff] to-[#e9e8ff] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(94,177,227,0.24),transparent_32%)]" />
                    <Building2 className="w-16 h-16 text-brand-purple/35 relative z-10" aria-hidden="true" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold">{project.status}</span>
                      <span className="text-xs text-muted-foreground">{project.projectType}</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-brand-purple transition-colors">{project.name}</h2>
                    <p className="text-sm font-medium text-foreground mb-3">{project.companyName} · {project.companyRole}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4"><MapPin size={16} />{project.location}</div>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                    <Button variant="brand" className="w-full" asChild><Link to={project.marketingPath}>View Project <ArrowRight size={18} /></Link></Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PremiumCTA title="Representing a project in Nellore?" description="Anantha Real Estate can support project positioning, customer enquiries and structured sales coordination." href="/contact" label="Discuss Your Project" />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
