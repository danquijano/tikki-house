import React, { useState, useEffect } from 'react';
import styles from '../styles/HeroCarousel.module.css';
import bar1 from "../assets/bar1.jpg";
import bar2 from "../assets/bar2.jpg";
import bar3 from "../assets/bar3.jpg";
import { useNavigate } from 'react-router-dom';

const HeroCarousel = ({ showText = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

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

  const handleCTAClick = (link) => {
    navigate('/quotes');
    setTimeout(() => {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
          {showText && (
            <div className={styles.slideContent}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <button 
                onClick={() => handleCTAClick(slide.ctaLink)} 
                className={styles.ctaButton}
              >
                {slide.ctaText}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
