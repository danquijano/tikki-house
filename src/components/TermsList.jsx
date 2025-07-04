import React, { useEffect, useState } from "react";
import styles from "../styles/AboutService.module.css";
import SectionHeader from "./SectionHeader";
import termsAPI from "../data/termsAPI";

const TermsList = () => {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await termsAPI.getAllTerms();
        setTerms(data);
      } catch (error) {
        console.error("Error al cargar Términos:", error.message);
      }
    };

    fetchTerms();
  }, []);

  return (
    <>
      <div className={styles.description}>
        <SectionHeader title="Términos y Condiciones de Servicio" />
      </div>

      <div className={styles.termsContainer}>
        {terms.map((term) => (
          <div key={term.id} className={styles.termSection}>
            <h3 className={styles.termTitle}>{term.question_text}</h3>
            <p className={styles.termText}>{term.answer_text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TermsList;
