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
  login: () => void;
  logout: () => void;
}

const [credentials, setCredentials] = useState<LoginCredentials>({
  username: "",
  password: "",
});

// Crear el contexto con valores predeterminados
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear el proveedor de autenticación
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [message, setMessage] = useState(initialState)

  useEffect(() => {
    Cookies.get("Token") ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, []);

  const login = async (credentials) => {
    toast("Consultando usuario...", { duration: 2000 });
    const response: LoginResponse = await users.login(credentials); // Llamada a la API
    const accessToken = response.token;
    Cookies.set("Token", accessToken, { expires: 7 });
    toast.success("Login OK");
    setIsAuthenticated(true);
    return response;
  };

  const logout = () => {
    // services.logout();
    users.logout();
    setIsAuthenticated(false);
    toast.success("Sesion cerrada");
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
