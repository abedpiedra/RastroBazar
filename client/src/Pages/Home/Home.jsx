import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.module.css";
import logo from "../../Images/rastrobazar-logo.png"; // ajusta la ruta según tu estructura

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/AdministrarProducts");
  };

  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1 style={{ color: "#7E370F" }}>Bienvenido a RastroBazar</h1>
      <h5 style={{ fontSize: "20px", color: "#C86B3E" }}>El orden que tu negocio necesita, sin complicaciones.</h5>
      <img
        src={logo}
        alt="Logo"
        className="logo"
        style={{ maxWidth: "200px", margin: "1rem auto", display: "block" }}
      />

      <h5 style={{ fontSize: "20px", color: "#C86B3E" }}>
        Con RastroBazar puedes gestionar tu inventario, registrar tus ventas y
        organizar tus proveedores sin complicaciones. Olvídate de los cuadernos
        y las planillas: aquí tienes todo lo que tu negocio necesita, en un solo
        lugar y al alcance de tu mano.
      </h5>
      <button onClick={handleClick} className="boton-Agregar">
        Ir a Administración de Productos
      </button>
    </main>
  );
};

export default Home;
