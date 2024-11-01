import { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { AreaType, CompanyBranchType } from "../../../types/usertype";
import { Grupo } from "../../../types/apptype";
import { users } from "../../../services/users/users";
import { services } from "../../../services";
import CrudArea from "../../organisms/Areas/CrudArea";
import CrudCompanyBranch from "../../organisms/CompanyBranch/CrudCompanyBranch";

const Settingcontentpage = () => {
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [empresas, setEmpresas] = useState<CompanyBranchType[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await users.allAreas();
        setAreas(response);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    const fetchCompanyBranchs = async () => {
      try {
        const response = await users.allCompanyBranchs();
        setEmpresas(response);
      } catch (error) {
        console.error("Error fetching companybranchs:", error);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await services.applications.AllGroupApp();
        setGrupos(response);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchAreas();
    fetchCompanyBranchs();
    fetchGroups();
  }, []);

  return (
    <Box p={4} textColor="white">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={8}>
        <StatBox label="Areas" value={areas.length} />
        <StatBox label="Empresas/Sucursales" value={empresas.length} />
        <StatBox label="Grupos de App" value={grupos.length} />
      </SimpleGrid>

      <CrudArea areas={areas} setAreas={setAreas} />
      <CrudCompanyBranch empresas={empresas} setEmpresas={setEmpresas} />
      <CRUDGroups
        grupos={grupos}
        //setGrupos={setGrupos}
      />
    </Box>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <Stat
    p={4}
    border="1px solid"
    borderColor="gray.200"
    borderRadius="md"
    textAlign="center"
  >
    <StatLabel fontSize="lg">{label}</StatLabel>
    <StatNumber fontSize="2xl">{value}</StatNumber>
  </Stat>
);

const CRUDGroups = ({
  grupos,
}: //setGrupos,
{
  grupos: Grupo[];
  //setGrupos: React.Dispatch<React.SetStateAction<Grupo[]>>;
}) => {
  return (
    <Box mb={8}>
      <Text fontSize="lg" mb={4}>
        Listado de Grupos de App
      </Text>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Grupo</Th>
              <Th>Descripcion</Th>
              <Th>Activo</Th>
              <Th>CantApp</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {grupos.length > 0 ? (
              grupos.map((data) => (
                <Tr key={data.idgrupoaplicaciones}>
                  <Td>{data.idgrupoaplicaciones}</Td>
                  <Td>{data.grupo}</Td>
                  <Td>{data.descripcion}</Td>
                  <Td>{data.hab}</Td>
                  <Td>{data.cantapp}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      mr={2}
                      onClick={
                        () => {}
                        //console.log("Editando", data.idgrupoaplicaciones)
                      }
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={
                        () => {}
                        //console.log("Eliminando", data.idgrupoaplicaciones)
                      }
                    >
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  No hay datos disponibles.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Button colorScheme="green" mt={4}>
        Agregar Grupo
      </Button>
    </Box>
  );
};

export default Settingcontentpage;
