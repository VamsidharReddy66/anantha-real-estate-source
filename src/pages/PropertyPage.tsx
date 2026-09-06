import React, { useEffect } from "react";
import { ArrowLeft, BadgeCheck, CalendarCheck, MapPin, MessageCircle, Phone, Ruler } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { getPropertyBySlug } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const PropertyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getPropertyBySlug(slug) : undefined;

  useEffect(() => {
    if (property) {
      trackEvent("property_view", {
        property_slug: property.slug,
        property_type: property.type,
        location: property.location,
        status: property.status,
      });
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen">
        <SEO title="Property Not Found | Anantha Real Estate" description="The requested property could not be found. Explore available properties in Nellore." path={`/property/${slug ?? "unknown"}`} />
        <Navbar />
        <main className="pt-32 pb-24 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-8">The property may no longer be available at this URL.</p>
          <Button asChild variant="brand"><Link to="/properties">Browse Properties</Link></Button>
        </main>
        <Footer />
      </div>
    );
  }

  const statusLabel = property.status.replace("-", " ");
  const verificationDate = property.lastVerifiedAt
    ? new Date(property.lastVerifiedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : undefined;
  const whatsappNumber = (property.whatsappPhone || property.enquiryPhone).replace(/\D/g, "");
  const whatsappText = encodeURIComponent(`Hi Anantha Real Estate, I am interested in ${property.name} at ${property.location}. Please share the current availability and details.`);
  const eventContext = { property_slug: property.slug, property_type: property.type, location: property.location };

  return (
    <div className="min-h-screen">
      <SEO
        title={property.seoTitle || `${property.name} | ${property.location} | Anantha Real Estate`}
        description={property.seoDescription || property.shortDescription}
        path={`/property/${property.slug}`}
        image={property.image}
      />
      <Navbar />

      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16">
          <div className="container mx-auto px-4">
            <Link to="/properties" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream mb-8"><ArrowLeft size={16} /> Back to Properties</Link>
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase">{statusLabel}</span>
                {property.verified && <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background/15 text-cream text-xs font-semibold"><BadgeCheck size={14} /> Listing details checked</span>}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-5">{property.name}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-cream/75">
                <span className="inline-flex items-center gap-2"><MapPin size={18} /> {property.location}, {property.city}</span>
                {verificationDate && <span className="inline-flex items-center gap-2"><CalendarCheck size={17} /> Checked {verificationDate}</span>}
              </div>
            </div>
          </div>
        </section>

        {(property.image || (property.gallery && property.gallery.length > 0)) && (
          <section className="pt-12">
            <div className="container mx-auto px-4">
              <div className="grid gap-4 md:grid-cols-2">
                {property.image && <img src={property.image} alt={property.imageAlt || property.name} className="h-full min-h-72 w-full rounded-2xl object-cover" />}
                {property.gallery && property.gallery.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {property.gallery.slice(0, 4).map((image) => <img key={image.src} src={image.src} alt={image.alt} className="h-36 md:h-full md:max-h-64 w-full rounded-2xl object-cover" loading="lazy" />)}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
              <article>
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {property.area && <div className="rounded-xl border border-border bg-card p-5"><span className="text-sm text-muted-foreground">Area</span><p className="font-semibold mt-1 inline-flex items-center gap-2"><Ruler size={16} /> {property.area}</p></div>}
                  {property.priceLabel && <div className="rounded-xl border border-border bg-card p-5"><span className="text-sm text-muted-foreground">Price</span><p className="font-semibold mt-1">{property.priceLabel}</p></div>}
                  {property.bedrooms !== undefined && <div className="rounded-xl border border-border bg-card p-5"><span className="text-sm text-muted-foreground">Bedrooms</span><p className="font-semibold mt-1">{property.bedrooms}</p></div>}
                  {property.bathrooms !== undefined && <div className="rounded-xl border border-border bg-card p-5"><span className="text-sm text-muted-foreground">Bathrooms</span><p className="font-semibold mt-1">{property.bathrooms}</p></div>}
                  {property.facing && <div className="rounded-xl border border-border bg-card p-5"><span className="text-sm text-muted-foreground">Facing</span><p className="font-semibold mt-1">{property.facing}</p></div>}
                  {property.roadWidth && <div className="rounded-xl border border-border bg-card p-5"><span className="text-sm text-muted-foreground">Road width</span><p className="font-semibold mt-1">{property.roadWidth}</p></div>}
                  {property.projectName && <div className="rounded-xl border border-border bg-card p-5 sm:col-span-2"><span className="text-sm text-muted-foreground">Project</span><p className="font-semibold mt-1">{property.projectName}</p></div>}
                </div>

                <h2 className="font-display text-3xl font-bold mb-5">About this property</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{property.description}</p>

                {property.highlights.length > 0 && (
                  <>
                    <h2 className="font-display text-3xl font-bold mt-12 mb-5">Property highlights</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {property.highlights.map((highlight) => <li key={highlight} className="rounded-xl border border-border bg-card p-4 font-medium">{highlight}</li>)}
                    </ul>
                  </>
                )}

                {property.amenities && property.amenities.length > 0 && (
                  <>
                    <h2 className="font-display text-3xl font-bold mt-12 mb-5">Amenities</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {property.amenities.map((amenity) => <li key={amenity} className="rounded-xl border border-border bg-card p-4 font-medium">{amenity}</li>)}
                    </ul>
                  </>
                )}

                <div className="mt-12 flex flex-wrap gap-4">
                  {property.sourceRoute && <Button asChild variant="outline"><Link to={property.sourceRoute}>View Project Page</Link></Button>}
                  {property.mapsUrl && <Button asChild variant="outline"><a href={property.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={17} /> View Map</a></Button>}
                  <Button asChild variant="brand"><a href={`tel:${property.enquiryPhone}`} onClick={() => trackEvent("phone_click", eventContext)}><Phone size={17} /> Call Now</a></Button>
                </div>
              </article>

              <aside className="rounded-2xl border border-border bg-card p-6 h-fit lg:sticky lg:top-28">
                <h2 className="font-display text-2xl font-bold mb-5">Interested in this property?</h2>
                <p className="text-muted-foreground mb-6">Speak with Anantha Real Estate to reconfirm current availability, pricing and arrange a site visit.</p>
                <div className="space-y-3">
                  <Button asChild variant="brand" className="w-full"><a href="https://calendly.com/jvk-aconsultancy/30min" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("site_visit_click", eventContext)}>Book a Site Visit</a></Button>
                  <Button asChild variant="outline" className="w-full"><a href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("whatsapp_click", eventContext)}><MessageCircle size={17} /> WhatsApp</a></Button>
                  <Button asChild variant="outline" className="w-full"><a href={`tel:${property.enquiryPhone}`} onClick={() => trackEvent("phone_click", eventContext)}><Phone size={17} /> Call {property.enquiryPhone.replace("+91", "+91 ")}</a></Button>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Listing availability, price, approvals and property documents can change. Please reconfirm all material details with our team and complete independent legal/document verification before making a purchase decision.</p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyPage;
