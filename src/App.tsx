import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyCategoryPage from "./pages/PropertyCategoryPage";
import PropertyPage from "./pages/PropertyPage";
import BuyPropertyPage from "./pages/BuyPropertyPage";
import SellPropertyPage from "./pages/SellPropertyPage";
import LocationsPage from "./pages/LocationsPage";
import LocationPage from "./pages/LocationPage";
import PropertyIntelligencePage from "./pages/PropertyIntelligencePage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import CentralWorld from "./pages/centralworld";
import ScrollToTop from "./components/ScrollToTop";
import AnalyticsPageView from "./components/AnalyticsPageView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <AnalyticsPageView />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:category" element={<PropertyCategoryPage />} />
          <Route path="/property/:slug" element={<PropertyPage />} />
          <Route path="/buy-property" element={<BuyPropertyPage />} />
          <Route path="/sell-your-property" element={<SellPropertyPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:slug" element={<LocationPage />} />
          <Route path="/property-intelligence" element={<PropertyIntelligencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/centralworld" element={<CentralWorld />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
