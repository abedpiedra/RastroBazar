// Importamos el Router de Express para definir las rutas de la API
import { Router } from "express";
// Importamos las funciones del controlador de autenticación
import {
  producto,
  products,
  obtenerProductoPorId,
  deleteProducts,
  actualizarProducto,
  actualizarUmbral,
  verificarAlertas, 
} from "../controllers/products.controller.js";
// Importamos middleware para validar que los datos recibidos cumplan con un esquema
import { validateSchema } from "../middlewares/validator.middleware.js";
// Importamos el esquema de validación para los productos
import { productoSchema } from "../schemas/products.schema.js";
// Creamos una instancia del Router
const router = Router();
// Definimos las rutas de productos y asociamos cada ruta con su controlador
router.post("/saveproducts", validateSchema(productoSchema), producto);
// Ruta para guardar un producto, valida los datos con el esquema productoSchema
router.get("/products", products);
// Ruta para obtener todos los productos
router.delete("/deleteProducts/:_id", deleteProducts);
// Ruta para eliminar un producto por ID
router.get("/products/:id", obtenerProductoPorId);
// Ruta para obtener un producto por ID
router.put("/products/:id", actualizarProducto);
// Ruta para actualizar un producto por ID, no requiere validación de datos
router.put("/products/:id/umbral", actualizarUmbral);
// Actualizar umbral stock
router.get("/verificar-alertas", verificarAlertas);
// Verificar alertas: devuelve productos con stock <= umbral

export default router;
