import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  // DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Button from "../atoms/Button";
import { FaSignInAlt } from "react-icons/fa"; // Importa el ícono de react-icons/fa
import LoginForm from "../organisms/LoginForm";

const SesionInit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button type="button" onClick={onOpen} leftIcon={FaSignInAlt}>
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
      </Button>
    </>
  );
};

export default SesionInit;
