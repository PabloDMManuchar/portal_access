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
import {
  UserType,
  UsersbyEmpresaSucursal,
  UsersbyArea,
  LastEvents,
} from "../../../types/usertype";
import { users } from "../../../services/users/users";

// Componente para el Dashboard
const HomeContentPage = () => {
  const [usersdata, setUsersData] = useState<UserType[]>([]);
  const [usersbyempsucdata, setUsersbyEmpSucData] = useState<
    UsersbyEmpresaSucursal[]
  >([]);
  const [usersbyarea, setUsersbyareaData] = useState<UsersbyArea[]>([]);
  const [lasteventdata, setLastEventData] = useState<LastEvents[]>([]);

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

  useEffect(() => {
    const fetchUsersbyEmpresaSucursal = async () => {
      try {
        const response = await users.UsersbyEmpresaSucursal();
        setUsersbyEmpSucData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersbyEmpresaSucursal();
  }, []);

  useEffect(() => {
    const fetchUsersbyArea = async () => {
      try {
        const response = await users.UsersbyArea();
        setUsersbyareaData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsersbyArea();
  }, []);

  useEffect(() => {
    const fetchLastEvent = async () => {
      try {
        const response = await users.LastEvents();
        setLastEventData(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchLastEvent();
  }, []);

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
  const totalUsuariosInternos = usersdata.filter(
    (user) => user.tipo === "int"
  ).length;
  const totalUsuariosExternos = usersdata.filter(
    (user) => user.tipo === "ext"
  ).length;

  return (
    <Box p={4}>
      <SimpleGrid
        columns={{ base: 1, md: 5 }}
        spacing={4}
        mb={8}
        textColor={"white"}
      >
        <StatBox label="Total Usuarios" value={totalUsuarios} />
        <StatBox label="Activos" value={totalHabilitados} />
        <StatBox label="Inactivos" value={totalDeshabilitados} />
        <StatBox label="Administradores App" value={totalAdministradores} />
        <StatBox label="Usuarios App" value={totalUsuariosComunes} />
        <StatBox label="Internos" value={totalUsuariosInternos} />
        <StatBox label="Externos" value={totalUsuariosExternos} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {/* Tabla de Usuarios x Empresa */}
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Lista de usuarios x Empresa - Sucursal</TableCaption>
            <Thead>
              <Tr>
                <Th>Empresa</Th>
                <Th>Sucursal</Th>
                <Th>Cant</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersbyempsucdata.map((user) => (
                <Tr key={user.idempresasucursal}>
                  <Td>{user.empresa}</Td>
                  <Td>{user.sucursal}</Td>
                  <Td>{user.cant}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Tabla de Usuarios x Area */}
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Lista de usuarios x Area</TableCaption>
            <Thead>
              <Tr>
                <Th>Area</Th>
                <Th>Cant</Th>
              </Tr>
            </Thead>
            <Tbody color="white">
              {usersbyarea.map((user) => (
                <Tr key={user.idarea}>
                  <Td>{user.area}</Td>
                  <Td>{user.cant}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Tabla de Últimos Eventos */}
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Últimos Eventos</TableCaption>
            <Thead>
              <Tr>
                <Th>Fecha</Th>
                <Th>Usuario</Th>
                <Th>Evento</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lasteventdata.map((eventos) => (
                <Tr key={eventos.idlogseventos}>
                  <Td>{new Date(eventos.fecha).toDateString()}</Td>
                  <Td>{eventos.usuario}</Td>
                  <Td>{eventos.evento}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>
    </Box>
  );
};

interface StatBoxProps {
  label: string;
  value: number;
}

const StatBox = ({ label, value }: StatBoxProps) => {
  return (
    <Stat
      p={4}
      border="1px solid"
      borderColor="white.800"
      borderRadius="md"
      shadow="sm"
      textAlign="center"
      textColor="white"
    >
      <StatLabel fontSize="lg">{label}</StatLabel>
      <StatNumber fontSize="2xl">{value}</StatNumber>
    </Stat>
  );
};

export default HomeContentPage;
