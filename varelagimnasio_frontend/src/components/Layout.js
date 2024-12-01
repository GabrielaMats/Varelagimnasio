import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <div
        style={{
          width: "250px",
          backgroundColor: "#343a40",
          color: "#fff",
          padding: "20px",
          height: "100%",
          position: "fixed",
        }}
      >
        <h4 className="text-center">VarelaGimnasio</h4>
        <ListGroup variant="flush">
          <ListGroup.Item
            as={Link}
            to="/"
            style={{ backgroundColor: "#343a40", color: "#fff", border: "none" }}
          >
            Dashboard
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/usuarios"
            style={{ backgroundColor: "#343a40", color: "#fff", border: "none" }}
          >
            Usuarios
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/membresias"
            style={{ backgroundColor: "#343a40", color: "#fff", border: "none" }}
          >
            Membresías
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/productos"
            style={{ backgroundColor: "#343a40", color: "#fff", border: "none" }}
          >
            Productos
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/transacciones"
            style={{ backgroundColor: "#343a40", color: "#fff", border: "none" }}
          >
            Transacciones
          </ListGroup.Item>
          <ListGroup.Item
            as={Link}
            to="/facturacion"
            style={{ backgroundColor: "#343a40", color: "#fff", border: "none" }}
          >
            Facturación
          </ListGroup.Item>
        </ListGroup>
      </div>

      
      <div style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
