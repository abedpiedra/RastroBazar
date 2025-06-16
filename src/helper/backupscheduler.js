import cron from "node-cron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { generarRespaldo } from "./backupsHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = path.join(__dirname, "../backupConfig.json");

// Variable global para guardar el cron actual
let tareaCron = null;

function leerIntervalo() {
  if (!fs.existsSync(configPath)) {
    return 10; // Default 10 min si no existe
  }
  const config = JSON.parse(fs.readFileSync(configPath));
  return config.intervalo || 10;
}

export function iniciarCron() {
  const intervalo = leerIntervalo();
  console.log(`Iniciando respaldo automático cada ${intervalo} minutos.`);

  // Si ya hay un cron agendado, detenerlo antes de crear uno nuevo
  if (tareaCron) {
    tareaCron.stop();
  }

  // Crear la nueva tarea
  tareaCron = cron.schedule(`*/${intervalo} * * * *`, async () => {
    console.log("Iniciando respaldo automático...");
    try {
      const zipPath = await generarRespaldo();
      console.log(`Respaldo automático creado: ${zipPath}`);
    } catch (error) {
      console.error("Error en respaldo automático:", error);
    }
  });
}

// Al arrancar el backend, iniciar cron
iniciarCron();
