import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.anantharealestate.in";
const DEFAULT_IMAGE = `${SITE_URL}/ANANTHA%20LOGO.png`;

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
}: SEOProps) => {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Anantha Real Estate" />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
