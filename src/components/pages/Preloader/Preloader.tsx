import React from "react";
import { Flex } from "@chakra-ui/react";

const Preloader: React.FC = () => {
  return (
    <Flex
      zIndex={999}
      position={"absolute"}
      height="100vh"
      w={"full"}
      bg="rgba(0, 0, 0, 0.884)"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src={"/Mit.png"}
        alt="LogoIT"
        className="animate-pulse"
        style={{ width: "22rem", height: "18rem" }}
      />
    </Flex>
  );
};

export default Preloader;
