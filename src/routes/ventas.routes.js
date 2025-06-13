import express from "express";
import { crearVenta } from "../controllers/ventas.controller.js";

const router = express.Router();

router.post("/ventas", crearVenta);

export default router;
