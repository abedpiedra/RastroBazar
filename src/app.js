import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import proveedorRoutes from "./routes/proveedors.routes.js";
import productoRoutes from "./routes/products.routes.js";
import cors from "cors";
import alertasRoutes from "./routes/alertastocks.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";  // <--- Importa la ruta de ventas

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Permite que las cookies sean enviadas y recibidas
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

export default app;
