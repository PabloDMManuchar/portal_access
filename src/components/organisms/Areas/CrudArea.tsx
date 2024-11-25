import React from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { AreaType, UpdateAreaType } from "../../../types/usertype";
import AddAreaModal from "./AddAreaModal";
import { services } from "../../../services/index";

const CrudArea = ({
  areas,
  setAreas,
}: {
  areas: AreaType[];
  setAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
}) => {
  const refreshAreas = async () => {
    const response = await services.users.allAreas();
    setAreas(response);
  };

  const toggleActivation = async (area: AreaType) => {
    const uparea: UpdateAreaType = { idarea: area.idarea, area: area.area };

    try {
      if (area.hab === "NO") {
        await services.users.enabledArea(uparea);
      } else {
        await services.users.disabledArea(uparea);
      }
      refreshAreas();
      // Actualiza el estado de `areas` localmente para reflejar el cambio
    } catch (error) {
      console.error("Error al cambiar el estado del área:", error);
    }
  };

  return (
    <Box mb={8}>
      <Box as="h3" fontSize="lg" mb={4} textColor={"white"}>
        Lista de Areas
      </Box>
      <TableContainer>
        <Table colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Área</Th>
              <Th>Activa</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {areas.map((data) => (
              <Tr key={data.idarea}>
                <Td>{data.idarea}</Td>
                <Td>{data.area}</Td>
                <Td>{data.hab}</Td>
                <Td>
                  <Button
                    colorScheme={data.hab === "SI" ? "red" : "green"}
                    onClick={() => toggleActivation(data)}
                  >
                    {data.hab === "SI" ? "Desactivar" : "Activar"}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddAreaModal onAdd={refreshAreas} />
    </Box>
  );
};

export default CrudArea;
