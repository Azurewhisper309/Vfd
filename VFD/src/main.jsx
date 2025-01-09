import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CRMProvider } from "./CrmContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CRMProvider>
      <App />
    </CRMProvider>
  </StrictMode>
);
