import React from "react";
import CardButton from "../../molecules/cardButton/cardButton";

const Home: React.FC = () => {
  const isAdmin = true;

  return (
    <>
      <div className="my-6 w-full text-center flex  items-center justify-center gap-2 p-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="py-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-6xl font-bold text-transparent ">
          PORTAL
        </h1>
        <h2 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-6xl text-transparent ">
          ACCESS
        </h2>
      </div>
      {isAdmin && <CardButton />}
    </>
  );
};

export default Home;
