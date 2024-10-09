// src/components/LoginForm.tsx
import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { users } from "../../../../services/users/users"; // Importamos la función de la API
import { LoginCredentials, LoginResponse } from "../../../../types/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useAuth } from "../../../../context/AuthContext";
interface LoginProps {
  enviarDatosALogin: (dato: string) => void;
  onClose: () => void;
}

const Loginaccess: React.FC<LoginProps> = ({ enviarDatosALogin, onClose }) => {
  const { login, logout, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: LoginResponse = login(credentials); // Llamada a la API
      //const accessToken = response.token;
      //Cookies.set("Token", accessToken, { expires: 7 });

      enviarDatosALogin("Login Success:");
      console.log("OK", response.mensaje);
      onClose();
    } catch (error) {
      console.error("Login Failed:", error);
      enviarDatosALogin("ERR");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg">
      <Heading textAlign="center" mb={6}>
        Login
      </Heading>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" mt={4}>
            Login
          </Button>
        </Stack>
      </form>

      <Text textAlign="center" mt={6}>
        ¿No tienes una cuenta? Regístrate.
      </Text>
    </Box>
  );
};

export default Loginaccess;
