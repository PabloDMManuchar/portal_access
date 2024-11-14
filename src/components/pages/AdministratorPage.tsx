import { useState } from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import UsersContentPage from "../pages/usersadmin/userscontentpage";
import HomeContentPage from "../pages/usersadmin/homecontentpage";
import AplicationContentPage from "../pages/usersadmin/aplicationcontentpage";
import Settingcontentpage from "./usersadmin/settingcontentpage";
// import Powerbicontentpage from "./usersadmin/powerbicontentpage";
import Authorizationcontentpage from "./usersadmin/authorizationcontentpage";
import { SegmentedControl } from "../ui/segmented-control";
import LayoutMotion from "../Layout/LayoutMotion";

const AdministratorPage = () => {
  const [currentContent, setCurrentContent] = useState("Inicio");

  const handleSegmentedControlChange = (value: string) => {
    setCurrentContent(value);
  };

  return (
    <LayoutMotion>
      <Box
        px={4}
        w={"100%"}
        zIndex={1}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          px={"1rem"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <Text
            fontWeight={"200"}
            fontSize={"2xl"}
            px={"1rem"}
            color={"gray.200"}
          >
            <strong>Panel Administrador </strong>| {currentContent}
          </Text>
          <SegmentedControl
            defaultValue="Inicio"
            items={[
              "Inicio",
              "Usuarios",
              "Aplicaciones",
              "Autorizaciones",
              "Configuraciones",
            ]}
            onChange={handleSegmentedControlChange}
          />
        </Box>
        <Divider m={"1rem 0 2rem"} mx={"auto"} w={"90%"} />
        <Box minH={"100vh"}>
          {currentContent === "Inicio" && <HomeContentPage />}
          {currentContent === "Usuarios" && <UsersContentPage />}
          {currentContent === "Aplicaciones" && <AplicationContentPage />}
          {currentContent === "Autorizaciones" && <Authorizationcontentpage />}
          {currentContent === "Configuraciones" && <Settingcontentpage />}
        </Box>
      </Box>
    </LayoutMotion>
  );
};

export default AdministratorPage;
