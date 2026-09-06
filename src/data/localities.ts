export type Locality = {
  slug: string;
  name: string;
  city: string;
  intro: string;
  buyerFocus: string[];
  seoTitle: string;
  seoDescription: string;
};

export const localities: Locality[] = [
  { slug: "magunta-layout", name: "Magunta Layout", city: "Nellore", intro: "Explore property opportunities and buyer guidance for Magunta Layout, Nellore.", buyerFocus: ["Residential properties", "Apartments", "Resale opportunities"], seoTitle: "Properties in Magunta Layout Nellore | Anantha Real Estate", seoDescription: "Explore properties, buyer guidance and real estate opportunities in Magunta Layout, Nellore with Anantha Real Estate." },
  { slug: "kanuparthipadu", name: "Kanuparthipadu", city: "Nellore", intro: "Explore plotted development and residential opportunities around Kanuparthipadu, Nellore.", buyerFocus: ["Plots", "Township projects", "Residential investment"], seoTitle: "Properties in Kanuparthipadu Nellore | Anantha Real Estate", seoDescription: "Explore plots, projects and residential property opportunities in Kanuparthipadu, Nellore." },
  { slug: "kakupalli", name: "Kakupalli", city: "Nellore", intro: "Explore residential property opportunities and local buyer guidance for Kakupalli, Nellore.", buyerFocus: ["Residential plots", "Homes", "Investment opportunities"], seoTitle: "Properties in Kakupalli Nellore | Anantha Real Estate", seoDescription: "Explore residential properties and real estate opportunities in Kakupalli, Nellore with Anantha Real Estate." },
  { slug: "mypadu-road", name: "Mypadu Road", city: "Nellore", intro: "Explore property opportunities along Mypadu Road and nearby Nellore growth corridors.", buyerFocus: ["Plots", "Residential", "Land"], seoTitle: "Properties on Mypadu Road Nellore | Anantha Real Estate", seoDescription: "Explore plots, land and residential properties around Mypadu Road, Nellore." },
  { slug: "podalakur-road", name: "Podalakur Road", city: "Nellore", intro: "Explore residential, land and investment opportunities around Podalakur Road, Nellore.", buyerFocus: ["Plots", "Land", "Residential"], seoTitle: "Properties on Podalakur Road Nellore | Anantha Real Estate", seoDescription: "Explore property opportunities around Podalakur Road, Nellore with local guidance from Anantha Real Estate." },
  { slug: "vedayapalem", name: "Vedayapalem", city: "Nellore", intro: "Explore apartments, homes and residential property opportunities in Vedayapalem, Nellore.", buyerFocus: ["Apartments", "Residential homes", "Resale properties"], seoTitle: "Properties in Vedayapalem Nellore | Anantha Real Estate", seoDescription: "Explore apartments, homes and residential property opportunities in Vedayapalem, Nellore." },
];

export const getLocalityBySlug = (slug: string) => localities.find((locality) => locality.slug === slug);
