import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function HistorialVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/ventas");
        setVentas(data);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar las ventas");
      }
    };

    fetchVentas();
  }, []);

  return (
    <div className="container-a mt-5">
      <h3>Historial de Ventas</h3>

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
              const totalVenta = venta.productosVendidos.reduce(
                (acc, item) => acc + item.cantidadVendida * item.precioUnitario,
                0
              );

              return (
                <tr key={venta._id}>
                  <td>{venta.nventa}</td>
                  <td>{new Date(venta.fechaVenta).toLocaleString()}</td>
                  <td>{venta.tipoDocumento}</td>
                  <td>
                    {venta.tipoDocumento === "factura"
                      ? `${venta.razonSocial} (${venta.rutCliente})`
                      : "-"}
                  </td>
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
