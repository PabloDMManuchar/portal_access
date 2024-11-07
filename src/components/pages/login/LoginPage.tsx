import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LoginPage = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    setLoginVisible(true);
    const verifyAuth = async () => {
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
    config: { duration: 1000 },
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

  const isDisabled = !credentials.username || !credentials.password;

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="flex-start"
      bgImage="url('/welcomeimg2.png')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      position="relative"
    >
      <Box
        opacity={0.4}
        position="absolute"
        top="20px"
        left="20px"
        padding="10px"
      >
        <Image src="/manucharlogo.png" alt="Logo" width="200px" height="40px" />
      </Box>
      <animated.div style={{ ...fadeIn, width: "50%", display:'flex', justifyContent:'center' }}>
        <Flex
          maxW={"18rem"}
          minW={"18rem"}
          w={"full"}
          direction="column"
          justify="center"
          color="white"
          // p={4}
        >
          <Text
            fontSize={"36px"}
            mb={4}
            bg="white.900"
            textShadow="0px 0px 24px rgba(8, 182, 212, 0.781)"
            color="white"
            textAlign={"center"}
          >
            <strong>PORTAL</strong> ACCESS
          </Text>

          <Text mb={6} textAlign={"center"}>
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

          <animated.div>
            <Stack spacing={4} width="100%">
              <Input
                placeholder="Usuario"
                variant="filled"
                bg="whiteAlpha.200"
                color="gray.200"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                _hover={{
                  bg: "gray.800",
                  boxShadow: "0px 0px 14px rgba(60, 217, 245, 0.404)",
                }}
              />
              <Flex >
                <Input
                  placeholder="Contraseña"
                  type={showPassword ? "password" : "text"}
                  variant="filled"
                  bg="whiteAlpha.200"
                  color="gray.200"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  _hover={{
                    bg: "gray.800",
                    boxShadow: "0px 0px 14px rgba(60, 217, 245, 0.404)",
                  }}
                />
                  <Button
                    colorScheme="white"
                    // position={"relative"}
                    // right={0}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
              </Flex>
              
              <Button
                isDisabled={isDisabled}
                colorScheme="red"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </Button>
            </Stack>
          </animated.div>
        </Flex>
      </animated.div>

      <animated.div
        style={{
          ...footerAnimation,
          position: "absolute",
          bottom: "20px",
          left: "20px",
          opacity: 0.4,
          // zIndex: 3,
        }}
      >
        <Image src="/Mit.png" alt="LogoIT" width="60px" height="45px" />
      </animated.div>
    </Flex>
  );
};

export default LoginPage;
