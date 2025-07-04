import React, { useEffect, useState } from 'react';
import { supabase } from '../data/supabaseClient';
import testimonialsAPI from '../data/testimonialsAPI';
import styles from '../styles/AdminPanel.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TestimonialsAdminPanel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', comment: '', image_url: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsAPI.getAllTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error al cargar testimonios:', error.message);
    }
  };

  const sanitizeText = (text) =>
    text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9_.-]/g, '_')
      .toLowerCase()
      .slice(0, 30);

  const uploadImageToSupabase = async (file, name) => {
    const timestamp = Date.now();
    const namePart = sanitizeText(name);
    const extension = file.name.split('.').pop();
    const filePath = `${timestamp}_${namePart}.${extension}`;

    const { error } = await supabase.storage.from('testimonials').upload(filePath, file);
    if (error) throw error;

    const { data } = supabase.storage.from('testimonials').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.image_url;

      if (imageFile && form.image_url) {
        const oldFile = form.image_url.split('/').pop();
        await supabase.storage.from('testimonials').remove([oldFile]);
      }

      if (imageFile) {
        imageUrl = await uploadImageToSupabase(imageFile, form.name);
      }

      const testimonialData = {
        name: form.name,
        comment: form.comment,
        image_url: imageUrl
      };

      if (editingId) {
        await testimonialsAPI.updateTestimonial(editingId, testimonialData);
      } else {
        await testimonialsAPI.insertTestimonial(testimonialData);
      }

      handleCancel();
      fetchTestimonials();
    } catch (error) {
      console.error('Error al guardar testimonio:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setForm({
      name: testimonial.name,
      comment: testimonial.comment,
      image_url: testimonial.image_url || ''
    });
    setImagePreviewUrl(testimonial.image_url || null);
    setImageFile(null);
  };

  const handleDelete = async (id, image_url) => {
    try {
      const fileName = image_url?.split('/').pop();
      if (fileName) await supabase.storage.from('testimonials').remove([fileName]);
      await testimonialsAPI.deleteTestimonial(id);
      fetchTestimonials();
    } catch (error) {
      console.error('Error al eliminar testimonio:', error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', comment: '', image_url: '' });
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  return (
    <div className={styles.adminContainer}>
      <h2>Administrador de Testimonios</h2>

      <form onSubmit={handleSave} className={styles.form}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nombre" 
          value={form.name} 
          onChange={handleInputChange} 
          required 
        />
        <textarea 
          name="comment" 
          placeholder="Comentario" 
          value={form.comment} 
          onChange={handleInputChange} 
          required 
        />
        
        {/* Input de archivo personalizado */}
        <div className={styles.fileInputContainer}>
          <label className={`${styles.fileInputLabel} ${imageFile ? styles.hasFile : ''}`}>
            <div className={styles.icon}>📷</div>
            <span>{imageFile ? 'Imagen seleccionada' : 'Seleccionar imagen'}</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className={styles.fileInput}
            />
          </label>
          {imagePreviewUrl && (
            <img 
              src={imagePreviewUrl} 
              alt="Vista previa" 
              className={styles.testimonialImagePreview} 
            />
          )}
        </div>

        <div className={styles.modalButtons}>
          <button type="submit" disabled={loading}>
            {editingId ? 'Actualizar' : 'Agregar'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Comentario</th>
            <th>Modificado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t.id}>
              <td>
                <img 
                  src={t.image_url} 
                  alt="Testimonio" 
                  style={{ height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                />
              </td>
              <td>{t.name}</td>
              <td className={styles.descriptionCell}>{t.comment}</td>
              <td>{new Date(t.updated_at || t.created_at).toLocaleString()}</td>
              <td>
                <div className={styles.actionsContainer}>
                  <button 
                    onClick={() => handleEdit(t)} 
                    className={styles.iconButton}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(t.id, t.image_url)} 
                    className={styles.iconButton}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialsAdminPanel;