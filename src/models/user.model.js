import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Nombre de usuario único y sin espacios al inicio o final
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // Correo electrónico único y sin espacios al inicio o final
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // Rol del usuario (ejemplo: admin, user, etc.)
    rol: {
      type: String,
      required: true,
    },
    // Contraseña cifrada del usuario
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Agrega automáticamente campos createdAt y updatedAt
    timestamps: true,
  }
);

// Exporta el modelo User para la colección 'users'
export default mongoose.model("User", userSchema);
