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

const isCookies = Cookies.get("Token");

const Navigationusers = () => {
  // constante para validar via un use state el estado de la cookie
  const { login, logout, isAuthenticated } = useAuth();
  const [tokenCookies, setTokenCookies] = useState<string | undefined>(
    isCookies
  );

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
            onClick={logout}
            mr={4}
          >
            Cerrar sesion
          </Button>
        ) : (
          <Loginform />
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Navigationusers;
