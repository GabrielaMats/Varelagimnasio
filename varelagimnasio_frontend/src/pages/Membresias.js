import React, { useState, useEffect } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../services/api";
import { Container, Row, Col, Form, Button, Table, Alert } from "react-bootstrap";

const Membresias = () => {
  const [membresias, setMembresias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    usuario_id: "",
    tipo: "Mensual",
    fecha_inicio: "",
    fecha_expiracion: "",
    precio: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchMembresias();
    fetchUsuarios();
  }, []);

  const fetchMembresias = async () => {
    try {
      const data = await getAll("/membresias/");
      setMembresias(data);
    } catch (error) {
      console.error("Error fetching membresias:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const data = await getAll("/usuarios/");
      setUsuarios(data);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.usuario_id || !formData.tipo || !formData.fecha_inicio || !formData.fecha_expiracion || !formData.precio) {
      setMessage({ type: "danger", text: "Por favor, completa todos los campos." });
      return;
    }

    try {
      const payload = {
        usuario: formData.usuario_id,
        tipo: formData.tipo,
        fecha_inicio: formData.fecha_inicio,
        fecha_expiracion: formData.fecha_expiracion,
        precio: formData.precio,
      };

      if (editingId) {
        await updateItem("/membresias/", editingId, payload);
        setEditingId(null);
        setMessage({ type: "success", text: "Membresía actualizada correctamente." });
      } else {
        await createItem("/membresias/", payload);
        setMessage({ type: "success", text: "Membresía creada correctamente." });
      }

      setFormData({ usuario_id: "", tipo: "Mensual", fecha_inicio: "", fecha_expiracion: "", precio: 0 });
      fetchMembresias();
    } catch (error) {
      console.error("Error al guardar la membresía:", error);
      setMessage({ type: "danger", text: "Ocurrió un error al guardar la membresía." });
    }
  };

  const handleEdit = (membresia) => {
    setEditingId(membresia.id);
    setFormData({
      usuario_id: membresia.usuario,
      tipo: membresia.tipo,
      fecha_inicio: membresia.fecha_inicio,
      fecha_expiracion: membresia.fecha_expiracion,
      precio: membresia.precio,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem("/membresias/", id);
      fetchMembresias();
      setMessage({ type: "success", text: "Membresía eliminada correctamente." });
    } catch (error) {
      console.error("Error deleting membresia:", error);
      setMessage({ type: "danger", text: "Ocurrió un error al eliminar la membresía." });
    }
  };

  return (
    <Container>
      <h1 className="my-4">Gestión de Membresías</h1>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <Form.Select
                value={formData.usuario_id}
                onChange={(e) => setFormData({ ...formData, usuario_id: e.target.value })}
                required
                disabled={!!editingId}
              >
                <option value="">Selecciona un Usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                required
              >
                <option value="Mensual">Mensual</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Anual">Anual</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                value={formData.fecha_inicio}
                onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fecha de Expiración</Form.Label>
              <Form.Control
                type="date"
                value={formData.fecha_expiracion}
                onChange={(e) => setFormData({ ...formData, fecha_expiracion: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {editingId ? "Actualizar" : "Crear"}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Tipo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Expiración</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {membresias.map((membresia) => (
            <tr key={membresia.id}>
              <td>{membresia.usuario_nombre}</td>
              <td>{membresia.tipo}</td>
              <td>{new Date(membresia.fecha_inicio).toLocaleDateString()}</td>
              <td>{new Date(membresia.fecha_expiracion).toLocaleDateString()}</td>
              <td>{membresia.precio}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(membresia)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(membresia.id)}
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

export default Membresias;

