import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaKey } from "react-icons/fa"; // Importa el ícono de react-icons/fa
import { users } from "../../../services/users/users";
import { ChangePasswordType } from "../../../types/usertype";
import { useAuth } from "../../../context/AuthContext";

const ChangePasswordModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [oldpassword, setOldPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const toast = useToast();
  const { dataUser } = useAuth();

  const iscompleted = oldpassword && password && confirmPassword ? false : true;

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
      {/* <Tooltip label="* Cambiar Password" > */}
      <Button
        _hover={{ bg: "gray.100", color: "gray.800" }}
        color={"gray.100"}
        leftIcon={<FaKey color="green" />}
        mr={4}
        onClick={() => {
          onOpen();
        }}
        variant={"outline"}
        w={"100%"}
      >
        Cambiar Contraseña
      </Button>
      {/* </Tooltip> */}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent
          bg={"gray.600"}
          borderColor={"gray.500"}
          borderRadius="md"
          borderWidth={"2px"}
          p={4}
          color="gray.200"
        >
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
          <Button
            isDisabled={iscompleted}
            colorScheme="orange"
            w={"90%"}
            mt={"2rem"}
            mx={"auto"}
            onClick={handleChangePassword}
          >
            ACTUALIZAR CONTRASEÑA
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
