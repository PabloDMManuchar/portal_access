import { useAuth } from "../../context/AuthContext"; // Importa el Context
import ChangePasswordModal from "../molecules/modals/ChangePasswordModal"; //Importa el Modal para cambiar contraseña
import { Flex, Spacer, Button, ButtonGroup, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdLogout, MdOutlineAdminPanelSettings  } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

const NavigationUsers = () => {
  const { logout, statusPassword, dataUser } = useAuth();

  const currentPath = window.location.pathname;

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Spacer />
        <ButtonGroup gap="2">
          <Tooltip label="Inicio">
            <Link
              to="/access"
              className="flex items-center"
              style={{ textDecoration: "none", color: "white" }}
            >
              <GoHome
                className={
                  currentPath === "/access"
                    ? "text-white text-2xl"
                    : "text-gray-500 text-2xl"
                }
              />
            </Link>
          </Tooltip>
          <Tooltip label="Mi perfil">
            <Link to="/access/myprofile" className="flex items-center ">
              <CgProfile
                className={
                  currentPath === "/access/myprofile"
                    ? "text-white text-2xl"
                    : "text-gray-500 text-2xl"
                }
              />{" "}
            </Link>
          </Tooltip>

          {dataUser.idperfil === 1 && (

            <Tooltip label="Administrador">

              <Link to="/access/administrator" className="flex items-center">
                <MdOutlineAdminPanelSettings 
                  className={
                    currentPath === "/access/administrator"
                      ? "text-white text-2xl"
                      : "text-gray-500 text-2xl"
                  }
                />{" "}
              </Link>
            </Tooltip>
          )}
          {statusPassword != "OK" && <ChangePasswordModal />}
          <Tooltip label="Cerrar sesion">
            <Button colorScheme="black" onClick={logout} p={0} m={0}>
              <MdLogout style={{ fontSize: "1.4rem" }} fill={"white"} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default NavigationUsers;
