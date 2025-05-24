import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./estilo_agenda.module.css"; // Importamos el archivo CSS como módulo

const AgendamientoSesiones = () => {
  const navigate = useNavigate(); // Definimos navigate con el hook useNavigate

  const timeOptions = [
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", 
    "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  const sessionTypes = [
    { value: "kinesiologia", label: "Kinesiología" },
    { value: "fonoaudiologia", label: "Fonoaudiología" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Mapa_box"); // Redirigimos a la página Mapa_box
  };

  return (
    <div className={`${styles.container} container mt-4`}>
      <h1>Agendar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {[
            {
              id: "sucursal",
              label: "Sucursal",
              placeholder: "Nombre de la sucursal",
            },
            {
              id: "patient",
              label: "Paciente",
              placeholder: "Nombre del paciente",
            },
          ].map(({ id, label, placeholder }) => (
            <div key={id} className="col-md-6 mb-3">
              <div className={styles.formGroup}>
                <label htmlFor={id} className="form-label">
                  {label}:
                </label>
                <div className="d-flex">
                  <input
                    type="text"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    className="form-control"
                    required
                  />
                  <button type="button" className="btn btn-danger ms-2">
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`form-group mb-3 ${styles.formGroup}`}>
          <label htmlFor="date" className="form-label">
            Fecha de Atención:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            required
          />
        </div>

        <div className={`form-group mb-3 ${styles.formGroup}`}>
          <label htmlFor="time" className="form-label">
            Hora de Atención:
          </label>
          <select id="time" name="time" className="form-select" required>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className={`form-group mb-3 ${styles.formGroup}`}>
          <label htmlFor="session-type" className="form-label">
            Tipo de Sesión:
          </label>
          <select
            id="session-type"
            name="session-type"
            className="form-select"
            required
          >
            {sessionTypes.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-danger">
          Seleccionar Box
        </button>
      </form>
    </div>
  );
};
export default AgendamientoSesiones;
