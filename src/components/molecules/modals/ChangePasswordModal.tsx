import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tooltip,
  Icon,
  useDisclosure,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import { FaKey } from "react-icons/fa"; // Importa el ícono de react-icons/fa
import { users } from "../../../services/users/users";
import { ChangePasswordType } from "../../../types/usertype";
import { useAuth } from "../../../context/AuthContext";

const ChangePasswordModal = () => {
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const [oldpassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const toast = useToast();
  const { dataUser, statusPassword } = useAuth();

  // Función para manejar el cambio de contraseña
  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const idusuario = dataUser.idusuario;
    try {
      const data: ChangePasswordType = {
        idusuario,
        oldpassword,
        password,
      };
      // Llamar al servicio que hace la petición a la API
      await users.changePassword(data);

      toast({
        title: "Contraseña cambiada",
        description: "Tu contraseña ha sido actualizada con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al cambiar la contraseña.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Tooltip label="* Cambiar Password" openDelay={500}>
        <Button
          bg="white"
          color="black"
          leftIcon={<FaKey color="green" />}
          border="1px solid" // Opcional: añadir un borde para que se vea más estilizado
          borderColor="green.500" // Borde verde para hacer juego con el ícono
          _hover={{ bg: "gray.100" }} // Efecto hover opcional
          onClick={() => {
            setOverlay(<OverlayTwo />);
            onOpen();
          }}
          mr={4}
        >
          Cambiar Contraseña
        </Button>
      </Tooltip>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>ACTUALIZAR CREDENCIALES</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Contraseña actual</FormLabel>
              <Input
                type="password"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Nueva contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Confirmar nueva contraseña</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <br />
          <br />
          <Spacer></Spacer>
          <Spacer marginBottom={3}></Spacer>
          <ModalFooter>
            <Button colorScheme="blue" mr={4} onClick={handleChangePassword}>
              Cambiar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
