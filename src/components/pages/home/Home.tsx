import React from "react";
import Links from "../../organisms/Links/Links";
import "./home.css";
import IconUser from "../../atoms/icons/UserIcon/UserIcon";
import { Text, Tooltip } from "@chakra-ui/react";
// import GoogleSearch from "../../atoms/GoogleSearch/GoogleSearch";
import Chat from "../../molecules/chatGpt/ChatGPT";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen relative overflow-hidden bg-slate-950">
      <div className="p-8 w-full text-start flex z-10 justify-between">
        <img src="/manucharlogo.png" alt="Manuchar Logo" width="240" />
        <Tooltip label="proximamente...">
          <div className="flex justify-center items-center">
            <Text color={"white"} p={"0.4rem"}>
              Bienvenido a Manuchar
            </Text>
            <IconUser width={36} height={36} />
          </div>
        </Tooltip>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center">
        <Links />

        <div className="flex flex-col px-4">
          {/* <div
            className="gcse-search-container rounded-lg overflow-hidden shadow-lg w-full mx-auto mb-12"
          >
            <GoogleSearch />
          </div> */}
          <Chat />
        </div>
      </div>

      <footer className="footer absolute bottom-4 right-4 z-10">
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
