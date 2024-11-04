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
import WelcomeScreen from "./components/pages/WelcomeScreen";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isTokenValid, checktoken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      await checktoken();
      setLoading(false); // Termina la precarga solo después de verificar el token
    };

    verifyToken();
  }, [checktoken]);

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
            <Route path="/access/login" element={<WelcomeScreen />} />
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
