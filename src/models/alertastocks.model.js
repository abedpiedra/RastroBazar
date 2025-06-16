import mongoose from "mongoose";

const alertaStockSchema = new mongoose.Schema(
  {
    // Referencia al producto asociado a esta alerta
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    // Umbral mínimo de stock para activar la alerta
    umbral_stock: {
      type: Number,
      required: true,
    },
    // Frecuencia con la que se debe enviar la alerta: diaria, semanal o mensual
    frecuencia_alerta: {
      type: String,
      enum: ["diaria", "semanal", "mensual"],
      required: true,
    },
    // Fecha en que se generó la última alerta para evitar repeticiones innecesarias
    ultima_alerta_generada: Date,
  },
  // Agrega timestamps automáticos (createdAt, updatedAt)
  { timestamps: true }
);

export default mongoose.model("AlertaStock", alertaStockSchema);
