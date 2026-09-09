export type ProjectStatus = "Active" | "Upcoming" | "Sold Out" | "Paused";

export type Project = {
  slug: string;
  name: string;
  partnerSlug: string;
  companyName: string;
  companyRole: string;
  status: ProjectStatus;
  projectType: string;
  location: string;
  city: string;
  description: string;
  highlights: string[];
  marketingPath: string;
  seoTitle: string;
  seoDescription: string;
  phone?: string;
};

/**
 * Project inventory is intentionally separate from individual property inventory.
 * One project can contain many plots, apartments, villas or commercial units.
 * Private owner information should never be stored in this public dataset.
 */
export const projects: Project[] = [
  {
    slug: "central-world-nellore",
    name: "Central World",
    partnerSlug: "green-home-developers",
    companyName: "Green Home Developers",
    companyRole: "Developer",
    status: "Active",
    projectType: "Premium Township",
    location: "Kanaparthi Padu, Nellore",
    city: "Nellore",
    description:
      "A 125-acre premium township in Nellore with a large clubhouse and planned residential development, marketed by Anantha Real Estate.",
    highlights: [
      "125-acre township",
      "31,000 sq ft clubhouse",
      "Kanaparthi Padu, Nellore",
      "NUDA & RERA approved as stated in project marketing materials",
      "Within NMC limits as stated in project marketing materials",
    ],
    marketingPath: "/centralworld",
    seoTitle: "Central World Nellore | Premium Township | Anantha Real Estate",
    seoDescription:
      "Explore Central World, a premium township project in Kanaparthi Padu, Nellore, marketed by Anantha Real Estate.",
    phone: "+91 93916 75372",
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
