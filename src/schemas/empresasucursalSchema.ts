import { z } from "zod";

export const newEmpresaSucursalSchema = z.object({
  empresa: z.string().min(1, "El nombre de la empresa es requerido"),
  sucursal: z.string().min(1, "El nombre de la sucursal es requerido"),
});
