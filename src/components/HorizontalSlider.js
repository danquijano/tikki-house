import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/HorizontalSlider.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalSlider = ({ children }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    const { current } = scrollRef;
    if (!current) return;

    setShowLeftArrow(current.scrollLeft > 0);
    setShowRightArrow(
      current.scrollLeft < current.scrollWidth - current.clientWidth - 1
    );
  };

  useEffect(() => {
    const { current } = scrollRef;
    if (!current) return;

    current.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition(); // Verificar posición inicial

    return () => {
      current.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;

    const cardWidth = 300; // Ancho de cada tarjeta
    const gap = 32; // Espacio entre tarjetas (2rem)
    const scrollAmount = cardWidth + gap;

    if (direction === "left") {
      current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    } else {
      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      {showLeftArrow && (
        <button
          className={styles.arrowButton}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div className={styles.slider} ref={scrollRef}>
        {children}
      </div>

      {showRightArrow && (
        <button
          className={styles.arrowButton}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
};

export default HorizontalSlider;