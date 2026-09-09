import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const baseFile = path.join(distDir, "index.html");
const site = "https://www.anantharealestate.in";

if (!fs.existsSync(baseFile)) {
  throw new Error("dist/index.html not found. Run vite build before prerendering.");
}

const baseHtml = fs.readFileSync(baseFile, "utf8");

const routes = [
  ["/", "Real Estate in Nellore | Anantha Real Estate", "Buy, sell and invest in plots, homes and commercial property in Nellore with Anantha Real Estate's local expertise and end-to-end support.", "Real Estate in Nellore", "Discover residential, plotted development and commercial real estate opportunities in Nellore with local guidance from Anantha Real Estate."],
  ["/about", "About Anantha Real Estate | Nellore", "Learn about Anantha Real Estate, a Nellore-focused property consultancy helping buyers, sellers and investors with local market guidance.", "About Anantha Real Estate", "Anantha Real Estate is a Nellore-focused property consultancy built around local knowledge, transparent guidance and end-to-end support."],
  ["/services", "Real Estate Services in Nellore | Anantha Real Estate", "Explore property buying, selling, investment, commercial real estate and transaction support services from Anantha Real Estate in Nellore.", "Real Estate Services in Nellore", "Explore support for property search, sales, investment, commercial real estate and transaction coordination across Nellore."],
  ["/portfolio", "Anantha Real Estate Portfolio | Nellore", "Explore selected work, project marketing and property activity from Anantha Real Estate in Nellore.", "Our Real Estate Portfolio", "Explore selected projects, marketing work and property activity handled by Anantha Real Estate."],
  ["/projects", "Real Estate Projects in Nellore | Anantha Real Estate", "Browse real estate projects represented or marketed by Anantha Real Estate in Nellore.", "Real Estate Projects in Nellore", "Browse project opportunities and project information available through Anantha Real Estate."],
  ["/properties", "Properties for Sale in Nellore | Anantha Real Estate", "Browse customer property listings in Nellore including plots, apartments, villas, commercial property and land.", "Properties for Sale in Nellore", "Browse public customer listings across plots, apartments, villas, commercial property and land in Nellore."],
  ["/properties/plots", "Plots for Sale in Nellore | Anantha Real Estate", "Browse plots for sale in Nellore and share your location, budget and plot requirements with Anantha Real Estate.", "Plots for Sale in Nellore", "Browse available plot listings and share your requirement for a more targeted property match."],
  ["/properties/apartments", "Apartments for Sale in Nellore | Anantha Real Estate", "Browse apartments for sale in Nellore and get help finding a home that fits your preferred location and budget.", "Apartments for Sale in Nellore", "Browse apartment listings and get local assistance finding a suitable home in Nellore."],
  ["/properties/villas", "Villas for Sale in Nellore | Anantha Real Estate", "Browse villas for sale in Nellore and share your requirements with Anantha Real Estate.", "Villas for Sale in Nellore", "Explore villa opportunities in Nellore and share your preferences for a tailored property search."],
  ["/properties/commercial", "Commercial Property in Nellore | Anantha Commercials", "Browse commercial property opportunities in Nellore including offices, retail, business spaces and investment property.", "Commercial Property in Nellore", "Explore commercial property opportunities for businesses, investors and property owners in Nellore."],
  ["/properties/land", "Land for Sale in Nellore | Anantha Real Estate", "Browse land opportunities in Nellore for residential, investment or business requirements.", "Land for Sale in Nellore", "Explore land opportunities in and around Nellore and share your location, use and budget requirements."],
  ["/property-intelligence", "Nellore Property Intelligence | Anantha Real Estate", "Read Nellore real estate market updates, project intelligence and buyer education from Anantha Real Estate.", "Nellore Property Intelligence", "Explore market updates, project intelligence and practical buyer education focused on Nellore real estate."],
  ["/property-consultation", "Free Property Consultation in Nellore | Anantha Real Estate", "Tell Anantha Real Estate what you want to buy, sell or invest in and get a focused property consultation across Nellore.", "Get Property Options Matched to Your Requirement", "Share your preferred property type, budget and timeline for focused guidance from Anantha Real Estate."],
  ["/contact", "Contact Anantha Real Estate | Nellore", "Contact Anantha Real Estate for property buying, selling, investment and commercial real estate requirements in Nellore.", "Contact Anantha Real Estate", "Talk to our Nellore team about buying, selling, investment, commercial space or a property requirement."],
  ["/centralworld", "Central World Nellore | Premium Plots | Anantha Real Estate", "Explore Central World by Green Home Developers, a 125-acre premium plotted township near Kanuparthipadu, Nellore.", "Central World, Nellore", "Explore Central World, a 125-acre premium plotted township near Kanuparthipadu in Nellore, marketed with project information through Anantha Real Estate."],
];

const navLinks = [
  ["/properties", "Properties"],
  ["/projects", "Projects"],
  ["/property-intelligence", "Property Intelligence"],
  ["/contact", "Contact"],
];

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[char]));

function makeSnapshot(route, title, description, h1, intro) {
  const canonical = `${site}${route === "/" ? "" : route}`;
  const links = navLinks
    .filter(([href]) => href !== route)
    .map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`)
    .join(" · ");

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Anantha Real Estate",
      url: site,
    },
  }).replace(/</g, "\\u003c");

  const snapshot = `<main data-prerendered-seo="true" style="max-width:1120px;margin:0 auto;padding:96px 24px 48px;font-family:Arial,sans-serif;color:#171717"><p style="margin:0 0 12px;font-size:14px">Anantha Real Estate · Nellore</p><h1 style="font-size:42px;line-height:1.1;margin:0 0 18px">${escapeHtml(h1)}</h1><p style="font-size:18px;line-height:1.7;max-width:780px">${escapeHtml(intro)}</p><nav aria-label="Primary" style="margin-top:28px;font-size:15px;line-height:2">${links}</nav></main>`;

  let html = baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace("</head>", `    <link rel="canonical" href="${canonical}" />\n    <meta property="og:url" content="${canonical}" />\n    <script type="application/ld+json">${schema}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`);

  return html;
}

const prerenderDir = path.join(distDir, "prerender");
fs.mkdirSync(prerenderDir, { recursive: true });

for (const [route, title, description, h1, intro] of routes) {
  const html = makeSnapshot(route, title, description, h1, intro);
  if (route === "/") {
    fs.writeFileSync(baseFile, html);
    continue;
  }
  const filename = `${route.slice(1).replaceAll("/", "__")}.html`;
  fs.writeFileSync(path.join(prerenderDir, filename), html);
}

console.log(`Prerendered ${routes.length} SEO routes.`);
