import { FaCogs, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa"; // Importa el ícono de react-icons/fa
import { useAuth } from "../../context/AuthContext"; // Importa el Context
import ChangePasswordModal from "../molecules/modals/ChangePasswordModal"; //Importa el Modal para cambiar contraseña
import { Flex, Spacer, Button, ButtonGroup, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavigationUsers = () => {
  const { logout, statusPassword, dataUser } = useAuth();

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Spacer />
        <ButtonGroup gap="2">
          <Tooltip
            label="HOME"
            fontSize="md"
            bg="gray.300"
            color="black"
            hasArrow
          >
            <Link to="/" className="flex items-center">
              <FaHome style={{ marginRight: "8px", color: "white" }} />{" "}
            </Link>
          </Tooltip>
          <Tooltip
            label="MI PERFIL"
            fontSize="md"
            bg="gray.300"
            color="black"
            hasArrow
          >
            <Link to="/myprofile" className="flex items-center">
              <FaUser style={{ marginRight: "8px", color: "white" }} />{" "}
            </Link>
          </Tooltip>

          {dataUser.idperfil === 1 && (
            <Tooltip
              label="ADMINISTRADOR"
              fontSize="md"
              bg="gray.300"
              color="black"
              hasArrow
            >
              <Link to="/administrator" className="flex items-center">
                <FaCogs style={{ marginRight: "8px", color: "white" }} />{" "}
              </Link>
            </Tooltip>
          )}
          {statusPassword != "OK" && <ChangePasswordModal />}
          <Tooltip label="Cerrar sesion" openDelay={500}>
            <Button
              colorScheme="black"
              leftIcon={<FaSignOutAlt />}
              onClick={logout}
              mr={4}
            ></Button>
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default NavigationUsers;
