import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { WebAppProvider } from "@zakarliuka/react-telegram-web-tools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <WebAppProvider>
      <App />
    </WebAppProvider>
    </BrowserRouter>
  </StrictMode>
);
