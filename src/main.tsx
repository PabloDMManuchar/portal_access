import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme.ts";
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <ChakraProvider theme={theme}>
      <App />
      <Toaster position="bottom-center" />
    </ChakraProvider>
  </React.StrictMode>
);
