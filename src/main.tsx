import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.ts";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.tsx";
import { register } from "register-service-worker";

register(`/service-worker.js`);

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
