import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import styles from "../styles/DrinkItem.module.css"; // Importación del CSS modular

const DrinkItem = ({ drink, onSelectItem }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onSelectItem({ ...drink, quantity: 1 });
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onSelectItem({ ...drink, quantity: -1 });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <button onClick={handleRemove} className={styles.button}>
          <FaMinus />
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button onClick={handleAdd} className={styles.button}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default DrinkItem;