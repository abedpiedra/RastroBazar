import React from "react";
import "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Usamos el hook de navegación

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "POST", // Método para hacer logout
        credentials: "include", // Asegúrate de que las cookies se envíen
      });
  
      if (response.ok) {
        navigate("/"); // Redirige al usuario si el logout fue exitoso
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  return (
    <header>
      <div>
        <Link to="/Home">
          <img
            src=""
            alt=""
          />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/AgendaDeBox"></Link>
        </li>
        <li>
          <Link to="/AdministrarProveedores">Administrar Proveedores</Link>
        </li>
        <li>
          <Link to="/AdministrarProducts">Administrar Productos</Link>
        </li>
        <li>
        <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
        </li>
      </ul>
      
    </header>
  );
};

export default Header;
