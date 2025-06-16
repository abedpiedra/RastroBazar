import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.module.css"; // Importa los estilos del módulo CSS
import logo from "../../Images/rastrobazar-logo.png"; // Importa el logo de la ruta especificada

const Home = () => {
  const navigate = useNavigate(); // Hook de react-router para navegar programáticamente

  // Función que navega a la ruta de administración de productos cuando se clickea el botón
  const handleClick = () => {
    navigate("/AdministrarProducts");
  };

  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      {/* Título principal con estilo inline para color */}
      <h1 style={{ color: "#7E370F" }}>Bienvenido a RastroBazar</h1>

      {/* Subtítulo con tamaño y color */}
      <h5 style={{ fontSize: "20px", color: "#C86B3E" }}>
        El orden que tu negocio necesita, sin complicaciones.
      </h5>

      {/* Imagen del logo con estilos inline para tamaño y centrado */}
      <img
        src={logo}
        alt="Logo"
        className="logo"
        style={{ maxWidth: "200px", margin: "1rem auto", display: "block" }}
      />

      {/* Descripción con estilo similar al subtítulo */}
      <h5 style={{ fontSize: "20px", color: "#C86B3E" }}>
        Con RastroBazar puedes gestionar tu inventario, registrar tus ventas y
        organizar tus proveedores sin complicaciones. Olvídate de los cuadernos
        y las planillas: aquí tienes todo lo que tu negocio necesita, en un solo
        lugar y al alcance de tu mano.
      </h5>

      {/* Botón que al hacer click ejecuta la función handleClick */}
      <button onClick={handleClick} className="boton-Agregar">
        Ir a Administración de Productos
      </button>
    </main>
  );
};

export default Home;
