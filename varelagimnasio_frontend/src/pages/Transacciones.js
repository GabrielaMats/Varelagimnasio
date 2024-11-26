import React, { useState, useEffect } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../services/api";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";

const Transacciones = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios para el dropdown
  const [formData, setFormData] = useState({
    usuario_id: "",
    monto: "",
    tipo: "Pago",
    fecha: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTransacciones();
    fetchUsuarios(); // Obtener lista de usuarios para asociar transacciones
  }, []);

  const fetchTransacciones = async () => {
    try {
      const data = await getAll("/transacciones/");
      setTransacciones(data);
    } catch (error) {
      console.error("Error fetching transacciones:", error);
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

    if (!formData.usuario_id || !formData.monto || !formData.tipo || !formData.fecha) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    try {
      const payload = {
        usuario: formData.usuario_id,
        monto: formData.monto,
        tipo: formData.tipo,
        fecha: new Date(formData.fecha).toISOString(), // Convertir la fecha a ISO para evitar problemas
      };

      if (editingId) {
        await updateItem("transacciones", editingId, payload);
        setEditingId(null);
      } else {
        await createItem("/transacciones/", payload);
      }

      setFormData({
        usuario_id: "",
        monto: "",
        tipo: "Pago",
        fecha: "",
      });

      fetchTransacciones();
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      alert("Ocurrió un error al intentar guardar la transacción. Intenta nuevamente.");
    }
  };

  const handleEdit = (transaccion) => {
    setEditingId(transaccion.id);
    setFormData({
      usuario_id: transaccion.usuario,
      monto: transaccion.monto,
      tipo: transaccion.tipo,
      fecha: new Date(transaccion.fecha).toISOString().split("T")[0], // Obtén la fecha correcta en formato ISO
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem("/transacciones/", id);
      fetchTransacciones();
    } catch (error) {
      console.error("Error deleting transaccion:", error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Gestión de Transacciones</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                as="select"
                value={formData.usuario_id}
                onChange={(e) => setFormData({ ...formData, usuario_id: e.target.value })}
                disabled={!!editingId} // Bloquea si estás editando
                required
              >
                <option value="">Selecciona un Usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Monto"
                value={formData.monto}
                onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                required
              >
                <option value="Pago">Pago</option>
                <option value="Compra">Compra</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button type="submit" variant="primary" block>
              {editingId ? "Actualizar" : "Crear"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Monto</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((transaccion) => (
            <tr key={transaccion.id}>
              <td>{transaccion.usuario_nombre}</td>
              <td>{transaccion.monto}</td>
              <td>{transaccion.tipo}</td>
              <td>{new Date(transaccion.fecha).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(transaccion)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(transaccion.id)}
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

export default Transacciones;
