// src/components/AlertModal.jsx
import React from "react";
import styles from "../styles/AlertModal.module.css";

const AlertModal = ({ message, onClose, type = "info", onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.buttons}>
          {type === "confirm" ? (
            <>
              <button onClick={onConfirm}>Confirmar</button>
              <button onClick={onClose}>Cancelar</button>
            </>
          ) : (
            <button onClick={onClose}>Cerrar</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;