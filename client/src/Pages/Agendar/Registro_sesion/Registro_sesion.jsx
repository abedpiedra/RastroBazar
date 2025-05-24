import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from './Registro_sesion.module.css'; // Asegúrate de que la ruta a tu CSS sea correcta

const Registro_sesion = () => {
  const navigate = useNavigate(); // Inicializa useNavigate

  const medicos = [
    { id: 1, apellido: "Lopez", nombre: "Alvaro", especialidad: "Fonoaudiología", usuario: "a.lopez@fonoaudiologia.cl" },
    { id: 2, apellido: "Rodriguez", nombre: "Daniel", especialidad: "Kinesiología", usuario: "d.rodriguez@kinesiologia.cl" },
    { id: 3, apellido: "Perez", nombre: "Isabella", especialidad: "Fonoaudiología", usuario: "i.perez@fonoaudiologia.cl" },
    { id: 4, apellido: "Lara", nombre: "Orlando", especialidad: "Fonoaudiología", usuario: "o.lara@fonoaudiologia.cl" },
    { id: 5, apellido: "Pachano", nombre: "Cristian", especialidad: "Kinesiología", usuario: "c.pachano@kinesiologia.cl" },
  ];

  const handleSelect = () => {
    navigate('/Cita_agenda'); // Redirige a la página Cita_agenda
  };

  return (
    <div className={styles.container}>
      <div className="form-container mt-4">
        <form className={styles.formFlex}>
          <div className={`${styles.formGroup} form-group`}>
            <label htmlFor="insumo" className="form-label">Seleccionar Insumo:</label>
            <select id="insumo" name="insumo" className="form-select" required>
              <option value="">Seleccione un Insumo</option>
              <option value="insumo1">Insumo 1 - Vendaje</option>
              <option value="insumo2">Insumo 2 - Crema</option>
              <option value="insumo3">Insumo 3 - Electrodo</option>
            </select>
          </div>
          <div className={`${styles.formGroup} form-group`}>
            <label htmlFor="cantidad" className="form-label">Cantidad Utilizada:</label>
            <input type="number" id="cantidad" name="cantidad" className="form-control" required min="0" placeholder="Ingrese la cantidad utilizada" />
          </div>
        </form>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Funcionario</th>
              <th>Estado</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((medico) => (
              <tr key={medico.id}>
                <td>{`${medico.nombre} ${medico.apellido}`}</td>
                <td>{medico.especialidad}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={handleSelect}>Seleccionar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registro_sesion;
