import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AdminSelectorPanel.module.css";

const AdminSelectorPanel = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>

      <div className={styles.selectorContainer}>
        <h2 className={styles.heading}>Panel de Administración</h2>
        <p className={styles.description}>
          Gestiona tus productos, paquetes y contenido desde aquí.
        </p>

 <div className={styles.buttonGroup}>
          <button onClick={() => navigate("/admin/drinks")} className={styles.adminButton}>
            Administración de Bebidas
          </button>
          <button onClick={() => navigate("/admin/packages")} className={styles.adminButton}>
            Administración de Paquetes
          </button>
           <button onClick={() => navigate("/admin/clients")} className={styles.adminButton}>
            Registro de Cotizaciones
          </button>
           <button onClick={() => navigate("/admin/testimonials")} className={styles.adminButton}>
            Administración testimonios
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSelectorPanel;