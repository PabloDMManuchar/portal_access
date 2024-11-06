import { Skeleton, Stack } from "@chakra-ui/react";
import TableUsers from "../../../components/molecules/tables/tableusers";
import { SubTitlecontent } from "../../atoms/title/subtitlecontent";

const UsersContentPage = () => {
  return (
    <>
      {/* <SubTitlecontent>USUARIOS</SubTitlecontent> */}

      <TableUsers />
    </>
  );
};

export default UsersContentPage;
