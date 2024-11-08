import React from "react";
import { Tooltip, useToast } from "@chakra-ui/react";
import { LinkApp } from "../../../types/apptype";
import * as Icons from "react-icons/fa"; // Asegúrate de importar los íconos de FontAwesome u otros

const CardButtonLinkApp: React.FC<{ data: LinkApp[] }> = ({ data }) => {
  const toast = useToast();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    auth: number,
    url: string | undefined
  ) => {
    if (auth === 0) {
      e.preventDefault(); // Evita la navegación si no está autorizado
      toast({
        title: "Acceso Denegado",
        description: "No estás autorizado para acceder a este enlace.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Si está autorizado, permite la navegación normal
      window.open(url, "_blank"); // Abre la URL en una nueva pestaña
    }
  };

  return (
    <div className="flex flex-wrap justify-center ">
      {data?.map((card, index) => (
        <Tooltip
          key={index}
          label={card?.nombre}
          placement="top"
          fontSize="sm"
          bg="gray.300"
          color="black"
          hasArrow
        >
          <a
            className="m-4"
            href={card?.auth === 1 ? card?.url : "#"}
            onClick={(e) => handleClick(e, card?.auth, card?.url)}
            target={card.type !== "add" ? "_blank" : "_top"}
          >
            <div className="group relative m-0 flex h-28 w-32 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg cursor-pointer">
              <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                {card?.mostrarimagen === "SI" ? (
                  <img
                    src={card?.src}
                    className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                    alt={card?.nombre || "Image"}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full w-full">
                    {React.createElement(
                      Icons[card.icon as keyof typeof Icons], // Render dinámico del ícono
                      { className: "text-4xl text-white" }
                    )}
                  </div>
                )}
              </div>
            </div>
            <p style={{maxWidth:'120px'}} className=" text-xs text-white text-center relative">
              {card?.nombre} 
            </p>
          </a>
        </Tooltip>
      ))}
    </div>
  );
};

export default CardButtonLinkApp;
