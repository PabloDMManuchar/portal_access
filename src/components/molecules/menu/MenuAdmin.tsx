// molecules/Menu.tsx
import { useState } from "react";
import { Box, IconButton, Flex } from "@chakra-ui/react";
import { ButtonMenu } from "../../atoms/buttons/buttonMenu";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaBars,
  FaChartBar,
  FaTh,
} from "react-icons/fa"; // Ejemplos de íconos

type MenuAdminProps = {
  onMenuItemClick: (content: string) => void; // Prop para manejar el clic
};

export const MenuAdmin = ({ onMenuItemClick }: MenuAdminProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <Box>
      {/* Botón para abrir/cerrar el menú */}
      <IconButton
        icon={<FaBars />}
        aria-label="Toggle Menu"
        onClick={toggleMenu}
        colorScheme="teal"
        mb={4}
      />
      {isOpenMenu && (
        <Flex direction="column" align="stretch" w="200px">
          <ButtonMenu
            onClick={() => {
              onMenuItemClick("home"); // Llama a la función con el contenido correspondiente
              setIsOpenMenu(false); // Opcional: Cierra el menú
            }}
            leftIcon={FaHome}
            w="full"
            mb={2}
          >
            Home
          </ButtonMenu>
          <ButtonMenu
            onClick={() => {
              onMenuItemClick("users"); // Llama a la función con el contenido correspondiente
              setIsOpenMenu(false); // Opcional: Cierra el menú
            }}
            leftIcon={FaUsers}
            w="100%"
            mb={2}
          >
            Users
          </ButtonMenu>
          <ButtonMenu
            onClick={() => {
              onMenuItemClick("app"); // Llama a la función con el contenido correspondiente
              setIsOpenMenu(false); // Opcional: Cierra el menú
            }}
            leftIcon={FaTh}
            w="100%"
            mb={2}
          >
            App Public
          </ButtonMenu>
          <ButtonMenu
            onClick={() => {
              onMenuItemClick("powerbi"); // Llama a la función con el contenido correspondiente
              setIsOpenMenu(false); // Opcional: Cierra el menú
            }}
            leftIcon={FaChartBar}
            w="100%"
            mb={2}
          >
            Power BI
          </ButtonMenu>
          <ButtonMenu
            onClick={() => {
              onMenuItemClick("settings"); // Llama a la función con el contenido correspondiente
              setIsOpenMenu(false); // Opcional: Cierra el menú
            }}
            leftIcon={FaCog}
            w="100%"
            mb={2}
          >
            Settings
          </ButtonMenu>
        </Flex>
      )}
    </Box>
  );
};
