import mongoose from "mongoose";

const notificacionSchema = new mongoose.Schema(
  {
    // Contenido del mensaje de la notificación
    mensaje: {
      type: String,
      required: true,
    },

    // Estado que indica si la notificación fue leída o no
    leida: {
      type: Boolean,
      default: false,
    },
  },
  // Agrega automáticamente campos createdAt y updatedAt
  {
    timestamps: true,
  }
);

// Modelo para almacenar notificaciones en la base de datos
export default mongoose.model("Notificacion", notificacionSchema);
