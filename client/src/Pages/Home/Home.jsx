import React from 'react';
import './Home.module.css';

const Home = () => {
  return (
    <main>
      <h1 className="titulo">SISTEMA INTERNO / VISTA ADMINISTRADOR</h1>
      <p>
        Este sistema interno está diseñado para facilitar la gestión y
        supervisión de las operaciones administrativas en los centros de
        atención. A través de la interfaz del administrador, se puede acceder a
        información crítica relacionada con la agenda de Box de atención, manejo
        de personal, control de insumos y la administración de pacientes. Los
        administradores tendrán la capacidad de visualizar, modificar y
        programar las agendas de los Box de atención para asegurar que los
        recursos de Kinesiología y Fonoaudiología estén optimizados. Además, el
        sistema permite clasificar a los pacientes por etapas de tratamiento,
        así como registrar el estado de las terapias, ya sea terminada,
        suspendida o extendida, lo que facilita el seguimiento y control de los
        servicios ofrecidos.
      </p>
    </main>
  );
};

export default Home;
