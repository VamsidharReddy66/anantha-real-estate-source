import { FormEvent, useState } from "react";
import { Home, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const SellPropertyPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", type: "Plot", location: "", area: "", expectedPrice: "", notes: "" });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    trackEvent("seller_lead_submit", { property_type: form.type, location: form.location, area: form.area });
    const message = `Hi Anantha Real Estate, I want to list/sell a property.\nName: ${form.name}\nPhone: ${form.phone}\nProperty type: ${form.type}\nLocation: ${form.location}\nArea: ${form.area || "Not specified"}\nExpected price: ${form.expectedPrice || "Not specified"}\nDetails: ${form.notes || "Please contact me for verification."}`;
    window.open(`https://wa.me/919391675372?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen">
      <SEO title="Sell Property in Nellore | Anantha Real Estate" description="Submit your property to Anantha Real Estate for review, verification, marketing and buyer matching in Nellore." path="/sell-your-property" />
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16 text-cream">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Property owners</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">List your property with Anantha.</h1>
            <p className="text-cream/75 mt-5 text-lg">Submit the basic details first. We review and confirm public information before publishing anything to customers.</p>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <Home className="w-12 h-12 text-accent mb-5" />
              <h2 className="font-display text-3xl font-bold">Owner workflow</h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>1. Submit basic property details.</p><p>2. Anantha reviews location, pricing and listing information.</p><p>3. Documents and private owner information stay internal.</p><p>4. Only approved public details are published.</p><p>5. Qualified buyer enquiries are routed back to our team.</p>
              </div>
              <div className="mt-7 rounded-xl bg-muted/50 p-4 text-sm flex gap-3"><ShieldCheck className="text-accent shrink-0" size={20} /><p>Do not send sensitive title documents through this public form. Our team will request required documents privately during verification.</p></div>
            </div>
            <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Owner / contact name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
                <input required placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3"><option>Plot</option><option>Apartment</option><option>Villa</option><option>Commercial</option><option>Land</option></select>
                <input required placeholder="Property location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Area / size" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
                <input placeholder="Expected price" value={form.expectedPrice} onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <textarea rows={5} placeholder="Property notes, road access, facing, development, etc." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3" />
              <Button type="submit" variant="brand" className="w-full">Submit property on WhatsApp</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellPropertyPage;
