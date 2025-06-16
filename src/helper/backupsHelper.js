import { exec } from "child_process";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const backupsFolder = path.join(__dirname, "..", "backups");
const pdfsFolder = path.join(__dirname, "..", "pdfs", "ventas");

// Asegurarse que la carpeta de backups existe
if (!fs.existsSync(backupsFolder)) {
  fs.mkdirSync(backupsFolder, { recursive: true });
}

export const generarRespaldo = async () => {
  return new Promise((resolve, reject) => {
    const fecha = new Date().toISOString().replace(/[:.]/g, "-");
    const dumpPath = path.join(backupsFolder, `dump-${fecha}`);
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/rastrobazar"; // Ajusta aquí según tu configuración

    // Ejecutar mongodump (asegúrate que mongodump esté instalado en tu servidor)
    const comando = `mongodump --uri="${mongoUri}" --out="${dumpPath}"`;

    exec(comando, (error, stdout, stderr) => {
      console.log("mongodump stdout:", stdout);
      console.error("mongodump stderr:", stderr);
      if (error) {
        console.error(`Error al hacer mongodump: ${error}`);
        return reject(error);
      }

      // Validar que la carpeta dump existe y no está vacía
      if (!fs.existsSync(dumpPath)) {
        return reject(new Error("La carpeta dump no fue creada"));
      }

      const filesDump = fs.readdirSync(dumpPath);
      console.log("Archivos en dump:", filesDump);

      if (filesDump.length === 0) {
        return reject(new Error("La carpeta dump está vacía"));
      }

      // Después de hacer el dump, creamos el ZIP
      const zipPath = path.join(backupsFolder, `respaldo-${fecha}.zip`);
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        // Eliminar la carpeta temporal dump
        fs.rmSync(dumpPath, { recursive: true, force: true });
        resolve(zipPath);
      });

      archive.on("error", (err) => reject(err));
      archive.pipe(output);

      // Agregar dump de mongo
      archive.directory(dumpPath, "dump");
      // Agregar PDFs
      if (fs.existsSync(pdfsFolder)) {
        archive.directory(pdfsFolder, "pdfs/ventas");
      }

      archive.finalize();
    });
  });
};
