import React, { useState } from "react";
import axios from "axios";

function BackupConfig() {
  const [intervalo, setIntervalo] = useState(
    localStorage.getItem("backupInterval") || 10
  );
  const [file, setFile] = useState(null);

  const guardarConfiguracion = async () => {
    try {
      await axios.post("http://localhost:4000/api/config", {
        intervalo: parseInt(intervalo),
      });
      localStorage.setItem("backupInterval", intervalo);
      alert("Configuración guardada correctamente.");
    } catch (error) {
      console.error(error);
      alert("Error al guardar configuración");
    }
  };

  const respaldarAhora = () => {
    window.open("http://localhost:4000/api/backup");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const cargarBackup = async () => {
    if (!file) {
      alert("Selecciona un archivo de respaldo");
      return;
    }

    const formData = new FormData();
    formData.append("backup", file);

    try {
      await axios.post("http://localhost:4000/api/restore", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Base de datos restaurada correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al restaurar la base de datos");
    }
  };

  return (
    <div className="container-a mt-5">
      <h2>Configuración de Respaldos</h2>

      <div className="mt-4">
        <label>Intervalo de respaldo automático (minutos):</label>
        <input
          type="number"
          className="form-control w-25"
          value={intervalo}
          onChange={(e) => setIntervalo(e.target.value)}
        />
        <button className="boton-Agregar" onClick={guardarConfiguracion}>
          Guardar Configuración
        </button>
      </div>

      <div className="mt-5">
        <h4>Respaldar ahora:</h4>
        <button className="boton-Agregar" onClick={respaldarAhora}>
          Generar Respaldo
        </button>
      </div>

      <div className="mt-5">
        <h4>Cargar respaldo:</h4>
        <input
          type="file"
          className="form-control w-50"
          onChange={handleFileChange}
        />
        <button className="boton-Agregar" onClick={cargarBackup}>
          Cargar Base de Datos
        </button>
      </div>
    </div>
  );
}

export default BackupConfig;
