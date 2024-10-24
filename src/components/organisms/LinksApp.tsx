import { useState, useEffect } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import GoogleSearch from "../atoms/GoogleSearch/GoogleSearch";
import CardButtonLinkApp from "../molecules/cardbuttonlinkapp/CardButtonLinkApp";
import { LinkApp } from "../../types/apptype";
import { services } from "../../services";
import { useAuth } from "../../context/AuthContext";

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
    const data = await services.applications.AllApplications();
    const publicsapp = data.filter((item: LinkApp) => item.type === "public");
    const powerBi = data.filter((item: LinkApp) => item.type === "powerBi");
    const dataprivate: LinkApp[] =
      await services.applications.AllApplicationPrivateByIdusuario(
        dataUser.idusuario
      );
    const privates: LinkApp[] = dataprivate;
    //const add = data.filter((item) => item.type === "add");

    const puclicsAdd = [...publicsapp, ...privates];

    const all = { publics: puclicsAdd, powerBi: powerBi };

    if (all) {
      setAllLinks(all);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ maxWidth: "46rem" }}>
      <GoogleSearch />

      <Tabs align="center">
        <TabList>
          <Tab color={"gray.400"}>Mis accesos</Tab>
          <Tab color={"gray.400"}>Mis BI</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <>
              {allLinks?.publics && (
                <CardButtonLinkApp data={allLinks?.publics} />
              )}
            </>
          </TabPanel>

          <TabPanel>
            <TabPanel>
              {allLinks?.powerBi && (
                <CardButtonLinkApp data={allLinks?.powerBi} />
              )}
            </TabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default LinksApp;
