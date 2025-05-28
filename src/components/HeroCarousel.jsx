import React, { useState, useEffect } from 'react';
import styles from '../styles/HeroCarousel.module.css';
import bar1 from "../assets/bar1.jpg";
import bar2 from "../assets/bar2.jpg";
import bar3 from "../assets/bar3.jpg";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: bar1,
      title: 'Paquetes de Bebidas Premium',
      subtitle: 'Ahorra hasta un 20% con nuestros combos especiales',
      ctaText: 'Ver Paquetes',
      ctaLink: '#packages'
    },
    {
      image: bar2,
      title: 'Bebidas Artesanales',
      subtitle: 'Selección de las mejores cervezas y cócteles',
      ctaText: 'Ver Menú',
      ctaLink: '#drinks'
    },
    {
      image: bar3,
      title: 'Servicio Personalizado',
      subtitle: 'Cotiza tu evento con nuestros expertos',
      ctaText: 'Solicitar Cotización',
      ctaLink: '#quote-section'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={styles.carouselContainer}>
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={styles.slideContent}>
            <h1 className={styles.title}>{slide.title}</h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <a href={slide.ctaLink} className={styles.ctaButton}>
              {slide.ctaText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;