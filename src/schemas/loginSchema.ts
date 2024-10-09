import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
});

// Definimos el tipo a partir del esquema Zod
export type LoginFormData = z.infer<typeof loginSchema>;
