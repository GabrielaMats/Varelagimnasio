import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Membresias from "./pages/Membresias";
import Productos from "./pages/Productos";
import Transacciones from "./pages/Transacciones";
import Facturacion from "./pages/Facturacion";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/membresias" element={<Membresias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/facturacion" element={<Facturacion />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;






