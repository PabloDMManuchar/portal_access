// ExpandableRow.tsx
import React from "react";
import { UserType } from "../../../types/usertype";
import { Box, Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FaEdit, FaSync, FaUserCheck, FaUserTimes } from "react-icons/fa";

interface ExpandableRowProps {
  data: UserType; // Propiedad que recibe los datos del usuario
  onEdit: (id: number) => void; // Función para manejar la edición
  onRefreshPassword: (id: number) => void; // Función para manejar el refresco de la contraseña
  onToggleUser: (id: number, status: string) => void; // Función para habilitar/deshabilitar el usuario
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({
  data,
  onEdit,
  onRefreshPassword,
  onToggleUser,
}) => {
  return (
    <Box>
      <Box p={4} flexDirection={"column"}>
        <Text>
          {" "}
          <strong>Nombre:</strong> {data.nombre}{" "}
        </Text>
        <Text>
          {" "}
          <strong>Usuario:</strong> {data.usuario}{" "}
        </Text>
        <Text>
          {" "}
          <strong>Email:</strong> {data.email}{" "}
        </Text>
        <Text>
          {" "}
          <strong>Tipo:</strong> {data.tipo}{" "}
        </Text>
      </Box>
      <Flex mb={2}>
        {/* Botón para editar */}
        <Tooltip label="Editar usuario">
          <IconButton
            icon={<FaEdit />}
            aria-label="Editar usuario"
            onClick={() => onEdit(data.idusuario)}
            mr={2}
          />
        </Tooltip>

        {/* Botón para refrescar la contraseña */}
        <Tooltip label="Refrescar contraseña">
          <IconButton
            icon={<FaSync />}
            aria-label="Refrescar contraseña"
            onClick={() => onRefreshPassword(data.idusuario)}
            mr={2}
          />
        </Tooltip>

        {/* Botón para habilitar/deshabilitar */}
        <Tooltip label={data.hab.toUpperCase() === 'SI' ? 'Deshabilitar usuario' : 'Habilitar usuario'}>
        <IconButton
          icon={data.hab ? <FaUserTimes /> : <FaUserCheck />}
          aria-label={data.hab ? "Deshabilitar usuario" : "Habilitar usuario"}
          onClick={() => onToggleUser(data.idusuario, data.hab)}
          colorScheme={data.hab == "NO" ? "red" : "green"}
          />
          </Tooltip>
      </Flex>
      {/* Aquí puedes incluir otros detalles que desees mostrar */}
    </Box>
  );
};

export default ExpandableRow;
