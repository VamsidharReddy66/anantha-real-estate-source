import { FormEvent, useRef, useState } from "react";
import { CheckCircle2, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { getAttribution, trackEvent } from "@/lib/analytics";

const initialForm = {
  name: "",
  phone: "",
  requirement: "Buy a property",
  propertyType: "Plot",
  location: "",
  budget: "",
  timeline: "Within 3 months",
  consent: false,
};

const PropertyConsultationPage = () => {
  const [form, setForm] = useState(initialForm);
  const started = useRef(false);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("lead_form_start", { form_name: "property_consultation" });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();

    const attribution = getAttribution();
    trackEvent("lead_submit", {
      form_name: "property_consultation",
      requirement: form.requirement,
      property_type: form.propertyType,
      purchase_timeline: form.timeline,
      destination: "whatsapp",
    });

    const campaign = [attribution.utm_source, attribution.utm_campaign]
      .filter(Boolean)
      .join(" / ");
    const message = [
      "Hi Anantha Real Estate, I would like a property consultation.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Requirement: ${form.requirement}`,
      `Property type: ${form.propertyType}`,
      `Preferred location: ${form.location || "Open to suggestions"}`,
      `Budget: ${form.budget || "To be discussed"}`,
      `Timeline: ${form.timeline}`,
      campaign ? `Campaign: ${campaign}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/919391675372?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Property Consultation in Nellore | Anantha Real Estate"
        description="Tell Anantha Real Estate what you want to buy, sell or invest in. Get a focused property consultation and relevant options across Nellore."
        path="/property-consultation"
      />
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-b from-brand-dark to-brand-purple text-cream">
          <div className="container mx-auto px-4 py-14 md:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
            <div className="pt-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Nellore property consultation
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-tight">
                Get property options matched to your actual requirement.
              </h1>
              <p className="text-cream/75 mt-6 text-lg leading-relaxed max-w-2xl">
                Share your location, budget and timeline. Our Nellore team will
                review current options and help you plan the next step.
              </p>
              <div className="mt-8 grid gap-4 text-cream/85">
                {[
                  "Local guidance across Nellore and nearby growth corridors",
                  "Residential, plots, land and commercial requirements",
                  "Clear next steps for shortlisting and site visits",
                ].map((item) => (
                  <p key={item} className="flex gap-3 items-start">
                    <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={20} />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <a
                href="tel:+919391675372"
                onClick={() =>
                  trackEvent("phone_click", {
                    placement: "consultation_hero",
                    phone_number: "primary",
                  })
                }
                className="inline-flex items-center gap-2 mt-9 text-cream font-semibold hover:text-accent transition-colors"
              >
                <Phone size={18} /> Prefer to call? +91 93916 75372
              </a>
            </div>

            <form
              onSubmit={submit}
              onFocus={markStarted}
              className="rounded-2xl bg-card text-card-foreground p-6 md:p-8 shadow-elevated space-y-4"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  Free consultation
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mt-2">
                  Tell us what you need
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  We will open WhatsApp with your details ready to send.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  Name
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Phone
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    minLength={7}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal"
                    placeholder="+91 phone number"
                  />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  I want to
                  <select
                    value={form.requirement}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal"
                  >
                    <option>Buy a property</option>
                    <option>Sell a property</option>
                    <option>Invest in property</option>
                    <option>Find commercial space</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Property type
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal"
                  >
                    <option>Plot</option>
                    <option>Apartment</option>
                    <option>House / Villa</option>
                    <option>Commercial property</option>
                    <option>Agricultural land</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  Preferred location
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal"
                    placeholder="Nellore area or locality"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Approximate budget
                  <input
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal"
                    placeholder="Example: ₹30–50 lakh"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium">
                When are you planning?
                <select
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className="rounded-xl border border-border bg-background px-4 py-3 font-normal"
                >
                  <option>Immediately</option>
                  <option>Within 1 month</option>
                  <option>Within 3 months</option>
                  <option>Within 6 months</option>
                  <option>Just researching</option>
                </select>
              </label>

              <label className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                <input
                  required
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-1"
                />
                <span>
                  I agree that Anantha Real Estate may contact me about this
                  property requirement.
                </span>
              </label>

              <Button type="submit" variant="brand" size="lg" className="w-full">
                <MessageCircle size={18} /> Continue on WhatsApp
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Your name and phone number are not sent to advertising analytics.
              </p>
            </form>
          </div>
        </section>

        <section className="py-14 border-b border-border">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
            {[
              ["1", "Share the requirement", "Tell us the property type, preferred area, budget and timeline."],
              ["2", "Receive a focused shortlist", "We check current information and contact you with relevant options."],
              ["3", "Plan the next step", "Compare options, clarify details and arrange a site visit when ready."],
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-2xl border border-border bg-card p-6">
                <span className="text-accent text-sm font-bold">{number}</span>
                <h2 className="font-display text-xl font-bold mt-3">{title}</h2>
                <p className="text-muted-foreground mt-3 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <ShieldCheck className="mx-auto text-accent" size={34} />
            <h2 className="font-display text-3xl font-bold mt-4">
              Clear guidance before commitment
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Property availability, pricing and approvals can change. We help
              you reconfirm material details and recommend independent legal and
              document verification before a purchase decision.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyConsultationPage;
