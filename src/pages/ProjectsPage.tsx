import { ArrowRight, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Real Estate Projects in Nellore | Anantha Real Estate"
        description="Explore residential, township and commercial projects marketed by Anantha Real Estate in Nellore. Discover project details, developer information and dedicated project landing pages."
        path="/projects"
      />
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <span className="text-accent font-medium text-sm tracking-wider uppercase mb-4 block">
              Projects
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Projects &amp; Developer Inventory
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore projects represented or marketed by Anantha Real Estate.
              Each project can have its own dedicated marketing landing page,
              while the project record keeps the developer and project-level
              information separate from individual property inventory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-elevated transition-all duration-300"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-accent/30" aria-hidden="true" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      {project.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.projectType}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {project.name}
                  </h2>
                  <p className="text-sm font-medium text-foreground mb-3">
                    {project.companyName} · {project.companyRole}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin size={16} aria-hidden="true" />
                    {project.location}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <Button variant="brand" className="w-full" asChild>
                    <Link to={project.marketingPath}>
                      View Project <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Looking to list a project?
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Developers and project companies can work with Anantha Real
              Estate to create a dedicated project presence, generate qualified
              enquiries and connect project inventory with our sales process.
            </p>
            <Button variant="brand" asChild>
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
