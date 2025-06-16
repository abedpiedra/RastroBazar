import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerProductoPorId } from "../../../api/products.js"; // Función para obtener un producto por ID desde la API
import { useForm } from "react-hook-form"; // Hook para manejar formularios
import axios from "axios"; // Cliente HTTP para hacer peticiones
import styles from "./AdministrarProducts.jsx"; // Importa estilos (aunque parece que no se usa en este código)

function EditarProducto() {
  const navigate = useNavigate(); // Hook para navegar programáticamente entre rutas
  const { id } = useParams(); // Obtenemos el ID del producto que queremos editar desde la URL
  const [productoData, setProductoData] = useState(null); // Estado para guardar los datos del producto
  const [registerErrors, setRegisterErrors] = useState([]); // Estado para guardar mensajes de error o éxito

  // Hook para manejar el formulario, con validación y control de inputs
  const {
    register, // Función para registrar inputs en el formulario
    handleSubmit, // Función que maneja el envío del formulario
    formState: { errors }, // Objeto que contiene errores de validación
    setValue, // Función para establecer valores en los campos del formulario
  } = useForm();

  useEffect(() => {
    // Cuando el componente carga o cambia el id, obtenemos los datos del producto
    obtenerProductoPorId(id)
      .then((response) => {
        setProductoData(response.data); // Guardamos los datos del producto en el estado
        setValue("stock", response.data.stock); // Establecemos el valor del input 'stock' en el formulario
        setValue("precio", response.data.precio); // Establecemos el valor del input 'precio' en el formulario
      })
      .catch((error) => {
        console.error("Error al cargar los datos del Producto", error);
        // Mostramos mensaje de error si no se pudo cargar el producto
        setRegisterErrors(["No se pudo cargar la información del Producto."]);
      });
  }, [id, setValue]);

  // Función que se ejecuta al enviar el formulario con valores validados
  const onSubmit = async (values) => {
    try {
      // Hacemos petición PUT para actualizar el producto con los nuevos valores
      const response = await axios.put(
        `http://localhost:4000/api/products/${id}`,
        values
      );
      console.log("Datos actualizados:", response.data);
      setRegisterErrors(["¡Datos actualizados correctamente!"]); // Mensaje de éxito
      navigate("/AdministrarProducts"); // Redirigimos a la página de administración de productos
    } catch (error) {
      console.error("Error al actualizar el centro", error);
      // Mensaje de error si falla la actualización
      setRegisterErrors([
        "No se pudo actualizar el centro. Intenta nuevamente.",
      ]);
    }
  };

  // Mientras no se carguen los datos del producto, mostramos un mensaje de carga
  if (!productoData) {
    return <p>Cargando datos del producto...</p>;
  }

  return (
    <div className={`container-a mt-4`}>
      {/* Mostramos mensajes de error o éxito si existen */}
      {registerErrors.map((error, i) => (
        <div key={i} className="alert alert-danger">
          {error}
        </div>
      ))}
      <h3>Editar Producto</h3>
      {/* Formulario para editar stock y precio */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          {...register("stock", { required: "Este campo es requerido" })} // Validación: campo obligatorio
        />
        {/* Mensaje de error si falla validación en stock */}
        {errors.stock && (
          <p className="text-danger">{errors.stock.message}</p>
        )}

        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          type="number"
          {...register("precio", { required: "Este campo es requerido" })} // Validación: campo obligatorio
        />
        {/* Mensaje de error si falla validación en precio */}
        {errors.precio && (
          <p className="text-danger">{errors.precio.message}</p>
        )}

        <button type="submit" className="boton-Agregar">
          Guardar Cambios
        </button>
      </form>

      {/* Botón para volver a la página de administrar proveedores */}
      <p className="mt-3">
        <button
          className="boton-Eliminar"
          onClick={() => navigate("/AdministrarProveedores")}
        >
          Volver a Administrar Proveedores
        </button>
      </p>
    </div>
  );
}

export default EditarProducto;
