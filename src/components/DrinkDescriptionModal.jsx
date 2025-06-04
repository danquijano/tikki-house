import React from "react";
import styles from "../styles/DrinkModal.module.css";

const DrinkDescriptionModal = ({ drink, onClose }) => {
  if (!drink) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <h2>{drink.name}</h2>
        <p>{drink.description}</p>
      </div>
    </div>
  );
};

export default DrinkDescriptionModal;
