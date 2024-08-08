import React from "react";
import "./cardButton.css";
import { TLinks } from "../../../services/links/links";
import { Tooltip } from "@chakra-ui/react";

const CardButtonDos: React.FC<{ data: TLinks }> = ({ data }) => (
  <div className="flex flex-wrap max-w-4xl justify-center">
    {data?.map((card, index) => (
      <Tooltip
        key={index}
        label={card?.title.toLocaleLowerCase()}
        placement="top"
        fontSize="sm"
        bg="gray.300"
        color="black"
        hasArrow
      >
        <a className=" m-4" href={card?.url}>
          <div className="group relative m-0 flex h-28 w-32 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg cursor-pointer">
            <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
              <img
                src={card?.src}
                className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                alt=""
              />
            </div>
            <div className="w-full  absolute bottom-0 z-20 m-0 pb-4 transition duration-300 ease-in-out group-hover:-translate-y-2 ">
              <p className="text-xs text-white text-center relative ">
                {card?.text}
              </p>
            </div>
          </div>
          {card?.type === "powerBi" && (
            <p className="text-xs text-white text-center relative ">
              {card?.title}
            </p>
          )}
        </a>
      </Tooltip>
    ))}
  </div>
);

export default CardButtonDos;
