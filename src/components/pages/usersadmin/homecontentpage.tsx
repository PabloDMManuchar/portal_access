import { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { UserType } from "../../../types/usertype";
import { users } from "../../../services/users/users";

// Componente para el Dashboard
const HomeContentPage = () => {
  // Estado de los datos
  const [usersdata, setUsersData] = useState<UserType[]>([]); // Estado para almacenar los usuarios
  // Simulación de llamada a la API

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await users.AllUsers();
        setUsersData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // KPIs
  const totalUsuarios = usersdata.length;
  const totalHabilitados = usersdata.filter((user) => user.hab === "SI").length;
  const totalDeshabilitados = usersdata.filter(
    (user) => user.hab === "NO"
  ).length;
  const totalAdministradores = usersdata.filter(
    (user) => user.perfil === "administrador"
  ).length;
  const totalUsuariosComunes = usersdata.filter(
    (user) => user.perfil === "usuario"
  ).length;
  return (
    <Box p={4}>
      {/* Sección de KPIs */}
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4} mb={8}>
        <StatBox label="Total Usuarios" value={totalUsuarios} />
        <StatBox label="Total Habilitados (SI)" value={totalHabilitados} />
        <StatBox
          label="Total Deshabilitados (NO)"
          value={totalDeshabilitados}
        />
        <StatBox
          label="Usuarios Administradores"
          value={totalAdministradores}
        />
        <StatBox label="Usuarios Comunes" value={totalUsuariosComunes} />
      </SimpleGrid>

      {/* Tabla de Usuarios */}
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Lista de usuarios y detalles</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Usuario</Th>
              <Th>Email</Th>
              <Th>Perfil</Th>
              <Th>Habilitado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersdata.map((user, index) => (
              <Tr key={index}>
                <Td>{user.nombre}</Td>
                <Td>{user.usuario}</Td>
                <Td>{user.email}</Td>
                <Td>{user.perfil}</Td>
                <Td>{user.hab}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Definir los tipos para las props
interface StatBoxProps {
  label: string;
  value: number;
}

// Componente reutilizable para cada KPI
const StatBox = ({ label, value }: StatBoxProps) => {
  return (
    <Stat
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      shadow="sm"
      textAlign="center"
    >
      <StatLabel fontSize="lg">{label}</StatLabel>
      <StatNumber fontSize="2xl">{value}</StatNumber>
    </Stat>
  );
};

export default HomeContentPage;
