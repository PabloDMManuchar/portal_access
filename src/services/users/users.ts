import axios from "axios";
import { LoginCredentials, LoginResponse } from "../../types/authtype";
import {
  CreateAreaType,
  ChangePasswordType,
  CreateUserType,
  UpdateUserType,
  UpdateAreaType,
  CreateCompanyBranchType,
  UpdateCompanyBranchType,
} from "../../types/usertype";
import Cookies from "js-cookie";

// URL de la API
const API = import.meta.env.VITE_API_ACCESS + "/access/api";

// Función para obtener el token de la cookie
const getToken = () => Cookies.get("token");

// Crear una instancia de Axios con el token incluido en los headers
const api = axios.create({
  baseURL: API, // Cambia por la URL base de tu API
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
  // Verifico primero que el token exista
  const token = getToken();
  if (!token) {
    // Si el token no existe, devuelve una respuesta sin hacer la solicitud
    return {
      tokenvalid: false,
      statuspass: "",
      idusuario: 0,
    };
  }
  try {
    //const resp = await api.post(`/checktoken`);
    const resp = await axios.post(
      `${API}/checktoken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Estándar de JWT
        },
      }
    );

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

const UsersbyEmpresaSucursal = async () => {
  try {
    const response = await api.get("/usersbyempresasucursal");

    return response.data.usuariosxempresa;
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const UsersbyArea = async () => {
  try {
    const response = await api.get("/usersbyarea");

    return response.data.usuariosxarea;
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const LastEvents = async () => {
  try {
    const response = await api.get("/lasteventlog");

    return response.data.ultimoseventos;
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

//CRUD Empresa - Sucursal

const allCompanyBranchs = async () => {
  try {
    const response = await api.get("/allcompanybranch");

    return response.data.empresasucursales;
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const allEnabledCompanyBranchs = async () => {
  try {
    const response = await api.get("/enabledcompaniesbranch");

    return response.data.empresasucursales;
  } catch (error) {
    console.error("Error fetching companies - branch", error);
  }
};

const createEmpresaSucursal = async ({
  empresa,
  sucursal,
}: CreateCompanyBranchType) => {
  try {
    console.info(sucursal);
    const response = await api.post("/createcompanybranch", {
      empresa,
      sucursal,
    });

    return response;
  } catch (error) {}
};

const enabledCompanyBranch = async ({
  idempresasucursal,
  empresa,
  sucursal,
}: UpdateCompanyBranchType) => {
  try {
    const response = await api.post("/enabledcompanybranch", {
      idempresasucursal,
      empresa,
      sucursal,
    });
    return response;
  } catch (error) {}
};

const disabledCompanyBranch = async ({
  idempresasucursal,
  empresa,
  sucursal,
}: UpdateCompanyBranchType) => {
  try {
    const response = await api.post("/disabledcompanybranch", {
      idempresasucursal,
      empresa,
      sucursal,
    });
    return response;
  } catch (error) {}
};

//CRUD Areas

const allAreas = async () => {
  try {
    const response = await api.get("/allareas");

    return response.data.areas;
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const allEnabledAreas = async () => {
  try {
    const response = await api.get("/enabledareas");

    return response.data.areas;
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

const areaById = async (id: number) => {
  try {
    const response = await api.get(`/areabyid/${id}`);

    return response.data.usuario;
  } catch (error) {
    console.error("Error fetching user", error);
    return null;
  }
};

const createArea = async ({ area }: CreateAreaType) => {
  try {
    const response = await api.post("/createarea", {
      area,
    });
    return response;
  } catch (error) {}
};

const enabledArea = async ({ idarea, area }: UpdateAreaType) => {
  try {
    const response = await api.post("/enabledarea", {
      idarea,
      area,
    });
    return response;
  } catch (error) {}
};

const disabledArea = async ({ idarea, area }: UpdateAreaType) => {
  try {
    const response = await api.post("/disabledarea", {
      idarea,
      area,
    });
    return response;
  } catch (error) {}
};

const createUser = async ({
  nombre,
  usuario,
  email,
  idempresasucursal,
  idarea,
  idperfil,
  diasexpirapassword,
  tipo,
}: CreateUserType) => {
  try {
    const response = await api.post("/createuser", {
      nombre,
      usuario,
      email,
      idempresasucursal,
      idarea,
      idperfil,
      diasexpirapassword,
      tipo,
    });
    return response;
  } catch (error) {}
};

const updateUser = async ({
  idusuario,
  email,
  idempresasucursal,
  idarea,
  idperfil,
  diasexpirapassword,
  tipo,
}: UpdateUserType) => {
  try {
    const response = await api.post("/createuser", {
      idusuario,
      email,
      idempresasucursal,
      idarea,
      idperfil,
      diasexpirapassword,
      tipo,
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

const disableduser = async (idusuario: number) => {
  try {
    const response = await api.post("/disableduser", { idusuario });
    return response;
  } catch (error) {}
};

const enableduser = async (idusuario: number) => {
  try {
    const response = await api.post("/enableduser", { idusuario });
    return response;
  } catch (error) {}
};

export const users = {
  login,
  logout,
  AllUsers,
  UsersbyEmpresaSucursal,
  UsersbyArea,
  LastEvents,
  UserById,
  checkToken,
  allCompanyBranchs,
  allEnabledCompanyBranchs,
  allAreas,
  allEnabledAreas,
  areaById,
  createArea,
  createEmpresaSucursal,
  enabledCompanyBranch,
  disabledCompanyBranch,
  enabledArea,
  disabledArea,
  createUser,
  updateUser,
  refreshpassword,
  disableduser,
  enableduser,
  changePassword,
};
