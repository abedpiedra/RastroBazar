import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // Importa Link
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
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className={`${styles.container} mt-4`}>
      {signinErrors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
      <img
        className={styles.logo}
        src="https://static.wixstatic.com/media/0a8059_2238928883ab4c278a1231c12510b720~mv2.png/v1/fill/w_51,h_75,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0a8059_2238928883ab4c278a1231c12510b720~mv2.png"
        alt="Logo de la empresa"
      />
      <h3>Bienvenido</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="a.piedra@gmail.com"
        />
        {errors.email && <p>email is required</p>}
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
          placeholder="********"
        />
        {errors.password && <p>password is required</p>}

        <button type="submit">Iniciar Sesión</button>
        <p className="signup-link">
          ¿No tienes cuenta? <Link to="/Registro1">Regístrate aquí</Link>{" "}
          {/* Usa Link */}
        </p>
      </form>
    </div>
  );
}

export default Login;
