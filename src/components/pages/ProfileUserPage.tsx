import {
  Box,
  Text,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext"; // Importa el Context
import ChangePasswordModal from "../molecules/modals/ChangePasswordModal";
import AddPrivateApplicationModal from "../molecules/modals/AddPrivateApplicationModal";
import TableAppPrivateUser from "../molecules/tables/TableAppPrivateUser";
import LayoutMotion from "../Layout/LayoutMotion";

const ProfileUserPage = () => {
  const { statusPassword, dataUser } = useAuth();

  const newData = [
    { label: "Email", value: dataUser.email },
    { label: "Perfil", value: dataUser.perfil },
    { label: "Tipo", value: dataUser.tipo },
    { label: "Empresa", value: dataUser.empresa },
    { label: "Sucursal", value: dataUser.sucursal },
    { label: "Area", value: dataUser.area },
    { label: "Status Password", value: statusPassword },
    {
      label: "Plazo Expira Password",
      value:
        dataUser.diasexpirapassword === 0
          ? "No Expira"
          : dataUser.diasexpirapassword + " dias",
    },
    {
      label: "Fecha de vencimiento",
      value:
        dataUser.diasexpirapassword === 0
          ? "Sin Vencimiento"
          : dataUser.diasexpirapassword - dataUser.diascambiopassword + " dias",
    },
    { label: "Enlaces Autorizados", value: dataUser.cantappublic },
    { label: "Enlaces Creados", value: dataUser.cantapprivate },
  ];

  return (
    <LayoutMotion>
      <Box>
        <Text
          fontWeight={"200"}
          fontSize={"2xl"}
          px={"1rem"}
          color={"gray.200"}
        >
          <strong>Mi perfil </strong>| {dataUser.nombre}
        </Text>
        <Box mx="auto" p={4} zIndex={1} display={"flex"} gap={10}>
          <Box
            bg={"gray.800"}
            borderColor={"gray.700"}
            borderRadius="md"
            borderWidth={"2px"}
            height={"fit-content"}
            minW="24rem"
            opacity={0.8}
            p={4}
            w="full"
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize="xl" fontWeight="bold" color="gray.200">
                MIS DATOS
              </Text>
              <Text fontWeight="ligth" fontSize="lg" mb={1} color="gray.200">
                {dataUser.nombre}
              </Text>
            </Box>
            <Divider my={4} mx={"auto"} w={"90%"} />
            {newData.map((item, index) => (
              <Box
                w="full"
                px={4}
                display={"flex"}
                justifyContent={"space-between"}
                key={index}
              >
                <Text color="gray.200">{item.label}: </Text>
                <Text color="gray.200">{item.value}</Text>
              </Box>
            ))}

            <Grid
              templateColumns="repeat(2, 1fr)"
              gap={6}
              mt={5}
              color="gray.200"
            >
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


          <Box
            bg={"gray.800"}
            borderColor={"gray.700"}
            borderRadius="md"
            borderWidth={"2px"}
            height={"fit-content"}
            minW="24rem"
            opacity={0.8}
            p={4}
            w="full"
          >
            <Text fontSize="xl" fontWeight="bold" color="gray.200">
              OPCIONES
            </Text>
            <Divider my={4} mx={"auto"} w={"90%"} />
            {statusPassword != "OK" && (
              <Text mb={2} color="red.400" textAlign={"end"}>
                Se recomienda cambiar la contraseña
              </Text>
            )}

          <List spacing={4}>
            <ListItem cursor="pointer" _hover={{ color: "green.200" }}>
              <ChangePasswordModal />
            </ListItem>
            <ListItem cursor="pointer" _hover={{ color: "blue.200" }}>
              <AddPrivateApplicationModal isAddButtonMyPrifile={true} />
            </ListItem>


              <TableAppPrivateUser />
            </List>
          </Box>
        </Box>
      </Box>
    </LayoutMotion>
  );
};

export default ProfileUserPage;
