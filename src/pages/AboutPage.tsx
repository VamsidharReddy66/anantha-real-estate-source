import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PremiumPageHero from "@/components/PremiumPageHero";
import PremiumCTA from "@/components/PremiumCTA";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Anantha Real Estate | Nellore Property Experts"
        description="Learn about Anantha Real Estate, a Nellore-focused property consultancy helping buyers, sellers and investors with local real estate expertise and end-to-end support."
        path="/about"
      />
      <Navbar />
      <main>
        <PremiumPageHero
          eyebrow="About Anantha"
          title="Building value through clarity, trust and long-term relationships."
          description="Anantha Real Estate combines local market knowledge, technology and hands-on guidance to make property decisions easier to understand and easier to execute."
        />
        <About />
        <Testimonials />
        <PremiumCTA title="Looking for a real estate partner in Nellore?" description="Share your requirement and speak directly with our team about the next step." />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
