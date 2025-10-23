import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

// 2) Componente Presentacional, recibe lista de productos por props y los renderiza usando el componente Item

export const ItemList = ({list}) => {
    return (
        <div className="item-list-container">
            {list.length ? (
                /* Ponemos el link sin renderizar el item para evitar burbujas de navegación, doble boton */
                list.map((prod) => (
                        <Link className="item-link" to={`/detail/${prod.id}`} key={prod.id}>
                        { /* ...prod es el objeto completo, usamos spread operator */ }
                            <Item {...prod}/>
                        </Link>
                    )
                ) 
            ) : ( <p>No hay productos disponibles</p>
            )} 
        </div>
    );
};