import Layout from "../Layout/Layout";
import { MenuAdmin } from "../molecules/menu/MenuAdmin";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import UsersContentPage from "../pages/usersadmin/userscontentpage";
import HomeContentPage from "../pages/usersadmin/homecontentpage";
import AplicationContentPage from "../pages/usersadmin/aplicationcontentpage";
import Settingcontentpage from "./usersadmin/settingcontentpage";
import Powerbicontentpage from "./usersadmin/powerbicontentpage";

const AdministratorPage = () => {
  //const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [currentContent, setCurrentContent] = useState("home");

  const handleMenuItemClick = (content: any) => {
    setCurrentContent(content);
    //setIsOpenMenu(false); // Cerrar el menú al seleccionar un item
  };
  return (
    <Layout>
      <Flex>
        <MenuAdmin onMenuItemClick={handleMenuItemClick} />
      </Flex>
      {/* Contenido según el estado */}
      <div className="px-4 z-10">
        {currentContent === "home" && <HomeContent />}
        {currentContent === "users" && <UsersContent />}
        {currentContent === "app" && <AppContent />}
        {currentContent === "powerbi" && <PowerBIContent />}
        {currentContent === "settings" && <SettingsContent />}
      </div>
    </Layout>
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
const PowerBIContent = () => (
  <div>
    <Powerbicontentpage />
  </div>
);
const SettingsContent = () => (
  <div>
    <Settingcontentpage />
  </div>
);

export default AdministratorPage;
