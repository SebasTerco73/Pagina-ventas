import { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";

export const ProductProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState(sessionStorage.getItem("busqueda") || "");
  const [paginaActual, setPaginaActual] = useState(
    parseInt(sessionStorage.getItem("paginaActual")) || 1
  );
  const [navActivo, setNavActivo] = useState(sessionStorage.getItem("navActivo") || "/");

  const [paginasPorCategoria, setPaginasPorCategoria] = useState(
  JSON.parse(sessionStorage.getItem("paginasPorCategoria")) || {}
);

const irAPrimeraPagina = (categoria) => {
  setPaginaActual(1);
  setPaginaPorCategoria(categoria || "home", 1);
};

  useEffect(() => {
    sessionStorage.setItem("paginasPorCategoria", JSON.stringify(paginasPorCategoria));
  }, [paginasPorCategoria]);

  const setPaginaPorCategoria = (categoria, pagina) => {
    setPaginasPorCategoria(prev => ({ ...prev, [categoria || "home"]: pagina }));
  };

  useEffect(() => sessionStorage.setItem("busqueda", busqueda), [busqueda]);
  useEffect(() => sessionStorage.setItem("paginaActual", paginaActual), [paginaActual]);
  useEffect(() => sessionStorage.setItem("navActivo", navActivo), [navActivo]);

  const resetFiltros = () => {
    setBusqueda("");
    setPaginaActual(1);
  };

  return (
    <ProductContext.Provider
      value={{
        busqueda,
        setBusqueda,
        paginaActual,
        setPaginaActual,
        navActivo,
        setNavActivo,
        resetFiltros,
        paginasPorCategoria,
        setPaginaPorCategoria,
        irAPrimeraPagina
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};