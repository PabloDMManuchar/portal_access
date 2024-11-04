import { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  Tooltip,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import AdministratorIcon from "../../../atoms/icons/UserIcon/AdministratorIcon";
import { MenuAdmin } from "../../menu/MenuAdmin";
import UsersContentPage from "../../../pages/usersadmin/userscontentpage";
import { Titlecontent } from "../../../atoms/title/titlecontent";
import HomeContentPage from "../../../pages/usersadmin/homecontentpage";
import AplicationContentPage from "../../../pages/usersadmin/aplicationcontentpage";

const Administrator = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [currentContent, setCurrentContent] = useState("home");

  const handleMenuItemClick = (content: any) => {
    setCurrentContent(content);
    setIsOpenMenu(false); // Cerrar el menú al seleccionar un item
  };

  return (
    <>
      {console.info(isOpenMenu)}
      <Tooltip label="Acceso administracion App" openDelay={500}>
        <Button
          colorScheme="black"
          leftIcon={<Icon as={AdministratorIcon} boxSize={6} />}
          mr={4}
          onClick={onOpen}
        ></Button>
      </Tooltip>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Titlecontent>ADMINISTRADOR</Titlecontent>
          </DrawerHeader>

          <DrawerBody>
            <Flex>
              <MenuAdmin onMenuItemClick={handleMenuItemClick} />
            </Flex>
            {/* Contenido según el estado */}
            <div>
              {currentContent === "home" && <HomeContent />}
              {currentContent === "users" && <UsersContent />}
              {currentContent === "app" && <AppContent />}
              {currentContent === "powerbi" && <PowerBIContent />}
              {currentContent === "settings" && <SettingsContent />}
            </div>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const HomeContent = () => (
  <div>
    <HomeContentPage />
  </div>
);
const UsersContent = () => (
  <div>
    <UsersContentPage />
  </div>
);
const AppContent = () => (
  <div>
    <AplicationContentPage />
  </div>
);
const PowerBIContent = () => <div>Contenido de A Power BI</div>;
const SettingsContent = () => <div>Contenido de Configuración</div>;

export default Administrator;
