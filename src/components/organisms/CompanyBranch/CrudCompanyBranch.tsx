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
  Text,
} from "@chakra-ui/react";
import {
  CompanyBranchType,
  UpdateCompanyBranchType,
} from "../../../types/usertype";
import AddCompanyBranchModal from "./AddCompanyBranchModal";
import { services } from "../../../services/index";

const CrudCompanyBranch = ({
  empresas,
  setEmpresas,
}: {
  empresas: CompanyBranchType[];
  setEmpresas: React.Dispatch<React.SetStateAction<CompanyBranchType[]>>;
}) => {
  const refreshCompanyBranch = async () => {
    const response = await services.users.allCompanyBranchs();
    setEmpresas(response);
  };

  const toggleActivation = async (empresa: CompanyBranchType) => {
    const upempresa: UpdateCompanyBranchType = {
      idempresasucursal: empresa.idempresasucursal,
      empresa: empresa.empresa,
      sucursal: empresa.sucursal,
    };

    try {
      if (empresa.hab === "NO") {
        await services.users.enabledCompanyBranch(upempresa);
      } else {
        await services.users.disabledCompanyBranch(upempresa);
      }
      refreshCompanyBranch();
      // Actualiza el estado de `areas` localmente para reflejar el cambio
    } catch (error) {
      console.error("Error al cambiar el estado del área:", error);
    }
  };

  return (
    <Box mb={8}>
      <Text fontSize="lg" mb={4}>
        Lista de Empresas - Sucursal
      </Text>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Empresa</Th>
              <Th>Sucursal</Th>
              <Th>Activa</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {empresas.length > 0 ? (
              empresas.map((data) => (
                <Tr key={data.idempresasucursal}>
                  <Td>{data.idempresasucursal}</Td>
                  <Td>{data.empresa}</Td>
                  <Td>{data.sucursal}</Td>
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
              ))
            ) : (
              <Tr>
                <Td colSpan={5} textAlign="center">
                  No hay datos disponibles.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <AddCompanyBranchModal onAdd={refreshCompanyBranch} />
    </Box>
  );
};

export default CrudCompanyBranch;
