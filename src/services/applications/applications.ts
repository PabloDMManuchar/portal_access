import axios from "axios";

import Cookies from "js-cookie";
import { Grupo, NewAplicacionPrivate } from "../../types/apptype";

//const API = import.meta.env.API_ACCESS;
// Función para obtener el token de la cookie
const getToken = () => Cookies.get("token");

// Crear una instancia de Axios con el token incluido en los headers
const api = axios.create({
  baseURL: "http://localhost:8000/access/api", // Cambia por la URL base de tu API
  headers: {
    Authorization: `Bearer ${getToken()}`, // Incluye el token en el encabezado
  },
});

// Función para obtener todas la aplicaciones
const AllApplications = async () => {
  try {
    const response = await api.get("/allapplications");

    return response.data.apps;
  } catch (error) {
    console.error("Error fetching applications", error);
  }
};

// Función para obtener la aplicacion x su id
const ApplicationById = async (id: number) => {
  try {
    const response = await api.get(`/applicationbyid/${id}`);

    return response.data.apps;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

// Función para obtener las aplicaciones x su idusuario
const AllApplicationPrivateByIdusuario = async (id: number) => {
  try {
    const response = await api.get(`/applicationsprivatebyidusuario/${id}`);

    return response.data.apps;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

const AllGroupApp = async () => {
  try {
    const response = await api.get("/allgroupapp");

    return response.data.usuario;
  } catch (error) {
    console.error("Error fetching groups", error);
  }
};

const AllEnabledGroupApp = async (): Promise<Grupo[]> => {
  try {
    const response = await api.get("/allenabledgroupapp");
    return response.data.group;
  } catch (error) {
    console.error("Error fetching groups", error);
    return [];
  }
};

const CreateApplicationPrivate = async ({
  nombre,
  descripcion,
  url,
  mostrarimagen,
  icon,
  src,
}: NewAplicacionPrivate) => {
  try {
    const response = await api.post("/createapplicationprivate", {
      nombre,
      descripcion,
      url,
      mostrarimagen,
      icon,
      src,
    });
    return response;
  } catch (error) {}
};

export const applications = {
  AllApplications,
  ApplicationById,
  AllApplicationPrivateByIdusuario,
  AllGroupApp,
  AllEnabledGroupApp,
  CreateApplicationPrivate,
};
