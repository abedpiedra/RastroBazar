// Importación de modelos necesarios
import AlertaStock from "../models/alertastocks.model.js";
import Producto from "../models/products.model.js";
import Notificacion from "../models/notificaciones.model.js";

// Controlador para crear una nueva alerta de stock
export const crearAlerta = async (req, res) => {
  try {
    // Se crea una nueva instancia de alerta con los datos recibidos
    const alerta = new AlertaStock(req.body);
    
    // Se guarda en la base de datos
    await alerta.save();
    
    // Se responde con la alerta creada
    res.json(alerta);
  } catch (error) {
    // Manejo de errores en caso de fallar al guardar
    res.status(500).json({ message: error.message });
  }
};

// Controlador para verificar si hay productos que están bajo su umbral de stock
export const verificarAlertas = async (req, res) => {
  // Se obtienen todas las alertas, incluyendo la información del producto relacionado
  const alertas = await AlertaStock.find().populate("producto");

  // Se recorre cada alerta para verificar el stock actual del producto
  for (let alerta of alertas) {
    const producto = alerta.producto;

    // Si el stock actual del producto es menor o igual al umbral definido
    if (parseInt(producto.stock) <= alerta.umbral_stock) {
      // Se busca si ya existe una notificación no leída sobre este producto
      const existe = await Notificacion.findOne({
        mensaje: { $regex: producto.nombre }, // Busca coincidencia por nombre en el mensaje
        leida: false
      });

      // Si no existe una notificación activa, se crea una nueva
      if (!existe) {
        const nuevaNotificacion = new Notificacion({
          mensaje: `⚠ El producto "${producto.nombre}" está bajo stock (${producto.stock})`
        });

        // Se guarda la nueva notificación en la base de datos
        await nuevaNotificacion.save();
      }
    }
  }

  // Se responde indicando que la verificación se completó
  res.json({ message: "Verificación completada" });
};
