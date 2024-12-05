import axios from "axios";

import Cookies from "js-cookie";
import {
  AuthAppType,
  EnabledDisabledApplication,
  Grupo,
  CheckUrlApplication,
  NewAplicacion,
  NewAplicacionPrivate,
  UpAplicacion,
} from "../../types/apptype";

//const API = import.meta.env.API_ACCESS;
// Función para obtener el token de la cookie
const getToken = () => Cookies.get("token");

// Crear una instancia de Axios con el token incluido en los headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_ACCESS + "/access/api", // Cambia por la URL base de tu API
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

// Función para obtener las aplicaciones private y public x idusuario
const AllApplicationAuthByIdusuario = async (id: number) => {
  try {
    const response = await api.get(`/applicationsauthbyidusuario/${id}`);
    return response.data.apps;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

// Función para obtener las aplicaciones powerbib x idarea
const AllApplicationAuthPowerBiBByIdarea = async (id: number) => {
  try {
    const response = await api.get(`/applicationsauthpowerbibbyidarea/${id}`);
    return response.data.apps;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

const AllGroupApp = async () => {
  try {
    const response = await api.get("/allgroupapp");
    return response.data.group;
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

const CheckurlApplication = async ({ url }: CheckUrlApplication) => {
  try {
    const response = await api.post("/checkurlapplication", {
      url,
    });
    return response;
  } catch (error) {}
};

const CreateApplication = async ({
  nombre,
  descripcion,
  url,
  mostrarimagen,
  icon,
  src,
  type,
  idgrupoaplicaciones,
}: NewAplicacion) => {
  try {
    const response = await api.post("/createapplication", {
      nombre,
      descripcion,
      url,
      mostrarimagen,
      icon,
      src,
      type,
      idgrupoaplicaciones,
    });
    return response;
  } catch (error) {}
};

const UpdateApplication = async ({
  idaplicaciones,
  nombre,
  descripcion,
  url,
  mostrarimagen,
  icon,
  src,
  type,
  idgrupoaplicaciones,
}: UpAplicacion) => {
  try {
    const response = await api.post("/updateapplication", {
      idaplicaciones,
      nombre,
      descripcion,
      url,
      mostrarimagen,
      icon,
      src,
      type,
      idgrupoaplicaciones,
    });
    return response;
  } catch (error) {
    console.info(error + " ");
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

const CreateAccessPowerBiPrivate = async ({
  nombre,
  descripcion,
  url,
}: NewAplicacionPrivate) => {
  try {
    const response = await api.post("/createaccesspowerbiprivate", {
      nombre,
      descripcion,
      url,
    });
    return response;
  } catch (error) {}
};

const CreateAccessPowerBiPublic = async ({
  nombre,
  descripcion,
  url,
  type,
  idgrupoaplicaciones,
}: NewAplicacion) => {
  try {
    const response = await api.post("/createaccesspowerbipublic", {
      nombre,
      descripcion,
      url,
      type,
      idgrupoaplicaciones,
    });
    return response;
  } catch (error) {}
};

const EnabledApplication = async ({
  idaplicaciones,
  nombre,
  hab,
}: EnabledDisabledApplication) => {
  try {
    const response = await api.post("/enabledapplication", {
      idaplicaciones,
      nombre,
      hab,
    });
    return response;
  } catch (error) {
    console.info(error);
  }
};

const DisabledApplication = async ({
  idaplicaciones,
  nombre,
  hab,
}: EnabledDisabledApplication) => {
  try {
    const response = await api.post("/disabledapplication", {
      idaplicaciones,
      nombre,
      hab,
    });

    return response;
  } catch (error) {
    console.info(error);
  }
};

const DeleteApplication = async ({
  idaplicaciones,
  nombre,
  hab,
}: EnabledDisabledApplication) => {
  try {
    const response = await api.post("/deleteapplication", {
      idaplicaciones,
      nombre,
      hab,
    });

    return response;
  } catch (error) {
    console.info(error);
  }
};

// Función para obtener las aplicaciones private y public x idusuario
const CheckAuthAplicationsByIdAplicaciones = async (id: number) => {
  try {
    const response = await api.post("/checkauthbyidaplicaciones", {
      idaplicaciones: id,
    });

    return response.data.auth;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

//Autorizaciones

// Función para obtener los usuarios x aplicacion x su id
const AuthApplicationByIdAplicaciones = async (id: number) => {
  try {
    const response = await api.get(`/authappbyidaplicaciones/${id}`);
    return response.data.app;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

// Función para obtener las aplicaciones x usuario x su id
const AuthApplicationByIdUsuario = async (id: number) => {
  try {
    const response = await api.get(`/authappbyidusuario/${id}`);
    return response.data.app;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

// Función para obtener las aplicaciones x area x su id
const AuthApplicationPowerbybByIdArea = async (id: number) => {
  try {
    const response = await api.get(`/authapppowerbibbyidarea/${id}`);
    return response.data.app;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

const UpdateAuthApplication = async ({
  idusuario,
  usuario,
  idaplicaciones,
  nombre,
  hab,
}: AuthAppType) => {
  try {
    const response = await api.post("/authorizationapp", {
      idusuario,
      usuario,
      idaplicaciones,
      nombre,
      hab,
    });
    return response;
  } catch (error) {}
};

const UpdateAuthApplicationPowerBiB = async ({
  idarea,
  area,
  idaplicaciones,
  nombre,
  hab,
}: AuthAppType) => {
  try {
    const response = await api.post("/authorizationapppowerbib", {
      idarea,
      area,
      idaplicaciones,
      nombre,
      hab,
    });
    return response;
  } catch (error) {}
};

export const applications = {
  AllApplications,
  ApplicationById,
  AllApplicationPrivateByIdusuario,
  AllApplicationAuthByIdusuario,
  AllApplicationAuthPowerBiBByIdarea,
  AllGroupApp,
  AllEnabledGroupApp,
  CheckurlApplication,
  CreateApplication,
  CreateApplicationPrivate,
  CreateAccessPowerBiPrivate,
  CreateAccessPowerBiPublic,
  CheckAuthAplicationsByIdAplicaciones,
  AuthApplicationByIdAplicaciones,
  AuthApplicationByIdUsuario,
  AuthApplicationPowerbybByIdArea,
  UpdateAuthApplication,
  UpdateAuthApplicationPowerBiB,
  UpdateApplication,
  EnabledApplication,
  DisabledApplication,
  DeleteApplication,
};
