import React, { useState } from "react";
import { supabase } from '../data/supabaseClient';
import styles from "../styles/LoginPage.module.css";
import DrinkAdminPanel from "./DrinkAdminPanel.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Busca el usuario por email en la tabla "users"
      const { data, error } = await supabase
        .from('user')
        .select('email, password')
        .eq('email', email)
        .single();

      if (error) {
        throw error;
      }

      // Aquí comparas la contraseña ingresada con la almacenada (ojo, idealmente la contraseña debe estar hasheada)
      if (data && data.password === password) {
        setLoggedIn(true);
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en login:", err.message);
      setError("Error al validar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setError(null);
  };

  if (loggedIn) {
    return (
      <>
        <DrinkAdminPanel />
        <button onClick={handleLogout} style={{ margin: "20px" }}>
          Cerrar sesión
        </button>
      </>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Inicia Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? "Validando..." : "Entrar"}
          </button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;