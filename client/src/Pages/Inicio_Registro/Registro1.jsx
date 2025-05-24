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
    <div className={`${styles.container} mt-4`}>
      <img
        className="logo"
        src="https://static.wixstatic.com/media/0a8059_2238928883ab4c278a1231c12510b720~mv2.png/v1/fill/w_51,h_75,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0a8059_2238928883ab4c278a1231c12510b720~mv2.png"
        alt="Logo de la empresa"
      />
      <h3>Registro - Edudown</h3>
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
          placeholder="Ej: Abed Piedra"
          autoComplete="name"
        />
        {errors.username && <p>Username is required</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="Ej: xxxx@gmail.com"
          autoComplete="email" // Cambiado a autoComplete
        />
        {errors.email && <p>email is required</p>}
        <label htmlFor="rol">Rol</label>
        <select id="rol" {...register("rol", { required: true })}>
          <option value="">Selecciona un rol</option>
          <option value="Empleado">Empleado</option>
          <option value="Dueño">Dueño</option>
        </select>
        {errors.rol && <p>rol is required</p>}
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          placeholder="Mínimo 6 Caracteres"
          autoComplete="new-password" // Cambiado a autoComplete
        />

        {errors.password && <p>password is required</p>}
        <button type="submit">Registrar</button>
      </form>
      <p className="signup-link">
        ¿Tienes cuenta?
        <Link to="/">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Registro1;
