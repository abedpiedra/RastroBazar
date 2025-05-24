import { Router } from "express";
import {
  producto,
  products,
  obtenerProductoPorId,
  deleteProducts,
  actualizarProducto,
} from "../controllers/products.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productoSchema } from "../schemas/products.schema.js";

const router = Router();

router.post("/saveproducts", validateSchema(productoSchema), producto);
router.get("/products", products);
router.delete("/deleteProducts/:_id", deleteProducts);
router.get("/products/:id", obtenerProductoPorId);
router.put("/products/:id", actualizarProducto);

export default router;
