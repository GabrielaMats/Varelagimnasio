import React, { useState, useEffect } from "react";
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
      console.log("Productos obtenidos:", data);
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
      setFormData({ nombre: "", categoria: "", cantidad_stock: 0, precio_unitario: 0 });
      fetchProductos();
    } catch (error) {
      console.error("Error saving producto:", error);
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setFormData(producto);
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem("/productos/", id);
      fetchProductos(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error("Error deleting producto:", error);
    }
  };
  

  // Parte de return() en Productos.js
return (
  <div>
    <h1>Gestión de Productos</h1>
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <label>
        Nombre:
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
      </label>
      <label>
        Categoría:
        <input
          type="text"
          value={formData.categoria}
          onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
          required
        />
      </label>
      <label>
        Cantidad:
        <input
          type="number"
          value={formData.cantidad_stock}
          onChange={(e) =>
            setFormData({ ...formData, cantidad_stock: parseInt(e.target.value) })
          }
          required
        />
      </label>
      <label>
        Precio:
        <input
          type="number"
          value={formData.precio_unitario}
          onChange={(e) =>
            setFormData({ ...formData, precio_unitario: parseFloat(e.target.value) })
          }
          required
        />
      </label>
      <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
    </form>

    <table border="1" style={{ marginTop: "20px", width: "100%" }}>
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
          <tr key={producto.id}>
            <td>{producto.nombre}</td>
            <td>{producto.categoria}</td>
            <td>{producto.cantidad_stock}</td>
            <td>{producto.precio_unitario}</td>
            <td>
              <button onClick={() => handleEdit(producto)}>Editar</button>
              <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}
export default Productos;
