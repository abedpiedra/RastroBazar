import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function HistorialVentas() {
  // Estado para almacenar la lista de ventas obtenidas desde el backend
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Función asíncrona para obtener las ventas desde la API
    const fetchVentas = async () => {
      try {
        // Petición GET al endpoint de ventas
        const { data } = await axios.get("http://localhost:4000/api/ventas");
        // Guardar las ventas recibidas en el estado
        setVentas(data);
      } catch (error) {
        // Mostrar error en consola y notificación toast en caso de falla
        console.error(error);
        toast.error("Error al cargar las ventas");
      }
    };

    // Llamar a la función para cargar las ventas cuando el componente monta
    fetchVentas();
  }, []); // El arreglo vacío asegura que solo se ejecute una vez al montar

  return (
    <div className="container-a mt-5">
      <h3>Historial de Ventas</h3>

      {/* Mostrar mensaje si no hay ventas */}
      {ventas.length === 0 ? (
        <p>No hay ventas registradas aún.</p>
      ) : (
        <table className="table-interior">
          <thead className="">
            <tr>
              <th># Venta</th>
              <th>Fecha</th>
              <th>Tipo Documento</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => {
              // Calcular total de la venta sumando cantidad * precio unitario de cada producto
              const totalVenta = venta.productosVendidos.reduce(
                (acc, item) => acc + item.cantidadVendida * item.precioUnitario,
                0
              );

              return (
                <tr key={venta._id}>
                  {/* Número de venta */}
                  <td>{venta.nventa}</td>
                  {/* Fecha formateada */}
                  <td>{new Date(venta.fechaVenta).toLocaleString()}</td>
                  {/* Tipo de documento (boleta o factura) */}
                  <td>{venta.tipoDocumento}</td>
                  {/* Mostrar datos del cliente solo si es factura */}
                  <td>
                    {venta.tipoDocumento === "factura"
                      ? `${venta.razonSocial} (${venta.rutCliente})`
                      : "-"}
                  </td>
                  {/* Mostrar total con formato moneda */}
                  <td>
                    $
                    {venta.productosVendidos
                      .reduce(
                        (acc, item) =>
                          acc + (item.cantidadVendida * item.precioUnitario),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  {/* Enlace para descargar PDF si existe, si no mostrar texto */}
                  <td>
                    {venta.pdfFile ? (
                      <a
                        href={`http://localhost:4000/api/ventas/pdfs/${venta.pdfFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="boton-Agregar"
                      >
                        Descargar PDF
                      </a>
                    ) : (
                      "Sin PDF"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistorialVentas;
