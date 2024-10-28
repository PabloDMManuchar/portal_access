import React, { useState } from "react";
import {
  Box,
  FormLabel,
  Input,
  Button,
  RadioGroup,
  Stack,
  Radio,
  useToast,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SimpleGrid,
  IconButton,
  Text,
} from "@chakra-ui/react";
import * as Icons from "react-icons/fa"; // Importa todos los iconos de FontAwesome
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { NewAplicacionPrivate } from "../../../types/apptype";
import { services } from "../../../services/index";
import { newApplicationPrivateSchema } from "../../../schemas/applicationSchema";

const AddPrivateApplicationModal: React.FC = () => {
  // const OverlayTwo = () => (
  //   <ModalOverlay
  //     bg="none"
  //     backdropFilter="auto"
  //     backdropInvert="80%"
  //     backdropBlur="2px"
  //   />
  // );
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para controlar la apertura/cierre del modal
  // const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const [formData, setFormData] = useState<NewAplicacionPrivate>({
    nombre: "",
    descripcion: "",
    url: "",
    mostrarimagen: "SI",
    icon: "",
    src: "",
  });

  const [isImageSelected, setIsImageSelected] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState<string>(""); // Guardar el ícono seleccionado
  const [showIconList, setShowIconList] = useState<boolean>(true); // Controlar si se muestra la lista de íconos

  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMostrarImagenChange = (value: string) => {
    setFormData({ ...formData, mostrarimagen: value });
    setIsImageSelected(value === "SI");
    if (value === "NO") {
      setShowIconList(true); // Mostrar la lista de íconos si elige 'NO'
    } else {
      setShowIconList(false); // Ocultar la lista de íconos si elige 'SI'
      setSelectedIcon(""); // Resetear el ícono seleccionado
    }
  };

  const handleAdd = async () => {
    const result = newApplicationPrivateSchema.safeParse({
      ...formData,
      //icon: selectedIcon, // Asegurarse de incluir el ícono seleccionado
      icon: isImageSelected ? "" : selectedIcon, // Si se muestra imagen, el ícono es vacío; si no, se usa el ícono seleccionado
      src: isImageSelected ? formData.src : "", // Si se selecciona imagen, usar el valor de src; si no, vacío
    });

    if (!result.success) {
      result.error.errors.forEach((error) => {
        toast({
          title: "Error en el formulario",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
      return;
    }
    const resp = await services.applications.CreateApplicationPrivate(formData);
    console.info(resp);
    // Si todo está bien, proceder con la lógica
    onClose();
    setShowIconList(true); // Resetear para que el ícono se pueda volver a elegir si es necesario
  };

  // Obtener la lista de todos los íconos disponibles de FontAwesome
  const iconList = Object.keys(Icons).map((iconName) => ({
    name: iconName,
    icon: Icons[iconName as keyof typeof Icons], // Obteniendo la referencia del ícono
  }));

  return (
    <>
      {/* Botón para abrir el modal */}
      <Tooltip label="* Agregar Aplicacion" openDelay={500}>
        <Button
          bg="white"
          color="black"
          leftIcon={<FaPlusCircle color="blue" />}
          border="1px solid" // Opcional: añadir un borde para que se vea más estilizado
          borderColor="blue.500" // Borde verde para hacer juego con el ícono
          _hover={{ bg: "gray.100" }} // Efecto hover opcional
          onClick={() => {
            // setOverlay(<OverlayTwo />);
            onOpen();
          }}
          mr={4}
        >
          Agregar nueva aplicación
        </Button>
      </Tooltip>

      {/* Modal de Chakra UI */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nueva Aplicacion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Formulario dentro del modal */}
            <Box borderWidth="1px" borderRadius="lg" p="6" pb="10">
              <FormLabel>Nombre</FormLabel>
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />

              <FormLabel>Descripción</FormLabel>
              <Input
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
              <FormLabel>URL</FormLabel>
              <Input name="url" value={formData.url} onChange={handleChange} />

              <FormLabel mt="4">¿Mostrar Imagen?</FormLabel>
              <RadioGroup
                name="mostrarimagen"
                value={formData.mostrarimagen}
                onChange={handleMostrarImagenChange}
              >
                <Stack direction="row">
                  <Radio value="SI">Sí</Radio>
                  <Radio value="NO">No</Radio>
                </Stack>
              </RadioGroup>

              {isImageSelected ? (
                <>
                  <FormLabel>URL Imagen</FormLabel>
                  <Input
                    name="src"
                    value={formData.src}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <FormLabel>Seleccionar Ícono</FormLabel>
                  {showIconList ? (
                    <SimpleGrid columns={5} spacing={4}>
                      {iconList.map(({ name, icon: IconComponent }) => (
                        <IconButton
                          key={name}
                          aria-label={name}
                          icon={<IconComponent />}
                          onClick={() => {
                            setSelectedIcon(name); // Actualiza el ícono seleccionado
                            setShowIconList(false); // Oculta la lista después de la selección
                          }}
                          colorScheme={selectedIcon === name ? "teal" : "gray"} // Cambiar color del ícono seleccionado
                        />
                      ))}
                    </SimpleGrid>
                  ) : (
                    <>
                      <Text>Ícono seleccionado: {selectedIcon}</Text>
                      <Button
                        onClick={() => setShowIconList(true)}
                        mt="2"
                        colorScheme="blue"
                      >
                        Cambiar Ícono
                      </Button>
                    </>
                  )}
                </>
              )}
            </Box>
            <Button
              onClick={handleAdd}
              colorScheme="teal"
              leftIcon={<FaCheckCircle />}
            >
              Agregar Aplicación
            </Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPrivateApplicationModal;
