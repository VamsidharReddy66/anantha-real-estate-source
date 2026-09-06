export type PropertyStatus = "available" | "sold" | "under-negotiation" | "unavailable";

export type Property = {
  slug: string;
  name: string;
  type: "plots" | "apartments" | "villas" | "commercial" | "land" | "township";
  status: PropertyStatus;
  location: string;
  city: string;
  developer?: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  enquiryPhone: string;
  sourceRoute?: string;
};

// Only verified project information is stored here. Add new listings after their
// approved public details have been confirmed by the Anantha team.
export const properties: Property[] = [
  {
    slug: "central-world-nellore",
    name: "Central World",
    type: "township",
    status: "available",
    location: "Kanaparthi Padu, Nellore",
    city: "Nellore",
    developer: "Green Home Developers",
    shortDescription:
      "A 125-acre premium township with a 31,000 sq ft clubhouse in Nellore.",
    description:
      "Central World is a premium township by Green Home Developers at Kanaparthi Padu, Nellore. The project is presented as NUDA and RERA approved and within NMC limits. Anantha Real Estate markets the project and assists with site visits.",
    highlights: [
      "125-acre township",
      "31,000 sq ft clubhouse",
      "Kanaparthi Padu, Nellore",
      "NUDA & RERA approved",
      "NMC limits",
    ],
    enquiryPhone: "+919391675372",
    sourceRoute: "/centralworld",
  },
];

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
