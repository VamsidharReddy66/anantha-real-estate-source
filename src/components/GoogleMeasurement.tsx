import { useEffect } from "react";

const GTM_ID = import.meta.env.VITE_GTM_ID?.trim();
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

const injectScript = (src: string, id: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const GoogleMeasurement = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];

    // Prefer GTM when configured so Analytics, Ads and other tags can be
    // managed from one container. Avoid loading both GTM and gtag directly.
    if (GTM_ID) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      injectScript(
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`,
        "anantha-gtm-script",
      );
      return;
    }

    if (GA_MEASUREMENT_ID) {
      injectScript(
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`,
        "anantha-ga-script",
      );
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args as unknown as Record<string, unknown>);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
    }
  }, []);

  return null;
};

export default GoogleMeasurement;
