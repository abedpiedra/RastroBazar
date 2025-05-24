import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import proveedorRoutes from "./routes/proveedors.routes.js";
import productoRoutes from "./routes/products.routes.js";
import cors from "cors";

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

export default app;
