import { z } from "zod";

export const newAreaSchema = z.object({
  area: z.string().min(1, "El nombre del area es requerido"),
});
