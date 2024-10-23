import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import Links from "../../organisms/Links/Links";
import "./home.css";
import Chat from "../../molecules/chatGpt/ChatGPT";
import SesionInit from "../../templates/SesionInit";
import { useAuth } from "../../../context/AuthContext";
import Navigationusers from "../../templates/NavigationUsers";

const Home: React.FC = () => {
  const { isAuthenticated, checktoken, isTokenValid } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const response = checktoken();
      setLoading(false); // Finalizar la carga
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    ); // O algún spinner de carga
  }

  return (
    <div className="flex flex-col items-center min-h-screen relative overflow-hidden bg-slate-950">
      <div className="p-8 w-full text-start flex z-10 justify-between">
        <img src="/manucharlogo.png" alt="Manuchar Logo" width="240" />

        <div className="flex justify-center items-center">
          <>
            {isAuthenticated ? (
              <>
                <Navigationusers />
              </>
            ) : (
              <>
                <SesionInit />
              </>
            )}
          </>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center">
        <Links />

        <div className="px-4 z-10">
          <Chat />
        </div>
      </div>
      <footer className="footer absolute bottom-4 right-4">
        <p className="text-white font-light font-sm"></p>
        <img src={"/Mit.png"} alt="LogoIT" className="imagen-footer" />
      </footer>

      <div className="absolute bottom-0 w-full z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#202529"
            fillOpacity="1"
            d="M0,320L48,288C96,256,192,192,288,154.7C384,117,480,107,576,101.3C672,96,768,96,864,96C960,96,1056,96,1152,80C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Home;
