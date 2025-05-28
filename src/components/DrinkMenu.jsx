import React, { useState, useEffect } from "react";
import { supabase } from '../data/supabaseClient';
import styles from "../styles/DrinkMenu.module.css";
import HorizontalSlider from "./HorizontalSlider";
import DrinkDescriptionModal from "./DrinkDescriptionModal";

const tableName = "drink"; // Tabla 

const DrinkMenu = ({ onSelectItem }) => {
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*');

        if (error) throw error;

        setDrinks(data);
      } catch (err) {
        console.error("Error fetching drinks:", err.message);
        setError("Error al cargar las bebidas.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  if (loading) return <p className={styles.loadingText}>Cargando bebidas...</p>;
  if (error) return <p className={styles.errorText}>{error}</p>;

  return (
    <>
      <HorizontalSlider>
        {drinks.map((drink) => (
          <div
            key={drink.drink_id}
            className={styles.drinkCard}
            onClick={() => setSelectedDrink(drink)}
          >
            <img
              src={drink.image_url}
              alt={drink.name}
              className={styles.drinkImage}
            />
            <h3 className={styles.drinkTitle}>{drink.name}</h3>
            <div className={styles.drinkFooter}>
              <span className={styles.drinkPrice}>${drink.price}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectItem(drink);
                }}
                className={styles.addButton}
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </HorizontalSlider>

      <DrinkDescriptionModal
        drink={selectedDrink}
        onClose={() => setSelectedDrink(null)}
      />
    </>
  );
};

export default DrinkMenu;
