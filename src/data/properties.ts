export type PropertyStatus = "available" | "sold" | "under-negotiation" | "unavailable";

export type Property = {
  slug: string;
  name: string;
  type: "plots" | "apartments" | "villas" | "commercial" | "land" | "township";
  status: PropertyStatus;
  verified: boolean;
  location: string;
  city: string;
  developer?: string;
  projectSlug?: string;
  projectName?: string;
  area?: string;
  price?: number;
  priceLabel?: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  enquiryPhone: string;
  sourceRoute?: string;
  image?: string;
  gallery?: string[];
  publishedAt?: string;
  updatedAt?: string;
};

// Customer-facing inventory is intentionally separate from project inventory.
// Only approved public fields belong here. Never publish private owner details,
// confidential documents, or unverified pricing/availability.
// Add a listing only after the Anantha team has confirmed the public details.
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

export const getPropertiesByProject = (projectSlug: string) =>
  properties.filter((property) => property.projectSlug === projectSlug);
