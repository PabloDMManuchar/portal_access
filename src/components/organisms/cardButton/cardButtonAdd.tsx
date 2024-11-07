import "./cardButton.css";
import { Tooltip } from "@chakra-ui/react";

const cardButtonAdd = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Tooltip
        label="Agregar Acceso"
        placement="top"
        fontSize="sm"
        bg="gray.300"
        color="black"
        hasArrow
      >
        <a className=" m-4" href="" target="">
          <div className="group relative m-0 flex h-28 w-32 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg cursor-pointer">
            <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
              <img
                src="data:image/jpeg;base64,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"
                className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                alt=""
              />
            </div>
            <div className="w-full  absolute bottom-0 z-20 m-0 pb-4 transition duration-300 ease-in-out group-hover:-translate-y-2 ">
              <p className="text-xs text-white text-center relative ">
                Agregar mi Acceso
              </p>
            </div>
          </div>
        </a>
      </Tooltip>
    </div>
  );
};

export default cardButtonAdd;
