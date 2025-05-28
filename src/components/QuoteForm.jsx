import React, { useState, useRef } from "react";
import styles from "../styles/QuoteForm.module.css";
import { generatePdf } from "../components/generatePdf.js";
import { uploadPdfToSupabase } from "../components/uploadPdfToSupabase.js";

const QuoteForm = ({ onSubmit, selectedItems = [], selectedPackages = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    eventDate: "",
    eventTime: "",
    hours: "",
    staffRequired: "",
    eventDescription: "",
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono es requerido";
    if (!formData.address.trim()) newErrors.address = "Dirección es requerida";
    if (!formData.eventDate) newErrors.eventDate = "Fecha requerida";
    if (!formData.eventTime) newErrors.eventTime = "Hora requerida";
    if (!formData.hours || isNaN(formData.hours)) newErrors.hours = "Duración inválida";

    if (selectedPackages.length === 0 && selectedItems.length === 0) {
      newErrors.selection = "Selecciona al menos una bebida o paquete";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Por favor completa los campos requeridos");
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    const total = getTotal();
    const order = {
      ...formData,
      selectedItems,
      selectedPackages,
    };

    try {
      const blob = await generatePdf(order, total);
      const filename = `cotizaciones/${formData.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`;

      const pdfUrl = await uploadPdfToSupabase(blob, filename);

     
      const phoneNumber = "50662278914"; 
      const message = `¡Hola! Te comparto la cotización del evento:\n${pdfUrl}`;

     
      window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    } catch (error) {
      console.error("Error al generar o subir el PDF:", error);
      alert("Ocurrió un error al generar o subir la cotización. Intenta nuevamente.");
    }
  }
};



  const getTotal = () => {
    const drinksTotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const packagesTotal = selectedPackages.reduce((sum, pack) => sum + pack.price, 0);
    return drinksTotal + packagesTotal;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.quoteForm} ref={formRef}>
      {/* Campos cliente */}
      <div className="mb-4">
        <label htmlFor="name" className={styles.label}>Nombre Completo *</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`${styles.input} ${errors.name ? "border-red-500" : ""}`} />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className={styles.label}>Email *</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${styles.input} ${errors.email ? "border-red-500" : ""}`} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="phone" className={styles.label}>Teléfono *</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`${styles.input} ${errors.phone ? "border-red-500" : ""}`} />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className={styles.label}>Dirección del Evento *</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={`${styles.input} ${errors.address ? "border-red-500" : ""}`} />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="eventDate" className={styles.label}>Fecha del Evento *</label>
        <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} className={`${styles.input} ${errors.eventDate ? "border-red-500" : ""}`} />
        {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="eventTime" className={styles.label}>Hora del Evento *</label>
        <input type="time" id="eventTime" name="eventTime" value={formData.eventTime} onChange={handleChange} className={`${styles.input} ${errors.eventTime ? "border-red-500" : ""}`} />
        {errors.eventTime && <p className="text-red-500 text-sm mt-1">{errors.eventTime}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="hours" className={styles.label}>Duración (horas) *</label>
        <input type="number" id="hours" name="hours" value={formData.hours} onChange={handleChange} className={`${styles.input} ${errors.hours ? "border-red-500" : ""}`} />
        {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="staffRequired" className={styles.label}>Personal requerido (opcional)</label>
        <input type="number" id="staffRequired" name="staffRequired" value={formData.staffRequired} onChange={handleChange} className={styles.input} />
      </div>

      <div className="mb-6">
        <label htmlFor="eventDescription" className={styles.label}>Descripción del Evento</label>
        <textarea id="eventDescription" name="eventDescription" value={formData.eventDescription} onChange={handleChange} rows={4} className={styles.input} placeholder="Ej: Fiesta de cumpleaños para 50 personas..." />
      </div>

      <div className={`${styles.summary} mb-6 p-4 bg-gray-50 rounded-lg`}>
        <h4 className="font-bold text-lg mb-3">Resumen de tu pedido:</h4>

        {selectedPackages.length > 0 && (
          <div className="mb-3">
            <p className="font-semibold">Paquetes seleccionados:</p>
            {selectedPackages.map((pkg, idx) => (
              <div key={idx}>
                <p>{pkg.name} - <span className="text-green-700">${pkg.price}</span></p>
                <ul className="list-disc pl-5">
                  {pkg.includes.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {selectedItems.length > 0 && (
          <div>
            <p className="font-semibold">Bebidas seleccionadas:</p>
            <ul className="list-disc pl-5">
              {selectedItems.map((item, idx) => (
                <li key={idx}>{item.name} x{item.quantity} - <span className="text-green-700">${item.price * item.quantity}</span></li>
              ))}
            </ul>
          </div>
        )}

        {selectedPackages.length === 0 && selectedItems.length === 0 && (
          <p className="text-red-500">{errors.selection || "No hay ítems seleccionados."}</p>
        )}

        {(selectedPackages.length > 0 || selectedItems.length > 0) && (
          <p className="mt-2 font-semibold">Total: <span className="text-green-700">${getTotal()}</span></p>
        )}
      </div>

      <button type="submit" className={styles.button}>Enviar Cotización</button>
    </form>
  );
};



export default QuoteForm;
