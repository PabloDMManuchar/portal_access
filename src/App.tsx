import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdministratorPage from "./components/pages/AdministratorPage";
import HomePage from "./components/pages/HomePage";
import ProfileUserPage from "./components/pages/ProfileUserPage";
import PrivateRoute from "./components/routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/access" element={<HomePage />} /> {/* Ruta para Home */}
        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          {/* Ruta para el perfil del usuario */}
          <Route path="/access/myprofile" element={<ProfileUserPage />} />{" "}
          {/* Ruta para el administrador */}
          <Route
            path="/access/administrator"
            element={<AdministratorPage />}
          />{" "}
        </Route>
        {/* Ruta de captura para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/access" />} />
      </Routes>
    </Router>
  );
}

export default App;
