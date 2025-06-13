import React, { useEffect, useState } from "react";
import { useNotificaciones } from "../../context/NotificacionesContext.jsx";
import { productsRequest, actualizarProducto } from "../../api/products.js"; // asume estas funciones

const AlertaNotificacion = () => {
  const { notificaciones, marcarComoLeida } = useNotificaciones();
  const [productos, setProductos] = useState([]);
  const [umbrales, setUmbrales] = useState({}); // { productId: umbral }

  useEffect(() => {
    // Cargar productos con sus umbrales para mostrar en el formulario
    const fetchProductos = async () => {
      try {
        const { data } = await productsRequest();
        setProductos(data);

        // Inicializar el estado umbrales con los valores actuales
        const initialUmbrales = {};
        data.forEach((p) => {
          initialUmbrales[p._id] = p.umbral || 0; // si no tiene umbral, 0 por defecto
        });
        setUmbrales(initialUmbrales);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleUmbralChange = (productId, value) => {
    setUmbrales((prev) => ({
      ...prev,
      [productId]: Number(value),
    }));
  };

  const handleGuardarUmbral = async (productId) => {
    try {
      const producto = productos.find((p) => p._id === productId);
      if (!producto) return;

      // Actualizamos solo el campo umbral
      const updatedProducto = {
        ...producto,
        umbral: umbrales[productId],
      };

      await actualizarProducto(productId, updatedProducto);
      alert("Umbral actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando umbral:", error);
      alert("Error al actualizar umbral");
    }
  };

  return (
    <div className="alertas-container">
      <h3>Notificaciones</h3>
      {notificaciones.map((notif) => (
        <div key={notif._id} className="alert alert-warning d-flex justify-content-between align-items-center">
          <span>{notif.mensaje}</span>
          {!notif.leida && (
            <button className="btn btn-success btn-sm" onClick={() => marcarComoLeida(notif._id)}>
              Marcar como leída
            </button>
          )}
        </div>
      ))}

      <h4 className="mt-4">Configurar umbral por producto</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Umbral</th>
            <th>Guardar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto._id}>
              <td>{producto.nombre}</td>
              <td>
                <input
                  type="number"
                  value={umbrales[producto._id] || 0}
                  onChange={(e) => handleUmbralChange(producto._id, e.target.value)}
                  min={0}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleGuardarUmbral(producto._id)}
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertaNotificacion;
