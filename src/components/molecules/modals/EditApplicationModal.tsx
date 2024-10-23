import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Button as ChakraButton,
  Text,
  Box,
  FormLabel,
} from "@chakra-ui/react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editData: {
    nombre: string;
    descripcion: string;
    src: string;
    idaplicaciones: number;
    grupo: string;
  }) => void;
  initialData: {
    nombre: string;
    descripcion: string;
    idaplicaciones: number;
    grupo: string;
    src: string;
  };
}

const EditApplicationModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [editData, setEditData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    onSave(editData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Aplicación</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box borderWidth="1px" borderRadius="lg" p="6" maxW="sm">
            <input type="hidden" value={editData.idaplicaciones} />

            <FormLabel>Nombre</FormLabel>
            <Input
              name="nombre"
              value={editData.nombre}
              onChange={handleChange}
            />
            <FormLabel>Descripcion</FormLabel>
            <Input
              name="descripcion"
              value={editData.descripcion}
              onChange={handleChange}
            />

            <FormLabel>URL Imagen</FormLabel>
            <Input name="src" value={editData.src} onChange={handleChange} />
          </Box>

          <Text fontWeight="bold">Grupo:</Text>
          <Text fontWeight="bold">{editData.grupo}</Text>
        </ModalBody>

        <ModalFooter>
          <ChakraButton colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </ChakraButton>
          <ChakraButton variant="ghost" onClick={onClose}>
            Cancelar
          </ChakraButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditApplicationModal;
