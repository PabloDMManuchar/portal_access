import React from "react";
import LayoutMotion from "../../Layout/LayoutMotion";
import { Text } from "@chakra-ui/react";

const NotFound: React.FC = () => {

  return (
    <LayoutMotion>
      <div className="z-10 m-auto" >
        <Text fontSize={'28px'} as={'b'} color={'white'} >404 - PAGINA NO ENCONTRADO</Text>
        <Text fontSize={'20px'} color={'white'}>Lo sentimos, la página que estás buscando no existe.</Text>
      </div>
    </LayoutMotion>
  );
};

export default NotFound;
