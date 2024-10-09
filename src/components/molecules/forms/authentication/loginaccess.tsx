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
import { LoginCredentials, LoginResponse } from "../../../../types/auth";
import { useAuth } from "../../../../context/AuthContext";
interface LoginProps {
  onClose: () => void;
}

const Loginaccess: React.FC<LoginProps> = ({ onClose }) => {
  const { login } = useAuth();

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
      login(credentials); // Llamada a la API
      onClose();
    } catch (error) {
      console.error("Login Failed:", error);
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
