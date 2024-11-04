// src/components/LoginForm.tsx
import React, { useState } from "react";
import {
  Icon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { LoginCredentials } from "../../../../types/authtype";
import { useAuth } from "../../../../context/AuthContext";
import CheckIcon from "../../../atoms/icons/CheckIcon";

interface LoginProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onClose }) => {
  const { login } = useAuth();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Resetear el error antes de la validación

    // Validaciones simples
    if (!credentials.username || !credentials.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      await login(credentials); // Llamada a la API
      onClose();
    } catch (error) {
      setError("Login fallido. Verifica tus credenciales."); // Manejo de errores
      console.error("Login Failed:", error);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      bg="whitesmoke"
      shadow="lg"
    >
      <Heading textAlign="center" mb={6}>
        Login
      </Heading>

      {/* Mostrar alerta si hay un error */}
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

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
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

          <Button
            type="submit"
            variant="solid"
            colorScheme="blue"
            leftIcon={<Icon as={CheckIcon} boxSize={6} />}
            size="lg"
            mt={4}
          >
            Login
          </Button>
        </Stack>
      </form>

      <Text textAlign="center" mt={6}>
        ¿No tienes un usuario? Contacta a IT.
      </Text>
    </Box>
  );
};

export default LoginForm;
