import React from "react";
import heroImage from "../assets/bannerCoctel.jpg";
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
  return (
    <section 
      className={styles.heroSection}
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>BIENVENIDOS A TIKI HOUSE</h1>
        <h1 className={styles.title}>Bar To Go</h1>
        <p className="lead mb-4">Hacemos de cada evento una experiencia inolvidable</p>
        <a href="/quotes" className={`btn ${styles.btnPrimary}`}>cotización</a>
      </div>
    </section>
  );
};

export default HeroSection;