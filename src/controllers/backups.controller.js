import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import unzipper from 'unzipper'; // npm i unzipper
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { generarRespaldo } from '../helper/backupsHelper.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const backupsFolder = path.join(__dirname, '..', 'backups');

export const realizarRespaldo = async (req, res) => {
  try {
    const zipPath = await generarRespaldo();
    const filename = path.basename(zipPath);
    res.download(zipPath, filename);
  } catch (error) {
    console.error("Error al generar respaldo:", error);
    res.status(500).json({ message: "Error al generar el respaldo" });
  }
};

export const restaurarBackup = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    const backupZipPath = req.file.path;
    const extractPath = path.join(backupsFolder, 'restore_temp');

    // Limpiar carpeta temporal si existe
    if (fs.existsSync(extractPath)) {
      fs.rmSync(extractPath, { recursive: true, force: true });
    }
    fs.mkdirSync(extractPath, { recursive: true });

    // Extraer el zip subido
    await fs.createReadStream(backupZipPath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .promise();

    // Path al dump extraído (ajusta si cambias el nombre en tu backup)
    const dumpPath = path.join(extractPath, 'dump');

    if (!fs.existsSync(dumpPath)) {
      return res.status(400).json({ message: "El backup no contiene un dump válido" });
    }

    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rastrobazar'; // Ajusta aquí según tu configuración

    // Comando mongorestore para restaurar
    const comando = `mongorestore --uri="${mongoUri}" --drop --dir="${dumpPath}"`;

    exec(comando, (error, stdout, stderr) => {
      // Borrar archivo zip subido y carpeta temporal después de restaurar
      fs.unlinkSync(backupZipPath);
      fs.rmSync(extractPath, { recursive: true, force: true });

      if (error) {
        console.error(`Error al restaurar backup: ${error}`);
        return res.status(500).json({ message: "Error al restaurar el backup" });
      }

      res.json({ message: "Backup restaurado correctamente" });
    });

  } catch (error) {
    console.error("Error en restaurarBackup:", error);
    res.status(500).json({ message: "Error en el proceso de restauración" });
  }
};
