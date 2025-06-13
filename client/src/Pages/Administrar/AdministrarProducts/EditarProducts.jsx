import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerProductoPorId } from "../../../api/products.js"; // Asegúrate de importar correctamente la función
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./AdministrarProducts.jsx";

function EditarProducto() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID del centro a editar
  const [productoData, setProductoData] = useState(null);
  const [registerErrors, setRegisterErrors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    obtenerProductoPorId(id) // Usamos la función para obtener el centro
      .then((response) => {
        setProductoData(response.data);
        setValue("stock", response.data.stock);
        setValue("precio", response.data.precio);
      })
      .catch((error) => {
        console.error("Error al cargar los datos del Producto", error);
        setRegisterErrors(["No se pudo cargar la información del Producto."]);
      });
  }, [id, setValue]);

  const onSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/products/${id}`,
        values
      );
      console.log("Datos actualizados:", response.data);
      setRegisterErrors(["¡Datos actualizados correctamente!"]);
      navigate("/AdministrarProducts");
    } catch (error) {
      console.error("Error al actualizar el centro", error);
      setRegisterErrors([
        "No se pudo actualizar el centro. Intenta nuevamente.",
      ]);
    }
  };

  if (!productoData) {
    return <p>Cargando datos del producto...</p>;
  }

  return (
    <div className={`${styles.container} mt-4`}>
      {registerErrors.map((error, i) => (
        <div key={i} className="alert alert-danger">
          {error}
        </div>
      ))}
      <h3>Editar Producto</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          {...register("stock", { required: "Este campo es requerido" })}
        />
        {errors.stock && (
          <p className="text-danger">{errors.stock.message}</p>
        )}
        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          type="number"
          {...register("precio", { required: "Este campo es requerido" })}
        />
        {errors.precio && (
          <p className="text-danger">{errors.precio.message}</p>
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

export default EditarProducto;
