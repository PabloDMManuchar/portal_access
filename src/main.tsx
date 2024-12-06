import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.ts";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.tsx"; // Importar AuthProvider

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {})
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
        <Toaster position="bottom-center" />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
