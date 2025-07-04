import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import packagesAPI from "../data/packagesAPI";
import { supabase } from "../data/supabaseClient";
import styles from "../styles/AdminPanel.module.css";
import AlertModal from "./AlertModal";
import { FaEye } from "react-icons/fa";

const PackageAdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    max_drinks_allowed: "",
    max_flavors: "",
    is_active: false,
    image_url: "",
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

  const fetchPackages = async () => {
    try {
      const data = await packagesAPI.getAllPackages();
      setPackages(data);
    } catch (error) {
      showAlert("Error al obtener los paquetes del servidor.", "error");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const showAlert = (message, type = "info", onConfirm = null) => {
    setAlertMessage(message);
    setAlertType(type);
    setOnConfirmAction(() => onConfirm); // guardar función para ejecutar después
  };

  const validateInput = (text) => {
  const regex = /^[\p{L}\p{N}\s,;.:\-_!"#$%&/()=?¡¿']*$/u;
  return regex.test(text);
};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'text' || type === 'textarea') {
      if (!validateInput(value)) {
        showAlert("No se permiten emojis en este campo", "warning");
        return;
      }
    }
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const uploadImageToSupabase = async (file) => {
    const filePath = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("packages")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("packages").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddOrUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = form.image_url;

    // Subir imagen si hay un archivo nuevo
    if (imageFile) {
      imageUrl = await uploadImageToSupabase(imageFile);
    }

    // Normalizar la descripción (convertir a array si es string)
    const normalizeDescription = (desc) => {
      if (!desc) return [];
      if (Array.isArray(desc)) return desc;
      return typeof desc === 'string' 
        ? desc.split(",").map(item => item.trim()).filter(item => item)
        : [];
    };

    const packageData = {
      name: form.name,
      description: normalizeDescription(form.description), // Descripción normalizada
      price: parseFloat(form.price),
      max_drinks_allowed: parseInt(form.max_drinks_allowed) || 0,
      max_flavors: parseInt(form.max_flavors) || 0,
      is_active: form.is_active,
      image_url: imageUrl || null,
    };

    // Validar campos obligatorios
    if (!packageData.name || isNaN(packageData.price)) {
      showAlert("Por favor, completa los campos obligatorios: nombre y precio", "info");
      setLoading(false);
      return;
    }

    // Insertar o actualizar
    if (editingId) {
      await packagesAPI.updatePackage(editingId, packageData);
    } else {
      await packagesAPI.insertPackage(packageData);
    }

    // Actualizar lista y resetear formulario
    await fetchPackages();
    setForm({
      name: "",
      description: "",
      price: "",
      max_drinks_allowed: "",
      max_flavors: "",
      is_active: false,
      image_url: "",
    });
    setImageFile(null);
    setImagePreviewUrl(null);
    setShowModal(false);
  } catch (error) {
    console.error("Error saving package:", error.message);
    showAlert(`Ocurrió un error al guardar el paquete: ${error.message}`, "error");
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (pkg) => {
    setForm({
      name: pkg.name || "",
      description: pkg.description || "",
      price: pkg.price || "",
      max_drinks_allowed: pkg.max_drinks_allowed || "",
      max_flavors: pkg.max_flavors || "",
      is_active: pkg.is_active || false,
      image_url: pkg.image_url || "",
    });
    setEditingId(pkg.package_id);
    setImagePreviewUrl(pkg.image_url || null);
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    showAlert("¿Estás seguro de que deseas eliminar este paquete?", "confirm", async () => {
      try {
        await packagesAPI.deletePackage(id);
        await fetchPackages();
      } catch (error) {
        showAlert("Ocurrió un error al eliminar el paquete.", "error");
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
      price: "",
      max_drinks_allowed: "",
      max_flavors: "",
      is_active: false,
      image_url: "",
    });
    setImageFile(null);
    setImagePreviewUrl(null);
    setShowModal(true);
  };

  return (
    <div className={styles.adminContainer}>
      <h2>Panel de Administración de Paquetes</h2>
      <button className={styles.addButton} onClick={handleOpenModal}>
        Agregar Paquete
      </button>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{editingId ? "Editar Paquete" : "Agregar Paquete"}
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
                  <h4>Instrucciones para {editingId ? "editar" : "agregar"} Paquetes</h4>
                  <ul>
                    <li><strong>Nombre:</strong> Campo obligatorio (ej: "Paquete Básico")</li>
                    <li><strong>Descripción:</strong> Separar características con comas</li>
                    <li><strong>Precio:</strong> Solo números, sin símbolos de moneda</li>
                    <li><strong>Máx. bebidas:</strong> Número total de bebidas incluidas</li>
                    <li><strong>Máx. sabores:</strong> Variedad de cocteles disponibles</li>
                    <li><strong>Activo:</strong> Marcar si el paquete está disponible</li>
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
              <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleInputChange} required />
              <input type="number" name="max_drinks_allowed" placeholder="Máximo de bebidas" value={form.max_drinks_allowed} onChange={handleInputChange} />
              <input type="number" name="max_flavors" placeholder="Máximo de sabores" value={form.max_flavors} onChange={handleInputChange} />
              <label>
                <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleInputChange} />
                Activo
              </label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Vista previa"
                  style={{ marginTop: "10px", maxWidth: "100%", maxHeight: "100px", objectFit: "contain" }}
                />
              )}
              <div className={styles.modalButtons}>
                <button type="submit" disabled={loading}>
                  {editingId ? "Actualizar" : "Agregar"}
                </button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Máx. Bebidas</th>
            <th>Máx. Sabores</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.package_id}>
              <td>{pkg.name}</td>
              <td className={styles.descriptionCell}>{pkg.description}</td>
              <td>₡{pkg.price}</td>
              <td>{pkg.max_drinks_allowed}</td>
              <td>{pkg.max_flavors}</td>
              <td>{pkg.is_active ? "Sí" : "No"}</td>
              <td>
                <div className={styles.actionsContainer}>
                  <button onClick={() => handleEdit(pkg)} className={styles.iconButton}><FaEdit /></button>
                  <button onClick={() => handleDelete(pkg.package_id)} className={styles.iconButton}><FaTrash /></button>
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

export default PackageAdminPanel;