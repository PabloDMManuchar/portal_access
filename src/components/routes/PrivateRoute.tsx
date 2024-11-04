// src/components/routes/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "@chakra-ui/react";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth(); // Obtiene si está autenticado y si está cargando

  // Mostrar un spinner mientras verifica el estado de autenticación
  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  // Si está autenticado, permite el acceso a la ruta
  // Si no, redirige a la página de inicio ("/")
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
