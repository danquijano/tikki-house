import React from 'react';
import SectionHeader from '../components/SectionHeader';
import TeamMemberCard from '../components/TeamMemberCard';
import ValueCard from '../components/ValueCard';
import jesusImage from '../assets/Fundador.jpg';
import susanaImage from '../assets/Fundadora.jpg';
import styles from '../styles/AboutUs.module.css'; 

const AboutUs = () => {
  const valores = [
    {
      icon: "✅",
      title: "Calidad",
      description: "Nos esforzamos por ofrecer productos y servicios de alto nivel, cuidando cada detalle para superar expectativas."
    },
    {
      icon: "🤝",
      title: "Compromiso",
      description: "Actuamos con responsabilidad y dedicación, cumpliendo nuestras promesas con ética y constancia."
    },
    {
      icon: "🔥",
      title: "Entusiasmo",
      description: "Nos apasiona lo que hacemos, y eso se refleja en la energía positiva que transmitimos a cada cliente."
    },
    {
      icon: "🎯",
      title: "Excelencia",
      description: "Buscamos mejorar continuamente para alcanzar los más altos estándares en cada aspecto de nuestra labor."
    },
    {
      icon: "❤️",
      title: "Pasión",
      description: "Vivimos intensamente cada proyecto, dejando huella con dedicación, emoción y entrega total."
    },
    {
      icon: "⚔️",
      title: "Competitividad",
      description: "Nos destacamos en el mercado con propuestas únicas, adaptándonos y evolucionando frente a los desafíos."
    },
    {
      icon: "🤜🤛",
      title: "Trabajo en equipo",
      description: "Creemos en la fuerza de la colaboración, donde cada miembro aporta lo mejor de sí para lograr metas comunes."
    },
    {
      icon: "🌍",
      title: "Responsabilidad social",
      description: "Contribuimos activamente al bienestar de la sociedad y del entorno, con acciones conscientes y sostenibles."
    },
  ];


   return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.description}>
  <SectionHeader title="Sobre Nosotros" />
</div>

        
        <div className={styles.description}>
          <strong>TIKI House</strong> no nació de una moda ni de una fórmula de negocios. Nació de una herencia. De manos que cocinaron con amor, de conversaciones en cocinas familiares, de recetas compartidas entre generaciones.<br /><br />
          Nació en <strong>Palmares</strong>, donde los sabores se mezclan con recuerdos, y los sueños se maceran a fuego lento.<br /><br />
          Emerson, fundador de TIKI House, fue criado entre ollas y cucharones, donde su abuela Tere le enseñó que la cocina era más que alimento: era amor, hospitalidad y memoria.<br /><br />
          Su padrino, propietario del querido <em>Restaurante Las Tejas</em> en Rincón de Zaragoza, lo introdujo al arte de la cocina. Allí aprendió disciplina, sabor y la importancia de ofrecer experiencias, no solo comida.<br /><br />
          Sus dos hermanos mayores, expertos en barras, lo acercaron al vibrante mundo de la coctelería. En 2009 se certificó como bartender coctelero en el INA.<br /><br />
          Ese mismo año, en una fiesta familiar, ofreció su primer servicio. Allí nació la chispa de un bar itinerante. En 2010, postergó el proyecto por razones familiares y continuó su formación en <strong>Gestión Turística Sostenible</strong> en la UNED.<br /><br />
          En 2021, una nueva invitación reavivó el sueño. Desde entonces, <strong>TIKI House</strong> transforma celebraciones comunes en experiencias memorables: desde bodas hasta cenas íntimas.<br /><br />
          <strong>TIKI House</strong> es más que un bar. Es una mezcla de raíces, sabor y momentos auténticos. Aquí no solo preparamos cócteles. <em>Contamos historias. Y la próxima, puede ser la tuya.</em>
        </div>

      
        <div className={styles.foundersGrid}>
          <TeamMemberCard 
            name="Emerson López Vargas" 
            position="Co-Fundador" 
            image={jesusImage} 
            className={styles.teamCard}
          />
          <TeamMemberCard 
            name="María Fernanda Alfaro Ruiz" 
            position="Co-Fundadora" 
            image={susanaImage} 
            className={styles.teamCard}
          />
        </div>
        <p className={styles.description}>
        Nuestro equipo combina técnica, estilo y un profundo respeto por el arte de mezclar. Buscamos adaptarnos a las necesidades variadas de los eventos privados con un menú de coctelería de acuerdo con la ocasión con y sin alcohol, bartenders cocteleros y saloneros. Nos distingue el compromiso y la excelencia con la cual asumimos cada evento.
Ofrecemos bebidas muy variadas como cocteles, mocteles, coctel shots, además de servicio de barra para bebidas preelaboradas y shots.

        </p>
        
        <div className={styles.missionVision}>
          <div className={styles.mission}>
            <h3>Misión</h3>
            <p>Somos una empresa de servicios en coctelería itinerante (bar to go) que hace de su evento privado una experiencia memorable activando los sentidos a través de la degustación de calidad y promoviendo la coctelería como arte y una práctica social responsable.</p>
          </div>
          
          <div className={styles.vision}>
            <h3>Visión</h3>
            <p>Ser una empresa líder en el sector de hospitalidad en alimentos y bebidas con servicios de restaurante, catering, bar to go, producción de eventos, línea de coctelería de autor y academia de bartender, además de impulsar la colaboración y cooperación empresarial y actores locales.</p>
          </div>
        </div>
         
          <SectionHeader title="Nuestros Valores" />
          <div className={styles.valuesGrid}>
            {valores.map((valor, index) => (
            <ValueCard 
            key={index}
            icon={valor.icon}
            title={valor.title}
            description={valor.description}
            className={styles.valueCard}
         />
       ))}
</div>
      </main>

  
    </div>
  );
};

export default AboutUs;