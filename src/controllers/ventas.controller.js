import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Venta } from "../models/ventas.model.js";
import Producto from "../models/products.model.js";
import { getNextSequence } from "../helper/counterHelper.js";

// Obtener ruta actual (para ESModules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear nueva venta y generar PDF
export const crearVenta = async (req, res) => {
  try {
    const { productosVendidos, tipoDocumento, rutCliente, razonSocial, giro } =
      req.body;

    if (!productosVendidos || productosVendidos.length === 0) {
      return res
        .status(400)
        .json({ message: "Debe agregar al menos un producto" });
    }

    // Validar existencia y stock de productos
    for (const item of productosVendidos) {
      const producto = await Producto.findById(item.productoId);
      if (!producto)
        return res
          .status(404)
          .json({
            message: `Producto con ID ${item.productoId} no encontrado`,
          });
      if (producto.stock < item.cantidadVendida)
        return res
          .status(400)
          .json({
            message: `Stock insuficiente para el producto ${producto.nombre}`,
          });
    }

    // Obtener nuevo número de venta
    const nuevoNumeroVenta = await getNextSequence("venta");

    // Crear objeto de venta
    const nuevaVenta = new Venta({
      productosVendidos,
      tipoDocumento,
      rutCliente,
      razonSocial,
      giro,
      nventa: nuevoNumeroVenta,
    });

    await nuevaVenta.save();

    // Descontar stock de cada producto vendido
    for (const item of productosVendidos) {
      const producto = await Producto.findById(item.productoId);
      producto.stock -= item.cantidadVendida;
      await producto.save();
    }

    // Crear carpeta si no existe
    const pdfDir = path.join(__dirname, "..", "pdfs", "ventas");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

    // Configurar PDF
    const pdfFilename = `venta_${nuevaVenta.nventa}.pdf`;
    const pdfPath = path.join(pdfDir, pdfFilename);
    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(fs.createWriteStream(pdfPath));

    // Encabezado PDF
    doc
      .fontSize(20)
      .text(`Venta Nº ${nuevoNumeroVenta}`, { align: "center" })
      .moveDown();
    doc.fontSize(14).text(`Tipo Documento: ${tipoDocumento}`);
    if (tipoDocumento === "factura") {
      doc.text(`RUT Cliente: ${rutCliente}`);
      doc.text(`Razón Social: ${razonSocial}`);
      doc.text(`Giro: ${giro}`);
    }
    doc.text(`Fecha: ${nuevaVenta.fechaVenta.toLocaleString()}`).moveDown();

    // Tabla
    const startX = 30;
    let startY = doc.y;
    const rowHeight = 25;

    const colWidths = {
      producto: 200,
      cantidad: 80,
      precioUnitario: 100,
      total: 100,
    };

    const drawCell = (x, y, w, h) => doc.rect(x, y, w, h).stroke();

    // Cabecera
    doc.font("Helvetica-Bold").fontSize(12);
    doc.text("Producto", startX + 5, startY + 7, {
      width: colWidths.producto - 10,
    });
    doc.text("Cantidad", startX + colWidths.producto + 5, startY + 7, {
      width: colWidths.cantidad - 10,
      align: "right",
    });
    doc.text(
      "Precio Unitario",
      startX + colWidths.producto + colWidths.cantidad + 5,
      startY + 7,
      { width: colWidths.precioUnitario - 10, align: "right" }
    );
    doc.text(
      "Total",
      startX +
        colWidths.producto +
        colWidths.cantidad +
        colWidths.precioUnitario +
        5,
      startY + 7,
      { width: colWidths.total - 10, align: "right" }
    );

    drawCell(startX, startY, colWidths.producto, rowHeight);
    drawCell(
      startX + colWidths.producto,
      startY,
      colWidths.cantidad,
      rowHeight
    );
    drawCell(
      startX + colWidths.producto + colWidths.cantidad,
      startY,
      colWidths.precioUnitario,
      rowHeight
    );
    drawCell(
      startX +
        colWidths.producto +
        colWidths.cantidad +
        colWidths.precioUnitario,
      startY,
      colWidths.total,
      rowHeight
    );

    doc.font("Helvetica").fontSize(12);
    startY += rowHeight;

    let totalVenta = 0;

    for (const item of productosVendidos) {
      // Buscar el producto completo en la base de datos usando el ID
      const producto = await Producto.findById(item.productoId);

      // Obtener el precio unitario del producto
      const precioUnit = producto.precio;

      // Calcular el total para la cantidad vendida de ese producto
      const total = precioUnit * item.cantidadVendida;

      // Acumular el total de la venta sumando el total de este producto
      totalVenta += total;

      // Escribir el nombre del producto en el PDF (posición X, Y, ancho y estilo)
      doc.text(producto.nombre, startX + 5, startY + 7, {
        width: colWidths.producto - 10,
      });

      // Escribir la cantidad vendida alineada a la derecha
      doc.text(
        item.cantidadVendida.toString(),
        startX + colWidths.producto + 5,
        startY + 7,
        { width: colWidths.cantidad - 10, align: "right" }
      );

      // Escribir el precio unitario formateado con 2 decimales y alineado a la derecha
      doc.text(
        `$${precioUnit.toFixed(2)}`,
        startX + colWidths.producto + colWidths.cantidad + 5,
        startY + 7,
        { width: colWidths.precioUnitario - 10, align: "right" }
      );

      // Escribir el total para ese producto, también alineado a la derecha
      doc.text(
        `$${total.toFixed(2)}`,
        startX +
          colWidths.producto +
          colWidths.cantidad +
          colWidths.precioUnitario +
          5,
        startY + 7,
        { width: colWidths.total - 10, align: "right" }
      );

      // Dibujar las celdas (bordes) de la fila para cada columna en la tabla
      drawCell(startX, startY, colWidths.producto, rowHeight);
      drawCell(
        startX + colWidths.producto,
        startY,
        colWidths.cantidad,
        rowHeight
      );
      drawCell(
        startX + colWidths.producto + colWidths.cantidad,
        startY,
        colWidths.precioUnitario,
        rowHeight
      );
      drawCell(
        startX +
          colWidths.producto +
          colWidths.cantidad +
          colWidths.precioUnitario,
        startY,
        colWidths.total,
        rowHeight
      );

      // Mover el cursor vertical para la siguiente fila de la tabla (suma la altura de la fila)
      startY += rowHeight;
    }

    // Total de la venta
    startY += 10;
    const totalX =
      startX +
      colWidths.producto +
      colWidths.cantidad +
      colWidths.precioUnitario;
    drawCell(totalX, startY, colWidths.total, 50);
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Total Venta: $${totalVenta.toFixed(2)}`, totalX + 5, startY + 8, {
        width: colWidths.total - 10,
        align: "right",
      });

    doc.end();

    // Guardar nombre del archivo PDF
    nuevaVenta.pdfFile = pdfFilename;
    await nuevaVenta.save();

    res.json({ venta: nuevaVenta, pdfFile: pdfFilename });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};

// Obtener todas las ventas
export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().sort({ nventa: -1 }).lean();

    // Agregar nombre y precio de cada producto (si sigue existiendo)
    for (let venta of ventas) {
      for (let producto of venta.productosVendidos) {
        const prod = await Producto.findById(producto.productoId).lean();
        producto.nombre = prod?.nombre || "Producto eliminado";
        producto.precioUnitario = prod?.precio || 0;
      }
    }

    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ message: "Error al obtener las ventas" });
  }
};
