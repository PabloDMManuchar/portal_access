import { useState } from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Aplicacion } from "../../../../types/apptype"; // Importar el tipo
import EditApplicationModal from "../../modals/EditApplicationModal";

interface AplicacionCardProps {
  aplicacion: Aplicacion; // Definir el tipo de props
}

const AplicationCard: React.FC<AplicacionCardProps> = ({ aplicacion }) => {
  const {
    idaplicaciones,
    nombre,
    descripcion,
    idgrupoaplicaciones,
    grupo,
    type,
    cantuser,
    src,
    url,
    hab,
  } = aplicacion;

  // Manejo del modal de Chakra UI
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Estado para controlar los datos del formulario de edición
  const [editData, setEditData] = useState({
    nombre,
    descripcion,
    grupo,
    type,
    url,
    idaplicaciones,
    idgrupoaplicaciones,
  });

  // Abrir el modal
  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  // Cerrar el modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  // Guardar los cambios realizados en el modal
  const handleSaveEdit = (newData: {
    nombre: string;
    descripcion: string;
    grupo: string;
    type: string;
    url: string;
    idaplicaciones: number;
    idgrupoaplicaciones: number;
  }) => {
    setEditData(newData); // Actualiza los datos si es necesario
    // Aquí puedes agregar la lógica para actualizar en la API
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxW="sm">
      {/* Campo oculto para idaplicaciones */}
      <input type="hidden" value={idaplicaciones} />

      <Image src={src} alt={nombre} />

      <Box p="6">
        {/* Título para el nombre de la aplicación */}
        <Text fontSize="lg" fontWeight="bold">
          Nombre:
        </Text>
        <Text fontSize="xl" fontWeight="bold" mt="1">
          {nombre}
        </Text>

        {/* Título para la descripción */}
        <Text fontSize="lg" fontWeight="bold" mt="4">
          Descripción:
        </Text>
        <Text mt="1">{descripcion}</Text>

        {/* Título para la descripción */}
        <Text fontSize="lg" fontWeight="bold" mt="4">
          Grupo:
        </Text>
        <Text mt="1">{grupo}</Text>
        <Text fontSize="lg" fontWeight="bold" mt="4">
          Tipo:
        </Text>
        <Text mt="1">{type}</Text>
        <Text fontSize="lg" fontWeight="bold" mt="4">
          Usuarios Auth:
        </Text>
        <Text mt="1">{cantuser}</Text>
        {/* Estado 'Activo' o 'Inactivo' basado en el valor de 'hab' */}
        <Text fontSize="lg" fontWeight="bold" mt="4">
          Estado:
        </Text>
        <Text
          mt="1"
          color={hab === "SI" ? "green.500" : "red.500"}
          fontWeight="bold"
        >
          {hab === "SI" ? "Activo" : "Inactivo"}
        </Text>

        {/* Botón para ver más detalles */}
        <Button
          as="a"
          href={url}
          target="_blank"
          mt="4"
          colorScheme="teal"
          variant="link"
        >
          Ir
        </Button>

        {/* Botón para editar la aplicación */}
        <Button onClick={handleOpenEditModal} mt="4" colorScheme="blue">
          Editar
        </Button>

        {/* Modal para editar la aplicación */}
        <EditApplicationModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
          initialData={editData}
        />
      </Box>
    </Box>
  );
};

export default AplicationCard;
