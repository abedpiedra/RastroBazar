import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./GenerarVentas.module.css"; // Puedes copiar tu mismo archivo de estilos
import { productsRequest } from "../../api/products.js"; 
import { crearVentaRequest } from "../../api/ventas.js"; // Asegúrate de que esta ruta sea correcta
import { toast } from "react-toastify";

function CrearVenta() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [registerErrors, setRegisterErrors] = useState([]);

  const tipoDocumento = watch("tipoDocumento", "boleta"); // Observa el tipo de documento

  // Cargar los productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const { data } = await productsRequest();
        setProductos(data);
      } catch (error) {
        toast.error("Error al cargar productos");
      }
    };
    cargarProductos();
  }, []);

  const onSubmit = async (values) => {
    try {
      await crearVentaRequest(values);
      toast.success("Venta realizada correctamente");
      navigate("/AdministrarProducts");
    } catch (error) {
      console.error("Error al realizar venta:", error);
      setRegisterErrors(["Error al realizar la venta."]);
    }
  };

  return (
    <div className={`${styles.container} mt-4`}>
      {registerErrors.map((error, i) => (
        <div key={i} className="alert alert-danger">
          {error}
        </div>
      ))}

      <h3>Registrar Venta</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Producto */}
        <label htmlFor="productoId">Producto</label>
        <select
          id="productoId"
          {...register("productoId", { required: "Seleccione un producto" })}
          className="form-select"
        >
          <option value="">Seleccione un producto</option>
          {productos.map((producto) => (
            <option key={producto._id} value={producto._id}>
              {producto.nombre} - (Stock: {producto.stock})
            </option>
          ))}
        </select>
        {errors.productoId && (
          <p className="text-danger">{errors.productoId.message}</p>
        )}

        {/* Cantidad */}
        <label htmlFor="cantidadVendida">Cantidad</label>
        <input
          id="cantidadVendida"
          type="number"
          className="form-control"
          min={1}
          {...register("cantidadVendida", { required: "Ingrese la cantidad" })}
        />
        {errors.cantidadVendida && (
          <p className="text-danger">{errors.cantidadVendida.message}</p>
        )}

        {/* Tipo de documento */}
        <label htmlFor="tipoDocumento">Tipo de Documento</label>
        <select
          id="tipoDocumento"
          className="form-select"
          {...register("tipoDocumento", { required: true })}
        >
          <option value="boleta">Boleta</option>
          <option value="factura">Factura</option>
        </select>

        {/* Campos adicionales SOLO si es factura */}
        {tipoDocumento === "factura" && (
          <>
            <label htmlFor="rutCliente">RUT Cliente</label>
            <input
              id="rutCliente"
              type="text"
              className="form-control"
              {...register("rutCliente", { required: "Ingrese el RUT del cliente" })}
            />
            {errors.rutCliente && (
              <p className="text-danger">{errors.rutCliente.message}</p>
            )}

            <label htmlFor="razonSocial">Razón Social</label>
            <input
              id="razonSocial"
              type="text"
              className="form-control"
              {...register("razonSocial", { required: "Ingrese la razón social" })}
            />
            {errors.razonSocial && (
              <p className="text-danger">{errors.razonSocial.message}</p>
            )}

            <label htmlFor="giro">Giro</label>
            <input
              id="giro"
              type="text"
              className="form-control"
              {...register("giro", { required: "Ingrese el giro comercial" })}
            />
            {errors.giro && (
              <p className="text-danger">{errors.giro.message}</p>
            )}
          </>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Realizar Venta
        </button>
      </form>

      <p className="mt-3">
        <button
          className="btn btn-danger"
          onClick={() => navigate("/home")}
        >
          Volver
        </button>
      </p>
    </div>
  );
}

export default CrearVenta;
