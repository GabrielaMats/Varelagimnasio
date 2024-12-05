import React, { useState, useEffect } from "react";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";
import { getAll, createItem, updateItem, deleteItem } from "../services/api";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    cantidad_stock: 0,
    precio_unitario: 0,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const data = await getAll("/productos/");
      setProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateItem("/productos/", editingId, formData);
        setEditingId(null);
      } else {
        await createItem("/productos/", formData);
      }
      setFormData({
        nombre: "",
        categoria: "",
        cantidad_stock: 0,
        precio_unitario: 0,
      });
      fetchProductos();
    } catch (error) {
      console.error("Error saving producto:", error);
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setFormData({
      ...producto,
      precio_unitario: parseFloat(producto.precio_unitario || 0),
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem("/productos/", id);
      fetchProductos();
    } catch (error) {
      console.error("Error deleting producto:", error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Gestión de Productos</h1>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                placeholder="Categoría"
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="cantidad_stock">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad"
                value={formData.cantidad_stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cantidad_stock: parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="precio_unitario">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio"
                value={formData.precio_unitario}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio_unitario: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="primary" type="submit">
              {editingId ? "Actualizar" : "Crear"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr
              key={producto.id}
              className={producto.cantidad_stock < 5 ? "table-danger" : ""}
            >
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>{producto.cantidad_stock}</td>
              <td>{parseFloat(producto.precio_unitario || 0).toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(producto)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(producto.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Productos;


