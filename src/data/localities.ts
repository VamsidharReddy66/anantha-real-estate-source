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

export const localities: Locality[] = [
  {
    slug: "magunta-layout",
    name: "Magunta Layout",
    city: "Nellore",
    intro: "Explore residential and resale property opportunities in Magunta Layout with local buyer guidance from Anantha Real Estate.",
    buyerFocus: ["Residential properties", "Apartments", "Resale opportunities"],
    marketContext: ["Established urban locality in Nellore", "Suitable for buyers prioritising city access", "Inventory can vary between apartments, homes and resale properties"],
    dueDiligence: ["Verify title and ownership documents", "Confirm building or layout approvals where applicable", "Check access, parking and utility conditions before purchase"],
    faqs: [
      { question: "What property types are commonly explored in Magunta Layout?", answer: "Buyers commonly explore apartments, residential homes and resale opportunities. Availability changes frequently, so current options should be reconfirmed." },
      { question: "Can Anantha Real Estate help shortlist properties in Magunta Layout?", answer: "Yes. Share your budget, property type and timeline and our team can check suitable current opportunities in and around Magunta Layout." },
    ],
    seoTitle: "Properties in Magunta Layout Nellore | Anantha Real Estate",
    seoDescription: "Explore properties, buyer guidance and real estate opportunities in Magunta Layout, Nellore with Anantha Real Estate.",
  },
  {
    slug: "kanuparthipadu",
    name: "Kanuparthipadu",
    city: "Nellore",
    intro: "Explore plotted development, township and residential investment opportunities around Kanuparthipadu, Nellore.",
    buyerFocus: ["Plots", "Township projects", "Residential investment"],
    marketContext: ["Known for plotted development activity", "Relevant for buyers comparing gated or planned layouts", "Project-specific approvals, pricing and amenities should be compared carefully"],
    dueDiligence: ["Verify layout approval and project registration details where applicable", "Check exact survey numbers, boundaries and road access", "Compare total acquisition cost, not only advertised plot price"],
    faqs: [
      { question: "Are plots available around Kanuparthipadu, Nellore?", answer: "Availability changes by project and owner inventory. Anantha Real Estate can check current public and partner inventory based on your budget and plot size requirement." },
      { question: "What should I verify before buying a plot near Kanuparthipadu?", answer: "Confirm title, survey and boundary details, approvals, road access, utilities and the complete registration cost before committing funds." },
    ],
    seoTitle: "Plots & Properties in Kanuparthipadu Nellore | Anantha Real Estate",
    seoDescription: "Explore plots, township projects and residential property opportunities in Kanuparthipadu, Nellore with local guidance from Anantha Real Estate.",
  },
  {
    slug: "kakupalli",
    name: "Kakupalli",
    city: "Nellore",
    intro: "Explore residential property opportunities and local buyer guidance for Kakupalli, Nellore.",
    buyerFocus: ["Residential plots", "Homes", "Investment opportunities"],
    marketContext: ["Residential growth area within the Nellore market", "Suitable for buyers comparing plots and end-use homes", "Micro-location and access can materially affect value"],
    dueDiligence: ["Confirm road access and exact plot boundaries", "Verify title chain and approvals", "Inspect drainage, electricity and surrounding development"],
    faqs: [
      { question: "What can buyers look for in Kakupalli?", answer: "Depending on current inventory, buyers may find residential plots, homes and investment opportunities in and around Kakupalli." },
      { question: "Does Anantha Real Estate handle site visits in Kakupalli?", answer: "Yes, subject to current inventory and seller availability. Share your requirement first so the team can shortlist suitable options." },
    ],
    seoTitle: "Properties in Kakupalli Nellore | Anantha Real Estate",
    seoDescription: "Explore residential properties and real estate opportunities in Kakupalli, Nellore with Anantha Real Estate.",
  },
  {
    slug: "kakutur",
    name: "Kakutur",
    city: "Nellore",
    intro: "Explore plots and residential investment opportunities around Kakutur, Nellore, including established plotted-development pockets.",
    buyerFocus: ["Residential plots", "Plotted developments", "Long-term investment"],
    marketContext: ["Plotted development is an important part of the local market", "Buyers should compare project maturity and surrounding habitation", "Connectivity and approval status are key selection factors"],
    dueDiligence: ["Verify layout and title documents", "Confirm road width, utilities and physical boundaries", "Reconfirm current pricing and availability before a site visit"],
    faqs: [
      { question: "Can I find plotted developments around Kakutur?", answer: "Yes, Kakutur and nearby areas have seen plotted-development activity. Current availability depends on project and resale inventory." },
      { question: "How can I compare plots in Kakutur?", answer: "Compare title and approvals, access roads, utilities, project development status, neighbourhood growth and total purchase cost." },
    ],
    seoTitle: "Plots & Properties in Kakutur Nellore | Anantha Real Estate",
    seoDescription: "Explore plots, plotted developments and property opportunities around Kakutur, Nellore with Anantha Real Estate.",
  },
  {
    slug: "mypadu-road",
    name: "Mypadu Road",
    city: "Nellore",
    intro: "Explore plots, land and residential opportunities along Mypadu Road and nearby Nellore growth corridors.",
    buyerFocus: ["Plots", "Residential", "Land"],
    marketContext: ["Important corridor connecting multiple residential pockets", "Property options can range from plotted layouts to independent parcels", "Distance from the city and road frontage can significantly influence suitability"],
    dueDiligence: ["Verify access road and frontage", "Check land use, title and approval status", "Inspect surrounding infrastructure and utility availability"],
    faqs: [
      { question: "What types of property are available on Mypadu Road?", answer: "Depending on current inventory, buyers may find residential plots, land parcels and other residential opportunities along and around Mypadu Road." },
      { question: "Can Anantha Real Estate help with properties near Mypadu Road?", answer: "Yes. Share your budget, preferred distance and property type and the team can check matching current inventory." },
    ],
    seoTitle: "Properties on Mypadu Road Nellore | Anantha Real Estate",
    seoDescription: "Explore plots, land and residential properties around Mypadu Road, Nellore with local support from Anantha Real Estate.",
  },
  {
    slug: "podalakur-road",
    name: "Podalakur Road",
    city: "Nellore",
    intro: "Explore residential, land and investment opportunities around Podalakur Road, Nellore.",
    buyerFocus: ["Plots", "Land", "Residential"],
    marketContext: ["A corridor considered by buyers seeking land and residential options", "Exact micro-location and access are important value drivers", "Use-case suitability differs between end-use and investment purchases"],
    dueDiligence: ["Verify title, survey and land-use details", "Check road access and utilities", "Reconfirm registration and transaction costs"],
    faqs: [
      { question: "Is Podalakur Road suitable for plot and land searches?", answer: "It can be relevant for buyers considering plots, land and residential opportunities, but suitability depends on the exact location, access and documentation." },
      { question: "What should investors compare on Podalakur Road?", answer: "Compare documentation, road connectivity, nearby development, realistic holding period and total purchase cost before deciding." },
    ],
    seoTitle: "Properties on Podalakur Road Nellore | Anantha Real Estate",
    seoDescription: "Explore property opportunities around Podalakur Road, Nellore with local guidance from Anantha Real Estate.",
  },
  {
    slug: "vedayapalem",
    name: "Vedayapalem",
    city: "Nellore",
    intro: "Explore apartments, homes and residential property opportunities in Vedayapalem, Nellore.",
    buyerFocus: ["Apartments", "Residential homes", "Resale properties"],
    marketContext: ["Established residential demand within Nellore", "Useful for buyers prioritising city access and everyday convenience", "Resale and apartment condition should be assessed property by property"],
    dueDiligence: ["Verify ownership and association or maintenance dues where relevant", "Inspect building condition and parking", "Check approvals and utility connections"],
    faqs: [
      { question: "What property types are commonly searched in Vedayapalem?", answer: "Apartments, residential homes and resale properties are common buyer requirements in Vedayapalem." },
      { question: "Can I request a property match for Vedayapalem?", answer: "Yes. Share your preferred configuration, budget and purchase timeline and Anantha Real Estate can check current matching options." },
    ],
    seoTitle: "Properties in Vedayapalem Nellore | Anantha Real Estate",
    seoDescription: "Explore apartments, homes and residential property opportunities in Vedayapalem, Nellore with Anantha Real Estate.",
  },
  {
    slug: "krishnapatnam",
    name: "Krishnapatnam",
    city: "Nellore",
    intro: "Explore land and commercial real estate requirements around Krishnapatnam and the wider Nellore industrial and logistics corridor.",
    buyerFocus: ["Commercial land", "Industrial and logistics requirements", "Business-location search"],
    marketContext: ["Krishnapatnam is a major port-led business corridor in the Nellore region", "Commercial suitability depends heavily on permitted use, access and infrastructure", "Business occupiers should evaluate operational requirements before shortlisting land or buildings"],
    dueDiligence: ["Confirm land use and regulatory suitability for the intended business", "Verify title, access and utility capacity", "Assess distance to port, highways, workforce and supporting infrastructure"],
    faqs: [
      { question: "Does Anantha Real Estate handle commercial requirements around Krishnapatnam?", answer: "Yes. Through Anantha Commercials, the team can assist with commercial, land, warehousing and business-location requirements subject to current inventory." },
      { question: "What should a company verify before taking property near Krishnapatnam?", answer: "The company should verify permitted use, title, access, utilities, logistics suitability, commercial terms and all project-specific statutory requirements." },
    ],
    seoTitle: "Commercial Property & Land in Krishnapatnam Nellore | Anantha Commercials",
    seoDescription: "Explore commercial property, land and business-location requirements around Krishnapatnam, Nellore with Anantha Commercials.",
  },
];

export const getLocalityBySlug = (slug: string) => localities.find((locality) => locality.slug === slug);
