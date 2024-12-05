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
        const datapowerbib =
          await services.applications.AllApplicationAuthPowerBiBByIdarea(
            dataUser.idarea
          );
        if (!data) return;

        const publicsapp = data?.filter(
          (item: LinkApp) => item.type === "public"
        );
        const powerBiA = data?.filter(
          (item: LinkApp) => item.type === "powerBiA"
        );
        /*
        const powerBiB = data?.filter(
          (item: LinkApp) => item.type === "powerBiB"
        );
        */
        const powerBiB = datapowerbib;
        const powerBiC = data?.filter(
          (item: LinkApp) => item.type === "powerBiC" && item.hab === "SI"
        );

        const privates = data?.filter(
          (item: LinkApp) => item.type === "private" && item.hab === "SI"
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
    <div style={{ maxWidth: "56rem", fontSize: "12px" }}>
      <Tabs align="center" mt={4}>
        <TabList>
          <Tab color={"gray.400"} fontSize={"12px"}>
            <FaLink style={{ marginRight: "8px" }} />
            <Text fontWeight={600}>MIS ACCESOS</Text>
          </Tab>
          <Tab color={"gray.400"} fontSize={"12px"}>
            <FaChartBar style={{ marginRight: "8px" }} />
            <Text fontWeight={600}>MIS BI</Text>
          </Tab>
        </TabList>
        <TabPanels
          style={{
            overflowY: "auto",
            maxHeight: "60vh",
            scrollbarWidth: "thin",
            scrollbarColor: "#201f1f #161515",
          }}
        >
          <TabPanel>
            <>
              {allLinks.publics.length > 0 ? (
                <>
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
              <Box>
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
                <CardButtonLinkApp data={allLinks?.powerBi.C} />{" "}
                <Box px={"3rem"}>
                  <AddPrivateApplicationModal
                    isAddButtonMyPrifile={false}
                    type="powerBiC"
                  />
                </Box>
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
