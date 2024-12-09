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
  TableContainer,
  Text,
} from "@chakra-ui/react";
import {
  UserType,
  UsersbyEmpresaSucursal,
  UsersbyArea,
  LastEvents,
} from "../../../types/usertype";
import { services } from "../../../services";

// Componente para el Dashboard
const HomeContentPage = () => {
  const [data, setData] = useState({
    users: [] as UserType[],
    usersByEmpSuc: [] as UsersbyEmpresaSucursal[],
    usersByArea: [] as UsersbyArea[],
    lastEvents: [] as LastEvents[],
  });
  
  const dataStats = [
    {
      label: "Total Usuarios",
      value: data.users.length,
    },
    {
      label: "Activos",
      value: data.users.filter((user) => user.hab === "SI").length,
    },
    {
      label: "Inactivos",
      value: data.users.filter((user) => user.hab === "NO").length,
    },
    {
      label: "Administradores",
      value: data.users.filter((user) => user.perfil === "administrador")
        .length,
    },
    {
      label: "Usuarios",
      value: data.users.filter((user) => user.perfil === "usuario").length,
    },
    {
      label: "Internos",
      value: data.users.filter((user) => user.tipo === "int").length,
    },
    {
      label: "Externos",
      value: data.users.filter((user) => user.tipo === "ext").length,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allUsers, usersByEmpSuc, usersByArea, lastEvents] =
          await Promise.all([
            services.users.AllUsers(),
            services.users.UsersbyEmpresaSucursal(),
            services.users.UsersbyArea(),
            services.users.LastEvents(),
          ]);

        setData({
          users: allUsers,
          usersByEmpSuc: usersByEmpSuc,
          usersByArea: usersByArea,
          lastEvents: lastEvents,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 4, lg: 5, xl: 6, '2xl': 7 }} mb={8} textColor={"white"} mx={'auto'} justifyItems="center" spacing={4}>
        {dataStats.map((stat) => (
          <StatBox key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </SimpleGrid>

      <Box display={"flex"} gap={"2rem"} flexWrap={"wrap"} justifyContent={'center'} >
        {/* Tabla de Usuarios x Empresa */}
        <TableContainer
          bg={"gray.800"}
          borderColor={"gray.700"}
          borderRadius="md"
          borderWidth={"2px"}
          color={"gray.200"}
          opacity={0.8}
          height={"fit-content"}
          minW="24rem"
          p={2}
          w={"30%"}
        >
          <Text color={"gray.400"}>Lista de usuarios x Empresa - Sucursal</Text>
          <Table>
            <Thead>
              <Tr>
                <Th>Empresa</Th>
                <Th>Sucursal</Th>
                <Th>Cant</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.usersByEmpSuc.map((user) => (
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
        <TableContainer
          bg={"gray.800"}
          borderColor={"gray.700"}
          borderRadius="md"
          borderWidth={"2px"}
          height={"fit-content"}
          minW="24rem"
          opacity={0.8}
          color={"gray.200"}
          p={2}
          w={"30%"}
        >
          <Text color={"gray.400"}>Lista de usuarios x Area</Text>

          <Table>
            <Thead>
              <Tr>
                <Th>Area</Th>
                <Th>Cant</Th>
              </Tr>
            </Thead>
            <Tbody color="white">
              {data.usersByArea.map((user) => (
                <Tr key={user.idarea}>
                  <Td>{user.area}</Td>
                  <Td>{user.cant}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Tabla de Últimos Eventos */}
        <TableContainer
          bg={"gray.800"}
          borderColor={"gray.700"}
          borderRadius="md"
          borderWidth={"2px"}
          height={"fit-content"}
          minW="24rem"
          opacity={0.8}
          color={"gray.200"}
          p={2}
          w={"30%"}
        >
          <Text color={"gray.400"}>Últimos Eventos</Text>

          <Table>
            <Thead>
              <Tr>
                <Th>Fecha</Th>
                <Th>Usuario</Th>
                <Th>Evento</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.lastEvents.map((eventos) => (
                <Tr key={eventos.idlogseventos}>
                  <Td>{new Date(eventos.fecha).toDateString()}</Td>
                  <Td>{eventos.usuario}</Td>
                  <Td>{eventos.evento}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

interface StatBoxProps {
  label: string;
  value: number;
}

const StatBox = ({ label, value }: StatBoxProps) => {
  return (
    <Stat
      bg={"gray.800"}
      py={2}
      border="1px solid"
      borderColor="gray.600"
      borderRadius="md"
      shadow="sm"
      textAlign="center"
      textColor="white"
      w={"10rem"}
    >
      <StatLabel fontSize="md">{label}</StatLabel>
      <StatNumber fontSize="xl">{value}</StatNumber>
    </Stat>
  );
};

export default HomeContentPage;
