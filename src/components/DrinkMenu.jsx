import React, { useState, useEffect } from 'react';
import drinksAPI from '../data/drinksAPI.js';
import styles from '../styles/DrinkMenu.module.css';
import HorizontalSlider from './HorizontalSlider';
import DrinkDescriptionModal from './DrinkDescriptionModal';
import { AiOutlineEye } from 'react-icons/ai';

const DrinkMenu = ({ onSelectItem, selectedItems = [], maxFlavors = 0 }) => {
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');


  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const data = await drinksAPI.getAllDrinks();
        setDrinks(data);
      } catch (err) {
        console.error('Error fetching drinks:', err.message);
        setError('Error al cargar las bebidas.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  useEffect(() => {
  if (warningMessage) {
    const timer = setTimeout(() => setWarningMessage(''), 3000);
    return () => clearTimeout(timer);
  }
}, [warningMessage]);

  const handleAddClick = (drink, e) => {
    e.stopPropagation();

    // Suma total de bebidas seleccionadas
    const totalSelected = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

    if (totalSelected >= maxFlavors) {
       setWarningMessage(`Has alcanzado el máximo de ${maxFlavors} bebidas permitidas para este paquete.`);
      return;
    }

    onSelectItem({ ...drink, id: drink.drink_id });
  };

  if (loading) return <p className={styles.loadingText}>Cargando bebidas...</p>;
  if (error) return <p className={styles.errorText}>{error}</p>;

  

  return (
    <>
    {warningMessage && (
  <div className={styles.warningMessage}>
    {warningMessage}
  </div>)}
      <HorizontalSlider>
        {drinks.map((drink) => {
          const isSelected = selectedItems.find((item) => item.id === drink.drink_id);
          return (
            <div key={drink.drink_id} className={styles.drinkCard}>
              <button
                className={styles.eyeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDrink(drink);
                }}
                aria-label={`Ver detalles de ${drink.name}`}
                type="button"
              >
                <AiOutlineEye size={28} color="#235B4E" />
              </button>

              <img src={drink.image_url} alt={drink.name} className={styles.drinkImage} />
              <h3 className={styles.drinkTitle}>{drink.name}</h3>
              <div className={styles.drinkFooter}>
                <button
                  className={`${styles.addButton} ${isSelected ? styles.selected : ""}`}
                  onClick={(e) => handleAddClick(drink, e)}
                  type="button"
                >
                  {isSelected ? "Seleccionado" : "Seleccionar"}
                </button>
              </div>
            </div>
            
          );
        })}
      </HorizontalSlider>
      <DrinkDescriptionModal drink={selectedDrink} onClose={() => setSelectedDrink(null)} />
    </>
    
  );
};

export default DrinkMenu;