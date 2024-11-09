import { useState, useEffect } from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import CardButtonLinkApp from "../molecules/cardbuttonlinkapp/CardButtonLinkApp";
import { LinkApp } from "../../types/apptype";
import { services } from "../../services";
import { useAuth } from "../../context/AuthContext";
import CardLinksLoaders from "../molecules/Loaders/CardLinks/CardLinksLoaders";
import AddPrivateApplicationModal from "../molecules/modals/AddPrivateApplicationModal";

const LinksApp: React.FC = () => {
  const [allLinks, setAllLinks] = useState<
    | {
        publics: LinkApp[];
        powerBi: LinkApp[];
      }
    | undefined
  >(undefined);

  const { dataUser } = useAuth();

  const getData = async () => {
    const data = await services.applications.AllApplicationAuthByIdusuario(
      dataUser.idusuario
    );

    const publicsapp = data.filter((item: LinkApp) => item.type === "public");
    const powerBi = data.filter((item: LinkApp) => item.type === "powerBi");
    const privates = data.filter((item: LinkApp) => item.type === "private");
    //const dataprivate: LinkApp[] =
    // await services.applications.AllApplicationPrivateByIdusuario(
    //    dataUser.idusuario
    //  );
    //const privates: LinkApp[] = dataprivate;
    //const add = data.filter((item) => item.type === "add");

    const publicsAdd = [...publicsapp, ...privates];

    const all = { publics: publicsAdd, powerBi: powerBi };

    if (all) {
      setAllLinks(all);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ maxWidth: "46rem" }}>
      {/* <GoogleSearch /> */}

      <Tabs align="center">
        <TabList>
          <Tab color={"gray.400"}>Mis accesos</Tab>
          <Tab color={"gray.400"}>Mis BI</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <>
              {allLinks?.publics ? (
                <>
                  <Box px={"3rem"}>
                    <AddPrivateApplicationModal isAddButtonMyPrifile={false} />
                  </Box>
                  <CardButtonLinkApp data={allLinks?.publics} />
                </>
              ) : (
                <CardLinksLoaders />
              )}
            </>
          </TabPanel>

          <TabPanel>
            <TabPanel>
              {allLinks?.powerBi ? (
                <>
                  <Box px={"3rem"}>
                    <AddPrivateApplicationModal isAddButtonMyPrifile={false} />
                  </Box>
                  <CardButtonLinkApp data={allLinks?.powerBi} />
                </>
              ) : (
                <CardLinksLoaders />
              )}
            </TabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default LinksApp;
