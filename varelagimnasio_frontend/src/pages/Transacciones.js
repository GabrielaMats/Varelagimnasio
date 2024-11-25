import React, { useState, useEffect } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../services/api";


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
    <div>
      <h1>Transacciones</h1>
      <form onSubmit={handleSubmit}>
        {/* Mostrar usuario como solo lectura si estás editando */}
        {editingId ? (
          <div>
            <label>Usuario:</label>
            <p>{usuarios.find((user) => user.id === formData.usuario_id)?.nombre}</p>
          </div>
        ) : (
          <select
            value={formData.usuario_id}
            onChange={(e) => setFormData({ ...formData, usuario_id: e.target.value })}
            required
          >
            <option value="">Selecciona un Usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          placeholder="Monto"
          value={formData.monto}
          onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) })}
          required
        />
        <select
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          required
        >
          <option value="Pago">Pago</option>
          <option value="Compra">Compra</option>
        </select>
        <input
          type="date"
          value={formData.fecha}
          onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
      </form>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
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
          <button onClick={() => handleEdit(transaccion)}>Editar</button>
          <button onClick={() => handleDelete(transaccion.id)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default Transacciones;
