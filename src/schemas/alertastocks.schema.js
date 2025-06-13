import { z } from "zod";

export const alertaSchema = z.object({
  producto: z.string({ required_error: "Producto es requerido" }),
  umbral_stock: z.number({ required_error: "Umbral es requerido" }),
  frecuencia_alerta: z.enum(["diaria", "semanal", "mensual"], {
    required_error: "Frecuencia requerida"
  }),
});
