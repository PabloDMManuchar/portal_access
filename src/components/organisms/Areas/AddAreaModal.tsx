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
import { newAreaSchema } from "../../../schemas/areaSchema";
import { CreateAreaType } from "../../../types/usertype";

interface AddAreaModalProps {
  onAdd: () => void;
}

const AddAreaModal: FC<AddAreaModalProps> = ({ onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [areaName, setAreaName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddArea = async () => {
    // Validación del campo 'area' usando Zod
    const validation = newAreaSchema.safeParse({ area: areaName });
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
      const newarea: CreateAreaType = { area: areaName };
      await services.users.createArea(newarea);
      toast({
        title: "Área agregada",
        description: `El área "${areaName}" se agregó exitosamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onAdd(); // Actualiza la lista de áreas en el componente principal
      onClose();
    } catch (error) {
      toast({
        title: "Error al agregar área",
        description: "Hubo un problema al agregar el área. Inténtelo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setAreaName(""); // Limpiar el campo de entrada
    }
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen} mt={4}>
        Agregar Área
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nueva Área</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl id="areaName" isRequired>
              <FormLabel>Nombre del Área</FormLabel>
              <Input
                placeholder="Ingrese el nombre del área"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Stack direction="row" spacing={4} mt={4} justify="flex-end">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddArea}
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

export default AddAreaModal;
