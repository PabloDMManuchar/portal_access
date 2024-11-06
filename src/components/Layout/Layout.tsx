// src/components/layout/Layout.tsx
import React from "react";
import NavigationUsers from "../templates/NavigationUsers"; // Importa la navegación
import SesionInit from "../templates/SesionInit";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@chakra-ui/react";
import "./style.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // console.log("Esto es layout" + isAuthenticated);
  return (
    <Box className="flex flex-col items-center min-h-screen relative overflow-hidden bg-slate-950">
      <header className="p-8 w-full text-start flex z-10 justify-between">
        <img src="/manucharlogo.png" alt="Manuchar Logo" width="240" />
        <div className="flex justify-center items-center">
          <>
            {isAuthenticated ? (
              <>
                <NavigationUsers />
              </>
            ) : (
              <>
                <SesionInit />
              </>
            )}
          </>
        </div>
      </header>

      <main className="w-full flex flex-col md:flex-row justify-center flex-grow">
        {children}
      </main>

      <footer className="footer absolute bottom-4 right-4">
        <img src={"/Mit.png"} alt="LogoIT" className="imagen-footer" />
      </footer>

      {/* El SVG decorativo */}
      <div className="absolute bottom-0 w-full z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#202529"
            fillOpacity="1"
            d="M0,320L48,288C96,256,192,192,288,154.7C384,117,480,107,576,101.3C672,96,768,96,864,96C960,96,1056,96,1152,80C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </Box>
  );
};

export default Layout;
