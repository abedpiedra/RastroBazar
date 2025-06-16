import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Importamos los controladores para manejar las operaciones de ventas
import { crearVenta, obtenerVentas } from "../controllers/ventas.controller.js";

// Obtenemos el nombre y directorio actual del archivo para trabajar con rutas relativas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Creamos una instancia del router de Express para definir rutas específicas
const router = express.Router();

// Ruta POST para crear una nueva venta, llama al controlador crearVenta
router.post("/ventas", crearVenta);

// Ruta GET para obtener todas las ventas, llama al controlador obtenerVentas
router.get("/ventas", obtenerVentas);

// Exportamos el router para usarlo en la aplicación principal
export default router;
