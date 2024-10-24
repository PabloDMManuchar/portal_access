//Iconos
import LogoutIcon from "../../../atoms/icons/UserIcon/LogoutIcon";

//llamada al modal para cambiar Password

import ChangePasswordModal from "../../modals/ChangePasswordModal";
import Administrator from "../../forms/navigation/administrator";
import ProfileUser from "../../forms/navigation/profileuser";
import { useAuth } from "../../../../context/AuthContext";

import {
  Icon,
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  ButtonGroup,
  Tooltip,
} from "@chakra-ui/react";

const Navigationusers = () => {
  // constante para validar via un use state el estado de la cookie
  const { logout, statusPassword, dataUser } = useAuth();

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2" color={"white"}>
        <Heading size="xs">{dataUser.nombre}</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <ProfileUser />

        {dataUser.idperfil === 1 && <Administrator />}
        {statusPassword != "OK" && <ChangePasswordModal />}
        <Tooltip label="Cerrar sesion" openDelay={500}>
          <Button
            colorScheme="black"
            leftIcon={<Icon as={LogoutIcon} boxSize={6} />}
            onClick={logout}
            mr={4}
          ></Button>
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
};

export default Navigationusers;
