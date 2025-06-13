import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Venta } from "../models/ventas.model.js";
import Producto from "../models/products.model.js";
import { getNextSequence } from "../helper/counterHelper.js";

// Obtener el directorio actual correctamente (para ESModules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const crearVenta = async (req, res) => {
  try {
    const { productosVendidos, tipoDocumento, rutCliente, razonSocial, giro } = req.body;

    if (!productosVendidos || productosVendidos.length === 0) {
      return res.status(400).json({ message: "Debe agregar al menos un producto" });
    }

    // Validar stock de productos
    for (const item of productosVendidos) {
      const producto = await Producto.findById(item.productoId);
      if (!producto)
        return res.status(404).json({ message: `Producto ${item.productoId} no encontrado` });
      if (producto.stock < item.cantidadVendida) {
        return res.status(400).json({ message: `Stock insuficiente para el producto ${producto.nombre}` });
      }
    }

    const nuevoNumeroVenta = await getNextSequence("venta");

    // Crear nueva venta
    const nuevaVenta = new Venta({
      productosVendidos,
      tipoDocumento,
      rutCliente,
      razonSocial,
      giro,
      nventa: nuevoNumeroVenta,
    });

    await nuevaVenta.save();

    // Descontar stock de los productos vendidos
    for (const item of productosVendidos) {
      const producto = await Producto.findById(item.productoId);
      producto.stock -= item.cantidadVendida;
      await producto.save();
    }

    // --- Generación del PDF ---
    const pdfPath = path.join(__dirname, "..", "pdfs", "ventas");
    if (!fs.existsSync(pdfPath)) {
      fs.mkdirSync(pdfPath, { recursive: true });
    }

    const pdfFilename = `venta_${nuevaVenta.nventa}.pdf`;
    const pdfFullPath = path.join(pdfPath, pdfFilename);

    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(fs.createWriteStream(pdfFullPath));

    // Título
    doc.fontSize(20).text(`Venta Nº ${nuevoNumeroVenta}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Tipo Documento: ${tipoDocumento}`);
    if (tipoDocumento === "factura") {
      doc.text(`RUT Cliente: ${rutCliente}`);
      doc.text(`Razón Social: ${razonSocial}`);
      doc.text(`Giro: ${giro}`);
    }
    doc.text(`Fecha: ${nuevaVenta.fechaVenta.toLocaleString()}`);
    doc.moveDown();

    // Tabla productos vendidos con bordes
    const startX = 30;
    let startY = doc.y;
    const rowHeight = 25;

    const colWidths = {
      producto: 200,
      cantidad: 80,
      precioUnitario: 100,
      total: 100,
    };

    function drawCell(x, y, width, height) {
      doc.rect(x, y, width, height).stroke();
    }

    // Cabecera tabla
    doc.fontSize(12).font("Helvetica-Bold");
    doc.text("Producto", startX + 5, startY + 7, { width: colWidths.producto - 10, align: "left" });
    doc.text("Cantidad", startX + colWidths.producto + 5, startY + 7, { width: colWidths.cantidad - 10, align: "right" });
    doc.text("Precio Unitario", startX + colWidths.producto + colWidths.cantidad + 5, startY + 7, { width: colWidths.precioUnitario - 10, align: "right" });
    doc.text("Total", startX + colWidths.producto + colWidths.cantidad + colWidths.precioUnitario + 5, startY + 7, { width: colWidths.total - 10, align: "right" });

    drawCell(startX, startY, colWidths.producto, rowHeight);
    drawCell(startX + colWidths.producto, startY, colWidths.cantidad, rowHeight);
    drawCell(startX + colWidths.producto + colWidths.cantidad, startY, colWidths.precioUnitario, rowHeight);
    drawCell(startX + colWidths.producto + colWidths.cantidad + colWidths.precioUnitario, startY, colWidths.total, rowHeight);

    doc.font("Helvetica").fontSize(12);
    startY += rowHeight;

    let totalVenta = 0;

    for (const item of productosVendidos) {
      const producto = await Producto.findById(item.productoId);
      const precioUnit = producto.precio;
      const total = precioUnit * item.cantidadVendida;
      totalVenta += total;

      doc.text(producto.nombre, startX + 5, startY + 7, { width: colWidths.producto - 10, align: "left" });
      doc.text(item.cantidadVendida.toString(), startX + colWidths.producto + 5, startY + 7, { width: colWidths.cantidad - 10, align: "right" });
      doc.text(`$${precioUnit.toFixed(2)}`, startX + colWidths.producto + colWidths.cantidad + 5, startY + 7, { width: colWidths.precioUnitario - 10, align: "right" });
      doc.text(`$${total.toFixed(2)}`, startX + colWidths.producto + colWidths.cantidad + colWidths.precioUnitario + 5, startY + 7, { width: colWidths.total - 10, align: "right" });

      drawCell(startX, startY, colWidths.producto, rowHeight);
      drawCell(startX + colWidths.producto, startY, colWidths.cantidad, rowHeight);
      drawCell(startX + colWidths.producto + colWidths.cantidad, startY, colWidths.precioUnitario, rowHeight);
      drawCell(startX + colWidths.producto + colWidths.cantidad + colWidths.precioUnitario, startY, colWidths.total, rowHeight);

      startY += rowHeight;
    }

    // Espacio antes del total
    startY += 10;

    // Total venta
    const totalX = startX + colWidths.producto + colWidths.cantidad + colWidths.precioUnitario;
    const totalWidth = colWidths.total;
    const totalHeight = 50;

    drawCell(totalX, startY, totalWidth, totalHeight);

    doc.font("Helvetica-Bold").fontSize(14);
    doc.text(`Total Venta: $${totalVenta.toFixed(2)}`, totalX + 5, startY + 8, {
      width: totalWidth - 10,
      align: "right",
    });

    doc.end();

    // Guardar el nombre del PDF en la venta
    nuevaVenta.pdfFile = pdfFilename;
    await nuevaVenta.save();

    res.json({ venta: nuevaVenta, pdfFile: pdfFilename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().sort({ nventa: -1 }).lean();

    // Enriquecer productos con nombre y precio unitario
    for (let venta of ventas) {
      for (let producto of venta.productosVendidos) {
        const prod = await Producto.findById(producto.productoId).lean();
        producto.nombre = prod?.nombre || "Producto eliminado";
        producto.precioUnitario = prod?.precio || 0;
      }
    }

    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
};
