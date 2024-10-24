import axios from "axios";
import { LoginCredentials, LoginResponse } from "../../types/authtype";
import {
  ChangePasswordType,
  CreateUserType,
  UpdateUserType,
} from "../../types/usertype";
import Cookies from "js-cookie";

// URL de la API
const API = "http://localhost:8000/access/api";
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

// Función para hacer la solicitud de login
const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API}/login`, credentials);

  return response.data;
};

const logout = async () => {
  await axios.post(`${API}/logout`);
  Cookies.remove("token");
};

const checkToken = async () => {
  try {
    const resp = await api.post(`/checktoken`);
    if (resp.status != 200) {
      const respuesta = {
        tokenvalid: false,
        statuspass: "",
        idusuario: 0,
      };
      return respuesta;
    }

    const respuesta = {
      tokenvalid: resp.data.token,
      statuspass: resp.data.statuspass,
      idusuario: resp.data.idusuario,
    };
    return respuesta;
  } catch (error) {
    const respuesta = {
      tokenvalid: false,
      statuspass: "",
      idusuario: 0,
    };
    return respuesta;
  }
};

const changePassword = async ({
  idusuario,
  oldpassword,
  password,
}: ChangePasswordType) => {
  try {
    const response = await axios.post(
      `${API}/changepassword`,
      {
        idusuario,
        oldpassword,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`, // Estándar de JWT
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al cambiar la contraseña");
  }
};

// Función para obtener todos los usuarios
const AllUsers = async () => {
  try {
    const response = await api.get("/allusers");

    return response.data.usuario;
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const UserById = async (id: number) => {
  try {
    const response = await api.get(`/userbyid/${id}`);

    return response.data.usuario;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

const createUser = async ({
  nombre,
  usuario,
  email,
  idperfil,
  diasexpirapassword,
}: CreateUserType) => {
  try {
    const response = await api.post("/createuser", {
      nombre,
      usuario,
      email,
      idperfil,
      diasexpirapassword,
    });
    return response;
  } catch (error) {}
};

const updateUser = async ({
  idusuario,
  email,
  idperfil,
  diasexpirapassword,
}: UpdateUserType) => {
  try {
    const response = await api.post("/createuser", {
      idusuario,
      email,
      idperfil,
      diasexpirapassword,
    });
    return response;
  } catch (error) {}
};

const refreshpassword = async (idusuario: number) => {
  try {
    const response = await api.post("/refreshpassword", { idusuario });
    return response;
  } catch (error) {}
};

const disableduser = async (id: number) => {
  try {
    const response = await api.post("/disableduser", id);
    return response;
  } catch (error) {}
};

const enableduser = async (id: number) => {
  try {
    const response = await api.post("/enableduser", id);
    return response;
  } catch (error) {}
};

export const users = {
  login,
  logout,
  AllUsers,
  UserById,
  checkToken,
  createUser,
  updateUser,
  refreshpassword,
  disableduser,
  enableduser,
  changePassword,
};
