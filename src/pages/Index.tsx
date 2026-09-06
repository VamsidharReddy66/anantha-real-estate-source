import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Real Estate in Nellore | Buy, Sell & Invest | Anantha Real Estate"
        description="Anantha Real Estate helps you buy, sell and invest in residential, plots and commercial properties in Nellore, Andhra Pradesh with local property expertise and end-to-end support."
        path="/"
      />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio limit={3} />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
