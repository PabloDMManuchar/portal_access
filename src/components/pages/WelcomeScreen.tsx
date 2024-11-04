import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSpring, animated } from "@react-spring/web";
import { useAuth } from "../../context/AuthContext";
import { LoginCredentials } from "../../types/authtype";

const WelcomeScreen = () => {
  const { checktoken } = useAuth();
  const [loginVisible, setLoginVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  // Animaciones
  const fadeIn = useSpring({
    opacity: loginVisible ? 1 : 0,
    from: { opacity: 0 },
  });
  const scaleUp = useSpring({
    transform: loginVisible ? "scale(1)" : "scale(0.9)",
    from: { transform: "scale(0.9)" },
  });

  const handleLogin = () => {
    // Simula el inicio de sesión
    setLoginVisible(false);

    setCredentials(username, password);
    console.log("Logging in with", { username, password });
  };

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
      <Box position="absolute" width="100%" height="100%" bg="blackAlpha.300" />
      <animated.div style={fadeIn}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          color="white"
          zIndex="2"
        >
          <Heading as="h1" size="2xl" mb={4} bg="white.900">
            Bienvenido
          </Heading>
          <Text mb={6} bg="white.900">
            Accede a tu cuenta
          </Text>

          <animated.div style={scaleUp}>
            <Stack spacing={4} width="300px">
              <Input
                placeholder="Usuario"
                variant="filled"
                bg="whiteAlpha.800"
                color="black"
                onChange={(e) => setUsername(e.target.value)}
                _hover={{ bg: "whiteAlpha.900" }}
              />
              <Input
                placeholder="Contraseña"
                type="password"
                variant="filled"
                bg="whiteAlpha.800"
                color="black"
                onChange={(e) => setPassword(e.target.value)}
                _hover={{ bg: "whiteAlpha.900" }}
              />
              <Button colorScheme="teal" onClick={handleLogin}>
                Iniciar Sesión
              </Button>
            </Stack>
          </animated.div>
        </Flex>
      </animated.div>
    </Flex>
  );
};

export default WelcomeScreen;
