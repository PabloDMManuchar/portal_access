import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "@chakra-ui/react";

const PrivateRoute: React.FC = () => {
  const { loading } = useAuth(); 
  
  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
};

export default PrivateRoute;
