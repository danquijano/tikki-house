import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ServicesSection = () => {
  return (
    <section id="eventos" className="py-5">
      <Container>
        <h2 className="text-center mb-5">Paquetes y Modalidades</h2>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  ¿Qué tipos de paquetes o servicios ofrecemos para eventos?
                </Card.Title>
                <Card.Text>
                  (por ejemplo: bodas, corporativos, cumpleaños, lanzamientos de
                  marca, etc.) Los diferentes paquetes van en función del Tamaño
                  del evento (B2C) El segmento empresarial tiene sus propios
                  paquetes (B2B)
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>¿Qué incluye cada paquete de servicio?</Card.Title>
                <Card.Text>
                  Los paquetes comúnmente incluyen la gestión de compras el
                  traslado al sitio de la cristalería los insumos equipos y
                  utensilios además de la elaboración de los cocteles.{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  • ¿Cómo manejamos la logística: ¿transporte, tiempos de
                  montaje y desmontaje?
                </Card.Title>
                <Card.Text>
                  Nuestro alcance está enfocado a la zona de occidente
                  principalmente los cantones de San Ramón, Naranjo y Palmares.
                  En nuestras políticas enfatizamos estar en el sitio 2 horas
                  antes de la hora de inicio
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>
                  • ¿Qué opciones de personalización ofrecemos (cocteles
                  temáticos, barras personalizadas, mocktails, barra seca,
                  etc.)?
                </Card.Title>
                <Card.Text>
                  La personalización aplica en la escogencia del tipo de cóctel
                  y la cantidad de estos, en su versión estándar o premium.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesSection;
