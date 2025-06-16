import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./inicio_registro.module.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Registro1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="container-a mt-5">
      <img
        className="logo"
        src=""
        alt=""
      />
      <h3>Registro - RastroBazar</h3>
      {/* Mostrar errores de registro */}
      {registerErrors.length > 0 && (
        <div className="alert alert-danger">
          {registerErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <label htmlFor="username">Nombre Completo</label>
        <input
          id="username"
          type="text"
          {...register("username", { required: true })}
          placeholder="Nombre Apellido"
          autoComplete="name"
        />
        {errors.username && <p>Username is required</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          autoComplete="email" // Cambiado a autoComplete
        />
        {errors.email && <p>Email is required</p>}
        <label htmlFor="rol">Rol</label>
        <select id="rol" {...register("rol", { required: true })}>
          <option value="">Selecciona un rol</option>
          <option value="Empleado">Empleado</option>
          <option value="Dueño">Dueño</option>
        </select>
        {errors.rol && <p>Rol is required</p>}
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          placeholder="Mínimo 6 Caracteres"
          autoComplete="new-password" // Cambiado a autoComplete
        />

        {errors.password && <p>Password is required</p>}
        <button className="boton-Agregar" type="submit">Registrar</button>
      </form>
      <p className="signup-link">
        ¿Tienes cuenta?
        <Link to="/">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Registro1;
