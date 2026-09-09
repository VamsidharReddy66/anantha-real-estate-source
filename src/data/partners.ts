export type PartnerStatus = "active" | "inactive";

export type Partner = {
  slug: string;
  name: string;
  role: "Developer" | "Channel partner";
  status: PartnerStatus;
  summary: string;
  publicWebsite?: string;
};

/**
 * Partner data is public relationship metadata only. Commercial terms,
 * contact people and contract records belong in the private CMS/CRM layer.
 */
export const partners: Partner[] = [
  {
    slug: "green-home-developers",
    name: "Green Home Developers",
    role: "Developer",
    status: "active",
    summary: "Developer represented by Anantha Real Estate for selected Nellore projects.",
  },
];

export const getPartnerBySlug = (slug: string) =>
  partners.find((partner) => partner.slug === slug);
