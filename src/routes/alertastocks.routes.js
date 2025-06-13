import { Router } from "express";
import { crearAlerta, verificarAlertas } from "../controllers/alertastocks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { alertaSchema } from "../schemas/alertastocks.schema.js";

const router = Router();

router.post("/alertas", validateSchema(alertaSchema), crearAlerta);
router.get("/alertas/verificar", verificarAlertas);

export default router;
