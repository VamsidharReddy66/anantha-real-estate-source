import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// signal successful mount so static fallback knows the app loaded
(window as any).__APP_MOUNTED__ = true;
