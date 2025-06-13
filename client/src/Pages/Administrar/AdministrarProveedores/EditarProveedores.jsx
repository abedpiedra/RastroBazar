import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerProveedorPorId } from "../../../api/proveedores.js"; // Asegúrate de importar correctamente la función
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./AdministrarProveedores.module.css";

function EditarProveedores() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID del centro a editar
  const [proveedorData, setProveedorData] = useState(null);
  const [registerErrors, setRegisterErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    obtenerProveedorPorId(id) // Usamos la función para obtener el centro
      .then((response) => {
        setProveedorData(response.data);
        setValue("nombre_empresa", response.data.nombre_empresa);
        setValue("email", response.data.email);
      })
      .catch((error) => {
        console.error("Error al cargar los datos del Proveedor", error);
        setRegisterErrors(["No se pudo cargar la información del Proveedor."]);
      });
  }, [id, setValue]);

  const onSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/proveedors/${id}`,
        values
      );
      console.log("Datos actualizados:", response.data);
      setRegisterErrors(["¡Datos actualizados correctamente!"]);
      navigate("/AdministrarProveedores");
    } catch (error) {
      console.error("Error al actualizar el centro", error);
      setRegisterErrors([
        "No se pudo actualizar el centro. Intenta nuevamente.",
      ]);
    }
  };

  if (!proveedorData) {
    return <p>Cargando datos del proveedor...</p>;
  }

  return (
    <div className={`${styles.container} mt-4`}>
      {registerErrors.map((error, i) => (
        <div key={i} className="alert alert-danger">
          {error}
        </div>
      ))}
      <h3>Editar Proveedor</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombre_empresa">nombre_empresa</label>
        <input
          id="nombre_empresa"
          type="text"
          {...register("nombre_empresa", { required: "Este campo es requerido" })}
          placeholder=""
        />
        {errors.nombre_empresa && (
          <p className="text-danger">{errors.nombre_empresa.message}</p>
        )}
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Este campo es requerido" })}
          placeholder="Ej:xxx@xxx.com"
        />
        {errors.Correo && (
          <p className="text-danger">{errors.Correo.message}</p>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Guardar Cambios
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

export default EditarProveedores;
