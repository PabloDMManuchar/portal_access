import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Link,
  Heading,
  Spinner,
  Tooltip,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import * as Icons from "react-icons/fa"; // Importa todos los iconos de FontAwesome
import { services } from "../../../services/index";
import { Aplicacion } from "../../../types/apptype"; // Ajusta según tu tipo
import { useAuth } from "../../../context/AuthContext";

const TableAppPrivateUser = () => {
  const [applications, setApplications] = useState<Aplicacion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { dataUser } = useAuth();
  useEffect(() => {
    // Cargar aplicaciones desde un servicio
    const fetchApplications = async () => {
      try {
        const data: Aplicacion[] =
          await services.applications.AllApplicationPrivateByIdusuario(
            dataUser.idusuario
          );
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <Spinner size="xl" />
        <Text>Cargando aplicaciones...</Text>
      </Box>
    );
  }

  if (applications.length === 0) {
    return (
      <Text color="gray.200">
        No tienes accesos a aplicaciones en este momento.
      </Text>
    );
  }

  return (
    <Box p={6}>
      <Heading size="md" mb={4}>
        Tus Accesos a Aplicaciones
      </Heading>
      <List spacing={3}>
        {applications.map((app) => (
          <ListItem key={app.idaplicaciones} display="flex" alignItems="center">
            <Link href={app.url} isExternal flex="1">
              {app.nombre}
            </Link>

            {/* Condicional para mostrar la imagen o el icono */}
            {app.mostrarimagen === "SI" ? (
              <Tooltip label="Abrir Aplicación" aria-label="Abrir Aplicación">
                <IconButton
                  as={Link}
                  href={app.url}
                  target="_blank"
                  aria-label={app.nombre}
                  icon={
                    <Image src={app.src} boxSize="40px" objectFit="cover" />
                  }
                  variant="ghost"
                />
              </Tooltip>
            ) : (
              <Tooltip label="Abrir Aplicación" aria-label="Abrir Aplicación">
                <IconButton
                  as={Link}
                  href={app.url}
                  target="_blank"
                  aria-label={app.nombre}
                  icon={React.createElement(
                    Icons[app.icon as keyof typeof Icons]
                  )}
                  variant="ghost"
                />
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TableAppPrivateUser;
