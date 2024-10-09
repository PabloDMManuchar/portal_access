import React, { useState } from "react";

//manejo de cookies
import Cookies from "js-cookie";

//importacion de iconos para los botones
import LoginIcon from "../../atoms/icons/UserIcon/LoginIcon";
import LogoutIcon from "../../atoms/icons/UserIcon/LogoutIcon";

//importacion para llamada a api

import { users } from "../../../services/users/users";

// mensajes emergentes

import { toast } from "sonner";

// tipado

import { LoginCredentials } from "../../../types/auth";

import Loginaccess from "../../molecules/forms/authentication/loginaccess";
import Navigationusers from "../../molecules/forms/navigation/navigationusers";

import {
  Box,
  Button,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export const Loginform: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [islogin, setIslogin] = useState<string>("ERR");

  // Función que recibe datos del componente hijo
  const recibirDatosDeLogin = (dato: string) => {
    setIslogin(dato);
    setTokenCookies(Cookies.get("Token"));

    console.log(islogin);

    if (islogin != "ERR") {
      onClose();
    }
  };

  const isCookies = Cookies.get("Token");

  // constante para validar via un use state el estado de la cookie
  const [tokenCookies, setTokenCookies] = useState<string | undefined>(
    isCookies
  );

  return (
    <>
      {tokenCookies ? (
        <Navigationusers />
      ) : (
        /*
        <Button
          colorScheme="black"
          leftIcon={<Icon as={LogoutIcon} boxSize={6} />}
          onClick={handleLogout}
          mr={4}
        >
          Cerrar sesion
        </Button>
        */
        <Button
          colorScheme="black"
          leftIcon={<Icon as={LoginIcon} boxSize={6} />}
          onClick={onOpen}
        >
          Iniciar sesion
        </Button>
      )}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>

          <DrawerBody>
            <Box
              maxW="md"
              mx="auto"
              mt={10}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
            >
              <Loginaccess
                enviarDatosALogin={recibirDatosDeLogin}
                onClose={onClose}
              />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <p>status Login: {islogin}</p>
            <p>{tokenCookies}</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Loginform;
