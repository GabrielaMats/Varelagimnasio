import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Usuarios from "./pages/Usuarios";
import Membresias from "./pages/Membresias";
import Transacciones from "./pages/Transacciones";
import CustomNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <CustomNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/membresias" element={<Membresias />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



