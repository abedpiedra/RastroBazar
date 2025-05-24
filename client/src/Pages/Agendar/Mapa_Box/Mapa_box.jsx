import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Mapa_box.module.css'; // Asegúrate de que la ruta sea correcta

const Mapa_box = () => {
  const navigate = useNavigate(); 
  const boxes = [
    { id: 1, status: "green" },
    { id: 2, status: "red" },
    { id: 3, status: "orange" },
    { id: 4, status: "green" },
    { id: 5, status: "orange" },
    { id: 6, status: "green" },
    { id: 7, status: "orange" },
    { id: 8, status: "green" },
    { id: 9, status: "green" },
    { id: 10, status: "orange" },
    { id: 11, status: "red" },
    { id: 12, status: "red" },
  ];

  const handleBoxClick = (status) => {
    if (status === "green") {
      navigate('/Registro_sesion'); // Redirige a la página de Registro_sesion
    }
  };

  return (
    <>
      <div className={`${styles.container} mt-4`}>
        <div className={styles.boxMap}>
          {boxes.map((box) => (
            <div key={box.id} className={`${styles.box} ${styles[box.status]}`} onClick={() => handleBoxClick(box.status)}>
              Box {box.id}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Mapa_box;
