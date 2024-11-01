import { useEffect } from "react";
import Layout from "../Layout/Layout";
import LinksApp from "../organisms/LinksApp";
import Chat from "../molecules/chatGpt/ChatGPT";
import { useAuth } from "../../context/AuthContext";

const HomePage = () => {
  const { checkauthapplications, dataUser } = useAuth();

  useEffect(() => {
    if (dataUser.idusuario) {
      checkauthapplications(); // Ejecuta solo si el ID de usuario está disponible
    }
  }, [dataUser.idusuario]); // Ejecuta el efecto solo cuando `idusuario` cambia

  return (
    <Layout>
      <div className="w-full flex flex-col md:flex-row justify-center">
        <LinksApp />

        <div className="px-4 z-10">
          <Chat />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
