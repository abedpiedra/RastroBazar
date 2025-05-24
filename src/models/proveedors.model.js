import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre_empresa: {
      type: String,
      required: true,
      unique: true,
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Proveedor", userSchema);
