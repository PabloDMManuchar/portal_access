import Layout from "../Layout/Layout";
import LinksApp from "../organisms/LinksApp";
import Chat from "../molecules/chatGpt/ChatGPT";

const HomePage = () => {
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
