import { Router } from "express";
import {
  obtenerProveedorPorId,
  proveedor,
  proveedors,
  deleteProveedors,
  actualizarProveedor,
} from "../controllers/proveedors.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { proveedorSchema } from "../schemas/proveedors.schema.js";

const router = Router();

router.post("/saveproveedors", validateSchema(proveedorSchema), proveedor);
router.get("/proveedors", proveedors);
router.delete("/deleteProveedors/:_id", deleteProveedors);
router.put("/proveedors/:id", actualizarProveedor);
router.get("/proveedors/:id", obtenerProveedorPorId);

export default router;
