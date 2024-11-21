import { useState, useEffect } from "react";
import {
  Box,
  FormLabel,
  Input,
  Button,
  Select,
  Flex,
  RadioGroup,
  Stack,
  Radio,
  Divider,
  Text,
} from "@chakra-ui/react";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { NewAplicacion, Grupo } from "../../../../types/apptype";
import { services } from "../../../../services/index";
import React from "react";
import { toast } from "sonner";

const NewAplicationForm: React.FC = () => {
  // Tipar el estado con la interfaz FormData
  const initData = {
    nombre: "",
    descripcion: "",
    mostrarimagen: "SI",
    url: "",
    icon: "",
    src: "",
    idgrupoaplicaciones: 0,
    type: "public",
  };

  const [formData, setFormData] = useState<NewAplicacion>(initData);

  const [grupos, setGrupos] = useState<Grupo[]>([]);

  // Cargar los grupos desde la API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data: Grupo[] = await services.applications.AllEnabledGroupApp();
        setGrupos(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el cambio del radio button
  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  // Manejar el envío del formulario
  const handleAdd = async () => {
    try {
      await services.applications.CreateApplication(formData);
      toast.success("Aplicación creada con éxito");
      setFormData(initData);
      return;
    } catch (error) {
      toast.error("Error creating application");
      console.error("Error creating application:", error);
    }
  };


  return (
    <Box borderWidth="1px" borderRadius="lg" p="6" maxW="sm" color={"gray.200"}>
      <Text textAlign={"center"}>Datos del acceso</Text>
      <FormLabel fontSize={12} mt={4}>
        Nombre
      </FormLabel>
      <Input name="nombre" value={formData.nombre} onChange={handleChange} />

      <FormLabel fontSize={12} mt={4}>
        Descripcion
      </FormLabel>
      <Input
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <FormLabel fontSize={12} mt={4}>
        URL Imagen
      </FormLabel>
      <Input name="src" value={formData.src} onChange={handleChange} />

      <FormLabel fontSize={12} mt={4}>
        URL
      </FormLabel>
      <Input name="url" value={formData.url} onChange={handleChange} />

      <FormLabel fontSize={12} mt={4}>
        Grupo
      </FormLabel>
      <Flex alignItems="center">
        {/* Select para los grupos */}
        <Select
          name="idgrupoaplicaciones"
          value={formData.idgrupoaplicaciones}
          onChange={handleChange}
          placeholder="Selecciona un grupo"
        >
          {grupos.map((grupo) => (
            <option
              key={grupo.idgrupoaplicaciones}
              value={grupo.idgrupoaplicaciones}
            >
              {grupo.grupo}
            </option>
          ))}
        </Select>

        {/* Botón para agregar un nuevo grupo */}
        {/* <Button
          ml={4}
          onClick={handleAddGroup}
          colorScheme="teal"
          leftIcon={<FaPlus />}
        >
          Add Grupo
        </Button> */}
      </Flex>
      <Text mt={4} textAlign={"center"}>
        Seccion de Links
      </Text>
      <RadioGroup name="type" value={formData.type} onChange={handleTypeChange}>
        <Stack color={"gray.200"}>
          <Radio value="public">Mis accesos</Radio>
          {/* <Radio value="private">Mis accesos - Privados</Radio> */}
          <Radio value="powerbiA">Mis BI - Corporativos</Radio>
          <Radio value="powerbiB">Mis BI - Areas</Radio>
          <Radio value="powerbiC">Mis BI - Privados</Radio>
        </Stack>
      </RadioGroup>

      <Button
        isDisabled={!formData.nombre || !formData.descripcion || !formData.url}
        onClick={handleAdd}
        mt="4"
        colorScheme="teal"
        w={"100%"}
        leftIcon={<FaCheckCircle />}
      >
        CREAR ACCESO
      </Button>
    </Box>
  );
};

export default NewAplicationForm;
