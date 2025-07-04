import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h5>Tiki House</h5>
            <p>Creando experiencias únicas para cada ocasión.</p>
          </Col>
          <Col md={3} className="text-md-center my-3 my-md-0">
            <h6>Síguenos</h6>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", fontSize: "1.5rem" }}>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                <FaFacebookF />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                <FaWhatsapp />
              </a>
            </div>
          </Col>
          <Col md={3} className="text-md-end text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Tiki House Bar to Go. <br className="d-md-none" />
              Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
