import { SubTitlecontent } from "../../atoms/title/subtitlecontent";
import AplicationList from "../../molecules/forms/applications/aplicationList";
import NewAplicationForm from "../../molecules/forms/applications/newAplicationForm";

const AplicationContentPage = () => {
  return (
    <>
      <SubTitlecontent>APLICACIONES</SubTitlecontent>

      <AplicationList />
    </>
  );
};

export default AplicationContentPage;
