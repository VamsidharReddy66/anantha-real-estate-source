export type PropertyStatus = "available" | "sold" | "under-negotiation" | "unavailable";

export type Property = {
  slug: string;
  name: string;
  type: "plots" | "apartments" | "villas" | "commercial" | "land" | "township";
  status: PropertyStatus;
  location: string;
  city: string;
  developer?: string;
  projectSlug?: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  enquiryPhone: string;
  sourceRoute?: string;
};

// Individual property inventory is intentionally separate from project inventory.
// A project can contain many individual properties or units. Add a property only
// after its approved public details have been confirmed by the Anantha team.
export const properties: Property[] = [];

export const propertyCategories = [
  {
    slug: "plots",
    name: "Plots for Sale",
    description: "Explore plotted development opportunities in and around Nellore.",
  },
  {
    slug: "apartments",
    name: "Apartments",
    description: "Residential apartment opportunities for buyers and investors.",
  },
  {
    slug: "villas",
    name: "Villas",
    description: "Villa and premium residential opportunities in Nellore.",
  },
  {
    slug: "commercial",
    name: "Commercial Property",
    description: "Office, retail and other commercial property opportunities.",
  },
  {
    slug: "land",
    name: "Land & Farmland",
    description: "Land opportunities for end use, development and investment.",
  },
];

export const getPropertyBySlug = (slug: string) =>
  properties.find((property) => property.slug === slug);
