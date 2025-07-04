import React from "react";
import styles from "../styles/Stepper.module.css";

const steps = [
  "Elegí tu paquete",
  "Elegí tus bebidas",
  "Elegí tu regalía",
  "Completá tus datos"
];

const Stepper = ({ currentStep = 1 }) => {
  return (
    <div className={styles.stepperWrapper}>
      <div className={styles.stepper}>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className={styles.stepContainer}>
              {index !== 0 && <div className={styles.connector} />}
              <div
                className={`${styles.circle} ${
                  isCompleted
                    ? styles.completed
                    : isActive
                    ? styles.active
                    : styles.inactive
                }`}
              >
                {stepNumber}
              </div>
              <span
                className={`${styles.label} ${
                  isCompleted
                    ? styles.labelCompleted
                    : isActive
                    ? styles.labelActive
                    : styles.labelInactive
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;