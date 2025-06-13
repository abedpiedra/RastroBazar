import AlertaStock from "../models/alertastocks.model.js";
import Producto from "../models/products.model.js";
import Notificacion from "../models/notificaciones.model.js";

export const crearAlerta = async (req, res) => {
  try {
    const alerta = new AlertaStock(req.body);
    await alerta.save();
    res.json(alerta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verificarAlertas = async (req, res) => {
  const alertas = await AlertaStock.find().populate("producto");

  for (let alerta of alertas) {
    const producto = alerta.producto;

    if (parseInt(producto.stock) <= alerta.umbral_stock) {
      const existe = await Notificacion.findOne({
        mensaje: { $regex: producto.nombre },
        leida: false
      });

      if (!existe) {
        const nuevaNotificacion = new Notificacion({
          mensaje: `⚠ El producto "${producto.nombre}" está bajo stock (${producto.stock})`
        });
        await nuevaNotificacion.save();
      }
    }
  }
  res.json({ message: "Verificación completada" });
};
