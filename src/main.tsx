import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { initializeGoogleTags } from "./lib/googleTags";
import "./index.css";

initializeGoogleTags();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// signal successful mount so static fallback knows the app loaded
(window as any).__APP_MOUNTED__ = true;
