import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  RadioGroup,
  Stack,
  Radio,
  Text,
  useToast,
  Tooltip,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import * as Icons from "react-icons/fa";
import { Aplicacion } from "../../../types/apptype";
import { services } from "../../../services";
import {
  newApplicationPrivateSchema,
  newApplicationSchema,
} from "../../../schemas/applicationSchema";

interface EditApplicationModalProps {
  application: Aplicacion;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditApplicationModal: React.FC<EditApplicationModalProps> = ({
  application,
  isOpen,
  onClose,
  onSave,
}) => {
  const toast = useToast();
  const [formData, setFormData] = useState(application);
  const [isImageSelected, setIsImageSelected] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [showIconList, setShowIconList] = useState<boolean>(true);
  const [filter, setFilter] = useState("");

  const iscompleted =
    formData.nombre && formData.descripcion && formData.url ? false : true;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMostrarImagenChange = (value: string) => {
    setFormData({ ...formData, mostrarimagen: value });
    setIsImageSelected(value === "SI");
    if (value === "NO") {
      setShowIconList(true);
    } else {
      setShowIconList(false);
      setSelectedIcon("");
    }
  };

  const iconList = Object.keys(Icons).map((iconName) => ({
    name: iconName,
    icon: Icons[iconName as keyof typeof Icons],
  }));

  const filteredIcons = iconList.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSave = async () => {
    console.log(formData.type);
    if (formData.type === "private" || formData.type === "powerBiC") {
      const result = newApplicationPrivateSchema.safeParse({
        ...formData,
        icon: isImageSelected ? "" : selectedIcon,
        src: isImageSelected ? formData.src : "",
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
    } else {
      const result = newApplicationSchema.safeParse({
        ...formData,
        icon: isImageSelected ? "" : selectedIcon,
        src: isImageSelected ? formData.src : "",
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
    }

    try {
      await services.applications.UpdateApplication(formData);

      onSave();
      onClose();
      toast({
        title: "Access",
        description: "Acceso Actualizado!!!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!!!",
        description: "No se pudo guardar los cambios, intente nuevamente",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {" "}
          {formData.type === "private"
            ? "Modificar Acceso"
            : "Modificar PBI privado"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Url</FormLabel>
            <Input
              name="url"
              value={formData.url}
              onChange={handleChange}
              type="url"
            />
          </FormControl>
          {formData.type !== "powerBiC" && (
            <>
              <FormLabel mt="4">¿Mostrar Imagen?</FormLabel>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                // justifyContent={"space-between"}
                mb={4}
              >
                <RadioGroup
                  name="mostrarimagen"
                  value={formData.mostrarimagen}
                  onChange={handleMostrarImagenChange}
                >
                  <Stack direction="row">
                    <Radio value="SI" w={"7rem"}>
                      Imagen URL
                    </Radio>
                    <Radio value="NO">Icon</Radio>
                  </Stack>
                </RadioGroup>
                {showIconList && (
                  <Input
                    mx={4}
                    w={"100%"}
                    type="text"
                    placeholder="Filtrar en ingles"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                )}
              </Box>

              {isImageSelected ? (
                <>
                  {(formData.icon = "")}
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
                    <Box
                      maxH="212px"
                      overflowY="auto"
                      p={"0 1rem"}
                      css={{
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#888",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          background: "#555",
                        },
                      }}
                    >
                      <SimpleGrid columns={5} spacing={4}>
                        {filteredIcons.map(({ name, icon: IconComponent }) => (
                          <Tooltip key={name} label={name}>
                            <IconButton
                              aria-label={name}
                              icon={<IconComponent />}
                              onClick={() => {
                                setSelectedIcon(name); // Actualiza el ícono seleccionado
                                setFormData((prev) => ({
                                  ...prev,
                                  icon: name,
                                })); // Actualiza el campo `icon` en formData

                                setShowIconList(false); // Oculta la lista después de la selección
                              }}
                              colorScheme={
                                selectedIcon === name ? "teal" : "gray"
                              } // Cambiar color del ícono seleccionado
                            />
                          </Tooltip>
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
                              React.createElement((Icons as any)[selectedIcon])}
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
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancelar
          </Button>
          <Button
            isDisabled={iscompleted}
            colorScheme="blue"
            onClick={handleSave}
          >
            Guardar Cambios
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditApplicationModal;
