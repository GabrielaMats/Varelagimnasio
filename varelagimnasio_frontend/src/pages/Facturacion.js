import React, { useState, useEffect } from "react";
import { getAll, createItem } from "../services/api";
import { Button, Table, Form, Row, Col } from "react-bootstrap";

const Facturacion = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [formData, setFormData] = useState({
    cliente: "",
    total: 0,
    detalles: [],
  });

  useEffect(() => {
    fetchClientes();
    fetchProductos();
  }, []);

  const fetchClientes = async () => {
    try {
      const data = await getAll("/usuarios/");
      setClientes(data);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  const fetchProductos = async () => {
    try {
      const data = await getAll("/productos/");
      setProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const handleAddDetalle = (productoId) => {
    const producto = productos.find((p) => p.id === parseInt(productoId));
    if (!producto) return;

    const nuevoDetalle = {
      producto: producto.id,
      nombre: producto.nombre,
      cantidad: 1,
      precio_unitario: producto.precio_unitario,
      subtotal: producto.precio_unitario,
    };

    setDetalles((prev) => [...prev, nuevoDetalle]);
  };

  const handleCantidadChange = (index, cantidad) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index].cantidad = cantidad;
    nuevosDetalles[index].subtotal =
      cantidad * nuevosDetalles[index].precio_unitario;
    setDetalles(nuevosDetalles);
    calcularTotal(nuevosDetalles);
  };

  const calcularTotal = (detallesActuales) => {
    const total = detallesActuales.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
    setFormData({ ...formData, total });
  };

  const handleDeleteDetalle = (index) => {
    const nuevosDetalles = detalles.filter((_, i) => i !== index);
    setDetalles(nuevosDetalles);
    calcularTotal(nuevosDetalles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        cliente: formData.cliente,
        total: formData.total,
        detalles: detalles.map((detalle) => ({
          producto: detalle.producto,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
          subtotal: detalle.subtotal,
        })),
      };
      await createItem("/facturas/", payload);
      alert("Factura creada exitosamente.");
      setFormData({ cliente: "", total: 0, detalles: [] });
      setDetalles([]);
    } catch (error) {
      console.error("Error creating factura:", error);
      alert("Hubo un error al crear la factura.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Facturación</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                value={formData.cliente}
                onChange={(e) =>
                  setFormData({ ...formData, cliente: e.target.value })
                }
                required
              >
                <option value="">Selecciona un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Producto</Form.Label>
              <Form.Select
                onChange={(e) => handleAddDetalle(e.target.value)}
                value=""
              >
                <option value="">Selecciona un producto</option>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td>{detalle.nombre}</td>
              <td>
                <Form.Control
                  type="number"
                  value={detalle.cantidad}
                  onChange={(e) =>
                    handleCantidadChange(index, parseInt(e.target.value) || 1)
                  }
                  min="1"
                />
              </td>
              <td>{detalle.precio_unitario.toFixed(2)}</td>
              <td>{detalle.subtotal.toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteDetalle(index)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="text-end">Total: ${formData.total.toFixed(2)}</h3>
      <div className="text-center">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Generar Factura
        </Button>
      </div>
    </div>
  );
};

export default Facturacion;
