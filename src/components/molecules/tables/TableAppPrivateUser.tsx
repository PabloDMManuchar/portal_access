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
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { services } from "../../../services/index";
import {
  Aplicacion,
  EnabledDisabledApplication,
  AuthAppType,
} from "../../../types/apptype";
import { useAuth } from "../../../context/AuthContext";
import EditApplicationModal from "../modals/EditApplicationModal";

const TableAppPrivateUserTabs = () => {
  const [applications, setApplications] = useState<Aplicacion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState("");
  const [selectedApp, setSelectedApp] = useState<Aplicacion | null>(null); // App seleccionada para editar
  const [appToDelete, setAppToDelete] = useState<Aplicacion | null>(null);
  const toast = useToast();
  const { dataUser } = useAuth();
  const [authorizations, setAuthorizations] = useState<AuthAppType[]>([]);
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: openDeleteDialog,
    onClose: closeDeleteDialog,
  } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Fetch applications from the server
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const data: Aplicacion[] =
        await services.applications.AllApplicationAuthByIdusuario(
          dataUser.idusuario
        );
      setApplications(data);
      console.info(authorizations);
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

  const handleDelete = (app: Aplicacion) => {
    setAppToDelete(app);
    openDeleteDialog();
  };

  const confirmDelete = async () => {
    if (appToDelete) {
      try {
        await services.applications.DeleteApplication({
          idaplicaciones: appToDelete.idaplicaciones,
          nombre: appToDelete.nombre,
          hab: appToDelete.hab,
        });
        toast({
          title: "Aplicación eliminada",
          description: `La aplicación "${appToDelete.nombre}" se eliminó con éxito.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchApplications();
      } catch (error) {
        console.error("Error al eliminar la aplicación:", error);
        toast({
          title: "Error",
          description: "No se pudo eliminar la aplicación.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setAppToDelete(null);
        closeDeleteDialog();
      }
    }
  };

  const handleAuthToggle = async (authItem: AuthAppType) => {
    const updatedAuth = {
      ...authItem,
      auth: authItem.auth === "true" ? "false" : "true",
    };
    if (authItem.auth === "true") {
      updatedAuth.hab = "NO";
      updatedAuth.auth = "false";
    }
    if (authItem.auth === "false") {
      updatedAuth.hab = "SI";
      updatedAuth.auth = "true";
    }
    updatedAuth.idaplicaciones = authItem.idaplicaciones;
    updatedAuth.idusuario = authItem.idusuario;
    updatedAuth.nombre = authItem.nombre;
    updatedAuth.usuario = authItem.usuario;
    await services.applications.UpdateAuthApplication(updatedAuth);
    setAuthorizations((prevAuth) =>
      prevAuth.map((item) =>
        item.idaplicaciones === authItem.idaplicaciones &&
        item.idusuario === authItem.idusuario
          ? updatedAuth
          : item
      )
    );
    fetchApplications();
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
            <Th>Mostrar/Ocultar</Th>
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
              {type !== "sugest" && ( // Ocultar botones si es 'sugest'
                <>
                  <Td>
                    {" "}
                    <Tooltip label="mostrar/ocultar">
                      <IconButton
                        aria-label="mostrar/ocultar"
                        size="sm"
                        colorScheme={app.hab === "SI" ? "green" : "red"}
                        onClick={() => toggleHab(app)}
                        icon={app.hab === "SI" ? <FaCheck /> : <FaTimes />}
                        mr={2}
                      />
                    </Tooltip>
                  </Td>

                  <Td>
                    <Tooltip label="Editar aplicación">
                      <IconButton
                        aria-label="Editar aplicación"
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleEdit(app)}
                        icon={<FaEdit />}
                      />
                    </Tooltip>
                    <Tooltip label="Eliminar aplicación">
                      <IconButton
                        aria-label="Eliminar aplicación"
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(app)}
                        icon={<FaTrash />}
                      />
                    </Tooltip>
                  </Td>
                </>
              )}
              {type === "sugest" && (
                <Td>
                  <Tooltip label="mostrar/ocultar">
                    <IconButton
                      aria-label="mostrar/ocultar"
                      size="sm"
                      colorScheme={app.auth === "true" ? "green" : "red"}
                      icon={app.auth === "true" ? <FaCheck /> : <FaTimes />}
                      onClick={() =>
                        handleAuthToggle({
                          nombre: app.nombre,
                          usuario: dataUser.usuario,
                          area: "",
                          auth: app.auth,
                          hab: app.hab,
                          idaplicaciones: app.idaplicaciones,
                          idusuario: dataUser.idusuario,
                          idarea: 0,
                        })
                      }
                    />
                  </Tooltip>
                </Td>
              )}
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
      />
      <Tabs variant="soft-rounded" colorScheme="teal">
        <TabList>
          <Tab>Privadas</Tab>
          <Tab>Power BI</Tab>
          <Tab>Sugerencias</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{renderTable("private")}</TabPanel>
          <TabPanel>{renderTable("powerBiC")}</TabPanel>
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
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteDialog}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar Aplicación
            </AlertDialogHeader>
            <AlertDialogBody>
              ¿Estás seguro que deseas eliminar la aplicación{" "}
              {appToDelete?.nombre}? Esta acción no se puede deshacer.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDeleteDialog}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default TableAppPrivateUserTabs;
