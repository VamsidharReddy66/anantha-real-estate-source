import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

const AnalyticsPageView = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: `${location.pathname}${location.search}`,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsPageView;
