import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="About Anantha Real Estate | Nellore Property Experts"
        description="Learn about Anantha Real Estate, a Nellore-focused property consultancy helping buyers, sellers and investors with local real estate expertise and end-to-end support."
        path="/about"
      />
      <Navbar />
      <div className="pt-24 bg-gradient-to-b from-brand-dark to-brand-purple">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream text-center mb-4">
            About Us
          </h1>
          <p className="text-cream/70 text-center max-w-2xl mx-auto font-body">
            Learn more about our journey and commitment to excellence in real estate
          </p>
        </div>
      </div>
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default AboutPage;
