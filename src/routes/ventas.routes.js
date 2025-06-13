import express from "express";
import { crearVenta, obtenerVentas } from "../controllers/ventas.controller.js";  // Importa tu controller

const router = express.Router();

router.post("/ventas", crearVenta);  // Asocia ruta POST /ventas al controller crearVenta

// Ruta para descargar PDF que tienes
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/ventas", obtenerVentas);

export default router;
