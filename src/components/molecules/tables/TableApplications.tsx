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
} from "@chakra-ui/react";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { services } from "../../../services/index";
import { Aplicacion, EnabledDisabledApplication } from "../../../types/apptype";

import EditApplicationModal from "../modals/EditApplicationModal";

const TableApplications = () => {
  const [applications, setApplications] = useState<Aplicacion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState("");
  const [selectedApp, setSelectedApp] = useState<Aplicacion | null>(null); // App seleccionada para editar
  const toast = useToast();

  // Fetch applications from the server
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const data: Aplicacion[] = await services.applications.AllApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las aplicaciones.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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

  const renderTable = (type: string) => {
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

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <Spinner size="xl" />
        <Text>Cargando aplicaciones...</Text>
      </Box>
    );
  }

  return (
    <Box p={6} textColor="white">
      <Heading size="md" mb={4}>
        Tus Accesos a Aplicaciones
      </Heading>
        <Input
          placeholder="Buscar aplicaciones..."
          value={filter}
          onChange={handleFilterChange}
          mb={4}
          w={"16rem"}
        />
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Publicas</Tab>
          <Tab>Power BI A</Tab>
          <Tab>Power BI B</Tab>
          <Tab>Sugerencias</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{renderTable("public")}</TabPanel>
          <TabPanel>{renderTable("powerBiA")}</TabPanel>
          <TabPanel>{renderTable("powerBiB")}</TabPanel>
          <TabPanel>{renderTable("sugest")}</TabPanel>
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
