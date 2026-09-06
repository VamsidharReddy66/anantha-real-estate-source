export type AnalyticsEventName =
  | "page_view"
  | "lead_submit"
  | "whatsapp_click"
  | "phone_click"
  | "site_visit_click"
  | "property_view"
  | "project_view"
  | "seller_lead_submit"
  | "buyer_requirement_submit";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (
  event: AnalyticsEventName,
  params: Record<string, string | number | boolean | undefined> = {},
) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...cleanParams });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, cleanParams);
  }
};
