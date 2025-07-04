import React, { useEffect, useState } from 'react';
import testimonialsAPI from '../data/testimonialsAPI';
import HorizontalSlider from './HorizontalSlider';
import styles from '../styles/AboutService.module.css';
import SectionHeader from './SectionHeader';
import HeroCarousel from "../components/HeroCarousel";

const TestimonialsSlider = () => {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialsAPI.getAllTestimonials();
        setTestimonios(data || []);
      } catch (err) {
        console.error("Error al cargar testimonios:", err.message);
        setError("No se pudieron cargar los testimonios");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <p className={styles.description}>Cargando testimonios...</p>;
  if (error) return <p className={styles.description}>{error}</p>;
  if (testimonios.length === 0) return <p className={styles.description}>No hay testimonios disponibles</p>;

  return (
    <>
      <HeroCarousel /> {/* ✅ AQUI se coloca correctamente, justo arriba del contenido */}
      
      <div style={{ textAlign: 'center' }}>
        <SectionHeader title="Testimonios de nuestros clientes" />
      </div>

      <HorizontalSlider>
        {testimonios.map((testimonio) => (
          <div key={testimonio.id} className={styles.testimonyCard}>
            <img
              src={testimonio.image_url}
              alt={testimonio.name}
              className={styles.testimonyImage}
            />
            <h3 className={styles.testimonyName}>{testimonio.name}</h3>
            <p className={styles.testimonyComment}>{testimonio.comment}</p>
          </div>
        ))}
      </HorizontalSlider>
    </>
  );
};

export default TestimonialsSlider;
