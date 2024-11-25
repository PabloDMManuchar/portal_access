import AddApplicationModal from "../../molecules/modals/AddApplicationModal";
import TableApplications from "../../molecules/tables/TableApplications";

const AplicationContentPage = () => {
  return (
    <>
      <AddApplicationModal typeform="public" />
      <AddApplicationModal typeform="powerBi" />
      <TableApplications />
    </>
  );
};

export default AplicationContentPage;
