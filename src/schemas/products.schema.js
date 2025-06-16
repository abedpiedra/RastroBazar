import { z } from "zod";

// Esquema de validación para un producto
export const productoSchema = z.object({
  // 'proveedor' debe ser una cadena (string) y es obligatorio
  proveedor: z.string({
    required_error: "proveedor is required",
  }),
  // 'nombre' debe ser una cadena (string) y es obligatorio
  nombre: z.string({
    required_error: "name is required",
  }),
  // 'descripcion' debe ser una cadena (string) y es obligatorio
  descripcion: z.string({
    required_error: "description is required",
  }),
  // 'stock' debe ser una cadena (string) y es obligatorio
  // Nota: si 'stock' debería ser un número, este debe corregirse a z.number()
  stock: z.string({
    required_error: "stock is required",
  }),
  // 'precio' debe ser una cadena (string) y es obligatorio
  // Nota: si 'precio' debería ser un número, este debe corregirse a z.number()
  precio: z.string({
    required_error: "precio is required",
  }),
  // 'umbral' es un número opcional
  umbral: z.number().optional(),
});
