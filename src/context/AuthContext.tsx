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
  checkauthapplications: () => void;
  checktoken: () => void;
  dataAuthLink: LinkApp[];
  dataUser: LoginDataUser;
  isAuthenticated: boolean;
  isTokenValid: boolean;
  loading: boolean;
  loadingCheckToken: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  statusPassword: string;
  allLinks: {
    publics: LinkApp[];
    public: LinkApp[];
    private: LinkApp[];
    sugest: LinkApp[];
    powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
  } | null;
  setAllLinks: React.Dispatch<{
    publics: LinkApp[];
    public: LinkApp[];
    private: LinkApp[];
    sugest: LinkApp[];
    powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
  } | null>;
  loadData: () => Promise<{
    publics: LinkApp[];
    public: LinkApp[];
    private: LinkApp[];
    sugest: LinkApp[];
    powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
  } | null>;
}

//inicializo DataUser
const InitialdataUser: LoginDataUser = {
  idusuario: 0, // valor inicial o predeterminado
  idarea: 0,
  nombre: "",
  usuario: "",
  avatar: "",
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
  const [loadingCheckToken, setLoadingCheckToken] = useState(true);
  const [allLinks, setAllLinks] = useState<{
    publics: LinkApp[];
    public: LinkApp[];
    private: LinkApp[];
    sugest: LinkApp[];
    powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
  } | null>(null);

  const loadData = (): Promise<{
    publics: LinkApp[];
    public: LinkApp[];
    private: LinkApp[];
    sugest: LinkApp[];
    powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
  } | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await services.applications.AllApplicationAuthByIdusuario(
          dataUser.idusuario
        );
        const datapowerbib =
          await services.applications.AllApplicationAuthPowerBiBByIdarea(
            dataUser.idarea
          );
        if (!data) return resolve(null);

        const publicsapp = data?.filter(
          (item: LinkApp) => item.type === "public"
        );
        const powerBiA = data?.filter(
          (item: LinkApp) => item.type === "powerBiA"
        );
        /*
        const powerBiB = data?.filter(
          (item: LinkApp) => item.type === "powerBiB"
        );
        */
        const powerBiB = datapowerbib;
        const powerBiC = data?.filter(
          (item: LinkApp) => item.type === "powerBiC" && item.hab === "SI"
        );

        const privates = data?.filter(
          (item: LinkApp) => item.type === "private" && item.hab === "SI"
        );
        const sugested = data?.filter(
          (item: LinkApp) =>
            item.type === "sugest" &&
            item.auth === "true" &&
            item.idusuario === dataUser.idusuario
        );
        const publicsAdd = [...publicsapp, ...privates];

        resolve({
          publics: publicsAdd,
          public: publicsapp,
          private: privates,
          sugest: sugested,
          powerBi: { A: powerBiA, B: powerBiB, C: powerBiC },
        });
      } catch (error) {
        console.info("Error al cargar las aplicaciones", error);
        reject(error);
      }
    });
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      toast("Consultando usuario...");
      const response: LoginResponse = await users.login(credentials);
      const accessToken = response.token;
      Cookies.set("token", accessToken, { expires: 7, sameSite: "lax" });
      toast.success("Bienvenido!! " + response.checkacceso.nombre);

      setDataUSer(response.checkacceso);
      // Establecer el estado de autenticación
      setIsAuthenticated(true);
      setIsTokenValid(true);
      setStatusPassword(response.statuspass);

      // Validación de contraseña
      if (response.statuspass === "CAMBIOPASS") {
        toast.warning("Debe Cambiar su Password");
      } else if (response.statuspass === "VENCIDA") {
        toast.warning("Contraseña Vencida!!!, Debe Cambiar su Password");
      }

      const result = await loadData();
      if (!result) return;
      setAllLinks(result);

      return response;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast.error("Error al iniciar sesión. Inténtalo de nuevo.");
      setIsAuthenticated(false);
      setIsTokenValid(false);
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

  const checkauthapplications = async () => {
    const token = Cookies.get("token"); // Cambia "token" al nombre exacto de la cookie que contiene el token

    if (!token) {
      // Si no existe el token, cierra la sesión directamente
      logout();
      setIsTokenValid(false);
      setIsAuthenticated(false);
      toast.error("No hay token disponible. Por favor, inicie sesión.");
      setLoading(false);
      return;
    }
    try {
      if (!dataUser.idusuario) return;
      const data = await services.applications.AllApplicationAuthByIdusuario(
        dataUser.idusuario
      );
      const authLink: LinkApp[] = data;
      setDataAuthLink(authLink);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const checktoken = async () => {
    setLoadingCheckToken(true);
    const token = Cookies.get("token");

    if (!token) {
      setIsTokenValid(false);
      setIsAuthenticated(false);
      setLoadingCheckToken(false);
      return;
    }

    try {
      const resp = await users.checkToken();

      if (resp.tokenvalid) {
        const response = await users.UserById(resp.idusuario);
        setDataUSer(response[0]);
        setStatusPassword(resp.statuspass);
        setIsAuthenticated(true);
        setIsTokenValid(true);
        toast.success("Sesión recuperada.");
        setLoadingCheckToken(false);
        checkauthapplications();
        const result = await loadData();
        if (!result) return;
        setAllLinks(result);
  
      } else {
        setIsAuthenticated(false);
        setIsTokenValid(false);
        setLoadingCheckToken(false);
        Cookies.remove("token");
        toast.error("Token Invalido, vuelva a iniciar sesión.");
      }
    } catch (error) {
      console.error("Error en la verificación del token:", error);
      setIsAuthenticated(false);
      setIsTokenValid(false);
      setLoadingCheckToken(false);
      toast.error("Token Invalido, vuelva a iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checktoken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        allLinks,
        checkauthapplications,
        checktoken,
        dataAuthLink,
        dataUser,
        isAuthenticated,
        isTokenValid,
        loadData,
        loading,
        loadingCheckToken,
        login,
        logout,
        setAllLinks,
        statusPassword,
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
