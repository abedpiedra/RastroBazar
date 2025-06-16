import React from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Hook para navegación programática

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "POST",           // Solicitud POST para cerrar sesión
        credentials: "include",  // Incluye cookies en la solicitud
      });

      if (response.ok) {
        navigate("/"); // Redirige a la página principal si logout es exitoso
      } else {
        console.error("Logout failed"); // Error si la respuesta no es exitosa
      }
    } catch (error) {
      console.error("Error during logout:", error); // Captura errores en la petición
    }
  };

  return (
    <header>
      <div>
        <Link to="/Home">
          <img src="" alt="" /> {/* Logo o imagen principal */}
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/notificaciones">Alertas</Link>
        </li>
        <li>
          <Link to="/AdministrarProveedores">Administrar Proveedores</Link>
        </li>
        <li>
          <Link to="/AdministrarProducts">Administrar Productos</Link>
        </li>
        <li>
          <Link to="/GenerarVenta">Generar Venta</Link>
        </li>
        <li>
          <Link to="/HistorialVenta">Historial Venta</Link>
        </li>
        <li>
          <Link to="/Backups">Backups</Link>
        </li>
        <li></li>
        <button onClick={handleLogout} className={styles["boton-logout"]}>
          Logout
        </button>
      </ul>
    </header>
  );
};

export default Header;
