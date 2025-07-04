import React from "react";
import styles from "../styles/DrinkMenu.module.css";
import HorizontalSlider from "./HorizontalSlider";

const jungleDrinks = [
  {
    id: 1,
    name: "Jungle Vibes Chiliguaro",
    image_url: "/images/jungle-chiliguaro-nuevo.jpg.png", // Imagen actualizada
    price: 0,
    description: "Delicioso chiliguaro con toque jungle"
  },
  {
    id: 2,
    name: "Jungle Vibes Miguelito",
    image_url: "/images/jungle-miguelito-nuevo.jpg.png", // Imagen actualizada
    price: 0,
    description: "Refrescante miguelito con esencia jungle"
  }
];

const JungleVibes = ({ onSelectRegalia, selectedRegalia }) => {
  const handleSelect = (drink) => {
    const isCurrentlySelected = selectedRegalia && selectedRegalia.id === drink.id;
    
    if (isCurrentlySelected) {
      onSelectRegalia(null);
    } else {
      onSelectRegalia(drink);
    }
  };

  return (
    <HorizontalSlider>
      {jungleDrinks.map((drink) => (
        <div key={drink.id} className={styles.drinkCard}>
          <img
            src={drink.image_url}
            alt={drink.name}
            className={styles.drinkImage}
            onError={(e) => {
              e.target.src = '/images/placeholder-drink.jpg'; // Imagen de respaldo
            }}
          />
          <h3 className={styles.drinkTitle}>{drink.name}</h3>
          <div className={styles.drinkFooter}>
            <button
              className={`${styles.addButton} ${
                selectedRegalia?.id === drink.id ? styles.selected : ""
              }`}
              onClick={() => handleSelect(drink)}
              type="button"
            >
              {selectedRegalia?.id === drink.id ? "Seleccionado" : "Seleccionar"}
            </button>
          </div>
        </div>
      ))}
    </HorizontalSlider>
  );
};

export default JungleVibes;