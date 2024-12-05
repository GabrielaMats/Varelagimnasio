import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAll } from "../services/api";

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      const data = await getAll("/movimientos/");
      setMovimientos(data);
    } catch (error) {
      console.error("Error fetching movimientos:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Movimientos de Inventario</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Tipo</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((mov, index) => (
            <tr key={index}>
              <td>{mov.producto}</td>
              <td>{mov.cantidad}</td>
              <td>{mov.tipo}</td>
              <td>{new Date(mov.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Movimientos;
