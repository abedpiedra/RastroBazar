import React from 'react';
import styles from './HistorialReporte.module.css'; // Importamos el CSS Module

const HistorialReporte = () => {
  const historialData = [
    { sucursal: 'San Bernardo', numeroBox: 2, observaciones: 'Persona vomita la sala' },
    { sucursal: 'La Serena', numeroBox: 6, observaciones: 'Persona finaliza correctamente la consulta' },
    { sucursal: 'Temuco', numeroBox: 1, observaciones: 'Paciente rompe mesa' },
    { sucursal: 'San Bernardo', numeroBox: 2, observaciones: 'Persona vomita la sala' },
    { sucursal: 'La Serena', numeroBox: 6, observaciones: 'Persona finaliza correctamente la consulta' },
    { sucursal: 'Temuco', numeroBox: 1, observaciones: 'Paciente rompe mesa' },
    { sucursal: 'San Bernardo', numeroBox: 2, observaciones: 'Persona vomita la sala' },
    { sucursal: 'La Serena', numeroBox: 6, observaciones: 'Persona finaliza correctamente la consulta' },
    { sucursal: 'Temuco', numeroBox: 1, observaciones: 'Paciente rompe mesa' },
    { sucursal: 'San Bernardo', numeroBox: 2, observaciones: 'Persona vomita la sala' },
    { sucursal: 'La Serena', numeroBox: 6, observaciones: 'Persona finaliza correctamente la consulta' },
    { sucursal: 'Temuco', numeroBox: 1, observaciones: 'Paciente rompe mesa' }
  ];

  return (
    <>


      <div className={`${styles.container} mt-4`}>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th scope="col">Sucursal</th>
                <th scope="col">Numero de Box</th>
                <th scope="col">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {historialData.map((row, index) => (
                <tr key={index}>
                  <td>{row.sucursal}</td>
                  <td>{row.numeroBox}</td>
                  <td>{row.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HistorialReporte;
