import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import drinksAPI from '../data/drinksAPI.js';
import { supabase } from '../data/supabaseClient.js';
import styles from "../styles/AdminPanel.module.css";
import AlertModal from "./AlertModal";
import { FaEye } from "react-icons/fa";

const DrinkAdminPanel = () => {
  const [drinks, setDrinks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    alcoholic: false,
    image_url: "",
    category: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [onConfirmAction, setOnConfirmAction] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const fetchDrinks = async () => {
    try {
      const data = await drinksAPI.getAllDrinks();
      setDrinks(data);
    } catch (error) {
      showAlert("Error al obtener las bebidas.", "error");
    }
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  const showAlert = (message, type = "info", onConfirm = null) => {
    setAlertMessage(message);
    setAlertType(type);
    setOnConfirmAction(() => onConfirm);
  };

  const validateInput = (text) => {
  const regex = /^[\p{L}\p{N}\s,;.:\-_!"#$%&/()=?¡¿']*$/u;
  return regex.test(text);
};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "text" || type === "textarea" || name === "category") {
      if (!validateInput(value) && value !== "") {
        showAlert("No se permiten emojis o caracteres especiales.", "warning");
        return;
      }
    }
    const newValue = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: newValue });
  };

  const uploadImageToSupabase = async (file) => {
    const filePath = `${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('drinks')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('drinks').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.image_url;

      if (imageFile) {
        imageUrl = await uploadImageToSupabase(imageFile);
      }

      const drinkData = { ...form, image_url: imageUrl };

      const requiredFields = ["name", "price", "image_url"];
      const hasEmptyField = requiredFields.some((field) => !drinkData[field]);

      if (hasEmptyField) {
        showAlert("Por favor, completa los campos obligatorios: nombre, precio e imagen.", "info");
        setLoading(false);
        return;
      }

      if (editingId) {
        await drinksAPI.updateDrink(editingId, drinkData);
        setEditingId(null);
      } else {
        await drinksAPI.insertDrink(drinkData);
      }

      await fetchDrinks();

      setForm({
        name: "",
        description: "",
        alcoholic: false,
        image_url: "",
        category: "",
        price: "",
      });
      setImageFile(null);
      setImagePreviewUrl(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving drink:", error.message);
      showAlert("Ocurrió un error al guardar la bebida.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (drink) => {
    setForm({
      name: drink.name || "",
      description: drink.description || "",
      alcoholic: drink.alcoholic || false,
      image_url: drink.image_url || "",
      category: drink.category || "",
      price: drink.price || ""
    });
    setEditingId(drink.drink_id);
    setImagePreviewUrl(drink.image_url || null);
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    showAlert("¿Estás seguro de que deseas eliminar esta bebida?", "confirm", async () => {
      try {
        await drinksAPI.deleteDrink(id);
        await fetchDrinks();
      } catch (error) {
        console.error("Error deleting drink:", error.message);
        showAlert("Ocurrió un error al eliminar la bebida.", "error");
      }
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
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
    });
    setImageFile(null);
    setImagePreviewUrl(null);
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
            <h3>{editingId ? "Editar Bebida" : "Agregar Bebida"}
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className={styles.helpButton}
              >
                <FaEye />
              </button>
            </h3>
            {showInstructions && (
              <div className={styles.instructionsModal}>
                <div className={styles.instructionsContent}>
                  <h4>Instrucciones para {editingId ? "editar" : "agregar"} bebidas</h4>
                  <ul>
                    <li>Nombre: Obligatorio, sin emojis</li>
                    <li>Descripción: Opcional, máximo 255 caracteres</li>
                    <li>Precio: Obligatorio, solo números</li>
                    <li>Imagen: Formato JPG/PNG, máximo 2MB</li>
                  </ul>
                  <button
                    onClick={() => setShowInstructions(false)}
                    className={styles.closeButton}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleAddOrUpdate} className={styles.form}>
              <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleInputChange} required />
              <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleInputChange} />
              <label>
                <input type="checkbox" name="alcoholic" checked={form.alcoholic} onChange={handleInputChange} />
                ¿Es alcohólica?
              </label>
              <input type="text" name="category" placeholder="Categoría" value={form.category} onChange={handleInputChange} />
              <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleInputChange} required />
              <div className={styles.fileInputContainer}>
          <label className={`${styles.fileInputLabel} ${imageFile ? styles.hasFile : ''}`}>
            <div>📷</div>
            <span>{imageFile ? 'Imagen seleccionada' : 'Haz clic para seleccionar una imagen'}</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className={styles.fileInput}
            />
          </label>
          {imagePreviewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img 
                src={imagePreviewUrl} 
                alt="Vista previa" 
                className={styles.imagePreview} 
              />
            </div>
          )}
        </div>

        <div className={styles.modalButtons}>
          <button type="submit" disabled={loading}>{editingId ? "Actualizar" : "Agregar"}</button>
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {drinks.map((drink) => (
            <tr key={drink.drink_id}>
              <td><img src={drink.image_url} alt={drink.name} width="50" /></td>
              <td>{drink.name}</td>
              <td className={styles.descriptionCell}>{drink.description}</td>
              <td>{drink.alcoholic ? "Sí" : "No"}</td>
              <td>{drink.category}</td>
              <td>
                <div className={styles.actionsContainer}>
                  <button onClick={() => handleEdit(drink)} className={styles.iconButton}><FaEdit /></button>
                  <button onClick={() => handleDelete(drink.drink_id)} className={styles.iconButton}><FaTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setAlertMessage("");
            setOnConfirmAction(null);
          }}
          onConfirm={() => {
            if (onConfirmAction) onConfirmAction();
            setAlertMessage("");
            setOnConfirmAction(null);
          }}
        />
      )}
    </div>
  );
};

export default DrinkAdminPanel;