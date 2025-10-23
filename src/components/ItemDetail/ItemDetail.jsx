import { useNavigate } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemDetail.css";

export const ItemDetail = ({detail}) => {
    const navigate = useNavigate(); // hook para navegar

    const handleVolver = () => {
        navigate("/"); // vuelve a la home
    };
    return (
        <div className="item-detail-container">
            <Item {...detail}>
                <p>{detail.description}</p>
                <p>Precio de lista: ${detail.listPrice}</p>
                <h3 className="product-price">Precio final: ${detail.price}</h3>
            </Item>

            {/* Botón de volver */}
            <button className="btn-volver" onClick={handleVolver}>
                    Volver
            </button>
        </div>
    );
};