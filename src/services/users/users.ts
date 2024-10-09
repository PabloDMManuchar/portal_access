import axios from "axios";
import { LoginCredentials, LoginResponse } from "../../types/auth";
import Cookies from "js-cookie";

// URL de la API
const API = "http://localhost:8000/access/api";

//const API = import.meta.env.API_ACCESS;

// Función para hacer la solicitud de login
const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  console.log(API);
  const response = await axios.post<LoginResponse>(`${API}/login`, credentials);

  return response.data;
};

const logout = async () => {
  const resp = await axios.post(`${API}/logout`);
  Cookies.remove("Token");
  console.log(resp);
};

const checkToken = async () => {
  const resp = await axios.post(`${API}/checktoken`);
  console.log(resp);
};

export const users = {
  login,
  logout,
  checkToken,
};
