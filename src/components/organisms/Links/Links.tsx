import React, { useEffect, useState } from "react";
import CardButtonDos from "../cardButton/cardButtonDos";
import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from "@chakra-ui/react";
import { services } from "../../../services";
import { TLinks } from "../../../services/links/links";

const TitleList: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="pt-6 pb-4">
      <Text color={'white'}>{text}</Text>
      <Divider borderColor="gray.800" />
    </div>
  );
};

const Links: React.FC = () => {
  const [allLinks, setAllLinks] = useState<{
    publics: TLinks;
    privates: TLinks;
    powerBi: TLinks;
  }>();

  // const [isVPN, setisVPN] = useState<boolean>(false);

  const getData = async () => {
    const data = services.links.data;
    const publics = data.filter((item) => item.type === "public");
    const privates = data.filter((item) => item.type === "private");
    const powerBi = data.filter((item) => item.type === "powerBi");


    const all = { publics: publics, privates: privates, powerBi: powerBi };
    if (all) {
      setAllLinks(all);
    }
  };

  useEffect(() => {
    // isAPIActive();
    getData();
  }, []);

  return (
    <div className=" z-10">
      <Tabs align="end">
        <TabList>
          <Tab color={"gray.400"}>Accesos publicos</Tab>
          <Tab color={"gray.400"}>
            {/* {!isVPN ? <Tooltip label={'No tienes acceso a estos accesos, posiblemente no tengas la VPN conectada.'}>Mis accesos</Tooltip> : "Mis accesos"} */}
            Mis accesos

          </Tab>
          <Tab color={"gray.400"}>Mis BI</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <>
              {allLinks?.publics && <CardButtonDos data={allLinks?.publics} />}
              {allLinks?.privates && (
                <>
                  <TitleList text={'Privados'}/>
                  <CardButtonDos data={allLinks?.privates} />
                </>
              )}

              {allLinks?.powerBi && (
                <>
                  <TitleList text={'PowerBi'}/>
                  <CardButtonDos data={allLinks?.powerBi} />
                </>
              )}
            </>
          </TabPanel>
          <TabPanel>
            {allLinks?.privates && <CardButtonDos data={allLinks?.privates} />}
          </TabPanel>
          <TabPanel>
            <TabPanel>
              {allLinks?.powerBi && <CardButtonDos data={allLinks?.powerBi} />}
            </TabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Links;
