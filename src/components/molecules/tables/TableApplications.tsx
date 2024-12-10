import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Text,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  IconButton,
  Image,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { services } from "../../../services/index";
import { Aplicacion, EnabledDisabledApplication } from "../../../types/apptype";

import EditApplicationModal from "../modals/EditApplicationModal";
import { useAuth } from "../../../context/AuthContext";
import AddApplicationModal from "../modals/AddApplicationModal";

const TableApplications = () => {
  const [applications, setApplications] = useState<Aplicacion[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedApp, setSelectedApp] = useState<Aplicacion | null>(null); // App seleccionada para editar
  const toast = useToast();
  const { dataUser, setAllLinks } = useAuth();

  // Fetch applications from the server
  const fetchApplications = async () => {
    try {
      const data: Aplicacion[] = await services.applications.AllApplications();
      setApplications(data);

      const result = await services.helper.loadData(dataUser);
      if (!result) return;
      setAllLinks(result);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las aplicaciones.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value.toLowerCase());
  };

  const toggleHab = async (app: EnabledDisabledApplication) => {
    const updatedApp: EnabledDisabledApplication = {
      idaplicaciones: app.idaplicaciones,
      nombre: app.nombre,
      hab: app.hab,
    };
    try {
      if (app.hab === "SI") {
        await services.applications.DisabledApplication(updatedApp);
        toast({
          title: "Deshabilitado",
          description: `La aplicación ${app.nombre} fue deshabilitada con éxito.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await services.applications.EnabledApplication(updatedApp);
        toast({
          title: "Habilitado",
          description: `La aplicación ${app.nombre} fue habilitada con éxito.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      fetchApplications();
    } catch (error) {
      console.error("Error cambiando estado:", error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado de la aplicación.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (app: Aplicacion) => {
    setSelectedApp(app);
  };

  const filteredApplications = applications.filter((app) =>
    app.nombre.toLowerCase().includes(filter)
  );

  const RenderTable = (type: string) => {
    const filteredData = filteredApplications.filter(
      (app) => app.type === type
    );

    if (filteredData.length === 0) {
      return (
        <Text color="gray.200">No hay aplicaciones en esta categoría.</Text>
      );
    }

    return (
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Imagen/Icono</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Habilitado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((app) => (
            <Tr key={app.idaplicaciones}>
              <Td>
                {app.mostrarimagen === "SI" ? (
                  <Image src={app.src} boxSize="40px" objectFit="cover" />
                ) : (
                  <Text>Sin imagen</Text>
                )}
              </Td>
              <Td>{app.nombre}</Td>
              <Td>{app.descripcion}</Td>
              <Td>{app.hab}</Td>
              <Td>
                <Tooltip label="Cambiar estado">
                  <IconButton
                    aria-label="Cambiar estado"
                    size="sm"
                    colorScheme={app.hab === "SI" ? "green" : "red"}
                    onClick={() => toggleHab(app)}
                    icon={app.hab === "SI" ? <FaCheck /> : <FaTimes />}
                    mr={2}
                  />
                </Tooltip>
                <Tooltip label="Editar aplicación">
                  <IconButton
                    aria-label="Editar aplicación"
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleEdit(app)}
                    icon={<FaEdit />}
                  />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Box
      p={6}
      textColor="white"
      bg={"gray.800"}
      borderColor={"gray.700"}
      borderRadius="md"
      borderWidth={"2px"}
      color={"gray.200"}
      opacity={0.8}
    >
      <Flex gap={4} justifyContent={'center'}>
        <Input
          placeholder="Buscar aplicaciones..."
          value={filter}
          onChange={handleFilterChange}
          mb={4}
          w={"16rem"}
        />
        <Flex width={"36rem"} gap={"2rem"}>
          <AddApplicationModal typeform="public" />
          <AddApplicationModal typeform="powerBi" />
        </Flex>
      </Flex>

      <Tabs>
        <TabList>
          <Tab>Publicas</Tab>
          <Tab>Power BI A</Tab>
          <Tab>Power BI B</Tab>
          <Tab>Sugerencias</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{RenderTable("public")}</TabPanel>
          <TabPanel>{RenderTable("powerBiA")}</TabPanel>
          <TabPanel>{RenderTable("powerBiB")}</TabPanel>
          <TabPanel>{RenderTable("sugest")}</TabPanel>
        </TabPanels>
      </Tabs>
      {selectedApp && (
        <EditApplicationModal
          application={selectedApp}
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          onSave={fetchApplications}
        />
      )}
    </Box>
  );
};

export default TableApplications;
