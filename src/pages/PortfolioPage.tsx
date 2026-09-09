import React from "react";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PremiumPageHero from "@/components/PremiumPageHero";
import PremiumCTA from "@/components/PremiumCTA";

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Properties in Nellore | Anantha Real Estate Portfolio"
        description="Explore residential and land property opportunities in Nellore through Anantha Real Estate. View selected properties and book a site visit with our team."
        path="/portfolio"
      />
      <Navbar />
      <main>
        <PremiumPageHero
          eyebrow="Our Portfolio"
          title="Selected work, properties and project activity."
          description="Explore a curated view of the properties, projects and real estate work represented by Anantha Real Estate."
        />
        <Portfolio
          buttonText="Book Your Site Visit"
          buttonLink="https://calendly.com/jvk-aconsultancy/30min"
          external={true}
        />
        <PremiumCTA title="Want to discuss one of these opportunities?" description="Speak with our team to confirm current availability and arrange the next step." />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
