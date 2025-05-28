import React from "react";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Inicia Sesión</h2>
        <form>
          <input
            type="email"
            placeholder="Correo electrónico"
            className={styles.inputField}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.inputField}
            required
          />
          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default LoginPage;
