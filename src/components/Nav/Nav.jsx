// Nav.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Nav.css";

export const Nav = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cierra el menú cuando se hace clic en un link (opcional, mejora UX móvil)
  const handleLinkClick = () => setMenuAbierto(false);

  return (
    <nav>
      {/* ---------- LOGO ---------- */}
      <div className="logo">
        <Link to={"/"} onClick={handleLinkClick}>
          <img
            src="images/logo.png"
            alt="Logo Elektro-Ventas"
            className="logo-img"
          />
        </Link>
      </div>

      {/* ---------- BOTÓN HAMBURGUESA ---------- */}
      <button
        className="menu-toggle"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* ---------- LISTA DE CATEGORÍAS ---------- */}
      <ul className={`categorias ${menuAbierto ? "abierto" : ""}`}>
        <li>
          <Link to={"/"} onClick={handleLinkClick}>
            Catálogo
          </Link>
        </li>
        <li>
          <Link to={"/category/hogar"} onClick={handleLinkClick}>
            Hogar
          </Link>
        </li>
        <li>
          <Link to={"/category/tecnología"} onClick={handleLinkClick}>
            Tecnología
          </Link>
        </li>
        <li>
          <Link to={"/category/herramientas"} onClick={handleLinkClick}>
            Herramientas
          </Link>
        </li>
        <li>
          <Link to={"/category/cocina"} onClick={handleLinkClick}>
            Cocina
          </Link>
        </li>
      </ul>
    </nav>
  );
};
