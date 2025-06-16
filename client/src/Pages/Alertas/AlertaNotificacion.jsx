import React, { useEffect, useState } from "react";
import { useNotificaciones } from "../../context/NotificacionesContext.jsx";
import { productsRequest, actualizarProducto } from "../../api/products.js"; // funciones API

const AlertaNotificacion = () => {
  // Extraemos notificaciones y función para marcar como leída desde el contexto
  const { notificaciones, marcarComoLeida } = useNotificaciones();

  // Estado local para productos y para los umbrales (stock mínimo) por producto
  const [productos, setProductos] = useState([]);
  const [umbrales, setUmbrales] = useState({}); // Ej: { productId: umbral }

  useEffect(() => {
    // Función para obtener productos desde backend y cargar umbrales iniciales
    const fetchProductos = async () => {
      try {
        const { data } = await productsRequest(); // solicitud GET productos
        setProductos(data);

        // Inicializamos los umbrales con valores actuales o 0 por defecto
        const initialUmbrales = {};
        data.forEach((p) => {
          initialUmbrales[p._id] = p.umbral || 0;
        });
        setUmbrales(initialUmbrales);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // Actualiza el valor del umbral para un producto cuando el usuario cambia el input
  const handleUmbralChange = (productId, value) => {
    setUmbrales((prev) => ({
      ...prev,
      [productId]: Number(value), // convertimos a número
    }));
  };

  // Guarda el nuevo umbral en el backend para el producto dado
  const handleGuardarUmbral = async (productId) => {
    try {
      // Buscamos el producto completo en el estado para enviar la info actualizada
      const producto = productos.find((p) => p._id === productId);
      if (!producto) return;

      // Creamos un objeto con el campo umbral actualizado
      const updatedProducto = {
        ...producto,
        umbral: umbrales[productId],
      };

      // Llamamos a la API para actualizar el producto
      await actualizarProducto(productId, updatedProducto);

      alert("Umbral actualizado correctamente");
    } catch (error) {
      console.error("Error actualizando umbral:", error);
      alert("Error al actualizar umbral");
    }
  };

  return (
    <div className="container-a mt-4">
      <h3>Notificaciones</h3>
      {/* Mostrar lista de notificaciones */}
      {notificaciones.map((notif) => (
        <div
          key={notif._id}
          className="alert alert-warning d-flex justify-content-between align-items-center"
        >
          <span>{notif.mensaje}</span>
          {/* Botón para marcar como leída solo si no está leída */}
          {!notif.leida && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => marcarComoLeida(notif._id)}
            >
              Marcar como leída
            </button>
          )}
        </div>
      ))}

      <h4 className="mt-4">Configurar umbral por producto</h4>
      <table className="table-interior">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Umbral</th>
            <th>Guardar</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar cada producto con su input para modificar el umbral */}
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
                  className="boton-Agregar"
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
