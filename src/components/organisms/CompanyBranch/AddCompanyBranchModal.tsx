import { useState, FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { services } from "../../../services/index";
import { newEmpresaSucursalSchema } from "../../../schemas/empresasucursalSchema";
import { CreateCompanyBranchType } from "../../../types/usertype";

interface AddCompanyBranchModalProps {
  onAdd: () => void;
}

const AddCompanyBranchModal: FC<AddCompanyBranchModalProps> = ({ onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [EmpresaName, setEmpresaName] = useState("");
  const [SucursalName, setSucursalName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddEmpresa = async () => {
    // Validación del campo 'area' usando Zod
    const validation = newEmpresaSucursalSchema.safeParse({
      empresa: EmpresaName,
      sucursal: SucursalName,
    });
    if (!validation.success) {
      toast({
        title: "Error",
        description: validation.error.errors[0].message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Llamada a la API para agregar el área
      const newempresasucursal: CreateCompanyBranchType = {
        empresa: EmpresaName,
        sucursal: SucursalName,
      };
      await services.users.createEmpresaSucursal(newempresasucursal);
      toast({
        title: "Empresa agregada",
        description: `La Empresa "${EmpresaName}" se agregó exitosamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onAdd(); // Actualiza la lista de áreas en el componente principal
      onClose();
    } catch (error) {
      toast({
        title: "Error al agregar empresa-sucursal",
        description:
          "Hubo un problema al agregar la Empresa-Sucursal. Inténtelo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setEmpresaName("");
      setSucursalName("");
    }
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen} mt={4}>
        Agregar Empresa - Sucursal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nueva Empresa - Sucursal</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl id="EmpresaName" isRequired>
              <FormLabel>Empresa</FormLabel>
              <Input
                placeholder="Ingrese el nombre de la Empresa"
                value={EmpresaName}
                onChange={(e) => setEmpresaName(e.target.value)}
              />
            </FormControl>
            <FormControl id="SucursalName" isRequired>
              <FormLabel>Sucursal</FormLabel>
              <Input
                placeholder="Ingrese el nombre de la Sucursal"
                value={SucursalName}
                onChange={(e) => setSucursalName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Stack direction="row" spacing={4} mt={4} justify="flex-end">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddEmpresa}
              isLoading={isLoading}
            >
              Guardar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCompanyBranchModal;
