import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const resetFiltros = () => {
    setBusqueda("");
    setPaginaActual(1);
  };

  return (
    <ProductContext.Provider value={{ busqueda, setBusqueda, paginaActual, setPaginaActual, resetFiltros }}>
      {children}
    </ProductContext.Provider>
  );
};