import React, { useState, useEffect } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../services/api";

const Membresias = () => {
  const [membresias, setMembresias] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios para asociar membresías
  const [formData, setFormData] = useState({
    usuario_id: "",
    tipo: "Mensual",
    fecha_inicio: "",
    fecha_expiracion: "",
    precio: 0,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMembresias();
    fetchUsuarios(); // Cargar usuarios para asociar membresías
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

    // Validación: Asegúrate de que todos los campos estén completos
    if (!formData.usuario_id || !formData.tipo || !formData.fecha_inicio || !formData.fecha_expiracion || !formData.precio) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }

    try {
      const payload = {
        usuario: formData.usuario_id, // Relaciona con el usuario
        tipo: formData.tipo,
        fecha_inicio: formData.fecha_inicio,
        fecha_expiracion: formData.fecha_expiracion,
        precio: formData.precio,
      };

      if (editingId) {
        // Actualizar membresía existente
        await updateItem("/membresias/", editingId, payload);
        setEditingId(null);
      } else {
        // Crear nueva membresía
        await createItem("/membresias/", payload);
      }

      // Limpiar el formulario después de enviar
      setFormData({
        usuario_id: "",
        tipo: "Mensual",
        fecha_inicio: "",
        fecha_expiracion: "",
        precio: 0,
      });

      fetchMembresias();
    } catch (error) {
      console.error("Error al guardar la membresía:", error);
      alert("Ocurrió un error al intentar guardar la membresía. Intenta nuevamente.");
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
    } catch (error) {
      console.error("Error deleting membresia:", error);
    }
  };

  return (
    <div>
      <h1>Membresías</h1>
      <form onSubmit={handleSubmit}>
        <select
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
        </select>
        <select
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          required
        >
          <option value="Mensual">Mensual</option>
          <option value="Trimestral">Trimestral</option>
          <option value="Anual">Anual</option>
        </select>
        <input
          type="date"
          placeholder="Fecha de Inicio"
          value={formData.fecha_inicio}
          onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Fecha de Expiración"
          value={formData.fecha_expiracion}
          onChange={(e) => setFormData({ ...formData, fecha_expiracion: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
          required
        />
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
      </form>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
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
          <button onClick={() => handleEdit(membresia)}>Editar</button>
          <button onClick={() => handleDelete(membresia.id)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default Membresias;
