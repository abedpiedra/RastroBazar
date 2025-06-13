import Notificacion from "../models/notificaciones.model.js";

export const obtenerNotificaciones = async (req, res) => {
  const notificaciones = await Notificacion.find().sort({ fecha: -1 });
  res.json(notificaciones);
};

export const marcarLeida = async (req, res) => {
  await Notificacion.findByIdAndUpdate(req.params.id, { leida: true });
  res.json({ message: "Notificación marcada como leída" });
};
