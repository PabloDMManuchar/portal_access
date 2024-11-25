import { z } from "zod";

// Define el esquema de validación para la nueva aplicación
export const newApplicationSchema = z
  .object({
    nombre: z.string().nonempty({ message: "El nombre es requerido" }),
    descripcion: z
      .string()
      .nonempty({ message: "La descripción es requerida" }),
    url: z
      .string()
      .url({ message: "Debe ser una URL válida para la aplicacion" }),
    src: z.string().optional(),
    mostrarimagen: z.enum(["SI", "NO"]),
    icon: z.string().optional(),
    idgrupoaplicaciones: z
      .number()
      .min(1, { message: "Debe seleccionar un grupo" }),
    type: z.enum(["public", "powerBiA", "powerBiB", "sugest"], {
      message: "Tipo recibido invalido ",
    }),
  })
  .refine(
    (data) => {
      // Validación específica cuando `type` es "powerBiC"
      if (data.type === "powerBiA" || data.type === "powerBiB") {
        return true; // No validamos `src` en este caso
      }

      // Si mostrarimagen es "SI", `src` debe ser una URL válida y `icon` debe estar vacío
      if (data.mostrarimagen === "SI") {
        return (
          data.src &&
          z.string().url().safeParse(data.src).success &&
          data.icon === ""
        );
      }

      // Si mostrarimagen es "NO", `icon` debe ser distinto de "" y `src` debe estar vacío
      if (data.mostrarimagen === "NO") {
        return data.icon !== "" && data.src === "";
      }

      return false; // Para cubrir casos inesperados
    },
    {
      message:
        "Si seleccionas mostrar imagen, la URL de la imagen debe ser válida y no se debe seleccionar ícono. Si optas por ícono, debes seleccionar uno y no proveer una URL de imagen.",
      path: ["icon", "src"], // Aplica la validación a ambos campos
    }
  );

export const newApplicationPrivateSchema = z
  .object({
    nombre: z.string().min(1, "El nombre de la aplicación es requerido"),
    descripcion: z
      .string()
      .min(1, "La descripción de la aplicación es requerida"),
    url: z.string().url("La URL de la aplicación no es válida"),
    src: z.string().optional(), // Hacer que `src` sea opcional por defecto
    mostrarimagen: z.enum(["SI", "NO"]),
    icon: z.string().optional(), // Puede ser opcional, pero se validará según mostrarimagen
    type: z.enum(["private", "powerBiC"]), // Incluye el nuevo tipo
  })
  .refine(
    (data) => {
      // Validación específica cuando `type` es "powerBiC"
      if (data.type === "powerBiC") {
        return true; // No validamos `src` en este caso
      }

      // Si mostrarimagen es "SI", `src` debe ser una URL válida y `icon` debe estar vacío
      if (data.mostrarimagen === "SI") {
        return (
          data.src &&
          z.string().url().safeParse(data.src).success &&
          data.icon === ""
        );
      }

      // Si mostrarimagen es "NO", `icon` debe ser distinto de "" y `src` debe estar vacío
      if (data.mostrarimagen === "NO") {
        return data.icon !== "" && data.src === "";
      }

      return false; // Para cubrir casos inesperados
    },
    {
      message:
        "Si seleccionas mostrar imagen, la URL de la imagen debe ser válida y no se debe seleccionar ícono. Si optas por ícono, debes seleccionar uno y no proveer una URL de imagen.",
      path: ["icon", "src"], // Aplica la validación a ambos campos
    }
  );
