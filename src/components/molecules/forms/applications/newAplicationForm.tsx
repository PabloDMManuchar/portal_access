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
} from "@chakra-ui/react";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { NewAplicacion, Grupo } from "../../../../types/apptype";
import { services } from "../../../../services/index";
import React from "react";

const NewAplicationForm: React.FC = () => {
  // Tipar el estado con la interfaz FormData
  const [formData, setFormData] = useState<NewAplicacion>({
    nombre: "",
    descripcion: "",
    url: "",
    src: "",
    idgrupoaplicaciones: 0, // Inicialmente sin grupo seleccionado
    type: "public", // Default value for the new "type" field
  });

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
  const handleAdd = () => {
    setFormData(formData); // Aquí puedes llamar a una API o manejar la lógica para agregar la nueva aplicación
  };

  // Manejar la adición de un nuevo grupo
  const handleAddGroup = () => {
    // Implementar la lógica para agregar un nuevo grupo (quizá abrir un modal)
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="6" maxW="sm">
      <FormLabel>Nombre</FormLabel>
      <Input name="nombre" value={formData.nombre} onChange={handleChange} />

      <FormLabel>Descripcion</FormLabel>
      <Input
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <FormLabel>URL Imagen</FormLabel>
      <Input name="src" value={formData.src} onChange={handleChange} />

      <FormLabel>URL</FormLabel>
      <Input name="url" value={formData.url} onChange={handleChange} />

      <FormLabel>Grupo</FormLabel>
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
        <Button
          ml={4}
          onClick={handleAddGroup}
          colorScheme="teal"
          leftIcon={<FaPlus />}
        >
          Add Grupo
        </Button>
      </Flex>

      {/* Radio buttons para seleccionar el tipo */}
      <FormLabel mt="4">Tipo</FormLabel>
      <RadioGroup name="type" value={formData.type} onChange={handleTypeChange}>
        <Stack direction="row">
          <Radio value="public">Public</Radio>
          <Radio value="powerbi">Power BI </Radio>
        </Stack>
      </RadioGroup>

      <Button
        onClick={handleAdd}
        mt="4"
        colorScheme="teal"
        leftIcon={<FaCheckCircle />}
      >
        Agregar Aplicación
      </Button>
    </Box>
  );
};

export default NewAplicationForm;
