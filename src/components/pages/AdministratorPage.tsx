import Layout from "../Layout/Layout";
import { useState } from "react";
import { Box, Divider, Text } from "@chakra-ui/react";
import UsersContentPage from "../pages/usersadmin/userscontentpage";
import HomeContentPage from "../pages/usersadmin/homecontentpage";
import AplicationContentPage from "../pages/usersadmin/aplicationcontentpage";
import Settingcontentpage from "./usersadmin/settingcontentpage";
import Powerbicontentpage from "./usersadmin/powerbicontentpage";
import { SegmentedControl } from "../ui/segmented-control";

const AdministratorPage = () => {
  const [currentContent, setCurrentContent] = useState("home");
  const handleSegmentedControlChange = (value: string) => {
    setCurrentContent(value.toLowerCase());
  };

  return (
    <Layout>
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
        >
          <Text
            fontWeight={"bold"}
            fontSize={"2xl"}
            px={"1rem"}
            color={"gray.200"}
          >
            Panel Administrador
          </Text>
          <SegmentedControl
            defaultValue="Home"
            items={["Home", "Users", "App", "PowerBI", "Settings"]}
            onChange={handleSegmentedControlChange}
          />
        </Box>
        <Divider m={'1rem 0 2rem'} mx={'auto'} w={'90%'} />
        <Box minH={"100vh"}>
          {currentContent === "home" && <HomeContentPage />}
          {currentContent === "users" && <UsersContentPage />}
          {currentContent === "app" && <AplicationContentPage />}
          {currentContent === "powerbi" && <Powerbicontentpage />}
          {currentContent === "settings" && <Settingcontentpage />}
        </Box>
      </Box>
    </Layout>
  );
};

export default AdministratorPage;
