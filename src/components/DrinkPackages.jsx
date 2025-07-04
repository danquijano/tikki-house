// src/components/DrinkPackages.jsx
import React, { useEffect, useState } from "react";
import styles from "../styles/DrinkPackages.module.css";
import HorizontalSlider from "./HorizontalSlider";
import packagesAPI from "../data/packagesAPI";

const DrinkPackages = ({ onSelectPackage }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packagesAPI.getAllPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSelect = (pkg) => {
    setSelectedPackageId(pkg.package_id);
    onSelectPackage(pkg); 
  };

  if (loading) {
    return <div className={styles.packagesContainer}>Cargando paquetes...</div>;
  }

  return (
    <div className={styles.packagesContainer}>
      <HorizontalSlider>
        {packages.map((pkg) => {
          const isSelected = pkg.package_id === selectedPackageId;
          return (
            <div key={pkg.package_id} className={styles.packageCard}>
              <h3 className={styles.packageTitle}>{pkg.name}</h3>

              {Array.isArray(pkg.description) && (
                <ul className={styles.packageIncludes}>
                  {pkg.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              <div className={styles.packageFooter}>
                <span className={styles.packagePrice}>₡{pkg.price}</span>
                <button
                  onClick={() => handleSelect(pkg)}
                  className={`${styles.selectButton} ${isSelected ? styles.selected : ""}`}
                >
                  {isSelected ? "Seleccionado" : "Seleccionar"}
                </button>
              </div>
            </div>
          );
        })}
      </HorizontalSlider>
    </div>
  );
};

export default DrinkPackages;