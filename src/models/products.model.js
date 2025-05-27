// Importamos mongoose para definir 
// el esquema del modelo de productos
import mongoose from "mongoose";
// Definimos el esquema de la 
// colección de productos
const userSchema = new mongoose.Schema(
  {
    // Nombre del producto
    nombre: {
      type: String,
      required: true,
    },
    // Descripción del producto
    descripcion: {
      type: String,
      required: true,
    },
    // Cantidad en stock del producto
    stock: {
      type: String,
      required: true,
    },
    // Precio del producto
    precio: {
      type: String,
      required: true,
    },
    // Sucursal a la que pertenece el producto
    proveedor: {
      type: String,
      required: true,
    },
  },
  {
    // Esta opción agrega automáticamente campos `createdAt` y `updatedAt`
    timestamps: true,
  }
);
// Creamos un índice compuesto para asegurar que no se repitan productos con el mismo nombre y proveedor
userSchema.index({ nombre: 1, proveedor: 1 }, { unique: true });
// Exportamos el modelo de producto, asociado a la colección 'productos'
export default mongoose.model("Producto", userSchema);
