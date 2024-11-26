import React, { useState, useEffect } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../services/api";
import { Container, Table, Form, Button, Row, Col, Modal } from "react-bootstrap";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Obtener todos los usuarios
  useEffect(() => {
    getAll("/usuarios/")
      .then((response) => {
        setUsuarios(response);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value,
    });
  };

  // Crear un nuevo usuario
  const handleCrearUsuario = () => {
    createItem("/usuarios/", nuevoUsuario)
      .then((response) => {
        setUsuarios((prevUsuarios) => [...prevUsuarios, response]);
        setNuevoUsuario({ nombre: "", correo: "", telefono: "" });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
      });
  };

  // Manejar edición de usuario
  const handleEditarUsuario = (usuario) => {
    setModoEdicion(true);
    setUsuarioEditado(usuario);
    setNuevoUsuario({
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
    });
    setShowModal(true);
  };

  // Actualizar un usuario
  const handleActualizarUsuario = () => {
    updateItem("/usuarios/", usuarioEditado.id, nuevoUsuario)
      .then((response) => {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === usuarioEditado.id ? response : usuario
          )
        );
        setModoEdicion(false);
        setUsuarioEditado(null);
        setNuevoUsuario({ nombre: "", correo: "", telefono: "" });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
      });
  };

  // Eliminar un usuario
  const handleEliminarUsuario = (id) => {
    deleteItem("/usuarios/", id)
      .then(() => {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Gestión de Usuarios</h1>
      <Button
        variant="primary"
        className="mb-4"
        onClick={() => {
          setModoEdicion(false);
          setNuevoUsuario({ nombre: "", correo: "", telefono: "" });
          setShowModal(true);
        }}
      >
        Crear Usuario
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEditarUsuario(usuario)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleEliminarUsuario(usuario.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Crear/Editar Usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? "Editar Usuario" : "Crear Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ingrese el nombre"
                value={nuevoUsuario.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                placeholder="Ingrese el correo"
                value={nuevoUsuario.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                placeholder="Ingrese el teléfono"
                value={nuevoUsuario.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modoEdicion ? handleActualizarUsuario : handleCrearUsuario}
          >
            {modoEdicion ? "Actualizar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Usuarios;

