import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true
  },
  cantidadVendida: {
    type: Number,
    required: true
  },
  tipoDocumento: {
    type: String,
    enum: ["boleta", "factura"],
    required: true
  },
  rutCliente: String,
  razonSocial: String,
  giro: String,
  fechaVenta: {
    type: Date,
    default: Date.now
  }
});

export const Venta = mongoose.model("Venta", ventaSchema);
