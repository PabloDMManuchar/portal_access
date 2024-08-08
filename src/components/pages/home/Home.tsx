import React from "react";
import Links from "../../organisms/Links/Links";
import "./home.css";
// import { Divider } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center bg-custom-blue">
      <div className="pl-8 my-4 w-full text-start flex z-10">
        <img src="/manucharlogo.png" alt="Manuchar Logo" width="320" />
      </div>

      <Links />

      {/* <Divider zIndex={10} w={"80%"} /> */}

      <footer className="footer z-10">
        <p className="text-white font-light font-sm"></p>
        <img src={"/Mit.png"} alt="LogoIT" className="imagen-footer " />
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
