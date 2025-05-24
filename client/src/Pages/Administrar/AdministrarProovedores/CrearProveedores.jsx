import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./AdministrarProveedores.module.css";

function CrearProveedores() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [registerErrors, setRegisterErrors] = useState([]);

  const onSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:4000/api/saveproveedors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Manejo específico para errores de duplicado
        if (errorData.code === 11000) {
          setRegisterErrors([
            "El usuario ya está registrada. Por favor, elige otra.",
          ]);
        } else {
          setRegisterErrors(
            Array.isArray(errorData)
              ? errorData
              : [errorData.message || "Error desconocido"]
          );
        }
        return;
      }

      navigate("/AdministrarProveedores");
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setRegisterErrors(["Error de conexión con el servidor"]);
    }
  };

  return (
    <div className={`${styles.container} mt-4`}>
      {registerErrors.map((error, i) => (
        <div key={i} className="alert alert-danger">
          {error}
        </div>
      ))}
      
      <h3>Registrar Proveedor</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombre">Nombre de Empresa</label>
        <input
          id="nombre_empresa"
          type="text"
          {...register("nombre_empresa", { required: "Este campo es requerido" })}
          placeholder="Ej: Alta Técnología Médica"
          autoComplete="nombre_empresa"
        />
        {errors.nombre_empresa && (
          <p className="text-danger">{errors.nombre_empresa.message}</p>
        )}

        <label htmlFor="direccion">Dirección</label>
        <input
          id="direccion"
          type="text"
          {...register("direccion", { required: "Este campo es requerido" })}
          placeholder="Ej: Piedra"
          autoComplete="direccion"
        />
        {errors.direccion && (
          <p className="text-danger">{errors.direccion.message}</p>
        )}
        <label htmlFor="telefono">teléfono</label>
        <input
          id="telefono"
          type="number"
          {...register("telefono", { required: "Este campo es requerido" })}
          placeholder="Ej: Piedra"
          autoComplete="telefono"
        />
        {errors.telefono && (
          <p className="text-danger">{errors.nombre_empresa.message}</p>
        )}

        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Este campo es requerido" })}
          placeholder="Ej: xxx@xxx.com"
        />
        {errors.Correo && (
          <p className="text-danger">{errors.Correo.message}</p>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Agregar
        </button>
      </form>
      <p className="mt-3">
        <button
          className="btn btn-danger"
          onClick={() => navigate("/AdministrarProveedores")}
        >
          Volver a Administrar Proveedores
        </button>
      </p>
    </div>
  );
}

export default CrearProveedores;
