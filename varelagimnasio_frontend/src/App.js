import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Usuarios from "./pages/Usuarios";
import Membresias from "./pages/Membresias";
import Transacciones from "./pages/Transacciones";

function App() {
  return (
    <Router>
      <Home>
        <Routes>
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/membresias" element={<Membresias />} />
        </Routes>
      </Home>
    </Router>
  );
}

export default App;


