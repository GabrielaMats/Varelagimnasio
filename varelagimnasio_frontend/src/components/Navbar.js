import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/membresias">Membresías</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/transacciones">Transacciones</Link>
    </nav>
  );
}

export default Navbar;
