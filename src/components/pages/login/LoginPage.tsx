import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  Heading,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { useAuth } from "../../../context/AuthContext";
import { LoginCredentials } from "../../../types/authtype";

const LoginPage = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoginVisible(true);
    const verifyAuth = async () => {
      // console.log(isAuthenticated);

      if (isAuthenticated) {
        navigate("/access/inicio");
      } else {
        navigate("/access/login");
      }
    };

    verifyAuth();
  }, [isAuthenticated, navigate]);

  const fadeIn = useSpring({
    opacity: loginVisible ? 1 : 0,
    from: { opacity: 0 },
  });
  const scaleUp = useSpring({
    transform: loginVisible ? "scale(1)" : "scale(0.9)",
    from: { transform: "scale(0.9)" },
  });

  const footerAnimation = useSpring({
    opacity: loginVisible ? 1 : 0,
    transform: loginVisible ? "translateY(0px)" : "translateY(20px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { duration: 2000 },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!credentials.username || !credentials.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      await login(credentials);
      if (isAuthenticated) {
        setLoginVisible(false);
        navigate("/access/inicio");
      } else {
        setError("Login fallido. Verifica tus credenciales.");
        setLoginVisible(true);
      }
    } catch (error) {
      setError("Login fallido. Verifica tus credenciales.");
      setLoginVisible(true);
      console.error("Login Failed:", error);
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="flex-start"
      bgImage="url('/welcomeimg.png')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      position="relative"
      px={10}
    >
      <Box position="absolute" width="100%" height="100%" bg="blackAlpha.300" />

      <animated.div style={fadeIn}>
        <Flex
          direction="column"
          align="flex-start"
          justify="center"
          color="white"
          zIndex="2"
          width="400px"
        >
          <Box position="absolute" top="20px" left="20px" padding="10px">
            <Image
              src="/manucharlogo.png"
              alt="Logo"
              width="200px"
              height="80px"
            />
          </Box>
          <Heading as="h1" size="2xl" mb={4} bg="white.900">
            Bienvenido
          </Heading>
          <Text mb={6} bg="white.900">
            Accede a tu cuenta
          </Text>

          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              <AlertTitle mr={2}>Error:</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setError(null)}
              />
            </Alert>
          )}

          <animated.div style={scaleUp}>
            <Stack spacing={4} width="100%">
              <Input
                placeholder="Usuario"
                variant="filled"
                bg="whiteAlpha.800"
                color="black"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                _hover={{ bg: "whiteAlpha.900" }}
              />
              <Input
                placeholder="Contraseña"
                type="password"
                variant="filled"
                bg="whiteAlpha.800"
                color="black"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                _hover={{ bg: "whiteAlpha.900" }}
              />
              <Button colorScheme="teal" onClick={handleLogin}>
                Iniciar Sesión
              </Button>
            </Stack>
          </animated.div>
        </Flex>
      </animated.div>

      {/* Ajuste en el footer para asegurar posición derecha */}
      <animated.div
        style={{
          ...footerAnimation,
          position: "absolute",
          bottom: "20px",
          right: "20px", // Esta propiedad lo ubicará a la derecha
          zIndex: 3, // Asegúrate de que esté por encima de otros elementos si fuera necesario
        }}
      >
        <Image src="/Mit.png" alt="LogoIT" width="60px" height="60px" />
      </animated.div>
    </Flex>
  );
};

export default LoginPage;
