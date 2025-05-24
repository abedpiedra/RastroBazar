import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdministrarProducts.module.css";
import { productsRequest, deleteProducto } from "../../../api/products.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdministrarProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAgregarClick = () => navigate("/CrearProducts");

  const eliminar = async (_id, nproducto) => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirmación",
      text: `¿Eliminar "producto ${nproducto}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3298dc",
      cancelButtonColor: "#f14668",
      confirmButtonText: "Sí, eliminar",
    });

    if (isConfirmed) {
      try {
        const { data } = await deleteProducto(_id);
        if (data.status === "ok") {
          toast("Producto eliminada correctamente", { autoClose: 2000 });
          setProducts((prev) => prev.filter((producto) => producto._id !== _id));
        } else {
          toast.error("Error eliminando. Intenta de nuevo.");
        }
      } catch (error) {
        setError("No se pudo eliminar el producto. Intenta de nuevo.");
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await productsRequest();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={`${styles.container} mt-4`}>
      <button className="btn btn-primary" onClick={handleAgregarClick}>
        Agregar
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="table-responsive mt-3">
        <table className="table table-bordered">
          <thead className="table-light">
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
                  <button className="btn btn-danger btn-sm" onClick={() => navigate(`/EditarProducto/${producto._id}`)}>
                    Editar
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminar(producto._id, producto.nproducto)}>
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
