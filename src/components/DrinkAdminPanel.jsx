import React, { useState, useEffect } from "react";
import { supabase } from "../data/supabaseClient";
import styles from "../styles/DrinkAdminPanel.module.css";

const tableName = "drink";

const DrinkAdminPanel = () => {
  const [drinks, setDrinks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    alcoholic: false,
    image_url: "",
    category: "",
    price: "",
    quantity: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchDrinks = async () => {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      console.error("Error fetching drinks:", error);
    } else {
      setDrinks(data);
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = ["name", "price", "image_url"];
    const hasEmptyField = requiredFields.some((field) => !form[field]);

    if (hasEmptyField) {
      alert("Por favor, completa los campos obligatorios: nombre, precio e imagen.");
      setLoading(false);
      return;
    }

    if (editingId) {
      await supabase.from(tableName).update(form).eq("drink_id", editingId);
      setEditingId(null);
    } else {
      await supabase.from(tableName).insert([form]);
    }

    setForm({
      name: "",
      description: "",
      alcoholic: false,
      image_url: "",
      category: "",
      price: "",
      quantity: ""
    });
    await fetchDrinks();
    setLoading(false);
    setShowModal(false); // cerrar modal
  };

  const handleEdit = (drink) => {
    setForm({
      name: drink.name || "",
      description: drink.description || "",
      alcoholic: drink.alcoholic || false,
      image_url: drink.image_url || "",
      category: drink.category || "",
      price: drink.price || "",
      quantity: drink.quantity || ""
    });
    setEditingId(drink.drink_id);
    setShowModal(true); // mostrar modal al editar
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta bebida?")) {
      await supabase.from(tableName).delete().eq("drink_id", id);
      await fetchDrinks();
    }
  };

  const handleOpenModal = () => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      alcoholic: false,
      image_url: "",
      category: "",
      price: "",
      quantity: ""
    });
    setShowModal(true);
  };

  return (
    <div className={styles.adminContainer}>
      <h2>Panel de Administración de Bebidas</h2>

      <button className={styles.addButton} onClick={handleOpenModal}>
        Agregar Bebida
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{editingId ? "Editar Bebida" : "Agregar Bebida"}</h3>
            <form onSubmit={handleAddOrUpdate} className={styles.form}>
              <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleInputChange} required />
              <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleInputChange} />
              <label>
                <input type="checkbox" name="alcoholic" checked={form.alcoholic} onChange={handleInputChange} />
                ¿Es alcohólica?
              </label>
              <input type="text" name="category" placeholder="Categoría" value={form.category} onChange={handleInputChange} />
              <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleInputChange} required />
              <input type="number" name="quantity" placeholder="Cantidad" value={form.quantity} onChange={handleInputChange} />
              <input type="text" name="image_url" placeholder="URL de la imagen" value={form.image_url} onChange={handleInputChange} required />
              <div className={styles.modalButtons}>
                <button type="submit" disabled={loading}>
                  {editingId ? "Actualizar" : "Agregar"}
                </button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Alcohólica</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink.drink_id}>
              <td><img src={drink.image_url} alt={drink.name} width="50" /></td>
              <td>{drink.name}</td>
              <td>{drink.description}</td>
              <td>{drink.alcoholic ? "Sí" : "No"}</td>
              <td>{drink.category}</td>
              <td>${drink.price}</td>
              <td>{drink.quantity}</td>
              <td>
                <button onClick={() => handleEdit(drink)}>Editar</button>
                <button onClick={() => handleDelete(drink.drink_id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrinkAdminPanel;