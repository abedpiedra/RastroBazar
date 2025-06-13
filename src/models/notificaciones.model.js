import mongoose from "mongoose";

const notificacionSchema = new mongoose.Schema({
  mensaje: { type: String, required: true },
  leida: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Notificacion", notificacionSchema);
