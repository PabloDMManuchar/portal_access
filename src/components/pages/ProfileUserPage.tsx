import Layout from "../Layout/Layout";
import {
  Box,
  Text,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext"; // Importa el Context
import ChangePasswordModal from "../molecules/modals/ChangePasswordModal";
import AddPrivateApplicationModal from "../molecules/modals/AddPrivateApplicationModal";
import TableAppPrivateUser from "../molecules/tables/TableAppPrivateUser";

const ProfileUserPage = () => {
  const { statusPassword, dataUser } = useAuth();

  return (
    <Layout>
      <Box maxW="1200px" mx="auto" p={5} textColor={"white"}>
        <Box p={5} borderWidth={1} borderRadius="lg" w="full">
          <Text fontSize="xl" fontWeight="bold">
            MIS DATOS
          </Text>
          <Text fontWeight="bold" fontSize="lg" mb={1}>
            {dataUser.nombre}
          </Text>
          <Text color="gray.500">{dataUser.email}</Text>
          <Text color="gray.500" fontSize="sm">
            {dataUser.perfil}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Tipo: {dataUser.tipo}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Empresa: {dataUser.empresa}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Sucursal: {dataUser.sucursal}
          </Text>
          <Text color="gray.500" fontSize="sm">
            Area: {dataUser.area}
          </Text>
          <Text color="gray.600" fontSize="sm">
            Status Password: {statusPassword}
          </Text>
          <Text color="gray.600" fontSize="sm">
            Plazo Expira Password:{" "}
            {dataUser.diasexpirapassword === 0
              ? "No Expira"
              : dataUser.diasexpirapassword}{" "}
            dias
          </Text>
          <Text color="gray.600" fontSize="sm">
            Debe Actualizar su password en:{" "}
            {dataUser.diasexpirapassword === 0
              ? "Sin Plazo de Vencimiento"
              : dataUser.diasexpirapassword - dataUser.diascambiopassword}{" "}
            dias
          </Text>
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={5}>
          <Stat>
            <StatLabel>Enlaces Autorizados</StatLabel>
            <StatNumber>{dataUser.cantappublic}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Enlaces Creados</StatLabel>
            <StatNumber>{dataUser.cantapprivate}</StatNumber>
          </Stat>
        </Grid>
      </Box>
      <Box>
        <Text fontWeight="bold" mb={4}>
          Opciones
        </Text>
        <List spacing={4}>
          <ListItem cursor="pointer" _hover={{ color: "green.500" }}>
            <ChangePasswordModal />
          </ListItem>
          <ListItem cursor="pointer" _hover={{ color: "blue.500" }}>
            <AddPrivateApplicationModal />
          </ListItem>

          <TableAppPrivateUser />
        </List>
      </Box>
    </Layout>
  );
};

export default ProfileUserPage;
