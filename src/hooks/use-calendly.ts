import { useEffect, useCallback } from "react";

const CALENDLY_URL = "https://calendly.com/jvk-aconsultancy/30min";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

export const useCalendly = () => {
  useEffect(() => {
    // Load Calendly widget script only once
    if ((window as any).Calendly) {
      return; // Already loaded
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT;
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      console.log("✓ Calendly widget loaded");
    };

    script.onerror = () => {
      console.error("✗ Failed to load Calendly widget");
    };

    document.head.appendChild(script);
  }, []);

  const openCalendly = useCallback(() => {
    const attemptOpen = (retries = 0): void => {
      if ((window as any).Calendly) {
        try {
          (window as any).Calendly.showPopupWidget(CALENDLY_URL);
          console.log("✓ Calendly popup opened");
          return;
        } catch (error) {
          console.error("✗ Error opening Calendly popup:", error);
          return;
        }
      }

      if (retries < 20) {
        // Retry up to 20 times with 50ms delay
        setTimeout(() => attemptOpen(retries + 1), 50);
      } else {
        console.error("✗ Calendly widget unavailable after 20 retries");
        alert(
          "Unable to load Calendly scheduling. Please try again or contact us directly."
        );
      }
    };

    attemptOpen();
  }, []);

  return openCalendly;
};
