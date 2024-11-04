import {
  Tag,
  TagLabel,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Tooltip,
  Flex,
  useDisclosure,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa"; // Importa el ícono de react-icons/fa

import { useAuth } from "../../../../context/AuthContext";
import ChangePasswordModal from "../../modals/ChangePasswordModal";

const Profileuser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { statusPassword, dataUser } = useAuth();
  return (
    <>
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

      <Drawer isOpen={isOpen} placement="top" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg={"gray.600"} color="white">
            Mi Perfil
          </DrawerHeader>

          <DrawerBody>
            <Flex justifyContent="left" alignItems="center" h="100%">
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                w={{ base: "100%", sm: "800px" }} // Ajusta el tamaño del Card
                boxShadow="lg"
              >
                <Image
                  maxW={{ base: "100%", sm: "150px" }}
                  boxSize="100px"
                  src="./profileimg.png"
                  alt="Img Profile"
                />

                <Stack ml={4}>
                  <CardBody>
                    <Heading size="md">{dataUser.nombre}</Heading>
                    <Text py="2">Email: {dataUser.email}</Text>
                    <Text>Username: {dataUser.usuario}</Text>
                    <Text>Perfil: {dataUser.perfil}</Text>
                    <Text>Status Password: {statusPassword}</Text>
                    <Text>
                      Plazo Expira Password:{" "}
                      {dataUser.diasexpirapassword === 0
                        ? "No Expira"
                        : dataUser.diasexpirapassword}{" "}
                      dias
                    </Text>
                    <Text>
                      Debe Actualizar su password en:{" "}
                      {dataUser.diasexpirapassword === 0
                        ? "Sin Plazo de Vencimiento"
                        : dataUser.diasexpirapassword -
                          dataUser.diascambiopassword}{" "}
                      dias
                    </Text>
                  </CardBody>
                </Stack>
              </Card>
              {/* Tabla de accesos a la derecha del Card */}
              <Box mt={{ base: 6, sm: 0 }} ml={{ base: 0, sm: 8 }} w="100%">
                <Heading size="md" mb={4}>
                  Accesos del Usuario
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Acceso</Th>
                      <Th>Descripción</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/*dataUser.accesos.map((acceso, index) => (
                      <Tr key={index}>
                        <Td>{acceso.nombre}</Td>
                        <Td>{acceso.descripcion}</Td>
                      </Tr>
                    ))*/}
                  </Tbody>
                </Table>
              </Box>
            </Flex>
          </DrawerBody>

          <DrawerFooter bg={"gray.600"} color="white" justifyContent={"left"}>
            <ChangePasswordModal />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Profileuser;
