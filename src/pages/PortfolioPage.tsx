import React from "react";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Properties in Nellore | Anantha Real Estate Portfolio"
        description="Explore residential and land property opportunities in Nellore through Anantha Real Estate. View selected properties and book a site visit with our team."
        path="/portfolio"
      />
      <Navbar />

      <div className="pt-24 bg-gradient-to-b from-brand-dark to-brand-purple">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream text-center mb-4">
            Our Portfolio
          </h1>
          <p className="text-cream/70 text-center max-w-2xl mx-auto font-body">
            Explore selected property opportunities across Nellore and surrounding areas.
          </p>
        </div>
      </div>

      <Portfolio
        buttonText="Book Your Site Visit"
        buttonLink="https://calendly.com/jvk-aconsultancy/30min"
        external={true}
      />

      <Footer />
    </div>
  );
};

export default PortfolioPage;
