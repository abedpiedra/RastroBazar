import mongoose from "mongoose";

const productoVendidoSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  cantidadVendida: {
    type: Number,
    required: true,
  },
});

const ventaSchema = new mongoose.Schema({
  productosVendidos: [productoVendidoSchema],
  tipoDocumento: {
    type: String,
    enum: ["boleta", "factura"],
    required: true,
  },
  rutCliente: String,
  razonSocial: String,
  giro: String,
  fechaVenta: {
    type: Date,
    default: Date.now,
  },
  nventa: {
    type: Number,
    required: true,
  },
  pdfFile: {
    type: String,
  },
});

export const Venta = mongoose.model("Venta", ventaSchema);
