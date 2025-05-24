import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    precio: {
      type: String,
      required: true,
    },
    proveedor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Crear un índice compuesto único para asegurar que la combinación de sucursal y nproducto sea única
userSchema.index({ nombre: 1, proveedor: 1 }, { unique: true });

export default mongoose.model("Producto", userSchema);
