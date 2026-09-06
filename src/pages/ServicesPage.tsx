import React, { FC } from "react";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ServicesPage: FC = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Real Estate Services in Nellore | Anantha Real Estate"
        description="Explore Anantha Real Estate services in Nellore including property search, buying and selling support, valuation, legal assistance, loan support and investment advisory."
        path="/services"
      />
      <Navbar />

      <div className="pt-24 bg-gradient-to-b from-brand-dark to-brand-purple">
        <div className="container mx-auto px-4 py-16">
          <p className="font-display text-4xl md:text-5xl font-bold text-cream text-center mb-4">
            Our Services
          </p>
          <h2 className="font-display text-cream/70 text-center max-w-2xl mx-auto">
            From property search to final handover, we provide complete support
            for all your real estate needs.
          </h2>
        </div>
      </div>

      <Services showSmallIntro={false} showCTA={false} />

      <Footer />
    </div>
  );
};

export default ServicesPage;
