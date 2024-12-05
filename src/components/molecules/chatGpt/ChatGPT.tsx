import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Button,
  VStack,
  Text,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { VscSend } from "react-icons/vsc";

const API = `${import.meta.env.VITE_API_ACCESS}/chat/new`;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hola, soy el Chat IA de Manuchar powered by GPT-4o. ¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isServerAvailable, setIsServerAvailable] = useState(true); // Estado para la disponibilidad del servidor
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isInputEmpty = input.trim() === "";

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data?.choices?.[0]?.message?.content) {
        setMessages([
          ...newMessages,
          { sender: "bot", text: data.choices[0].message.content },
        ]);
        setIsServerAvailable(true); // Restablecer el estado de disponibilidad del servidor
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setIsServerAvailable(false); // Indicar que el servidor no está disponible

      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Error al comunicar con el servidor. Intenta de nuevo más tarde.",
        },
      ]);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  }, [input]); // Run effect when `input` changes

  return (
    <Flex
      direction="column"
      bg="rgba(26, 32, 44, 0.8)" // gray.900 with transparency
      p={4}
      rounded="md"
      boxShadow="lg"
      // w="32rem"
      mx="auto"
      h="66vh"
      // minW={"18rem"}
      // maxH={"90%"}
      fontSize={"12px"}
    >
      <VStack
        spacing={4}
        overflowY="auto"
        p={4}
        rounded="md"
        h="70vh"
        mb={4}
        zIndex={10}
        flexDirection="column-reverse"
      >
        {messages
          .slice()
          .reverse()
          .map((msg, index) => (
            <Box
              key={index}
              alignSelf={msg.sender === "bot" ? "flex-start" : "flex-end"}
              bg={
                msg.sender === "bot"
                  ? "rgba(49, 130, 206, 0.8)"
                  : "rgba(72, 187, 120, 0.8)"
              } // blue.600 and green.500 with transparency
              color="white"
              px={4}
              py={2}
              rounded="md"
            >
              <Text>{msg.text}</Text>
            </Box>
          ))}
      </VStack>
      <Flex direction="column">
        {!isServerAvailable && (
          <Alert status="error" mb={2}>
            <AlertIcon />
            No se puede conectar con el servidor. Intenta de nuevo más tarde.
          </Alert>
        )}
        <Textarea
          placeholder="Escribe para iniciar una comversación con chatgpt..."
          bg="rgba(45, 55, 72, 0.8)" // gray.800 with transparency
          color="white"
          mb={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          resize="none"
          minHeight="2rem"
          ref={textareaRef} // Attach ref here
          overflow="hidden" // Hide scrollbars
          fontSize={"12px"}
        />
        <Button
          colorScheme="blue"
          onClick={sendMessage}
          isDisabled={isInputEmpty}
          rightIcon={<VscSend />}
          size="sm"
        >
          ENVIAR
        </Button>
      </Flex>
    </Flex>
  );
};

export default Chat;
