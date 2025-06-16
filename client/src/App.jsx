import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

// Importación de componentes y páginas
// Banners y layout general
import Layout from "./components/Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";

// Páginas de inicio y registro
import Registro1 from "./Pages/Inicio_Registro/Registro1.jsx"; // Verifica ruta
import Login from "./Pages/Inicio_Registro/Login.jsx";

// Administración de proveedores y productos
import AdministrarProveedores from "./Pages/Administrar/AdministrarProveedores/AdministrarProveedores.jsx";
import AdministrarProducts from "./Pages/Administrar/AdministrarProducts/AdministrarProducts.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificacionesProvider } from "./context/NotificacionesContext.jsx";

import CrearProveedores from "./Pages/Administrar/AdministrarProveedores/CrearProveedores.jsx";
import CrearProducts from "./Pages/Administrar/AdministrarProducts/CrearProducts.jsx";

// Edición de proveedores y productos
import EditarProveedores from "./Pages/Administrar/AdministrarProveedores/EditarProveedores.jsx";
import EditarProductos from "./Pages/Administrar/AdministrarProducts/EditarProducts.jsx";

// Alertas y notificaciones
import AlertaNotificacion from "./Pages/Alertas/AlertaNotificacion.jsx"; // Verifica ruta

// Ventas y boletas
import GenerarVentas from "./Pages/VentasBoletas/GenerarVentas.jsx"; // Verifica ruta
import HistorialVentas from "./Pages/VentasBoletas/HistoriaVentas.jsx";

// Respaldos
import Backups from "./Pages/Backups/Backups.jsx"; // Verifica ruta

function App() {
  return (
    // Contextos globales para autenticación y notificaciones
    <AuthProvider>
      <NotificacionesProvider>
        <div className="App">
          {/* Router principal */}
          <BrowserRouter>
            {/* Layout común para todas las páginas */}
            <Layout>
              {/* Definición de rutas */}
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Login />} />
                <Route path="/Registro1" element={<Registro1 />} />

                {/* Página principal / home */}
                <Route path="/home" element={<Home />} />

                {/* Administración */}
                <Route
                  path="/AdministrarProveedores"
                  element={<AdministrarProveedores />}
                />
                <Route
                  path="/AdministrarProducts"
                  element={<AdministrarProducts />}
                />

                {/* Crear */}
                <Route path="/CrearProveedores" element={<CrearProveedores />} />
                <Route path="/CrearProducts" element={<CrearProducts />} />

                {/* Editar */}
                <Route
                  path="/EditarProveedores/:id"
                  element={<EditarProveedores />}
                />
                <Route
                  path="/EditarProducto/:id"
                  element={<EditarProductos />}
                />

                {/* Alertas y notificaciones */}
                <Route path="/notificaciones" element={<AlertaNotificacion />} />

                {/* Ventas */}
                <Route path="/GenerarVenta" element={<GenerarVentas />} />
                <Route path="/HistorialVenta" element={<HistorialVentas />} />

                {/* Respaldos */}
                <Route path="/Backups" element={<Backups />} />
              </Routes>
            </Layout>
          </BrowserRouter>

          {/* Contenedor para mostrar notificaciones toast */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </NotificacionesProvider>
    </AuthProvider>
  );
}

// Exportar la app principal
export default App;
