import React, { useRef } from "react";
import styles from "../styles/HorizontalSlider.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalSlider = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;

    const scrollAmount = 300;

    if (direction === "left") {
  if (current.scrollLeft === 0) {
    current.scrollTo({ left: 0, behavior: "smooth" }); // Ir al inicio
  } else {
    current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
} else {
      const maxScrollLeft = current.scrollWidth - current.clientWidth;
      if (current.scrollLeft >= maxScrollLeft - 1) {
        current.scrollTo({ left: current.scrollWidth, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className={styles.sliderWrapper}>
      <button className={styles.arrowButton} onClick={() => scroll("left")}>
        <ChevronLeft size={28} />
      </button>
      <div className={styles.slider} ref={scrollRef}>
        {children}
      </div>
      <button className={styles.arrowButton} onClick={() => scroll("right")}>
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default HorizontalSlider;
