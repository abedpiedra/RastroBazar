import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

//banners
import Layout from "./components/Layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";

// Inicio_Registro
import Registro1 from "./Pages/Inicio_Registro/Registro1.jsx"; // Asegúrate de que la ruta sea correcta
import Login from "./Pages/Inicio_Registro/Login.jsx";

//Administrar
import AdministrarProveedores from "./Pages/Administrar/AdministrarProovedores/AdministrarProveedores.jsx";
import AdministrarProducts from "./Pages/Administrar/AdministrarProducts/AdministrarProducts.jsx";

// Agendar
import AgendaDeBox from "./Pages/Agendar/AgendaBox/AgendaDeBox.jsx";
import MapaBox from "./Pages/Agendar/Mapa_Box/Mapa_box.jsx";
import Cita_agenda from "./Pages/Agendar/Cita_agenda/Cita_agenda.jsx";
import Registro_sesion from "./Pages/Agendar/Registro_sesion/Registro_sesion.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";


import CrearProveedores from "./Pages/Administrar/AdministrarProovedores/CrearProveedores.jsx";
import CrearProducts from "./Pages/Administrar/AdministrarProducts/CrearProducts.jsx";

//Editar
import EditarProveedores from "./Pages/Administrar/AdministrarProovedores/EditarProveedores.jsx";
import EditarProducts from "./Pages/Administrar/AdministrarProducts/EditarProducts.jsx";

function App() {
  return (
    <AuthProvider>
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
              <Route path="/AdministrarProducts" element={<AdministrarProducts/>} />

              {/* Agendar*/}
              <Route path="/AgendaDeBox" element={<AgendaDeBox />} />
              <Route path="/Mapa_box" element={<MapaBox />} />
              <Route path="/Cita_agenda" element={<Cita_agenda />} />
              <Route path="/Registro_sesion" element={<Registro_sesion />} />

              {/* crear*/}
              <Route path="/CrearProveedores" element={<CrearProveedores />} />
              <Route path="/CrearProducts" element={<CrearProducts />} />

              {/* Editar*/}
              <Route path="/EditarProveedores/:id" element={<EditarProveedores />} />
              <Route path="/EditarProducts/:id" element={<EditarProducts />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

// Exporta la aplicación
export default App;
