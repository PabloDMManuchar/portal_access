import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Button, VStack, Text, Textarea, Alert, AlertIcon } from "@chakra-ui/react";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hola! En qué te puedo ayudar hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [isServerAvailable, setIsServerAvailable] = useState(true); // Estado para la disponibilidad del servidor
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/chat/new", {
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
      textareaRef.current.style.height = 'auto'; // Reset height to auto
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on content
    }
  }, [input]); // Run effect when `input` changes

  return (
    <Flex
      direction="column"
      bg="gray.800"
      p={4}
      // mt={20}
      rounded="md"
      boxShadow="lg"
      w="28rem"
      mx="auto"
      h="74vh"
      minW={'20rem'}
      maxH={'90%'}
      // justifyContent="space-between"
      zIndex={1}
    >
      <VStack
        spacing={4}
        overflowY="auto"
        p={4}
        bg="gray.700"
        rounded="md"
        h="70vh"
        mb={4}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            alignSelf={msg.sender === 'bot' ? 'flex-start' : 'flex-end'}
            bg={msg.sender === 'bot' ? 'blue.600' : 'green.500'}
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
          placeholder="Escribe lo que quieras..."
          bg="gray.600"
          color="white"
          mb={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          resize="none"
          minHeight="2rem"
          ref={textareaRef} // Attach ref here
          overflow="hidden" // Hide scrollbars
        />
        <Button
          colorScheme="blue"
          onClick={sendMessage}
          isDisabled={!isServerAvailable} // Deshabilitar el botón si el servidor no está disponible
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default Chat;
