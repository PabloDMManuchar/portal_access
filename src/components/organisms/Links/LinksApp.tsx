import { useEffect } from "react";
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
import { useAuth } from "../../../context/AuthContext";
import CardLinksLoaders from "../../molecules/Loaders/CardLinks/CardLinksLoaders";
import AddPrivateApplicationModal from "../../molecules/modals/AddPrivateApplicationModal";
import CardButtonLinkApp from "../../molecules/cardbuttonlinkapp/CardButtonLinkApp"; // Si es una exportación por defecto
import { FaLink, FaChartBar } from "react-icons/fa";

const LinksApp: React.FC = () => {
  const { dataUser, allLinks, setAllLinks, loadData } = useAuth();

  useEffect(() => {
    if (dataUser.idusuario && dataUser.idarea) {
      const fetchData = async () => {
        const result = await loadData(dataUser);
        if (!result) return;
        setAllLinks(result);
      };
      fetchData();
    }
  }, [dataUser]);

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
            maxHeight: "64vh",
            scrollbarWidth: "thin",
            scrollbarColor: "#201f1f #161515",
          }}
        >
          <TabPanel>
            <>
              {allLinks ? (
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
            {allLinks ? (
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
