import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./GenerarVentas.module.css";
import { productsRequest } from "../../api/products.js";
import { crearVentaRequest } from "../../api/ventas.js";
import { toast } from "react-toastify";

function CrearVenta() {
  // Configuración de react-hook-form con valores por defecto
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productoId: "",
      cantidadVendida: 1,
      tipoDocumento: "boleta",
    },
  });

  const navigate = useNavigate();
  const [productos, setProductos] = useState([]); // Productos disponibles para la venta
  const [carrito, setCarrito] = useState([]); // Lista de productos agregados a la venta
  const [registerErrors, setRegisterErrors] = useState([]); // Errores para mostrar en UI
  const [pdfFile, setPdfFile] = useState(null); // Nombre del archivo PDF generado para descarga

  // Obtener el valor actual del tipoDocumento para mostrar campos condicionales
  const tipoDocumento = watch("tipoDocumento", "boleta");

  // Efecto para cargar productos al montar el componente
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

  // Función para agregar un producto al carrito de venta
  const agregarProducto = (data) => {
    // Buscar producto seleccionado entre los productos disponibles
    const productoSeleccionado = productos.find(
      (p) => p._id === data.productoId
    );
    if (!productoSeleccionado) return;

    // Verificar si el producto ya está en el carrito
    const existe = carrito.find((item) => item.productoId === data.productoId);

    if (existe) {
      // Si existe, actualizar la cantidad sumando la nueva cantidad
      setCarrito(
        carrito.map((item) =>
          item.productoId === data.productoId
            ? {
                ...item,
                cantidadVendida:
                  item.cantidadVendida + parseInt(data.cantidadVendida),
              }
            : item
        )
      );
    } else {
      // Si no existe, agregar nuevo producto al carrito
      setCarrito([
        ...carrito,
        {
          productoId: data.productoId,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          cantidadVendida: parseInt(data.cantidadVendida),
        },
      ]);
    }
    // Resetear formulario de agregar producto
    reset({ productoId: "", cantidadVendida: 1 });
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (productoId) => {
    setCarrito(carrito.filter((item) => item.productoId !== productoId));
  };

  // Función para realizar la venta con los datos del formulario
  const realizarVenta = async (formulario) => {
    // Validar que haya al menos un producto en el carrito
    if (carrito.length === 0) {
      toast.error("Debe agregar al menos un producto");
      return;
    }

    // Construir payload con productos vendidos y datos del cliente/documento
    const ventaPayload = {
      productosVendidos: carrito.map((item) => ({
        productoId: item.productoId,
        cantidadVendida: item.cantidadVendida,
      })),
      tipoDocumento: formulario.tipoDocumento,
      rutCliente: formulario.rutCliente || "",
      razonSocial: formulario.razonSocial || "",
      giro: formulario.giro || "",
    };

    try {
      // Enviar solicitud para crear la venta
      const response = await crearVentaRequest(ventaPayload);
      toast.success("Venta realizada correctamente");

      // Si se genera PDF, guardar nombre para mostrar botón de descarga
      if (response.pdfFile) {
        setPdfFile(response.pdfFile);
      }

      // Limpiar carrito y formulario
      setCarrito([]);
      reset();

      // Opcional: navegar a otra pantalla
      // navigate("/AdministrarProducts");
    } catch (error) {
      console.error("Error al realizar venta:", error);
      setRegisterErrors(["Error al realizar la venta."]);
    }
  };

  // Calcular el total acumulado de la venta
  const totalVenta = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidadVendida,
    0
  );

  return (
    <div className="container-a mt-4">
      <div className="row">
        {/* Sección de formulario para agregar productos y realizar la venta */}
        <div className="col-md-6">
          <h3>Registrar Venta</h3>

          {/* Mostrar errores de registro si existen */}
          {registerErrors.map((error, i) => (
            <div key={i} className="alert alert-danger">
              {error}
            </div>
          ))}

          {/* Formulario para agregar productos al carrito */}
          <form onSubmit={handleSubmit(agregarProducto)}>
            <label>Producto</label>
            <select
              className="form-select"
              {...register("productoId", { required: true })}
            >
              <option value="">Seleccione un producto</option>
              {productos.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nombre} (Stock: {p.stock})
                </option>
              ))}
            </select>

            <label className="mt-2">Cantidad</label>
            <input
              type="number"
              className="form-control"
              min={1}
              {...register("cantidadVendida", { required: true, min: 1 })}
            />

            <button type="submit" className="boton-Agregar">
              Agregar Producto
            </button>
          </form>

          {/* Formulario para completar datos y realizar la venta */}
          <form onSubmit={handleSubmit(realizarVenta)} className="mt-4">
            <label>Tipo de Documento</label>
            <select
              className="form-select"
              {...register("tipoDocumento", { required: true })}
            >
              <option value="boleta">Boleta</option>
              <option value="factura">Factura</option>
            </select>

            {/* Mostrar campos adicionales sólo si es factura */}
            {tipoDocumento === "factura" && (
              <>
                <label className="mt-2">RUT Cliente</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("rutCliente", { required: true })}
                />

                <label className="mt-2">Razón Social</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("razonSocial", { required: true })}
                />

                <label className="mt-2">Giro</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("giro", { required: true })}
                />
              </>
            )}

            <button type="submit" className="boton-Agregar">
              Realizar Venta
            </button>

            {/* Mostrar botón para descargar PDF si se generó */}
            {pdfFile && (
              <div className="mt-3">
                <a
                  href={`http://localhost:4000/api/ventas/pdf/${pdfFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  Descargar PDF de la Venta
                </a>
              </div>
            )}
          </form>

          {/* Botón para volver a la página principal */}
          <button className="boton-Eliminar" onClick={() => navigate("/home")}>
            Volver
          </button>
        </div>

        {/* Sección de tabla que muestra los productos agregados al carrito */}
        <div className="col-md-6">
          <h4>Productos Agregados</h4>
          <table className="table-interior">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, idx) => (
                <tr key={item.productoId}>
                  <td>{idx + 1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.cantidadVendida}</td>
                  <td>${item.precio.toFixed(2)}</td>
                  <td>${(item.precio * item.cantidadVendida).toFixed(2)}</td>
                  <td>
                    <button
                      className="boton-Eliminar"
                      onClick={() => eliminarProducto(item.productoId)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">
                  <b>Total Venta</b>
                </td>
                <td>
                  <b>${totalVenta.toFixed(2)}</b>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CrearVenta;
