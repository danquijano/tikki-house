import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import logo from "../assets/Logo-tikkiHouse.png";
import { useAuth } from "../data/AuthProvider";
import { supabase } from "../data/supabaseClient";

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const fetchDisplayName = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from("users")
          .select("display_name")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching display_name:", error.message);
        } else {
          setDisplayName(data?.display_name);
        }
      } else {
        setDisplayName(null);
      }
    };

    fetchDisplayName();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Tikki House Logo" className={styles.logoImage} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
  <Nav>
    <Nav.Link as={Link} to="/" className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}>
      Inicio
    </Nav.Link>
    <Nav.Link as={Link} to="/quotes" className={`${styles.navLink} ${location.pathname === "/quotes" ? styles.active : ""}`}>
      Cotizaciones
    </Nav.Link>
    <Nav.Link as={Link} to="/nosotros" className={`${styles.navLink} ${location.pathname === "/nosotros" ? styles.active : ""}`}>
      Sobre el servicio
    </Nav.Link>
    {!loading && user && (
  <Nav.Link 
    as={Link} 
    to="/admin" 
    className={`${styles.navLink} ${location.pathname === "/admin" ? styles.active : ""}`}
  >
    Panel de control
  </Nav.Link>
)}
  </Nav>

  <Nav className="ms-auto">
    {!loading && user ? (
      <>
        <Nav.Link as="span" className={styles.navLink}>
          Hola, {displayName}
        </Nav.Link>
        <Nav.Link onClick={handleLogout} className={styles.navLink}>
          Cerrar Sesión
        </Nav.Link>
      </>
    ) : (
      <Nav.Link as={Link} to="/Login" className={`${styles.navLink} ${location.pathname === "/Login" ? styles.active : ""}`}>
        Iniciar Sesión
      </Nav.Link>
    )}
  </Nav>
</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
