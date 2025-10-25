// Nav.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { ProductContext } from "../../context/productContext";
import "./Nav.css";

export const Nav = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const { resetFiltros } = useContext(ProductContext);


  // Cierra el menú cuando se hace clic en un link (opcional, mejora UX móvil)
  const handleLinkClick = () => setMenuAbierto(false);

  const handleLogoClick = () => {
    resetFiltros();
    handleLinkClick();
  };

  return (
    <nav>
      {/* ---------- LOGO ---------- */}
      <div className="logo">
        <Link to={"/"} onClick={handleLogoClick}>
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
          <Link to={"/"}
          onClick={handleLogoClick}
          className={location.pathname === "/" ? "activo" : ""}>
            Catálogo
          </Link>
        </li>
        <li>
          <Link to={"/category/hogar"}
          onClick={handleLogoClick}
          className={location.pathname === "/category/hogar" ? "activo" : ""}>
            Hogar
          </Link>
        </li>
        <li>
          <Link to={"/category/tecnología"} 
          onClick={handleLogoClick}
          className={location.pathname === "/category/tecnología" ? "activo" : ""}>
            Tecnología
          </Link>
        </li>
        <li>
          <Link to={"/category/herramientas"} 
          onClick={handleLogoClick}
          className={location.pathname === "/category/herramientas" ? "activo" : ""}>
            Herramientas
          </Link>
        </li>
        <li>
          <Link to={"/category/cocina"} 
          onClick={handleLogoClick}
          className={location.pathname === "/category/cocina" ? "activo" : ""}>
            Cocina
          </Link>
        </li>
      </ul>
    </nav>
  );
};
