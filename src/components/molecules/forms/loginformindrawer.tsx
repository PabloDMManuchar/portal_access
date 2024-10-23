import React from "react";

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
  Icon,
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

import LoginForm from "./authentication/loginform";

export const Loginformindrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="black"
        leftIcon={<Icon as={LoginIcon} boxSize={6} />}
        onClick={onOpen}
        mr={4}
      >
        Iniciar sesion
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
              <LoginForm onClose={onClose} />
            </Box>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Loginformindrawer;
