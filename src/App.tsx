import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Preloader from "./components/pages/Preloader/Preloader";
import AdministratorPage from "./components/pages/AdministratorPage";
import HomePage from "./components/pages/HomePage";
import ProfileUserPage from "./components/pages/ProfileUserPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/pages/login/LoginPage";

function App() {
  const { isTokenValid, checktoken } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  /*
  useEffect(() => {
    const verifyToken = async () => {
      await checktoken(); // Ejecuta la función de verificación del token
      setLoading(false); // Cambia loading a false después de verificar el token
    };

    verifyToken(); // Llama a verifyToken al cargar el componente
  }, [checktoken]);
  */

  return (
    <Router>
      {" "}
      {/* Asegúrate de que Router envuelva todo el contenido */}
      <div className="App">
        {loading ? (
          <Preloader />
        ) : (
          <Routes>
            {/* Ruta pública */}
            <Route path="/access/login" element={<LoginPage />} />
            {/* Ruta para Home */}
            <Route path="/access/home" element={<HomePage />} />
            {/* Rutas protegidas */}
            <Route element={<PrivateRoute />}>
              {/* Ruta para el perfil del usuario */}
              <Route path="/access/myprofile" element={<ProfileUserPage />} />
              {/* Ruta para el administrador */}
              <Route
                path="/access/administrator"
                element={<AdministratorPage />}
              />
            </Route>
            {/* Ruta de captura para rutas inexistentes */}
            <Route
              path="*"
              element={
                <Navigate to={isTokenValid ? "/access/home" : "/access"} />
              }
            />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
