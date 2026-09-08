import { captureAttribution } from "./analytics";

const DEFAULT_GA_MEASUREMENT_ID = "G-4R1SSJ2EXE";
const DEFAULT_META_PIXEL_ID = "1052131634399665";

const appendScript = (src: string, id: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const initializeMetaPixel = () => {
  const pixelId =
    import.meta.env.VITE_META_PIXEL_ID?.trim() || DEFAULT_META_PIXEL_ID;
  if (!pixelId || window.fbq) return;

  const pixel = ((...args: unknown[]) => {
    if (pixel.callMethod) {
      pixel.callMethod(...args);
    } else {
      pixel.queue?.push(args);
    }
  }) as NonNullable<Window["fbq"]>;

  pixel.queue = [];
  pixel.loaded = true;
  pixel.version = "2.0";
  window.fbq = pixel;
  (window as Window & { _fbq?: Window["fbq"] })._fbq = pixel;

  appendScript("https://connect.facebook.net/en_US/fbevents.js", "anantha-meta-pixel");
  pixel("init", pixelId);
};

export const initializeGoogleTags = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  captureAttribution();

  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  const gaMeasurementId =
    import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;
  const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_ID?.trim();

  initializeMetaPixel();

  window.dataLayer = window.dataLayer || [];

  // index.html loads the production GTM container in the document head.
  // Avoid a second GTM or direct Google tag when that static snippet exists.
  if (document.getElementById("anantha-gtm-head")) return;

  // GTM owns GA4 and Google Ads tags when configured through an environment override.
  if (gtmId) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    appendScript(
      `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
      "anantha-gtm",
    );
    return;
  }

  const primaryGoogleId = gaMeasurementId || googleAdsId;
  if (!primaryGoogleId) return;

  appendScript(
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryGoogleId)}`,
    "anantha-google-tags",
  );

  window.gtag = window.gtag || ((...args: unknown[]) => {
    window.dataLayer?.push(args);
  });

  window.gtag("js", new Date());
  if (gaMeasurementId) {
    window.gtag("config", gaMeasurementId, { send_page_view: false });
  }
  if (googleAdsId) {
    window.gtag("config", googleAdsId);
  }
};
