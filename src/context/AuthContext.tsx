import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { users } from "../services/users/users";
import { LoginResponse, LoginCredentials } from "../types/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
}

// Crear el contexto con valores predeterminados
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor de autenticación
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [message, setMessage] = useState(initialState)

  // useEffect(() => {
  //   Cookies.get("Token") ? setIsAuthenticated(true) : setIsAuthenticated(false);
  //   console.log('---------------', Cookies.get("Token"));
  // }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      toast("Consultando usuario...", { duration: 2000 });
      const response: LoginResponse = await users.login(credentials); // Llamada a la API
      const accessToken = response.token;
      Cookies.set("Token", accessToken, { expires: 7, sameSite: "Lax" }); // Establecer SameSite
      toast.success("Login OK");
      setIsAuthenticated(true);
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
      Cookies.remove("Token");
      setIsAuthenticated(false);
      toast.success("Sesión cerrada correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
