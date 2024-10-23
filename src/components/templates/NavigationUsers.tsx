import React from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Importa el ícono de react-icons/fa
import { useAuth } from "../../context/AuthContext"; // Importa el Context
import ChangePasswordModal from "../molecules/modals/ChangePasswordModal"; //Importa el Modal para cambiar contraseña
import Administrator from "../molecules/forms/navigation/administrator"; //Importa el acceso al menu administrador
import ProfileUser from "../molecules/forms/navigation/profileuser"; //Importa el acceso al perfil del usuario registrado
import UserProfileDrawer from "./UserProfileDrawer";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";

const NavigationUsers = () => {
  const { logout, isAuthenticated, statusPassword, dataUser } = useAuth();
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Spacer />
        <ButtonGroup gap="2">
          <UserProfileDrawer />
          {dataUser.idperfil === 1 && <Administrator />}
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
