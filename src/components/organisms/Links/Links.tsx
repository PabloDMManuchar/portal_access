import React, { useEffect, useState } from "react";

import CardButton from "../cardButton/cardButton";
import CardButtonDos from "../cardButton/cardButtonDos";
import CardButtonTres from "../cardButton/cardButtonTres";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { services } from "../../../services";
import { TLinks } from "../../../services/links/links";

const Links: React.FC = () => {
  const [data, setData] = useState<TLinks>();

  const getData = async () => {
    const data = services.links.data;
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex justify-center z-10">
      <Tabs align="end">
        <TabList>
          <Tab color={"gray.400"}>Mis accesos</Tab>
          <Tab color={"gray.400"}>Opcion 2</Tab>
          <Tab color={"gray.400"}>Mis BI</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{data && <CardButtonDos data={data} />}</TabPanel>
          <TabPanel>{data && <CardButtonTres data={data} />}</TabPanel>
          <TabPanel>
            <CardButton />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Links;
