import React from "react";
import "./cardButton.css";
import { TLinks } from "../../../services/links/links";


const CardButtonTres: React.FC<{data:TLinks}> = ({data}) => (
  <div className="flex flex-wrap max-w-3xl justify-center">
    {data?.map((card, index) => (
      <a key={index} href={card?.url} className="flex ">
        <div className="group relative flex flex-col items-center justify-center h-32 w-32  transition duration-300 ease-in-out">
          <div className="absolute inset-0 bg-gray-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50 rounded-md"></div>
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 shadow-md">
            <i className={`fa ${card?.icon}`}></i>
          </div>
          <p className="mt-2 text-center text-sm text-gray-100 relative ">
            {card?.title.toLocaleLowerCase()}
          </p>
        </div>
      </a>
    ))}
  </div>
);

export default CardButtonTres;
