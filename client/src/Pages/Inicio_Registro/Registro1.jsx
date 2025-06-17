import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./inicio_registro.module.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Registro1() {
  // Inicializamos react-hook-form para manejar formulario y errores
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Obtenemos funciones y estados desde nuestro contexto de autenticación
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  // Si el usuario ya está autenticado, redirigimos a la página principal
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]); // agregué navigate para evitar warning

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="container-a mt-5">
      {/* Logo: asegúrate de poner la ruta correcta o eliminar si no lo usas */}
      <img
        className="logo"
        src="../../Images/logo.png"
        alt="Logo RastroBazar"
      />
      <h3>Registro - RastroBazar</h3>

      {/* Mostrar errores globales del proceso de registro */}
      {registerErrors.length > 0 && (
        <div className="alert alert-danger">
          {registerErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {/* Formulario de registro */}
      <form onSubmit={onSubmit}>
        {/* Campo Nombre Completo */}
        <label htmlFor="username">Nombre Completo</label>
        <input
          id="username"
          type="text"
          placeholder="Nombre Apellido"
          autoComplete="name"
          {...register("username", { required: "El nombre es obligatorio" })}
        />
        {/* Mensaje de error para username */}
        {errors.username && <p>{errors.username.message}</p>}

        {/* Campo Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // patrón simple para email válido
              message: "Email no es válido",
            },
          })}
        />
        {/* Mensaje de error para email */}
        {errors.email && <p>{errors.email.message}</p>}

        {/* Campo Rol */}
        <label htmlFor="rol">Rol</label>
        <select
          id="rol"
          defaultValue=""
          {...register("rol", { required: "El rol es obligatorio" })}
        >
          <option value="" disabled>
            Selecciona un rol
          </option>
          <option value="Empleado">Empleado</option>
          <option value="Dueño">Dueño</option>
        </select>
        {/* Mensaje de error para rol */}
        {errors.rol && <p>{errors.rol.message}</p>}

        {/* Campo Contraseña */}
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Mínimo 6 Caracteres"
          autoComplete="new-password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {/* Mensaje de error para contraseña */}
        {errors.password && <p>{errors.password.message}</p>}

        {/* Botón para enviar */}
        <button className="boton-Agregar" type="submit">
          Registrar
        </button>
      </form>

      {/* Enlace para ir a login si ya tiene cuenta */}
      <p className="signup-link">
        ¿Tienes cuenta?{" "}
        <Link to="/">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}

export default Registro1;
