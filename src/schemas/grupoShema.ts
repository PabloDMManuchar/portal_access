import { z } from "zod";

export const newGrupoSchema = z.object({
  grupo: z.string().min(1, "El nombre del grupo es requerido"),
  descripcion: z.string().min(1, "La descripcion del grupo es requerida"),
});
