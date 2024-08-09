import React, { useEffect, useState } from "react";
import CardButtonDos from "../cardButton/cardButtonDos";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from "@chakra-ui/react";
import { services } from "../../../services";
import { TLinks } from "../../../services/links/links";

const Links: React.FC = () => {
  const [linksPublics, setLinksPublics] = useState<TLinks>();
  const [linksPrivate, setLinksPrivate] = useState<TLinks>();
  const [linksPowerBi, setLinksPowerBi] = useState<TLinks>();

  // const [isVPN, setisVPN] = useState<boolean>(false);

  const getData = async () => {
    const data = services.links.data;
    const publics = data.filter((item) => item.type === "public");
    const privates = data.filter((item) => item.type === "private");
    const powerBi = data.filter((item) => item.type === "powerBi");
    setLinksPublics(publics);
    setLinksPrivate(privates);
    setLinksPowerBi(powerBi);
  };

  // const isAPIActive = async () => {
  //   try {
  //     const response = await services.status.isAPIActive();
  //     if (response.message) {
  //       setisVPN(true);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching API:", error);
  //   }
  // };

  useEffect(() => {
    // isAPIActive();
    getData();
  }, []);

  return (
    <div className="w-full flex justify-center z-10">
      <Tabs align="end">
        <TabList>
          <Tab color={"gray.400"}>Accesos</Tab>
          <Tab color={"gray.400"} >
            {/* {!isVPN ? <Tooltip label={'No tienes acceso a estos accesos, posiblemente no tengas la VPN conectada.'}>Mis accesos</Tooltip> : "Mis accesos"} */}
           Mis accesos
          </Tab>
          <Tab color={"gray.400"}>Mis BI</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {linksPublics && <CardButtonDos data={linksPublics} />}
          </TabPanel>
          <TabPanel>
            {linksPrivate && <CardButtonDos data={linksPrivate} />}
          </TabPanel>
          <TabPanel>
            <TabPanel>
              {linksPowerBi && <CardButtonDos data={linksPowerBi} />}
            </TabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Links;
