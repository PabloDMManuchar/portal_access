import React from "react";
import { Tooltip, useToast } from "@chakra-ui/react";
import { LinkApp } from "../../../types/apptype";
import * as Icons from "react-icons/fa";
interface CardButtonLinkAppProps {
  data: LinkApp[];
}

const CardButtonLinkApp: React.FC<CardButtonLinkAppProps> = ({ data }) => {
  const toast = useToast();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    auth: string,
    url: string | undefined
  ) => {
    e.preventDefault();

    if (auth === "false") {
      toast({
        title: "Acceso Denegado",
        description: "No estás autorizado para acceder a este enlace.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      window.open(url, "_blank"); // Abre la URL en una nueva pestaña
    }
  };
  if (!data)
    return (
      <div className="group relative m-0 flex h-28 w-32 rounded-xl shadow-xl bg-slate-600 sm:mx-auto sm:max-w-lg cursor-pointer animate-pulse" />
    );

  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((card, index) => (
        <Tooltip
          key={index}
          label={card?.descripcion}
          placement="top"
          fontSize="12px"
          bg="gray.300"
          color="black"
          hasArrow
        >
          <a
            className="m-4"
            href={card?.auth === "true" ? card?.url : "#"}
            onClick={(e) => handleClick(e, card?.auth, card?.url)}
          >
            <div className="group relative m-0 flex h-20 w-28 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg cursor-pointer">
              <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                {card?.mostrarimagen === "SI" ? (
                  <img
                    src={card?.src}
                    className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                    alt={card?.nombre || "Image"}
                  />
                ) : (
                  <div className="flex justify-center items-center h-full w-full">
                    {card.icon &&
                      React.createElement(
                        Icons[card.icon as keyof typeof Icons],
                        {
                          className: "text-6xl text-white",
                        }
                      )}
                  </div>
                )}
              </div>
            </div>
            <p
              style={{ maxWidth: "120px" }}
              className=" text-xs text-white text-center relative"
            >
              {card?.nombre}
            </p>
          </a>
        </Tooltip>
      ))}
    </div>
  );
};

export default CardButtonLinkApp;
