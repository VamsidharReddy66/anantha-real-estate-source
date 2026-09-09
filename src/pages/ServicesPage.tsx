import React, { FC } from "react";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PremiumPageHero from "@/components/PremiumPageHero";
import PremiumCTA from "@/components/PremiumCTA";

const ServicesPage: FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Real Estate Services in Nellore | Anantha Real Estate"
        description="Explore Anantha Real Estate services in Nellore including property search, buying and selling support, valuation, legal assistance, loan support and investment advisory."
        path="/services"
      />
      <Navbar />
      <main>
        <PremiumPageHero
          eyebrow="Our Services"
          title="Complete real estate support, designed around your requirement."
          description="From property discovery and project marketing to investment advisory, documentation and transaction support, every service follows one consistent, transparent process."
        />
        <Services showSmallIntro={false} showCTA={false} />
        <PremiumCTA title="Need help with a property decision?" description="Tell us what you are trying to achieve and we will guide you to the right service and next step." />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
