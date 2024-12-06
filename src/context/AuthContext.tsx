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
  loginContext: (credentials: LoginCredentials) => Promise<LoginResponse>;
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
  loadData: (user:LoginDataUser ) => Promise<{
    publics: LinkApp[];
    public: LinkApp[];
    private: LinkApp[];
    sugest: LinkApp[];
    powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
  } | null>;
}

const InitialdataAuthLink: LinkApp[] = [];

export interface AllLinksType {
  publics: LinkApp[];
  public: LinkApp[];
  private: LinkApp[];
  sugest: LinkApp[];
  powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
}

// Crear el contexto con valores predeterminados
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor de autenticación
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [statusPassword, setStatusPassword] = useState("");
  const [dataUser, setDataUSer] = useState<LoginDataUser | null>(null);
  const [dataAuthLink, setDataAuthLink] =
    useState<LinkApp[]>(InitialdataAuthLink);
  const [loading, setLoading] = useState(true);
  const [loadingCheckToken, setLoadingCheckToken] = useState(true);
  const [allLinks, setAllLinks] = useState<AllLinksType | null>(null);

  const loadData = async (
    user: LoginDataUser
  ): Promise<AllLinksType | null> => {
    try {
      if (!user) {
        console.log("error al recibir usuario", user);
        return null;
      }

      const data: LinkApp[] = user.idusuario
        ? await services.applications.AllApplicationAuthByIdusuario(
            user.idusuario
          )
        : [];

      const datapowerbib: LinkApp[] = user.idarea
        ? await services.applications.AllApplicationAuthPowerBiBByIdarea(
            user.idarea
          )
        : [];

      if (!data || !datapowerbib) {
        console.log("user.idusuario", user.idusuario);
        console.log("user.idarea", user.idarea);
        console.log("error al recibir data o datapowerbib", data, datapowerbib);
      }

      const filterData = (type: string, hab?: string): LinkApp[] =>
        data.filter(
          (item: LinkApp) => item.type === type && (!hab || item.hab === hab)
        );

      const publicsapp: LinkApp[] = filterData("public");
      const powerBiA: LinkApp[] = filterData("powerBiA");
      const powerBiB: LinkApp[] = datapowerbib;
      const powerBiC: LinkApp[] = filterData("powerBiC", "SI");
      const privates: LinkApp[] = filterData("private", "SI");
      const sugested: LinkApp[] = data.filter(
        (item: LinkApp) =>
          item.type === "sugest" &&
          item.auth === "true" &&
          item.idusuario === user?.idusuario
      );

      const publicsAdd: LinkApp[] = [...publicsapp, ...privates];

      return {
        publics: publicsAdd,
        public: publicsapp,
        private: privates,
        sugest: sugested,
        powerBi: { A: powerBiA, B: powerBiB, C: powerBiC },
      };
    } catch (error) {
      console.info("Error al cargar las aplicaciones", error);
      toast.error("Error al cargar las aplicaciones.");
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
      if (!dataUser) return;
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
      if (resp.idusuario) {
        const response = await users.UserById(resp.idusuario);

        if (!response) {
          console.error("Error al obtener el usuario.", response);
        }

        setDataUSer(response[0]);
        setStatusPassword(resp.statuspass);
        setIsAuthenticated(true);
        setIsTokenValid(true);
        toast.success("Sesión recuperada.");
        setLoadingCheckToken(false);
        checkauthapplications();
        const result = await loadData(response[0]);
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

  const loginContext = async (credentials: LoginCredentials) => {
    try {
      toast("Consultando usuario...");
      const response: LoginResponse = await services.users.login(credentials);
      if (!response.token) {
        toast.error("Usuario o contraseña incorrectos.");
        setIsAuthenticated(false);
        setIsTokenValid(false);
        throw new Error("Usuario o contraseña incorrectos.");
      }

      const accessToken = response.token;

      Cookies.set("token", accessToken, { expires: 7, sameSite: "lax" });

      toast.success("Bienvenido!! " + response.checkacceso.nombre);

      setDataUSer(response.checkacceso);
      setIsAuthenticated(true);
      setIsTokenValid(true);
      setStatusPassword(response.statuspass);
      // await loadData(response.checkacceso);
      return response;
    } catch (error) {
      // setIsAuthenticated(false);
      setIsTokenValid(false);
      console.error("Error al iniciar sesión:", error);
      throw new Error("Error al iniciar sesión");
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
        dataUser: dataUser!,
        isAuthenticated,
        isTokenValid,
        loadData,
        loading,
        loadingCheckToken,
        loginContext,
        logout,
        setAllLinks,
        statusPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
