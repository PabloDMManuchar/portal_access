import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { LinkApp } from "../../../types/apptype";
import { services } from "../../../services";
import { useAuth } from "../../../context/AuthContext";
import CardLinksLoaders from "../../molecules/Loaders/CardLinks/CardLinksLoaders";
import AddPrivateApplicationModal from "../../molecules/modals/AddPrivateApplicationModal";
import CardButtonLinkApp from "../../molecules/cardbuttonlinkapp/CardButtonLinkApp"; // Si es una exportación por defecto
import { FaLink, FaChartBar } from "react-icons/fa";
const LinksApp: React.FC = () => {
  const { dataUser } = useAuth();
  const [allLinks, setAllLinks] = useState<{
    publics: LinkApp[];
    public: LinkApp[];
    private: LinkApp[];
    sugest: LinkApp[];
    powerBi: { A: LinkApp[]; B: LinkApp[]; C: LinkApp[] };
  }>({
    publics: [],
    public: [],
    private: [],
    sugest: [],
    powerBi: { A: [], B: [], C: [] },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await services.applications.AllApplicationAuthByIdusuario(
          dataUser.idusuario
        );
        if (!data) return;

        const publicsapp = data?.filter(
          (item: LinkApp) => item.type === "public"
        );
        const powerBiA = data?.filter(
          (item: LinkApp) => item.type === "powerBiA"
        );
        const powerBiB = data?.filter(
          (item: LinkApp) => item.type === "powerBiB"
        );
        const powerBiC = data?.filter(
          (item: LinkApp) => item.type === "powerBiC"
        );

        const privates = data?.filter(
          (item: LinkApp) => item.type === "private"
        );
        const sugested = data?.filter(
          (item: LinkApp) =>
            item.type === "sugest" &&
            item.auth === "true" &&
            item.idusuario === dataUser.idusuario
        );
        const publicsAdd = [...publicsapp, ...privates];
        setAllLinks({
          publics: publicsAdd,
          public: publicsapp,
          private: privates,
          sugest: sugested,
          powerBi: { A: powerBiA, B: powerBiB, C: powerBiC },
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [dataUser.idusuario]);

  return (
    <div style={{ maxWidth: "60rem", minWidth: "30rem" }}>
      <Tabs align="center">
        <TabList>
          <Tab color={"gray.400"}>
            <FaLink style={{ marginRight: "8px" }} /> MIS ACCESOS
          </Tab>
          <Tab color={"gray.400"}>
            <FaChartBar style={{ marginRight: "8px" }} /> MIS BI
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <>
              {allLinks.publics.length > 0 ? (
                <>
                  <Box px={"3rem"}>
                    <AddPrivateApplicationModal
                      isAddButtonMyPrifile={false}
                      type="private"
                    />
                  </Box>
                  <Text
                    color={"gray.200"}
                    pt={"1rem"}
                    textAlign={"start"}
                    fontWeight={600}
                  >
                    CORPORATIVOS
                  </Text>
                  <Divider />
                  <CardButtonLinkApp data={allLinks?.public} />
                  <Text
                    color={"gray.200"}
                    pt={"1rem"}
                    textAlign={"start"}
                    fontWeight={600}
                  >
                    PRIVADOS
                  </Text>
                  <Divider />
                  <CardButtonLinkApp data={allLinks?.private} />
                  <Text
                    color={"gray.200"}
                    pt={"1rem"}
                    textAlign={"start"}
                    fontWeight={600}
                  >
                    SUGERIDOS
                  </Text>
                  <Divider />
                  <CardButtonLinkApp data={allLinks?.sugest} />
                </>
              ) : (
                <CardLinksLoaders />
              )}
            </>
          </TabPanel>

          <TabPanel>
            {allLinks?.powerBi.A.length > 0 ? (
              <Box px={"3rem"}>
                <AddPrivateApplicationModal
                  isAddButtonMyPrifile={false}
                  type="powerBiC"
                />
                <Text
                  color={"gray.200"}
                  pt={"1rem"}
                  textAlign={"start"}
                  fontWeight={600}
                >
                  CORPORATIVOS
                </Text>
                <Divider />
                <CardButtonLinkApp data={allLinks?.powerBi.A} />
                <Text
                  color={"gray.200"}
                  pt={"1rem"}
                  textAlign={"start"}
                  fontWeight={600}
                >
                  AREAS
                </Text>
                <Divider />

                <CardButtonLinkApp data={allLinks?.powerBi.B} />
                <Text
                  color={"gray.200"}
                  pt={"1rem"}
                  textAlign={"start"}
                  fontWeight={600}
                >
                  PRIVADOS
                </Text>
                <Divider />

                <CardButtonLinkApp data={allLinks?.powerBi.C} />
              </Box>
            ) : (
              <CardLinksLoaders />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default LinksApp;
