import React, { useEffect, useState } from "react";
import CardButtonDos from "../cardButton/cardButtonDos";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { services } from "../../../services";
import { TLinks } from "../../../services/links/links";

const Links: React.FC = () => {
  const [allLinks, setAllLinks] = useState<{
    publics: TLinks;
    privates: TLinks;
    powerBi: TLinks;
  }>();


  const getData = async () => {
    const data = services.links.data;
    const publics = data.filter((item) => item.type === "public");
    const privates: any = []
    const powerBi = data.filter((item) => item.type === "powerBi");


    const all = { publics: publics, privates: privates, powerBi: powerBi };
    if (all) {
      setAllLinks(all);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" z-10">

      <Tabs align="end">
        <TabList>

          <Tab color={"gray.400"}>Mis accesos</Tab>

          <Tab color={"gray.400"}>Mis BI</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <>
              {allLinks?.publics && <CardButtonDos data={allLinks?.publics} />}
            </>
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
