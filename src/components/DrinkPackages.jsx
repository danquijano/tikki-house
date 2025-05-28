import React from "react";
import styles from "../styles/DrinkPackages.module.css";
import { packages } from "../data/packages";
import HorizontalSlider from "./HorizontalSlider";

const DrinkPackages = ({ onSelectPackage }) => {
  return (
    <HorizontalSlider>
      {packages.map((pkg) => (
        <div key={pkg.id} className={styles.packageCard}>
          <h3 className={styles.packageTitle}>{pkg.name}</h3>
          <p className={styles.packageDescription}>{pkg.description}</p>
          <ul className={styles.packageIncludes}>
            {pkg.includes.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className={styles.packageFooter}>
            <div>
              <span className={styles.packagePrice}>${pkg.price}</span>
              <span className={styles.packageDiscount}>(Ahorra ${pkg.discount})</span>
            </div>
            <button
              onClick={() => onSelectPackage(pkg)}
              className={styles.selectButton}
            >
              Seleccionar
            </button>
          </div>
        </div>
      ))}
    </HorizontalSlider>
  );
};

export default DrinkPackages;
