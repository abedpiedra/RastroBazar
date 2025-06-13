import mongoose from "mongoose";

const alertaStockSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  umbral_stock: { type: Number, required: true },
  frecuencia_alerta: { type: String, enum: ['diaria', 'semanal', 'mensual'], required: true },
  ultima_alerta_generada: Date,
}, { timestamps: true });

export default mongoose.model("AlertaStock", alertaStockSchema);
