// Importa el modelo de notificaciones desde la base de datos
import Notificacion from "../models/notificaciones.model.js";

// Controlador para obtener todas las notificaciones
export const obtenerNotificaciones = async (req, res) => {
  // Busca todas las notificaciones y las ordena por fecha descendente (más recientes primero)
  const notificaciones = await Notificacion.find().sort({ fecha: -1 });

  // Devuelve el arreglo de notificaciones al cliente
  res.json(notificaciones);
};

// Controlador para marcar una notificación como leída
export const marcarLeida = async (req, res) => {
  // Actualiza el campo 'leida' a true para la notificación con el ID recibido por parámetro
  await Notificacion.findByIdAndUpdate(req.params.id, { leida: true });

  // Responde con un mensaje de éxito
  res.json({ message: "Notificación marcada como leída" });
};
