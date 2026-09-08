import { FormEvent, useState } from "react";
import { Home, ShieldCheck, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const initialForm = { ownerName: "", phone: "", sellerRole: "Owner", propertyType: "Plot", purpose: "Sell", location: "", locality: "", area: "", expectedPrice: "", facing: "", roadAccess: "", approvals: "", notes: "", consent: false };

const SellPropertyPage = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; propertyId?: string } | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);
    trackEvent("seller_lead_submit", { property_type: form.propertyType, location: form.location, area: form.area, purpose: form.purpose });
    try {
      const response = await fetch("/api/property-listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to submit property.");
      setResult({ ok: true, message: payload.message, propertyId: payload.propertyId });
      setForm(initialForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit property.";
      setResult({ ok: false, message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO title="List or Sell Property in Nellore | Anantha Real Estate" description="Property owners, builders and authorised sellers can list property with Anantha Real Estate for verification, buyer matching, site visits and transaction coordination in Nellore." path="/sell-your-property" />
      <Navbar />
      <main className="pt-24">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple py-16 text-cream">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Nellore property owners</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-3">List your property with Anantha.</h1>
            <p className="text-cream/75 mt-5 text-lg max-w-3xl">Selling or renting a property in Nellore or nearby? Add it to Anantha's private inventory. We verify the listing, match it with relevant buyers or tenants, coordinate enquiries and site visits, and assist through closing.</p>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
            <div>
              <Home className="w-12 h-12 text-accent mb-5" />
              <h2 className="font-display text-3xl font-bold">How owner listing works</h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>1. Submit the property and owner/contact details.</p>
                <p>2. Anantha contacts the owner or authorised seller and confirms availability.</p>
                <p>3. We review property information and request documents privately when required.</p>
                <p>4. Verified properties enter Anantha's active inventory and buyer-matching process.</p>
                <p>5. We coordinate qualified enquiries, site visits, negotiation and closing.</p>
              </div>
              <div className="mt-7 rounded-xl bg-muted/50 p-4 text-sm flex gap-3"><ShieldCheck className="text-accent shrink-0" size={20} /><p>Owner phone numbers, identity details and title documents are private internal information. They are not automatically published to buyers.</p></div>
            </div>
            <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input required placeholder="Owner / authorised seller name" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
                <input required type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select value={form.sellerRole} onChange={(e) => setForm({ ...form, sellerRole: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3"><option>Owner</option><option>Builder / Developer</option><option>Authorised seller / representative</option></select>
                <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3"><option>Sell</option><option>Rent / Lease</option></select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3"><option>Plot</option><option>House / Villa</option><option>Apartment</option><option>Commercial property</option><option>Agricultural land</option><option>Industrial / Warehouse</option><option>Development land</option></select>
                <input required placeholder="Property location / village / area" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Locality / landmark" value={form.locality} onChange={(e) => setForm({ ...form, locality: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
                <input placeholder="Area / size" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Expected price / rent" value={form.expectedPrice} onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
                <input placeholder="Facing (if applicable)" value={form.facing} onChange={(e) => setForm({ ...form, facing: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Road width / access" value={form.roadAccess} onChange={(e) => setForm({ ...form, roadAccess: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
                <input placeholder="Approvals / layout / RERA if known" value={form.approvals} onChange={(e) => setForm({ ...form, approvals: e.target.value })} className="rounded-xl border border-border bg-background px-4 py-3" />
              </div>
              <textarea rows={4} placeholder="Additional property details" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-xl border border-border bg-background px-4 py-3" />
              <label className="flex gap-3 text-sm text-muted-foreground"><input required type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" /><span>I confirm that I am the owner or authorised to submit this property and consent to Anantha Real Estate contacting me and using these details internally for verification and buyer/tenant matching.</span></label>
              {result && <div className={`rounded-xl p-4 text-sm ${result.ok ? "bg-muted/60" : "border border-destructive/30"}`}>{result.ok && <CheckCircle2 className="inline mr-2 text-accent" size={18} />}<span>{result.message}</span>{result.propertyId && <p className="font-semibold mt-2">Reference: {result.propertyId}</p>}</div>}
              <Button disabled={submitting} type="submit" variant="brand" className="w-full">{submitting ? "Adding to inventory…" : "List my property with Anantha"}</Button>
              <p className="text-xs text-muted-foreground text-center">Submission does not mean the property is publicly advertised. Anantha verifies it first.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellPropertyPage;
