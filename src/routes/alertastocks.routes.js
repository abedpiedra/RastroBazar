import { Router } from "express";
// Importamos controladores que manejan la lógica para alertas de stock
import { crearAlerta, verificarAlertas } from "../controllers/alertastocks.controller.js";
// Middleware para validar los datos entrantes con un esquema definido
import { validateSchema } from "../middlewares/validator.middleware.js";
// Esquema de validación para alertas de stock
import { alertaSchema } from "../schemas/alertastocks.schema.js";

const router = Router();

// Ruta para crear una nueva alerta, aplicando validación previa
router.post("/alertas", validateSchema(alertaSchema), crearAlerta);

// Ruta para verificar alertas existentes (ej: envío de notificaciones)
router.get("/alertas/verificar", verificarAlertas);

export default router;
