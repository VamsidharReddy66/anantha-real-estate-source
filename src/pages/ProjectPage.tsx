import { ArrowLeft, ArrowRight, Building2, MapPin, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyListingCard from "@/components/PropertyListingCard";
import { Button } from "@/components/ui/button";
import { getProjectBySlug } from "@/data/projects";
import { getPropertiesByProject } from "@/data/properties";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const inventory = slug ? getPropertiesByProject(slug).filter((property) => property.status !== "unavailable") : [];

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-24"><div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-display text-4xl font-bold mb-4">Project not found</h1>
          <p className="text-muted-foreground mb-8">The project you are looking for is not currently available in our project inventory.</p>
          <Button variant="brand" asChild><Link to="/projects">Back to Projects</Link></Button>
        </div></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title={project.seoTitle} description={project.seoDescription} path={`/project/${project.slug}`} />
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"><ArrowLeft size={16} /> Back to Projects</Link>

          <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
            <div>
              <div className="aspect-[16/10] rounded-3xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center overflow-hidden"><Building2 className="w-24 h-24 text-accent/30" aria-hidden="true" /></div>
              <div className="mt-8">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">{project.status}</span>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-5 mb-4">{project.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            </div>

            <aside className="bg-card rounded-2xl border border-border p-7 lg:sticky lg:top-28">
              <p className="text-sm text-muted-foreground mb-2">Developer / Company</p>
              <h2 className="font-display text-2xl font-bold text-foreground mb-5">{project.companyName}</h2>
              <div className="space-y-4 text-sm">
                <div><span className="text-muted-foreground block">Project Type</span><span className="font-medium text-foreground">{project.projectType}</span></div>
                <div><span className="text-muted-foreground block">Location</span><span className="font-medium text-foreground inline-flex items-center gap-2"><MapPin size={16} /> {project.location}</span></div>
              </div>
              <div className="flex flex-col gap-3 mt-7">
                <Button variant="brand" asChild><a href="https://calendly.com/jvk-aconsultancy/30min" target="_blank" rel="noopener noreferrer">Book a Project Consultation <ArrowRight size={18} /></a></Button>
                {project.phone && <Button variant="outline" asChild><a href={`tel:${project.phone.replace(/\s+/g, "")}`}><Phone size={17} /> {project.phone}</a></Button>}
              </div>
            </aside>
          </section>

          <section className="mt-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Project Highlights</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{project.highlights.map((highlight) => <div key={highlight} className="bg-card border border-border rounded-xl p-5"><p className="text-foreground font-medium">{highlight}</p></div>)}</div>
          </section>

          <section className="mt-16">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div><p className="text-sm font-semibold uppercase tracking-wider text-accent">Customer inventory</p><h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Available in this project</h2></div>
              <span className="text-sm text-muted-foreground">{inventory.length} listing{inventory.length === 1 ? "" : "s"}</span>
            </div>
            {inventory.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{inventory.map((property) => <PropertyListingCard key={property.slug} property={property} />)}</div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8"><p className="text-muted-foreground">Customer inventory for this project will appear here once individual properties are approved for public listing. Contact us for current availability.</p></div>
            )}
          </section>

          <section className="mt-16 rounded-2xl bg-card border border-border p-8 md:p-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Marketing &amp; Sales Enquiries</h2>
            <p className="text-muted-foreground max-w-3xl leading-relaxed mb-6">This project record connects project-level marketing with customer-facing inventory such as plots, apartments, villas or commercial units. Availability, pricing and approvals should be confirmed with the Anantha Real Estate team before any customer commitment.</p>
            <Button variant="brand" asChild><Link to="/contact">Enquire About This Project</Link></Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPage;
