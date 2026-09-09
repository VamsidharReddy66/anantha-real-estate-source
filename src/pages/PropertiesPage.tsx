import React, { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Home, MessageCircle, RotateCcw, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyListingCard from "@/components/PropertyListingCard";
import PremiumPageHero from "@/components/PremiumPageHero";
import PremiumCTA from "@/components/PremiumCTA";
import { propertyCategories, properties } from "@/data/properties";

const initialListingForm = { ownerName: "", phone: "", propertyType: "Plot", location: "", area: "", facing: "", roadWidth: "", expectedPrice: "", description: "", consent: false };

const PropertiesPage: React.FC = () => {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [status, setStatus] = useState("available");
  const [project, setProject] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [listingForm, setListingForm] = useState(initialListingForm);
  const locations = useMemo(() => Array.from(new Set(properties.map((property) => property.location))).sort(), []);
  const projects = useMemo(() => Array.from(new Set(properties.map((property) => property.projectName).filter(Boolean) as string[])).sort(), []);

  const listings = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = properties.filter((property) => {
      const matchesCategory = category === "all" || property.type === category;
      const matchesLocation = location === "all" || property.location === location;
      const matchesStatus = status === "all" || property.status === status;
      const matchesProject = project === "all" || property.projectName === project;
      const matchesSearch = !query || [property.name, property.location, property.city, property.projectName, property.developer, property.shortDescription].filter(Boolean).some((value) => value!.toLowerCase().includes(query));
      return matchesCategory && matchesLocation && matchesStatus && matchesProject && matchesSearch && property.status !== "unavailable";
    });
    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER);
      if (sort === "price-high") return (b.price ?? -1) - (a.price ?? -1);
      if (sort === "area-high") return (b.areaValue ?? -1) - (a.areaValue ?? -1);
      return new Date(b.updatedAt || b.publishedAt || 0).getTime() - new Date(a.updatedAt || a.publishedAt || 0).getTime();
    });
  }, [category, location, status, project, search, sort]);

  const resetFilters = () => { setCategory("all"); setLocation("all"); setStatus("available"); setProject("all"); setSearch(""); setSort("latest"); };

  const submitProperty = (event: FormEvent) => {
    event.preventDefault();
    const message = [
      "Hi Anantha Real Estate, I want to list my property for verification.",
      `Owner name: ${listingForm.ownerName}`, `Phone: ${listingForm.phone}`, `Property type: ${listingForm.propertyType}`,
      `Location: ${listingForm.location}`, `Area / Size: ${listingForm.area || "To be shared"}`, `Facing: ${listingForm.facing || "To be shared"}`,
      `Road width: ${listingForm.roadWidth || "To be shared"}`, `Expected price: ${listingForm.expectedPrice || "To be discussed"}`,
      `Property details: ${listingForm.description || "To be shared"}`, "I understand the property will be reviewed before it is published publicly."
    ].join("\n");
    window.open(`https://wa.me/919391675372?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const selectClass = "rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition";
  const inputClass = "w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition";

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Properties for Sale in Nellore | Anantha Real Estate" description="Browse customer-facing property listings in Nellore including plots, apartments, villas, commercial property and land from Anantha Real Estate." path="/properties" />
      <Navbar />
      <main>
        <PremiumPageHero eyebrow="Properties" title="Find property with more clarity and less noise." description="Browse approved customer-facing inventory across plots, apartments, villas, commercial property and land. Availability and pricing are reconfirmed before you proceed." actions={<a href="#list-property" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-accent px-5 py-3 font-semibold text-white shadow-lg"><Home size={18} /> List Your Property</a>} />

        <section className="relative z-10 -mt-8 md:-mt-10"><div className="container mx-auto px-4"><div className="rounded-2xl border border-border bg-white shadow-xl p-4 md:p-6">
          <div className="grid gap-4 lg:grid-cols-6">
            <div className="relative lg:col-span-2"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search property, project or area" className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition" /></div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}><option value="all">All property types</option>{propertyCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectClass}><option value="all">All areas</option>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}><option value="available">Available</option><option value="under-negotiation">Under negotiation</option><option value="sold">Sold</option><option value="all">All statuses</option></select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}><option value="latest">Latest updated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="area-high">Area: largest first</option></select>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">{projects.length > 0 ? <select value={project} onChange={(e) => setProject(e.target.value)} className={`${selectClass} sm:max-w-xs`}><option value="all">All projects</option>{projects.map((item) => <option key={item} value={item}>{item}</option>)}</select> : <span className="text-sm text-muted-foreground">Use filters to narrow your search.</span>}<button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:text-accent"><RotateCcw size={15} /> Reset filters</button></div>
        </div></div></section>

        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#f7f9ff]"><div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-8"><div><p className="text-xs uppercase tracking-[0.2em] font-bold text-accent">Customer Listings</p><h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Handpicked property inventory</h2></div><span className="text-sm text-muted-foreground">{listings.length} listing{listings.length === 1 ? "" : "s"}</span></div>
          {listings.length === 0 ? <div className="rounded-2xl border border-border bg-white p-10 text-center max-w-3xl mx-auto shadow-sm"><h3 className="font-display text-2xl font-bold mb-3">No matching public listings right now</h3><p className="text-muted-foreground mb-6">We publish inventory only after customer-facing details are approved. Share your requirement and our team can check current options.</p><div className="flex flex-wrap items-center justify-center gap-4"><Link to="/property-consultation" className="inline-flex items-center gap-2 font-semibold text-accent">Share your requirement <ArrowRight size={16} /></Link><button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"><RotateCcw size={15} /> Clear filters</button></div></div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{listings.map((property) => <PropertyListingCard key={property.slug} property={property} />)}</div>}
        </div></section>

        <section id="list-property" className="py-16 md:py-20 bg-white scroll-mt-24"><div className="container mx-auto px-4"><div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start rounded-3xl border border-border bg-[#f8faff] p-6 md:p-10 shadow-sm">
          <div><p className="text-xs uppercase tracking-[0.2em] font-bold text-accent">For Property Owners</p><h2 className="font-display text-3xl md:text-4xl font-bold mt-3">List your property with Anantha Real Estate</h2><p className="mt-5 text-muted-foreground leading-relaxed">Share the basic property details here. Your owner name and phone number stay private. Our team will verify the property before any public listing is created.</p>
            <div className="mt-8 grid gap-4">{[[CheckCircle2,"Submit basic property details"],[ShieldCheck,"Our team verifies the listing information"],[Home,"Only approved public details are published"]].map(([Icon,text]) => { const ItemIcon = Icon as typeof CheckCircle2; return <div key={text as string} className="flex items-center gap-3 text-sm font-medium"><span className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-accent"><ItemIcon size={18} /></span>{text as string}</div>; })}</div>
            <div className="mt-8 rounded-2xl border border-accent/15 bg-white p-5"><p className="font-semibold">Privacy note</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Owner phone numbers, identity and private documents are never shown on the public property page. Buyers contact Anantha Real Estate first.</p></div>
          </div>
          <form onSubmit={submitProperty} className="rounded-2xl bg-white border border-border p-5 md:p-7 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4"><label className="grid gap-2 text-sm font-medium">Owner name<input required autoComplete="name" value={listingForm.ownerName} onChange={(e) => setListingForm({...listingForm,ownerName:e.target.value})} className={inputClass} placeholder="Your name" /></label><label className="grid gap-2 text-sm font-medium">Phone number<input required type="tel" autoComplete="tel" inputMode="tel" value={listingForm.phone} onChange={(e) => setListingForm({...listingForm,phone:e.target.value})} className={inputClass} placeholder="+91 phone number" /></label></div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4"><label className="grid gap-2 text-sm font-medium">Property type<select value={listingForm.propertyType} onChange={(e) => setListingForm({...listingForm,propertyType:e.target.value})} className={selectClass}><option>Plot</option><option>Apartment</option><option>House / Villa</option><option>Commercial Property</option><option>Agricultural Land</option><option>Other</option></select></label><label className="grid gap-2 text-sm font-medium">Property location<input required value={listingForm.location} onChange={(e) => setListingForm({...listingForm,location:e.target.value})} className={inputClass} placeholder="Area / locality" /></label></div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4"><label className="grid gap-2 text-sm font-medium">Area / Size<input value={listingForm.area} onChange={(e) => setListingForm({...listingForm,area:e.target.value})} className={inputClass} placeholder="Example: 200 ankanams / 1800 sq ft" /></label><label className="grid gap-2 text-sm font-medium">Expected price<input value={listingForm.expectedPrice} onChange={(e) => setListingForm({...listingForm,expectedPrice:e.target.value})} className={inputClass} placeholder="Example: ₹45 lakh" /></label></div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4"><label className="grid gap-2 text-sm font-medium">Facing<input value={listingForm.facing} onChange={(e) => setListingForm({...listingForm,facing:e.target.value})} className={inputClass} placeholder="East / West / North / South" /></label><label className="grid gap-2 text-sm font-medium">Road width<input value={listingForm.roadWidth} onChange={(e) => setListingForm({...listingForm,roadWidth:e.target.value})} className={inputClass} placeholder="Example: 30 ft" /></label></div>
            <label className="grid gap-2 text-sm font-medium mt-4">Property details<textarea rows={4} value={listingForm.description} onChange={(e) => setListingForm({...listingForm,description:e.target.value})} className={inputClass} placeholder="Share nearby landmarks, approvals, bedrooms, amenities or any important information." /></label>
            <label className="mt-4 flex gap-3 text-xs leading-relaxed text-muted-foreground"><input required type="checkbox" checked={listingForm.consent} onChange={(e) => setListingForm({...listingForm,consent:e.target.checked})} className="mt-1" /><span>I confirm that I am authorised to share these property details and agree that Anantha Real Estate may contact me for verification and listing support.</span></label>
            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-accent px-6 py-4 font-semibold text-white shadow-lg"><MessageCircle size={18} /> Submit Property on WhatsApp</button><p className="mt-3 text-center text-xs text-muted-foreground">After WhatsApp opens, you can also send property photos, location pin and documents directly to our team.</p>
          </form>
        </div></div></section>

        <section className="py-16 bg-white"><div className="container mx-auto px-4"><p className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-2">Browse by Type</p><h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Explore the right property category</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{propertyCategories.map((item) => <Link key={item.slug} to={`/properties/${item.slug}`} className="group rounded-2xl border border-border bg-white p-7 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all"><div className="w-10 h-1 rounded-full bg-gradient-to-r from-brand-purple to-accent mb-6" /><h3 className="font-display text-2xl font-bold mb-3 group-hover:text-brand-purple">{item.name}</h3><p className="text-muted-foreground mb-6">{item.description}</p><span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">Explore {item.name} <ArrowRight size={16} /></span></Link>)}</div></div></section>
        <PremiumCTA title="Can’t find the right option?" description="Share your property type, budget and preferred area and we will check relevant opportunities for you." />
      </main><Footer />
    </div>
  );
};
export default PropertiesPage;
