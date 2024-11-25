import React from "react";
import { Link } from "react-router-dom";

function Home({ children }) {
  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li>
            <Link to="/usuarios" style={styles.link}>
              Usuarios
            </Link>
          </li>
          <li>
            <Link to="/productos" style={styles.link}>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/transacciones" style={styles.link}>
              Transacciones
            </Link>
          </li>
          <li>
            <Link to="/membresias" style={styles.link}>
              Membresías
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div style={styles.content}>{children}</div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2024 VarelaGimnasio. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// Estilos en línea para el diseño
const styles = {
  navbar: {
    backgroundColor: "#333",
    padding: "10px",
    color: "white",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  },
  content: {
    minHeight: "80vh",
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  footer: {
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
  },
};

export default Home;

