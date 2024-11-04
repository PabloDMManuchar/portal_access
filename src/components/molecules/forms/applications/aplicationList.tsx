import React, { useState, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import AplicationCard from "./aplicationCard";
import NewAplicationForm from "./newAplicationForm";
import { Aplicacion } from "../../../../types/apptype";
import { services } from "../../../../services/index";

const AplicationList: React.FC = () => {
  const [aplicaciones, setAplicaciones] = useState<Aplicacion[]>([]);

  useEffect(() => {
    // Función asíncrona dentro de useEffect
    const fetchApplications = async () => {
      try {
        const data: Aplicacion[] | undefined =
          await services.applications.AllApplications();
        if (data) {
          setAplicaciones(data); // Solo actualizar si data no es undefined
        }
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    fetchApplications();
  }, []); // Dependencias vacías para ejecutar solo al montar el componente

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing="20px">
        {/* Formulario de nueva aplicación */}
        <NewAplicationForm />

        {/* Tarjetas generadas a partir de los datos */}
        {aplicaciones.map((app) => (
          <AplicationCard key={app.idaplicaciones} aplicacion={app} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AplicationList;
