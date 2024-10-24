import Home from "./components/pages/home/Home";
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
        <Route path="/" element={<HomePage />} /> {/* Ruta para Home */}
        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          {/* Ruta para el perfil del usuario */}
          <Route path="/myprofile" element={<ProfileUserPage />} />{" "}
          {/* Ruta para el administrador */}
          <Route path="/administrator" element={<AdministratorPage />} />{" "}
        </Route>
        {/* Ruta de captura para rutas inexistentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
