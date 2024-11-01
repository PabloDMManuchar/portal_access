import { useState, useEffect } from "react";
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
import { services } from "../../../services/index";
import {
  CreateUserType,
  CompanyBranchType,
  AreaType,
} from "../../../types/usertype";

const AddUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Estados locales para almacenar los valores del formulario
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [diasExpiraClave, setDiasExpiraClave] = useState("30");
  const [perfil, setPerfil] = useState("2");
  const [tipo, setTipo] = useState<"int" | "ext">("int");
  const [empresa, setEmpresa] = useState("");
  const [listaEmpresas, setListaEmpresas] = useState<CompanyBranchType[]>([]);
  const [area, setArea] = useState("");
  const [listaAreas, setListaAreas] = useState<AreaType[]>([]);

  // Cargar empresas desde la API al montar el componente
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await services.users.allEnabledCompanyBranchs(); // Llama a la API de empresas
        setListaEmpresas(response); // Almacena las empresas en el estado
      } catch (error) {
        Toast({
          title: "Error al cargar empresas",
          description: "Hubo un problema al cargar el listado de empresas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    const fetchAreas = async () => {
      try {
        const response = await services.users.allEnabledAreas(); // Llama a la API de empresas
        setListaAreas(response); // Almacena las empresas en el estado
      } catch (error) {
        Toast({
          title: "Error al cargar areas",
          description: "Hubo un problema al cargar el listado de areas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchEmpresas();
    fetchAreas();
  }, [Toast]);

  const handleSubmit = async () => {
    try {
      const newUser: CreateUserType = {
        nombre,
        usuario,
        email,
        diasexpirapassword: parseInt(diasExpiraClave),
        idperfil: parseInt(perfil),
        idempresasucursal: parseInt(empresa),
        idarea: parseInt(area),
        tipo,
      };

      // Llamada a la función de la API para crear usuario
      await services.users.createUser(newUser);

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
              <FormLabel>Tipo</FormLabel>
              <Select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as "int" | "ext")}
              >
                <option value="int">Interno</option>
                <option value="ext">Externo</option>
              </Select>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Empresa-Sucursal</FormLabel>
              <Select
                placeholder="Selecciona una empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              >
                {listaEmpresas.map((emp) => (
                  <option
                    key={emp.idempresasucursal}
                    value={emp.idempresasucursal}
                  >
                    {emp.sucursal}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>Area</FormLabel>
              <Select
                placeholder="Selecciona un Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                {listaAreas.map((areas) => (
                  <option key={areas.idarea} value={areas.idarea}>
                    {areas.area}
                  </option>
                ))}
              </Select>
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
