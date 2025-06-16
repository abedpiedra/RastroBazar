import { z } from "zod";

// Definición del esquema de validación para una alerta de stock
export const alertaSchema = z.object({
  // El campo 'producto' debe ser una cadena (string) y es obligatorio
  producto: z.string({
    required_error: "Producto es requerido",
  }),
  // El campo 'umbral_stock' debe ser un número y es obligatorio
  umbral_stock: z.number({
    required_error: "Umbral es requerido",
  }),
  // El campo 'frecuencia_alerta' debe ser uno de los valores especificados en el enum y es obligatorio
  frecuencia_alerta: z.enum(["diaria", "semanal", "mensual"], {
    required_error: "Frecuencia requerida",
  }),
});
