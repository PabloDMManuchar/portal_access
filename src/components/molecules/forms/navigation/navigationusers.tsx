/// no se esta utilizando


import React, { useState } from "react";
//manejo de cookies
import Cookies from "js-cookie";

//Iconos

import LogoutIcon from "../../../atoms/icons/UserIcon/LogoutIcon";

//llamada a api

import { users } from "../../../../services/users/users";

// mensajes emergentes

import { toast } from "sonner";

//llamada a authenticator

import {
  Icon,
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useAuth } from "../../../../context/AuthContext";
import Loginform from "../loginform";

const Navigationusers = () => {
  // constante para validar via un use state el estado de la cookie
  const { logout, isAuthenticated } = useAuth();
  console.log("🚀 ~ Navigationusers ~ isAuthenticated:", isAuthenticated)

  const handleLogout = () => {
    try {
      console.log("Intentando cerrar sesión...");
      logout();
      console.log("Sesión cerrada exitosamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Chakra App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        {isAuthenticated ? (
        <Button
          colorScheme="black"
          leftIcon={<Icon as={LogoutIcon} boxSize={6} />}
          onClick={handleLogout}
          mr={4}
        >
          Cerrar sesion
        </Button>
        ) : (
          <>

            <Loginform />
          </>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Navigationusers;
