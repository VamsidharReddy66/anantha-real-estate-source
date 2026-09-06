const DEFAULT_GA_MEASUREMENT_ID = "G-4R1SSJ2EXE";

const appendScript = (src: string, id: string) => {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

export const initializeGoogleTags = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  const gaMeasurementId =
    import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;

  window.dataLayer = window.dataLayer || [];

  // Prefer GTM when configured. Do not load direct GA4 at the same time,
  // which would risk duplicate page views/events.
  if (gtmId) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    appendScript(
      `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
      "anantha-gtm",
    );
    return;
  }

  appendScript(
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`,
    "anantha-ga4",
  );

  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args as unknown as Record<string, unknown>);
  };

  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId, {
    send_page_view: false,
  });
};
