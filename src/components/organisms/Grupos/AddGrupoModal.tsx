import { useState } from "react";
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

import { newGrupoSchema } from "../../../schemas/grupoShema";

const AddGrupoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [grupoName, setGrupoName] = useState("");
  const [grupoDescripcion, setGrupoDescripcion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddGrupo = async () => {
    // Validación del campo 'area' usando Zod
    const validation = newGrupoSchema.safeParse({
      area: grupoName,
      descripcion: grupoDescripcion,
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
      {
        /*const newgrupo: NewGrupo = {
        grupo: grupoName,
        descripcion: grupoDescripcion,
      };
      console.info(newgrupo);*/
      }
      //await services.applications.(newarea);
      toast({
        title: "Grupo Agregado",
        description: `El grupo "${grupoName}" se agregó exitosamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error al agregar área",
        description:
          "Hubo un problema al agregar el grupo. Inténtelo de nuevo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setGrupoName("");
      setGrupoDescripcion("");
    }
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen} mt={4}>
        Agregar Grupo
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nuevo Grupo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl id="grupoName" isRequired>
              <FormLabel>Nombre del Grupo</FormLabel>
              <Input
                placeholder="Ingrese el nombre del grupo"
                value={grupoName}
                onChange={(e) => setGrupoName(e.target.value)}
              />
            </FormControl>
            <FormControl id="grupodescripcion" isRequired>
              <FormLabel>Descripcion</FormLabel>
              <Input
                placeholder="Ingrese la descripcion"
                value={grupoDescripcion}
                onChange={(e) => setGrupoDescripcion(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <Stack direction="row" spacing={4} mt={4} justify="flex-end">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddGrupo}
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

export default AddGrupoModal;
