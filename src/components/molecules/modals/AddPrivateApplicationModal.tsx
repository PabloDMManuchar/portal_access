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
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para controlar la apertura/cierre del modal

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
  const [filter, setFilter] = useState("");

  const iscompleted =
    formData.nombre && formData.descripcion && formData.url ? false : true;

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

  const filteredIcons = iconList.filter(({ name }) => name.includes(filter));

  return (
    <>
      {/* Botón para abrir el modal */}
      {/* <Tooltip label="* Agregar Aplicacion"> */}
      <Button
        _hover={{ bg: "gray.100", color: "gray.800" }}
        color={"gray.100"}
        leftIcon={<FaPlusCircle color="blue" />}
        mr={4}
        onClick={() => {
          onOpen();
        }}
        variant={"outline"}
        w={"100%"}
      >
        Agregar nueva aplicación
      </Button>
      {/* </Tooltip> */}

      {/* Modal de Chakra UI */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"gray.600"}
          borderColor={"gray.500"}
          borderRadius="md"
          borderWidth={"2px"}
          p={4}
          color="gray.200"
        >
          <ModalHeader>Nueva Aplicacion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Formulario dentro del modal */}

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
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={4}
            >
              <RadioGroup
                name="mostrarimagen"
                value={formData.mostrarimagen}
                onChange={handleMostrarImagenChange}
              >
                <Stack direction="row">
                  <Radio value="SI">Imagen URL</Radio>
                  <Radio value="NO">Icon</Radio>
                </Stack>
              </RadioGroup>
              {selectedIcon && (
                <Input
                  mx={4}
                  w={"80%"}
                  type="text"
                  placeholder="Filtrar en ingles"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              )}
            </Box>

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
                {showIconList ? (
                  <Box maxH="200px" overflowY="auto">
                    <SimpleGrid columns={5} spacing={4}>
                      {filteredIcons.map(({ name, icon: IconComponent }) => (
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
                  </Box>
                ) : (
                  <>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Box display={"flex"}>
                        <Text>Icon seleccionado:</Text>
                        <Text fontSize={"2rem"} textAlign={"center"}>
                          {selectedIcon &&
                            React.createElement(Icons[selectedIcon])}
                        </Text>
                      </Box>
                      <Button
                        onClick={() => setShowIconList(true)}
                        mt="2"
                        colorScheme="gray.200"
                        _hover={{ bg: "gray.100", color: "gray.800" }}
                      >
                        CAMBIAR ICON
                      </Button>
                    </Box>
                  </>
                )}
              </>
            )}
            {/* 
            <Button
              onClick={handleAdd}
              colorScheme="teal"
              leftIcon={<FaCheckCircle />}
            >
              Agregar Aplicación
            </Button> */}
          </ModalBody>
          <Button
            isDisabled={iscompleted}
            colorScheme="orange"
            w={"90%"}
            mt={"2rem"}
            mx={"auto"}
            onClick={handleAdd}
            leftIcon={<FaCheckCircle />}
          >
            AGREGAR APLICACION
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPrivateApplicationModal;
