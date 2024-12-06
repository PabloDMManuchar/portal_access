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
  useToast,
} from "@chakra-ui/react";
import { services } from "../../../services/index";
import {
  UserType,
  UpdateUserType,
  AreaType,
  CompanyBranchType,
} from "../../../types/usertype";

interface EditUserModalProps {
  user: UserType | null;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [empresa, setEmpresa] = useState("");
  const [listaEmpresas, setListaEmpresas] = useState<CompanyBranchType[]>([]);
  const [email, setEmail] = useState(user?.email || "");
  const [area, setArea] = useState("");
  const [tipo, setTipo] = useState<"int" | "ext">(user?.tipo || "int");
  const [diasexpirapassword, setDiasExpiraClave] = useState(
    user?.diasexpirapassword || 0
  );
  const [perfil, setPerfil] = useState(user?.idperfil || 2);
  const [listaAreas, setListaAreas] = useState<AreaType[]>([]);

  const toast = useToast();

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await services.users.allEnabledCompanyBranchs();
        setListaEmpresas(response);
      } catch (error) {
        toast({
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
        const response = await services.users.allEnabledAreas();
        setListaAreas(response);
      } catch (error) {
        toast({
          title: "Error al cargar áreas",
          description: "Hubo un problema al cargar el listado de áreas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (isOpen) {
      fetchEmpresas();
      fetchAreas();
    }
  }, [isOpen, toast]);

  const HandlerUpdate = async () => {
    if (!user) return;
    let idempresasucursal = 0;
    let idarea = 0;
    let idperfil = 0;
    let diasexppassword = 0;
    let emailuser = "";
    let tip = "";

    if (email === "") {
      emailuser = user.email;
    } else {
      emailuser = email;
    }
    if (empresa === "") {
      idempresasucursal = user.idempresasucursal;
    } else {
      idempresasucursal = parseInt(empresa, 10);
    }
    if (area === "") {
      idarea = user.idarea;
    } else {
      idarea = parseInt(area, 10);
    }
    if (tipo === user.tipo) {
      tip = user.tipo;
    } else {
      tip = tipo;
    }
    if (diasexpirapassword === 0) {
      diasexppassword = user.diasexpirapassword;
    } else {
      diasexppassword = diasexpirapassword;
    }
    if (perfil === 0) {
      idperfil = user.idperfil;
    } else {
      idperfil = perfil;
    }
    try {
      const upUser: UpdateUserType = {
        idusuario: user.idusuario,
        usuario: user.usuario,
        email: emailuser.trim(),
        diasexpirapassword: diasexppassword,
        idperfil: idperfil,
        idempresasucursal: idempresasucursal,
        idarea: idarea,
        tipo: tip,
      };

      await services.users.updateUser(upUser);

      toast({
        title: "Usuario modificado",
        description: "El usuario ha sido modificado con éxito.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al modificar el usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalBody pb={4}>
          <FormControl>
            <FormLabel>Nombre: {user.nombre}</FormLabel>
            <FormLabel>Usuario: {user.usuario}</FormLabel>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Email:{user.email}</FormLabel>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>
              Empresa-Sucursal: {user.empresa} - {user.sucursal}
            </FormLabel>
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
            <FormLabel>Área: {user.area}</FormLabel>
            <Select
              placeholder="Selecciona un área"
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
            <FormLabel>Tipo</FormLabel>
            <Select
              value={user.tipo}
              onChange={(e) => setTipo(e.target.value as "int" | "ext")}
            >
              <option value="int">Interno</option>
              <option value="ext">Externo</option>
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Días Expiración de Clave</FormLabel>
            <Select
              value={diasexpirapassword}
              onChange={(e) => setDiasExpiraClave(parseInt(e.target.value, 10))}
            >
              <option value="0">Nunca</option>
              <option value="30">30 días</option>
              <option value="60">60 días</option>
              <option value="90">90 días</option>
              <option value="120">120 días</option>
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Perfil: {user.perfil}</FormLabel>
            <Select
              value={perfil}
              onChange={(e) => setPerfil(parseInt(e.target.value, 10))}
            >
              <option value={1}>Administrador</option>
              <option value={2}>Usuario</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancelar</Button>
          <Button colorScheme="blue" onClick={HandlerUpdate}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserModal;
