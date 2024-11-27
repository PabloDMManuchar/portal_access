import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";

const Preloader: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        //   navigate("/");
        // } else {
        // navigate("/login");
      }
    };

    verifyAuth();
  }, [isAuthenticated]);

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
