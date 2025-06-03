import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/Logo-tikkiHouse.png";

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Tikki House Logo"
            className={styles.logoImage}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/quotes"
              className={`${styles.navLink} ${location.pathname === '/quotes' ? styles.active : ''}`}
            >
              Cotizaciones
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/nosotros"
              className={`${styles.navLink} ${location.pathname === '/nosotros' ? styles.active : ''}`}
            >
              Sobre el servicio
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/Login"
              className={`${styles.navLink} ${location.pathname === '/Login' ? styles.active : ''}`}
            >
              Iniciar Sesion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
