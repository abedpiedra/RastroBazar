import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdministrarProveedores.module.css";
import { proveedoresRequest, deleteProveedor } from "../../../api/proveedores.js";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdministrarProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAgregarClick = () => navigate("/CrearProveedores");

  const eliminar = async (_id, apellido, nombre) => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirmación",
      text: `¿Eliminar "${apellido} ${nombre}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#c83968",
      cancelButtonColor: "#eb3f75",
      confirmButtonText: "Sí, eliminar",
    });

    if (isConfirmed) {
      try {
        const { data } = await deleteProveedor(_id);
        if (data.status === "ok") {
          toast("Proveedor eliminado correctamente", { autoClose: 2000 });
          setProveedores((prevProveedores) =>
            prevProveedores.filter((proveedor) => proveedor._id !== _id)
          );
        } else {
          toast.error("Error eliminando. Intenta de nuevo.");
        }
      } catch (error) {
        setError("No se pudo eliminar al proveedor. Intenta de nuevo.");
      }
    }
  };

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const { data } = await proveedoresRequest();
        setProveedores(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProveedores();
  }, []);

  return (
    <div className={`container-a mt-4`}>
      <div className="">
        <h3>Proveedores</h3>
        <button className="boton-Agregar" onClick={handleAgregarClick}>
          Agregar
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="table-responsive mt-3">
        <table className="table-interior">
          <thead className="">
            <tr>
              <th>N</th>
              <th>Nombre de Empresa</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor, index) => (
              <tr key={proveedor._id || index}>
                <td>{index + 1}</td>
                <td>{proveedor.nombre_empresa}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>
                  <button
                    className="boton-Agregar"
                    onClick={() => navigate(`/EditarProveedores/${proveedor._id}`)}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="boton-Eliminar"
                    onClick={() =>
                      eliminar(proveedor._id, proveedor.nombre_empresa, proveedor.email)
                    }
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

export default AdministrarProveedores;
