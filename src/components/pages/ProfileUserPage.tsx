import {
  Box,
  Text,
  Grid,
  // Avatar,
  Stack,
  Divider,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Circle,
  Center,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordModal from "../molecules/modals/ChangePasswordModal";
import AddPrivateApplicationModal from "../molecules/modals/AddPrivateApplicationModal";
import TableAppPrivateUser from "../molecules/tables/TableAppPrivateUser";
import LayoutMotion from "../Layout/LayoutMotion";

const ProfileUserPage = () => {
  const { statusPassword, dataUser } = useAuth();

  const userDetails = [
    { label: "Avatar", value: dataUser.avatar },
    { label: "Email", value: dataUser.email },
    { label: "Perfil", value: dataUser.perfil },
    { label: "Tipo", value: dataUser.tipo },
    { label: "Empresa", value: dataUser.empresa },
    { label: "Sucursal", value: dataUser.sucursal },
    { label: "Área", value: dataUser.area },
    { label: "Status Password", value: statusPassword },
    {
      label: "Plazo Expira Password",
      value:
        dataUser.diasexpirapassword === 0
          ? "No Expira"
          : `${dataUser.diasexpirapassword} días`,
    },
    {
      label: "Fecha de vencimiento",
      value:
        dataUser.diasexpirapassword === 0
          ? "Sin Vencimiento"
          : `${dataUser.diasexpirapassword - dataUser.diascambiopassword} días`,
    },
  ];

  return (
    <LayoutMotion>
      <Box maxW="1200px" mx="auto" p={6} color="gray.200" zIndex={1}>
        {/* Grid para distribuir la información */}
        <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={6}>

           {/* Opciones */}
           <Box
            bg="gray.800"
            borderColor="gray.700"
            borderRadius="md"
            borderWidth="1px"
            p={6}
          >
            <Center flexDirection={"column"} gap={"1rem"} mb={8}>
              <Circle
                bg="teal.500"
                color="white"
                as={"b"}
                fontSize={"46px"}
                style={{ width: "8rem", height: "8rem" }}
              >
                {dataUser.avatar}
              </Circle>

              {/* <Avatar
            size="2xl"
            fontSize={"16px"}
            bg="teal.500"
            color="white"
            // mb={4}
          >
            {dataUser.avatar}
          </Avatar> */}
              <Heading size="lg">{dataUser.nombre}</Heading>
              <Text fontSize="lg" color="gray.300">
                {dataUser.perfil}
              </Text>
            </Center>

            <Heading size="md" mb={4}>
              Opciones
            </Heading>
            <Divider my={4} />
            <Stack spacing={4}>
              {statusPassword !== "OK" && (
                <Text color="red.400" fontSize="sm" textAlign="center">
                  Se recomienda cambiar la contraseña
                </Text>
              )}
              <ChangePasswordModal />
              <AddPrivateApplicationModal
                isAddButtonMyPrifile={true}
                type="private"
              />
              <AddPrivateApplicationModal
                isAddButtonMyPrifile={true}
                type="powerBiC"
              />
            </Stack>
          </Box>
          {/* Datos personales */}
          <Box
            bg="gray.800"
            borderColor="gray.700"
            borderRadius="md"
            borderWidth="1px"
            p={6}
          >
            <Heading size="md" mb={4}>
              Información Personal
            </Heading>
            <Divider my={4} />
            <Stack spacing={4}>
              {userDetails.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontWeight="bold">{item.label}:</Text>
                  <Text>{item.value}</Text>
                </Box>
              ))}
            </Stack>
          </Box>

        </Grid>

        {/* Tabs para contenido adicional */}
        <Box mt={8}>
          <Tabs isFitted variant="enclosed">
            <TabList>
              <Tab>Mis Aplicaciones</Tab>
              <Tab>Configuraciones</Tab>
            </TabList>

            <TabPanels>
              {/* Panel de tabla */}
              <TabPanel>
                <TableAppPrivateUser />
              </TabPanel>

              {/* Panel de configuraciones */}
              <TabPanel>
                <Text>Opciones avanzadas de usuario (próximamente).</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </LayoutMotion>
  );
};

export default ProfileUserPage;
