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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", proveedorRoutes);
app.use("/api", productoRoutes);
app.use("/api", alertasRoutes);
app.use("/api", notificacionesRoutes);
app.use("/api", ventasRoutes); 
app.use("/api", backupRoutes);
app.use("/api", backupConfigRoutes);

// Esta línea es la clave para servir los PDFs en la URL que usas desde frontend:
app.use('/api/ventas/pdfs', express.static(path.join(__dirname, 'pdfs', 'ventas')));

export default app;
