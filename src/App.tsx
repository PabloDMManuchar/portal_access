import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Preloader from "./components/pages/Preloader/Preloader";
import AdministratorPage from "./components/pages/AdministratorPage";
import HomePage from "./components/pages/HomePage";
import ProfileUserPage from "./components/pages/ProfileUserPage";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/pages/login/LoginPage";

function App() {
  const { isAuthenticated, loadingCheckToken } = useAuth();

  return (
    <Router>
      {
      loadingCheckToken ? <Preloader /> : !isAuthenticated &&  <LoginPage />
      
      }
      <Routes>
        <Route path="/access/login" element={<LoginPage />} />
        <Route path="/access/inicio" element={<HomePage />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/access/mi-perfil" element={<ProfileUserPage />} />
          <Route path="/access/administrator" element={<AdministratorPage />} />
        {/* </Route> */}
        {/* <Route
          path="*"
          element={<Navigate to={isTokenValid ? "/access/inicio" : "/access"} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
