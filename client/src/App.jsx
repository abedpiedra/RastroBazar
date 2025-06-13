import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

//banners
import Layout from "./components/Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";

// Inicio_Registro
import Registro1 from "./Pages/Inicio_Registro/Registro1.jsx"; // Asegúrate de que la ruta sea correcta
import Login from "./Pages/Inicio_Registro/Login.jsx";

//Administrar
import AdministrarProveedores from "./Pages/Administrar/AdministrarProveedores/AdministrarProveedores.jsx";
import AdministrarProducts from "./Pages/Administrar/AdministrarProducts/AdministrarProducts.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificacionesProvider } from "./context/NotificacionesContext.jsx";

import CrearProveedores from "./Pages/Administrar/AdministrarProveedores/CrearProveedores.jsx";
import CrearProducts from "./Pages/Administrar/AdministrarProducts/CrearProducts.jsx";

//Editar
import EditarProveedores from "./Pages/Administrar/AdministrarProveedores/EditarProveedores.jsx";
import EditarProductos from "./Pages/Administrar/AdministrarProducts/EditarProducts.jsx";
import AlertaNotificacion from "./Pages/Alertas/AlertaNotificacion.jsx"; // Asegúrate de que la ruta sea correcta

//Ventas y Boletas
import GenerarVentas from "./Pages/VentasBoletas/GenerarVentas.jsx"; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <AuthProvider>
      <NotificacionesProvider>
        <div className="App">
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Registro1" element={<Registro1 />} />

                {/* banners */}
                <Route path="/home" element={<Home />} />

                <Route
                  path="/AdministrarProveedores"
                  element={<AdministrarProveedores />}
                />
                <Route
                  path="/AdministrarProducts"
                  element={<AdministrarProducts />}
                />

                {/* crear*/}
                <Route
                  path="/CrearProveedores"
                  element={<CrearProveedores />}
                />
                <Route path="/CrearProducts" element={<CrearProducts />} />

                {/* Editar*/}
                <Route
                  path="/EditarProveedores/:id"
                  element={<EditarProveedores />}
                />
                <Route
                  path="/EditarProducto/:id"
                  element={<EditarProductos />}
                />
                <Route path="/notificaciones" element={<AlertaNotificacion />} />
                <Route path="/GenerarVenta" 
                element={<GenerarVentas />} />
              </Routes>
            </Layout>
          </BrowserRouter>
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

// Exporta la aplicación
export default App;
