import { useState } from "react";
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
  Select,
  useDisclosure,
  Toast,
  Icon,
} from "@chakra-ui/react";

import { FaUserPlus, FaCheck } from "react-icons/fa";
import { users } from "../../../services/users/users";
import { CreateUserType } from "../../../types/usertype";

const AddUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Estados locales para almacenar los valores del formulario
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [diasExpiraClave, setDiasExpiraClave] = useState("30");
  const [perfil, setPerfil] = useState("2");

  const handleSubmit = async () => {
    try {
      const newUser: CreateUserType = {
        nombre,
        usuario,
        email,
        diasexpirapassword: parseInt(diasExpiraClave),
        idperfil: parseInt(perfil),
      };

      // Aquí llamas a la API para agregar el usuario
      // Llamar a la función de la API para crear usuario
      await users.createUser(newUser);

      Toast({
        title: "Usuario Agregado",
        description: "El usuario ha sido agregado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // resetear los valores del formulario
      setNombre("");
      setUsuario("");
      setEmail("");
      setDiasExpiraClave("30");
      setPerfil("2");

      onClose();
    } catch (error) {
      Toast({
        title: "Error",
        description: "Hubo un problema al insertar el usuario",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        leftIcon={<Icon as={FaUserPlus} boxSize={6} />}
        variant="outline"
      >
        Agregar Usuario
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxHeight="80vh" mb={6}>
            <FormControl mb={2}>
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Usuario</FormLabel>
              <Input
                placeholder="Nombre de usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Días Expiración de Clave</FormLabel>
              <Select
                value={diasExpiraClave}
                onChange={(e) => setDiasExpiraClave(e.target.value)}
              >
                <option value="0">Nunca</option>
                <option value="30">30 días</option>
                <option value="60">60 días</option>
                <option value="90">90 días</option>
                <option value="120">120 días</option>
              </Select>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Perfil</FormLabel>
              <Select
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
              >
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
              </Select>
            </FormControl>
            <br></br>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              leftIcon={<Icon as={FaCheck} boxSize={6} />}
              variant="outline"
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserModal;
