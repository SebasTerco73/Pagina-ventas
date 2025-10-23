import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import "./ItemListContainer.css";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const {categoryId} = useParams();
  const productosPorPagina = 15;

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Hubo un error al cargar los productos");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🔄 Reinicia la página al cambiar de categoría
useEffect(() => {
  setPaginaActual(1);
}, [categoryId]);

useEffect(() => {
  setBusqueda("");
}, [categoryId]);

 
 const productosFiltrados = [...products]
    .filter((prod) => {
      const coincideBusqueda = prod.name.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoryId ? prod.category === categoryId : true;
      return coincideBusqueda && coincideCategoria;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // 🔢 Paginación sobre los productos filtrados
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  return (
    <section className="app">
      <h1>{categoryId ? `Categoría: ${categoryId}` : "Catálogo"}</h1>
  

      {/* ---------- BUSCADOR ---------- */}
      <div className="buscador">
        <input 
          id="buscador"
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={handleBusquedaChange}
        />
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : productosFiltrados.length ? (
        <>
          <ItemList list={productosPagina} />

          {/* ---------- PAGINACIÓN ---------- */}
          <div className="list-container">
            <button onClick={handleAnterior} disabled={paginaActual === 1}>
              Anterior
            </button>
            <span>
              Página {paginaActual} de {totalPaginas}
            </span>
            <button onClick={handleSiguiente} disabled={paginaActual === totalPaginas}>
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
