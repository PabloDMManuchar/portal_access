import Chat from "../molecules/chatGpt/ChatGPT";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordForm from "../organisms/ChangePasswordForm";
import LayoutMotion from "../Layout/LayoutMotion";
import { Text } from "@chakra-ui/react";
import GoogleSearch from "../atoms/GoogleSearch/GoogleSearch";
import LinksApp from "../organisms/Links/LinksApp";

const HomePage = () => {
  const { dataUser, statusPassword } = useAuth();


  return (
    <LayoutMotion>
      <div
        className="w-full mx-auto flex flex-col md:flex-row justify-center"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <div
          className="mx-auto "
          style={{ minWidth: "30rem", maxWidth: "46rem" }}
        >
          {dataUser.nombre && (
            <Text
              fontSize={"32px"}
              textAlign={"center"}
              color={"gray.200"}
              fontWeight={"200"}
            >
              ¡Hola, <strong>{dataUser.nombre}!</strong>
            </Text>
          )}

          <LinksApp />
        </div>
        <div
          className="flex-grow mx-auto w-full sm:w-11/12 md:max-w-2xl sm:max-w-sm"
          style={{
            marginBottom: "4rem",
            maxWidth: "32rem",
            position: "sticky",
            top: "1rem",
            zIndex: 10,
          }}
        >
          {statusPassword !== "OK" ? (
            <ChangePasswordForm />
          ) : (
            <div>
              <GoogleSearch />
              <Chat />
            </div>
          )}
        </div>
      </div>
    </LayoutMotion>
  );
};

export default HomePage;
