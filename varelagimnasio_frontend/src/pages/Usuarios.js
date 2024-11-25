import React, { useState, useEffect } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../services/api";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  // Obtener todos los usuarios
  useEffect(() => {
    getAll("/usuarios/")
      .then((response) => {
        setUsuarios(response); // Asegúrate de que el formato sea correcto
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
        const nuevoUsuarioCreado = response; // Asegúrate de que esta respuesta contenga el usuario creado
        setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuarioCreado]);
        setNuevoUsuario({
          nombre: "",
          correo: "",
          telefono: "",
        });
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
        setNuevoUsuario({
          nombre: "",
          correo: "",
          telefono: "",
        });
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
    <div>
      <h1>Gestión de Usuarios</h1>
      {/* Formulario para agregar o editar usuarios */}
      <div>
        <h2>{modoEdicion ? "Editar Usuario" : "Crear Usuario"}</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo Electrónico"
          value={nuevoUsuario.correo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={nuevoUsuario.telefono}
          onChange={handleChange}
        />
        <button onClick={modoEdicion ? handleActualizarUsuario : handleCrearUsuario}>
          {modoEdicion ? "Actualizar" : "Crear"}
        </button>
      </div>

      {/* Lista de usuarios */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
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
        <button onClick={() => handleEditarUsuario(usuario)}>Editar</button>
        <button onClick={() => handleEliminarUsuario(usuario.id)}>Eliminar</button>
      </td>
    </tr>
  ))}
</tbody>


      </table>
    </div>
  );
}

export default Usuarios;


