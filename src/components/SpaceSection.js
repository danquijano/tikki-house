import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import styles from "../styles/SpaceSection.module.css";

import empresa1 from "../assets/autismo.jpg";  
import empresa2 from "../assets/autismo.jpg";  

const SpacesSection = () => {
  return (
    <section id="espacios" className={styles.spaceSection}>
      <Container>
        <h2 className={styles.sectionTitle}>Alianzas Estrategicas</h2>
        <Row>
          <Col md={6}>
            <Card className={`mb-4 ${styles.card}`}>
              <Card.Img 
                variant="top" 
                src={empresa1}  
                alt="2"
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>Empresa Asociada 1</Card.Title>
                <Card.Text>2</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className={`mb-4 ${styles.card}`}>
              <Card.Img 
                variant="top" 
                src={empresa2}  
                alt="Empresa Asociada 2"
              />
              <Card.Body className={styles.cardBody}>
                <Card.Title className={styles.cardTitle}>Empresa Asociada 2</Card.Title>
                <Card.Text>2</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SpacesSection;