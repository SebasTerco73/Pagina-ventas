import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { busqueda, setBusqueda, paginaActual, setPaginaActual, paginasPorCategoria, setPaginaPorCategoria } = useContext(ProductContext);
  const { categoryId } = useParams();
  const productosPorPagina = 30;

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [paginaActual]);

  useEffect(() => {
    // Siempre que cambia la categoría, volver a la página 1
    if (!categoryId) return; // si estás en la home, nada
    // si no hay una página guardada para esta categoría, la iniciamos en 1
    const paginaGuardada = paginasPorCategoria[categoryId];
    if (paginaGuardada) {
      setPaginaActual(paginaGuardada);
    } else {
      setPaginaActual(1);
      setPaginaPorCategoria(categoryId, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const cambiarPagina = (nueva) => {
    setPaginaActual(nueva);
    setPaginaPorCategoria(categoryId || "home", nueva);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const productosFiltrados = [...products]
    .filter((prod) => {
      const coincideBusqueda = prod.name.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoryId ? prod.category === categoryId : true;
      return coincideBusqueda && coincideCategoria;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <section className="app">
      <h1>{categoryId ? `Categoría: ${categoryId}` : "Catálogo"}</h1>

      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1);
          }}
        />
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : productosFiltrados.length ? (
        <>
          <ItemList list={productosPagina} />
          <div className="list-container">
            <button
              className="btn-pagina"
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              ◀
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1)
              .filter((num) => {
                // mostrar primeras y últimas, y las cercanas a la actual
                return (
                  num === 1 ||
                  num === totalPaginas ||
                  (num >= paginaActual - 1 && num <= paginaActual + 1)
                );
              })
              .map((num, i, arr) => {
                const prev = arr[i - 1];
                const showEllipsis = prev && num - prev > 1;
                return (
                  <React.Fragment key={num}>
                    {showEllipsis && <span className="ellipsis">…</span>}
                    <button
                      className={`btn-pagina ${paginaActual === num ? "activo" : ""}`}
                      onClick={() => cambiarPagina(num)}
                    >
                      {num}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              className="btn-pagina"
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              ▶
            </button>
          </div>
        </>
      ) : (
        <p>No se encontraron productos</p>
      )}
    </section>
  );
};
