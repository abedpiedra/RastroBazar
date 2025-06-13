import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdministrarProducts.module.css";
import { productsRequest, deleteProducto } from "../../../api/products.js";
import { verificarAlertasRequest } from "../../../api/alertas.js"; // <== Agregado aquí
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdministrarProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAgregarClick = () => navigate("/CrearProducts");

  const eliminar = async (_id, nombre) => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirmación",
      text: `¿Eliminar "producto ${nombre}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#c83968",
      cancelButtonColor: "#eb3f75",
      confirmButtonText: "Sí, eliminar",
    });

    if (isConfirmed) {
      try {
        const { data } = await deleteProducto(_id);
        if (data.message === "Producto eliminado correctamente") {
          toast("Producto eliminado correctamente", { autoClose: 2000 });
          setProducts((prev) =>
            prev.filter((producto) => producto._id !== _id)
          );
        } else {
          toast.error("Error eliminando. Intenta de nuevo.");
        }
      } catch (error) {
        setError("No se pudo eliminar el producto. Intenta de nuevo.");
      }
    }
  };

  const verificarStock = async () => {
    try {
      // 1. Llamas a la API para refrescar o verificar alertas si es necesario
      await verificarAlertasRequest();

      // 2. Recorres los productos para detectar stock bajo
      let hayStockBajo = false;

      products.forEach((producto) => {
        if (producto.stock < producto.umbral) {
          hayStockBajo = true;
          toast.warn(
            `⚠️ Producto "${producto.nombre}" está bajo en stock: ${producto.stock}`,
            { autoClose: 4000 }
          );
        }
      });

      // 3. Mensaje general si no hay ningún producto bajo el umbral
      if (!hayStockBajo) {
        toast.success("No hay productos con stock bajo.");
      }
    } catch (error) {
      toast.error("Error al verificar alertas");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productsRequest();
        setProducts(data);

        // Aquí revisamos si hay productos bajo el umbral
        data.forEach((producto) => {
          if (producto.stock < producto.umbral) {
            const toastId = `stock-${producto._id}`;
            if (!toast.isActive(toastId)) {
              toast.warn(
                `Producto "${producto.nombre}" está bajo en stock: ${producto.stock}`,
                {
                  toastId: toastId,
                  position: "top-right",
                  autoClose: 5000,
                  pauseOnHover: true,
                  draggable: true,
                  closeOnClick: true,
                }
              );
            }
          }
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={`container-a mt-4`}>
      <div className="">
        <h3>Productos</h3>
        <button className="boton-Agregar" onClick={handleAgregarClick}>
          Agregar
        </button>
        <button className="boton-Eliminar" onClick={verificarStock}>
          Verificar Stock
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="">
        <table className="table-interior">
          <thead className="">
            <tr>
              <th>ID</th>
              <th>Nombre de Producto</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Proveedor</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((producto, index) => (
              <tr key={producto._id || index}>
                <td>{index + 1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.stock}</td>
                <td>{producto.precio}</td>
                <td>{producto.proveedor}</td>
                <td>
                  <button
                    className="boton-Agregar"
                    onClick={() => navigate(`/EditarProducto/${producto._id}`)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="boton-Eliminar"
                    onClick={() => eliminar(producto._id, producto.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdministrarProducts;
