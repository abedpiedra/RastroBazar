import { z } from "zod";

export const productoSchema = z.object({
  nombre: z.string({
    required_error: "name is required",
  }),
  descripcion: z.string({
    required_error: "description is required",
  }),
  stock: z.string({
    required_error: "stock is required",
  }),
  precio: z.string({
    required_error: "precio is required",
  }),
  proveedor: z.string({
    required_error: "proveedor is required",
  }),
});
