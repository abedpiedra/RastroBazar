// Importamos mongoose para definir 
// el esquema del modelo de productos
import mongoose from "mongoose";

// Definimos el esquema de la 
// colección de productos
const productoSchema = new mongoose.Schema(
  {
    // Proveedor del producto
    proveedor: {
      type: String,
      required: true,
    },
    // Nombre del producto
    nombre: {
      type: String,
      required: true,
    },
    // Descripción del producto (opcional)
    descripcion: {
      type: String,
    },
    // Cantidad en stock disponible
    stock: {
      type: Number,
      required: true,
    },
    // Precio unitario del producto
    precio: {
      type: Number,
      required: true,
    },
    // Umbral mínimo de stock para generar alertas
    umbral: {
      type: Number,
      default: 10,
    },
  },
  {
    // Agrega automáticamente campos `createdAt` y `updatedAt`
    timestamps: true,
  }
);

// Índice compuesto para evitar duplicados
// en combinación de nombre y proveedor
productoSchema.index({ nombre: 1, proveedor: 1 }, { unique: true });

// Exportamos el modelo Producto para la colección 'productos'
export default mongoose.model("Producto", productoSchema);
