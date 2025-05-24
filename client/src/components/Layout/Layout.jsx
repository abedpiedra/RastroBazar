import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header.jsx'; // Asegúrate de que la ruta sea correcta

const Layout = ({ children }) => {
  const location = useLocation();

  console.log('Current location:', location.pathname);
  console.log('Children:', children);

  return (
    <div>
      {/* No muestra Header si está en /login o /Registro1 */}
      {location.pathname !== '/' && location.pathname !== '/Registro1' && (
        <Header />
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
