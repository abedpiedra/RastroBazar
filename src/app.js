import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import backupRoutes from "./routes/backups.routes.js";
import proveedorRoutes from "./routes/proveedors.routes.js";
import productoRoutes from "./routes/products.routes.js";
import cors from "cors";
import alertasRoutes from "./routes/alertastocks.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import ventasRoutes from "./routes/ventas.routes.js"; 
import path from 'path';
import { fileURLToPath } from 'url';
import backupConfigRoutes from "./routes/backupsconfig.routes.js";

dotenv.config();

const app = express();

// Obtener la ruta del archivo actual para manejo de paths relativos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar CORS para permitir solicitudes desde el frontend en localhost:5173 con credenciales
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware para registro de peticiones HTTP en consola (modo dev)
app.use(morgan("dev"));

// Middleware para parsear JSON en el body de las solicitudes
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

// Rutas agrupadas bajo /api para autenticación, tareas, proveedores, productos, alertas, notificaciones, ventas y backups
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", proveedorRoutes);
app.use("/api", productoRoutes);
app.use("/api", alertasRoutes);
app.use("/api", notificacionesRoutes);
app.use("/api", ventasRoutes); 
app.use("/api", backupRoutes);
app.use("/api", backupConfigRoutes);

// Servir archivos estáticos de PDFs de ventas para acceso directo desde el frontend
app.use('/api/ventas/pdfs', express.static(path.join(__dirname, 'pdfs', 'ventas')));

export default app;
