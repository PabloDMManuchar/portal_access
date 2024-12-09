import { Center, Flex } from "@chakra-ui/react";
import AddApplicationModal from "../../molecules/modals/AddApplicationModal";
import TableApplications from "../../molecules/tables/TableApplications";

const AplicationContentPage = () => {
  return (
    <Center flexDirection={'column'}>
      <Flex width={'36rem'} gap={'2rem'} >
        <AddApplicationModal typeform="public" />
        <AddApplicationModal typeform="powerBi" />
      </Flex>
      <TableApplications />
    </Center>
  );
};

export default AplicationContentPage;
