import { Router } from "express";
import Notificacion from "../models/notificaciones.model.js";

const router = Router();

// Obtener notificaciones
router.get("/notificaciones", async (req, res) => {
  try {
    const notificaciones = await Notificacion.find().sort({ createdAt: -1 });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Marcar como leída
router.put("/notificaciones/:id/leida", async (req, res) => {
  try {
    await Notificacion.findByIdAndUpdate(req.params.id, { leida: true });
    res.json({ message: "Notificación marcada como leída" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
