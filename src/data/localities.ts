export type LocalityFaq = { question: string; answer: string };

export type Locality = {
  slug: string;
  name: string;
  city: string;
  intro: string;
  buyerFocus: string[];
  marketContext: string[];
  dueDiligence: string[];
  faqs: LocalityFaq[];
  seoTitle: string;
  seoDescription: string;
};

// Locality-specific SEO pages are intentionally paused.
// We will add verified target locations later as a separate SEO phase.
export const localities: Locality[] = [];

export const getLocalityBySlug = (slug: string) => localities.find((locality) => locality.slug === slug);
