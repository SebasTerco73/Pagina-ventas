import { useNavigate } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemDetail.css";

export const ItemDetail = ({detail}) => {
    const navigate = useNavigate(); // hook para navegar

    const handleVolver = () => {
        navigate(-1); // vuelve a la home 
    };
    return (
        <div className="item-detail-container">
            <Item {...detail}>
                <p>{detail.description}</p>
                <p>Precio de lista: ${detail.listPrice}</p>
            </Item>

            {/* Botón de volver */}
            <button className="btn-volver" onClick={handleVolver}>
                    Volver
            </button>

            {/* Botón para descargar */}
                <a
                    href={detail.imageUrl}
                    download={detail.name || "imagen"}
                    className="download-btn"
                >
                    Descargar imagen
                </a>
            
        </div>
    );
};