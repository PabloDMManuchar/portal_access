import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Toast,
} from "@chakra-ui/react";
import { services } from "../../../services/index";
import { UserType, AreaType, CompanyBranchType } from "../../../types/usertype";

interface EditUserModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateUserModal: React.FC<EditUserModalProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const [userData, setUserData] = useState<UserType | null>(null);
  //const [diasExpiraClave, setDiasExpiraClave] = useState("30");
  //const [perfil, setPerfil] = useState("2");

  const [empresa, setEmpresa] = useState("");
  const [listaEmpresas, setListaEmpresas] = useState<CompanyBranchType[]>([]);
  const [area, setArea] = useState("");
  const [listaAreas, setListaAreas] = useState<AreaType[]>([]);

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
    if (userId) {
      services.users.UserById(userId).then(setUserData).catch(console.error);
    }
  }, [userId]);

  if (!userData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalBody pb={4}>
          <FormControl>
            <FormLabel>Nombre: {userData.nombre}</FormLabel>
            <Input value={userData.nombre} /* actualizar datos aquí */ />
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
          {/* Repite esto para otros campos */}
        </ModalBody>
        <ModalFooter pb={4}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button colorScheme="blue" /* handler para guardar cambios */>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserModal;
