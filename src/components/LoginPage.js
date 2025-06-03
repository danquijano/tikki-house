import React, { useState } from "react";
import { supabase } from '../data/supabaseClient';
import styles from "../styles/LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  console.log("Intentando login con:", { email, password });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Error en login:", error);
      setError("Correo o contraseña incorrectos");
    } else {
      console.log("Login exitoso:", data);
      navigate("/admin");
    }
  } catch (err) {
    console.error("Error en login:", err.message);
    setError("Error al validar usuario");
  } finally {
    setLoading(false);
  }
};

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