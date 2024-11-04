import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Text,
  Stack,
  VStack,
  List,
  ListItem,
  ListIcon,
  Tooltip,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordModal from "../molecules/modals/ChangePasswordModal";
import AddPrivateApplicationModal from "../molecules/modals/AddPrivateApplicationModal";
import TableAppPrivateUser from "../molecules/tables/TableAppPrivateUser";

const UserProfileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { statusPassword, dataUser } = useAuth();
  return (
    <>
      {/* Botón para abrir el Drawer */}
      <Tooltip label="Mi Perfil" openDelay={500}>
        <Tag size="lg" colorScheme="black:200" borderRadius="full">
          <Button
            colorScheme="black"
            leftIcon={<FaUser />}
            mr={4}
            onClick={onOpen}
          ></Button>
          <TagLabel p="2" color={"white"}>
            {dataUser.nombre}
          </TagLabel>
        </Tag>
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Mi Perfil</DrawerHeader>

          <DrawerBody>
            <Stack spacing={6} mt={4}>
              {/* Información del usuario */}
              <Box>
                <Text fontWeight="bold" fontSize="lg" mb={1}>
                  {dataUser.nombre}
                </Text>
                <Text color="gray.500">{dataUser.email}</Text>
                <Text color="gray.500" fontSize="sm">
                  {dataUser.perfil}
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
                    : dataUser.diasexpirapassword -
                      dataUser.diascambiopassword}{" "}
                  dias
                </Text>
              </Box>

              {/* Resumen de aplicaciones */}
              <Box>
                <Text fontWeight="bold" fontSize="md" mb={2}>
                  Resumen de Aplicaciones
                </Text>
                <VStack align="start" spacing={2}>
                  <Text>
                    Cantidad de aplicaciones con acceso: {dataUser.cantappublic}
                  </Text>
                  <Text>
                    Cantidad de aplicaciones propias: {dataUser.cantapprivate}
                  </Text>
                </VStack>
              </Box>

              {/* Menú lateral */}
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

                  <ListItem cursor="pointer" _hover={{ color: "blue.500" }}>
                    <ListIcon as={FaCheckCircle} color="purple.500" />
                    Ver aplicaciones aprobadas
                  </ListItem>
                  <TableAppPrivateUser />
                </List>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserProfileDrawer;
