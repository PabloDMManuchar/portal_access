import React, { useState } from "react";

//manejo de cookies
import Cookies from "js-cookie";

//importacion de iconos para los botones
import LoginIcon from "../../atoms/icons/UserIcon/LoginIcon";
// import LogoutIcon from "../../atoms/icons/UserIcon/LogoutIcon";

// //importacion para llamada a api

// import { users } from "../../../services/users/users";

// // mensajes emergentes

// import { toast } from "sonner";

// // tipado

// import { LoginCredentials } from "../../../types/auth";


import {
  Box,
  // Button,
  // Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  // DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
import Loginaccess from "./authentication/loginaccess";

export const Loginform: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen,  onClose } = useDisclosure();
  const btnRef = React.useRef()

  return (
    <>
      {/* <Navigationusers /> */}

      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
       login
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

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
              <Loginaccess onClose={onClose} />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <p>status Login: {isAuthenticated}</p>
            {/* <p>{tokenCookies}</p> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Loginform;
