import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/productContext";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { busqueda, setBusqueda, paginaActual, setPaginaActual } = useContext(ProductContext);
  const { categoryId } = useParams();
  const productosPorPagina = 20;

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPaginaActual(1);
    setBusqueda("");
  }, [categoryId]);

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
            <button onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1}>
              Anterior
            </button>
            <span>
              Página {paginaActual} de {totalPaginas}
            </span>
            <button onClick={() => setPaginaActual(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p>No se encontraron productos</p>
      )}
    </section>
  );
};
