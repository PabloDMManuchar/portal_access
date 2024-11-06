import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Flex, Text } from "@chakra-ui/react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Preloader: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const styles = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { duration: 4000 },
    loop: { reverse: true },
  });

  useEffect(() => {
    const verifyAuth = async () => {
      console.log(isAuthenticated);

      if (isAuthenticated) {
        navigate("/access/home");
      } else {
        navigate("/access/login");
      }
    };

    verifyAuth();
  }, [isAuthenticated, navigate]);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgImage="url('/welcomeimg.png')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      position="relative"
    >
      <animated.div style={styles}>
        <Text
          fontSize="6xl"
          fontWeight="bold"
          color="white"
          textShadow="2px 2px 6px rgba(0, 0, 0, 0.8)"
          className="preloader"
        >
          Checkeando Token....
        </Text>
        <footer className="footer absolute bottom-4 right-4">
          <p className="text-white font-light font-sm"></p>
          <img src={"/Mit.png"} alt="LogoIT" className="imagen-footer" />
        </footer>
      </animated.div>
    </Flex>
  );
};

export default Preloader;
