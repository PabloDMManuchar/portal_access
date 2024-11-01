import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { users } from "../services/users/users";
import { services } from "../services/index";
import {
  LoginResponse,
  LoginCredentials,
  LoginDataUser,
} from "../types/authtype";
import { LinkApp } from "../types/apptype";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  isTokenValid: boolean;
  statusPassword: string;
  dataUser: LoginDataUser;
  dataAuthLink: LinkApp[];
  loading: boolean;
  checkauthapplications: () => void;
  checktoken: () => void;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
}

//inicializo DataUser
const InitialdataUser: LoginDataUser = {
  idusuario: 0, // valor inicial o predeterminado
  nombre: "",
  usuario: "",
  email: "",
  perfil: "",
  idperfil: 0,
  empresa: "",
  sucursal: "",
  area: "",
  tipo: "",
  diascambiopassword: 0,
  diasexpirapassword: 0, // valor inicial o predeterminado
  cantapprivate: 0,
  cantappublic: 0,
};

const InitialdataAuthLink: LinkApp[] = [];

// Crear el contexto con valores predeterminados
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor de autenticación
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [statusPassword, setStatusPassword] = useState("");
  const [dataUser, setDataUSer] = useState<LoginDataUser>(InitialdataUser);
  const [dataAuthLink, setDataAuthLink] =
    useState<LinkApp[]>(InitialdataAuthLink);
  //   const [message, setMessage] = useState(initialState)
  const [loading, setLoading] = useState(true);

  const login = async (credentials: LoginCredentials) => {
    try {
      toast("Consultando usuario...", { duration: 2000 });
      const response: LoginResponse = await users.login(credentials); // Llamada a la API
      const accessToken = response.token;
      console.log(response);
      Cookies.set("token", accessToken, { expires: 7, sameSite: "lax" }); // Establecer SameSite
      toast.success("Bienvenido!! " + response.checkacceso.nombre);
      setIsAuthenticated(true);
      setIsTokenValid(true);
      setStatusPassword(response.statuspass);
      if (statusPassword == "CAMBIOPASS") {
        toast.warning("Debe Cambiar su Password");
      }
      if (statusPassword == "VENCIDA") {
        toast.warning("Contraseña Vencida!!!, Debe Cambiar su Password");
      }

      setDataUSer(response.checkacceso);
      checkauthapplications();
      return response;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión. Inténtalo de nuevo.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await users.logout();
      Cookies.remove("token");
      setIsAuthenticated(false);
      toast.success("Sesión cerrada correctamente.");
      setIsTokenValid(false);
    } catch (error) {
      setIsTokenValid(false);
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  const checktoken = async () => {
    try {
      const resp = await users.checkToken();

      if (resp.tokenvalid === true) {
        const response = await users.UserById(resp.idusuario);
        setIsTokenValid(true);
        setIsAuthenticated(true);
        setStatusPassword(resp.statuspass);
        toast.success("Token Valido.. Restaurando la sesion");
        const User: LoginDataUser = response[0];
        setDataUSer(User);
        toast.success("Sesión recuperada.");
        checkauthapplications();
        //return User;
      } else {
        logout();
        setIsTokenValid(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsTokenValid(false);
      toast.error("Token Invalido, vuelva a iniciar sesion");
    } finally {
      setLoading(false); // Finaliza la carga después de verificar el token
    }
  };

  const checkauthapplications = async () => {
    try {
      if (!dataUser.idusuario) return;
      const data = await services.applications.AllApplicationAuthByIdusuario(
        dataUser.idusuario
      );
      console.info(data);
      const authLink: LinkApp[] = data;
      setDataAuthLink(authLink);
      console.info(dataAuthLink);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checktoken(); // Verifica el token al cargar la app
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isTokenValid,
        statusPassword,
        dataUser,
        dataAuthLink,
        checktoken,
        checkauthapplications,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto de autenticación
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
