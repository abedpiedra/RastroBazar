import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cita_agenda.module.css';

const Cita_agenda = () => {
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  // Función para manejar la redirección al hacer clic en el botón
  const handleVolverInicio = () => {
    navigate('/Home'); // Cambia la ruta si es diferente
  };

  return (
    <div className={styles.container}>
      <h2>La hora ha sido agendada con éxito!</h2>
      <div className="table-responsive">
        <table className="table table-vertical table-bordered">
          <tbody>
            <tr>
              <th scope="row">Fecha de Atención</th>
              <td>dd / mm / aa</td>
            </tr>
            <tr>
              <th scope="row">Hora</th>
              <td>00 : 00</td>
            </tr>
            <tr>
              <th scope="row">Profesional</th>
              <td>Nombre de doc</td>
            </tr>
            <tr>
              <th scope="row">Tipo de Sesión</th>
              <td>kine o fono</td>
            </tr>
            <tr>
              <th scope="row">Box de Atención</th>
              <td>Numero de box</td>
            </tr>
            <tr>
              <th scope="row">Paciente</th>
              <td>Nombre completo de paciente</td>
            </tr>
            <tr>
              <th scope="row">Paquete de Insumos</th>
              <td>Insumo utilizado</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleVolverInicio}>Volver a Inicio</button>
      </div>
    </div>
  );
};

export default Cita_agenda;
