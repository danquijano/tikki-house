import styles from "../styles/QuoteForm.module.css";
import { useState, useRef } from "react";

const QuoteForm = ({
  selectedItems = [],
  selectedPackage = null,
  selectedRegalia = null,
  onRemoveItem = () => { },
  onRemovePackage = () => { },
  onRemoveRegalia = () => { },
  onSubmit = () => { }
}) => {
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

    if (!selectedPackage && selectedItems.length === 0 && !selectedRegalia) {
      newErrors.selection = "Selecciona al menos una bebida, paquete o regalía";
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
        selectedPackage,
        selectedRegalia
      };
      onSubmit(order, total);
    }
  };

  const getTotal = () => {
    const packageTotal = selectedPackage ? selectedPackage.price : 0;
    const regaliaTotal = selectedRegalia ? selectedRegalia.price : 0;
    return packageTotal + regaliaTotal;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.quoteForm} ref={formRef}>
      {/* Campos del formulario */}
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

      <div className="mb-6">
        <label htmlFor="eventDescription" className={styles.label}>Descripción del Evento</label>
        <textarea id="eventDescription" name="eventDescription" value={formData.eventDescription} onChange={handleChange} rows={4} className={styles.input} placeholder="Ej: Fiesta de cumpleaños para 50 personas..." />
      </div>

      {/* Resumen de pedido */}
      <div className={`${styles.summary} mb-6 p-4 bg-gray-50 rounded-lg`}>
        <h4 className="font-bold text-lg mb-3">Resumen de tu pedido:</h4>

        {selectedPackage && (
          <div className="mb-3">
            <p className="font-semibold mb-2">Paquete seleccionado:</p>
            <div className="flex justify-between items-start p-3 bg-white rounded-lg shadow-sm">
              <div>
                <p className="font-medium">
                  {selectedPackage.name} - <span className="text-green-700">${selectedPackage.price}</span>
                </p>
                <ul className="list-disc pl-5 mt-1">
                  {Array.isArray(selectedPackage.available_drinks) &&
                    selectedPackage.available_drinks.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600">{item}</li>
                    ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={onRemovePackage}
                className="ml-4 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded transition-colors whitespace-nowrap"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        {selectedItems.length > 0 && (
          <div className="mb-3">
            <p className="font-semibold mb-2">Bebidas seleccionadas:</p>
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600 ml-2"> - x{item.quantity}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-4 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedRegalia && (
          <div className="mb-3 p-3 bg-white rounded-lg shadow-sm">
            <p className="font-semibold mb-1">Regalía seleccionada:</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{selectedRegalia.name}</p>
              </div>
              <button
                type="button"
                onClick={onRemoveRegalia}
                className="ml-4 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        {!selectedPackage && selectedItems.length === 0 && !selectedRegalia && (
          <p className="text-red-500 py-2">{errors.selection || "No hay ítems seleccionados."}</p>
        )}

        {(selectedPackage || selectedItems.length > 0 || selectedRegalia) && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="font-semibold text-lg">Total: <span className="text-green-700">${getTotal()}</span></p>
          </div>
        )}
      </div>

      <button type="submit" className={`${styles.button} w-full py-3 text-lg`}>Enviar Cotización</button>
    </form>
  );
};

export default QuoteForm;