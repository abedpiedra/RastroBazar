import mongoose from "mongoose";

// Subesquema para los productos vendidos en una venta
const productoVendidoSchema = new mongoose.Schema({
  // Referencia al producto vendido (ID de la colección Producto)
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto",
    required: true,
  },
  // Cantidad vendida de ese producto
  cantidadVendida: {
    type: Number,
    required: true,
  },
});

// Esquema principal para una venta
const ventaSchema = new mongoose.Schema({
  // Lista de productos vendidos en la venta
  productosVendidos: [productoVendidoSchema],
  // Tipo de documento que respalda la venta (boleta o factura)
  tipoDocumento: {
    type: String,
    enum: ["boleta", "factura"],
    required: true,
  },
  // RUT del cliente (opcional)
  rutCliente: String,
  // Razón social del cliente (opcional)
  razonSocial: String,
  // Giro del cliente (opcional)
  giro: String,
  // Fecha en que se realizó la venta, por defecto fecha actual
  fechaVenta: {
    type: Date,
    default: Date.now,
  },
  // Número único de la venta, requerido
  nventa: {
    type: Number,
    required: true,
  },
  // Ruta o nombre del archivo PDF generado de la venta (opcional)
  pdfFile: {
    type: String,
  },
});

// Exportamos el modelo Venta para manejar la colección 'ventas'
export const Venta = mongoose.model("Venta", ventaSchema);
