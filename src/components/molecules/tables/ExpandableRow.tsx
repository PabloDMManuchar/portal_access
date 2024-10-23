// ExpandableRow.tsx
import React from "react";
import { UserType } from "../../../types/usertype";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { FaEdit, FaSync, FaUserCheck, FaUserTimes } from "react-icons/fa";

interface ExpandableRowProps {
  data: UserType; // Propiedad que recibe los datos del usuario
  onEdit: (id: number) => void; // Función para manejar la edición
  onRefreshPassword: (id: number) => void; // Función para manejar el refresco de la contraseña
  onToggleUser: (id: number, status: boolean) => void; // Función para habilitar/deshabilitar el usuario
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({
  data,
  onEdit,
  onRefreshPassword,
  onToggleUser,
}) => {
  return (
    <Box p={4}>
      <Flex mb={2}>
        {/* Botón para editar */}
        <IconButton
          icon={<FaEdit />}
          aria-label="Editar usuario"
          onClick={() => onEdit(data.idusuario)}
          mr={2}
        />
        {/* Botón para refrescar la contraseña */}
        <IconButton
          icon={<FaSync />}
          aria-label="Refrescar contraseña"
          onClick={() => onRefreshPassword(data.idusuario)}
          mr={2}
        />
        {/* Botón para habilitar/deshabilitar */}
        <IconButton
          icon={data.hab ? <FaUserTimes /> : <FaUserCheck />}
          aria-label={data.hab ? "Deshabilitar usuario" : "Habilitar usuario"}
          onClick={() => onToggleUser(data.idusuario, !data.hab)}
          colorScheme={data.hab == "NO" ? "red" : "green"}
        />
      </Flex>
      {/* Aquí puedes incluir otros detalles que desees mostrar */}
    </Box>
  );
};

export default ExpandableRow;
