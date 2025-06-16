import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // Importa Link para navegación interna
import styles from "./inicio_registro.module.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Extraemos signin, estado de autenticación y errores del contexto Auth
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigimos automáticamente a /home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // Función que se ejecuta al enviar el formulario, llamando al método signin
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="container-a mt-5">
      {/* Mostrar errores de inicio de sesión si existen */}
      {signinErrors.map((error, i) => (
        <div key={i} className="alert alert-danger">
          {error}
        </div>
      ))}

      {/* Logo */}
      <img
        className={styles.logo}
        src="./src/Images/rastrobazar-logo.png"
        alt="Logo RastroBazar"
      />

      <h3>Bienvenido a Rastrobazar</h3>

      {/* Formulario */}
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "El correo es obligatorio" })}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-danger">{errors.email.message}</p>
        )}

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "La contraseña es obligatoria" })}
          placeholder="Contraseña"
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}

        <button className="boton-Agregar" type="submit">
          Iniciar Sesión
        </button>

        <p className="signup-link">
          ¿No tienes cuenta? <Link to="/Registro1">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
