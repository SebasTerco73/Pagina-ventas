// Nav.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./Nav.css";

export const Nav = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const { resetFiltros, navActivo, setNavActivo, irAPrimeraPagina } = useContext(ProductContext);


  useEffect(() => {
  // Si estás en detalle, no cambies el navActivo
    if (location.pathname.startsWith("/detail")) return;

     // Actualizar el navActivo según la ruta actual
    if (location.pathname === "/") {
      setNavActivo("/");
      // Cada vez que cambia la ruta, actualizamos la pestaña activa
      } else if (location.pathname.startsWith("/category/")) {
        const categoryPath = location.pathname;
        setNavActivo(categoryPath);
      }
    }, [location.pathname, setNavActivo]);
    
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
          onClick={() => { handleLogoClick(); setNavActivo("/"); irAPrimeraPagina("home");}}
          className={navActivo === "/" ? "activo" : ""}>
            Catálogo
          </Link>
        </li>
        <li>
          <Link to={"/category/hogar"}
          onClick={() => { handleLinkClick(); setNavActivo("/category/hogar"); irAPrimeraPagina("hogar"); }}
          className={navActivo  === "/category/hogar" ? "activo" : ""}>
            Hogar
          </Link>
        </li>
        <li>
          <Link
            to={"/category/tecnologia"}
            onClick={() => { handleLinkClick(); setNavActivo("/category/tecnologia"); irAPrimeraPagina("tecnologia"); }}
            className={navActivo === "/category/tecnologia" ? "activo" : ""}
          >
            Tecnología
          </Link>
        </li>
        <li>
          <Link
            to={"/category/herramientas"}
            onClick={() => { handleLinkClick(); setNavActivo("/category/herramientas"); irAPrimeraPagina("herramientas"); }}
            className={navActivo === "/category/herramientas" ? "activo" : ""}
          >
            Herramientas
          </Link>
        </li>
        <li>
          <Link
            to={"/category/cocina"}
            onClick={() => { handleLinkClick(); setNavActivo("/category/cocina"); irAPrimeraPagina("cocina"); }}
            className={navActivo === "/category/cocina" ? "activo" : ""}
          >
            Cocina
          </Link>
        </li>
        <li>
          <Link
            to={"/category/juguetes"}
            onClick={() => { handleLinkClick(); setNavActivo("/category/juguetes"); irAPrimeraPagina("juguetes"); }}
            className={navActivo === "/category/juguetes" ? "activo" : ""}
          >
            Juguetes
          </Link>
        </li>
      </ul>
    </nav>
  );
};
