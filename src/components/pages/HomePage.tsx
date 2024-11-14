import LinksApp from "../organisms/LinksApp";
import Chat from "../molecules/chatGpt/ChatGPT";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordForm from "../organisms/ChangePasswordForm";
import LayoutMotion from "../Layout/LayoutMotion";
import { Text } from "@chakra-ui/react";
import GoogleSearch from "../atoms/GoogleSearch/GoogleSearch";

const HomePage = () => {
  const { dataUser, statusPassword } = useAuth();

  return (
    <LayoutMotion>
      <div className="w-full flex flex-col md:flex-row justify-center gap-8">
        <div>
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

          {statusPassword === "OK" ? <LinksApp /> : <ChangePasswordForm />}
        </div>

        <div>
          <GoogleSearch />
          <Chat />
        </div>
      </div>
    </LayoutMotion>
  );
};

export default HomePage;
