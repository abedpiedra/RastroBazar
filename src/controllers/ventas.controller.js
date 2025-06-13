import { Venta } from "../models/ventas.model.js";
import  Producto  from "../models/products.model.js";

export const crearVenta = async (req, res) => {
  try {
    const { productoId, cantidadVendida, tipoDocumento, rutCliente, razonSocial, giro } = req.body;

    const producto = await Producto.findById(productoId);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    if (producto.stock < cantidadVendida) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    // Registrar la venta
    const nuevaVenta = new Venta({
      productoId,
      cantidadVendida,
      tipoDocumento,
      rutCliente,
      razonSocial,
      giro
    });

    await nuevaVenta.save();

    // Actualizar stock
    producto.stock -= cantidadVendida;
    await producto.save();

    res.json({ message: "Venta registrada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar la venta" });
  }
};

// (luego podemos agregar obtenerVentas, eliminarVenta, etc.)
