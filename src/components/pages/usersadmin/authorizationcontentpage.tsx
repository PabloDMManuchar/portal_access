import { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  RadioGroup,
  Stack,
  Radio,
  Heading,
  Center,
  Spinner,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { Aplicacion } from "../../../types/apptype";
import { UserType, AreaType } from "../../../types/usertype";
import { services } from "../../../services/index";
import AuthorizationModal from "../../molecules/modals/AuthorizationModal";

const Authorizationcontentpage = () => {
  const [selectedOption, setSelectedOption] = useState("Aplicaciones");
  const [aplicaciones, setAplicaciones] = useState<Aplicacion[]>([]);
  const [usuarios, setUsuarios] = useState<UserType[]>([]);
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState<any>(null);
  const [modalType, setModalType] = useState<"Aplicacion" | "Usuario" | "Area">(
    "Aplicacion"
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      if (selectedOption === "Aplicaciones") {
        const data: Aplicacion[] | undefined =
          await services.applications.AllApplications();
        if (data) setAplicaciones(data);
      } else if (selectedOption === "Usuario") {
        const data: UserType[] | undefined = await services.users.AllUsers();
        if (data) setUsuarios(data);
      } else {
        const data: AreaType[] | undefined =
          await services.users.allEnabledAreas();
        if (data) setAreas(data);
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (
    item: any | null,
    type: "Aplicacion" | "Usuario" | "Area"
  ) => {
    setSelectedData(item);
    setModalType(type);
    onOpen();
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const filterData = (data: any[]) => {
    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <Box p={4} maxW="600px" mx="auto" textColor={"white"}>
      <Heading as="h2" size="md" mb={4} textAlign="center">
        Seleccione una tabla para mostrar
      </Heading>

      <RadioGroup
        onChange={(value) => setSelectedOption(value)}
        value={selectedOption}
      >
        <Stack direction="row" spacing={5} justify="center" mb={4}>
          <Radio value="Aplicaciones">Aplicaciones</Radio>
          <Radio value="Usuario">Usuarios</Radio>
          <Radio value="Area">Areas</Radio>
        </Stack>
      </RadioGroup>

      <Input
        placeholder="Buscar..."
        mb={4}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {loading ? (
        <Center>
          <Spinner size="lg" color="teal.500" />
        </Center>
      ) : selectedOption === "Aplicaciones" ? (
        <Table colorScheme="teal" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Descripción</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterData(aplicaciones).map((app) => (
              <Tr key={app.idaplicaciones}>
                <Td>{app.idaplicaciones}</Td>
                <Td>{app.nombre}</Td>
                <Td>{app.descripcion}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleSelect(app, "Aplicacion")}
                  >
                    Seleccionar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : selectedOption === "Usuario" ? (
        <Table colorScheme="blue" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterData(usuarios).map((user) => (
              <Tr key={user.idusuario}>
                <Td>{user.idusuario}</Td>
                <Td>{user.nombre}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleSelect(user, "Usuario")}
                  >
                    Seleccionar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Table colorScheme="green" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Área</Th>
              <Th>Acción</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterData(areas).map((area) => (
              <Tr key={area.idarea}>
                <Td>{area.idarea}</Td>
                <Td>{area.area}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleSelect(area, "Area")}
                  >
                    Seleccionar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <AuthorizationModal
        isOpen={isOpen}
        onClose={onClose}
        data={selectedData}
        type={modalType}
      />
    </Box>
  );
};

export default Authorizationcontentpage;
