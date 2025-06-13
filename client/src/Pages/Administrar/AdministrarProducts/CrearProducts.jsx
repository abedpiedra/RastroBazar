import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./AdministrarProducts.module.css";
import { proveedoresRequest } from "../../../api/proveedores.js"; // Asegúrate de importar la función para obtener los Proveedors

function CrearProducts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [registerErrors, setRegisterErrors] = useState([]);
  const [Proveedors, setProveedors] = useState([]);

  useEffect(() => {
    const fetchProveedors = async () => {
      try {
        const response = await proveedoresRequest();
        setProveedors(response.data); // Asignar los Proveedors al estado
      } catch (error) {
        setError("Error al obtener las sucursales: " + error.message); // Manejo de errores al obtener Proveedors
      }
    };

    fetchProveedors(); // Llamamos la función para obtener los Proveedors al montar el componente
  }, []);

  const onSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:4000/api/saveproducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Manejo específico para errores de duplicado
        if (errorData.code === 11000) {
          setRegisterErrors([
            "El producto esta registrado. Por favor, ingrese otro.",
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

      navigate("/AdministrarProducts");
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
      <h3>Registrar Producto</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="proveedor">Proveedor</label>
        <select
          id="proveedor"
          {...register("proveedor", {
            required: "Este campo es requerido",
            validate: (value) => value !== "" || "Selecciona una sucursal",
          })}
        >
          <option value="" disabled>
            {" "}
            {/* Establecer la opción seleccionada por defecto */}
            Selecciona una sucursal
          </option>
          {Proveedors.length > 0 ? (
            Proveedors.map((Proveedor) => (
              <option key={Proveedor._id} value={Proveedor.nombre_empresa}>
                {Proveedor.nombre_empresa}
              </option>
            ))
          ) : (
            <option disabled>No hay sucursales disponibles.</option>
          )}
        </select>
        {errors.nombre_empresa && (
          <p className="text-danger">{errors.nombre_empresa.message}</p>
        )}

        <label htmlFor="nombre">Nombre de Producto</label>
        <input
          id="nombre"
          type="string"
          {...register("nombre", { required: "Este campo es requerido" })}
          placeholder="Ej: Coca-Cola"
        />
        {errors.nombre && (
          <p className="text-danger">{errors.nombre.message}</p>
        )}

        <label htmlFor="descripcion">Descripción</label>
        <input
          id="descripcion"
          {...register("descripcion", { required: "Este campo es requerido" })}
          defaultValue=""
        />
        {errors.descripcion && (
          <p className="text-danger">{errors.descripcion.message}</p>
        )}

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          {...register("stock", { required: "Este campo es requerido" })}
          defaultValue=""
        />
        {errors.stock && (
          <p className="text-danger">{errors.stock.message}</p>
        )}

        <label htmlFor="precio">Precio</label>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            $
          </span>
          <input
            id="precio"
            type="number"
            style={{ paddingLeft: "25px" }} // Desplazamos el texto para que no choque con el $
            {...register("precio", { required: "Este campo es requerido" })}
          />
        </div>
        {errors.precio && (
          <p className="text-danger">{errors.precio.message}</p>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Agregar
        </button>
      </form>
      <p className="mt-3">
        <button
          className="btn btn-danger"
          onClick={() => navigate("/AdministrarProducts")}
        >
          Volver a Administrar Products
        </button>
      </p>
    </div>
  );
}

export default CrearProducts;
