import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Anantha Real Estate | Nellore Property Consultants"
        description="Contact Anantha Real Estate in Nellore for property buying, selling, investment and site-visit assistance. Speak with our local real estate team."
        path="/contact"
      />
      <Navbar />
      <div className="pt-24 bg-gradient-to-b from-brand-dark to-brand-purple">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream text-center mb-4">
            Contact Us
          </h1>
          <p className="text-cream/70 text-center max-w-2xl mx-auto font-body">
            Get in touch with our expert team for all your real estate needs
          </p>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
