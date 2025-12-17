import { useNavigate } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemDetail.css";

export const ItemDetail = ({detail}) => {
    const esAdmin = localStorage.getItem("admin") === "true";

    const descargarComoJpg = async () => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Necesario si la imagen viene de otro dominio
        img.src = detail.imageUrl;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const jpgUrl = canvas.toDataURL("image/jpeg", 0.92); // 92% calidad

            const link = document.createElement("a");
            link.href = jpgUrl;
            link.download = (detail.name || "imagen") + ".jpg";
            link.click();
        };
    };
    const navigate = useNavigate(); // hook para navegar

    const handleVolver = () => {
        navigate(-1); // vuelve a la home 
    };
    return (
        <div className="item-detail-container">
            <Item {...detail}>
                <p>{detail.description}</p>
                {esAdmin && (
                    <p>Precio de lista: ${detail.listPrice}</p>
                )}
            </Item>

            {/* Botón de volver */}
            <button className="btn-volver" onClick={handleVolver}>
                    Volver
            </button>

            {/* Botón para descargar */}
                {/* <a
                    href={detail.imageUrl}
                    download={detail.name || "imagen"}
                    className="download-btn"
                >
                    Descargar imagen
                </a> */}

                <button onClick={descargarComoJpg} className="download-btn">
                    Descargar imagen
                </button>
        </div>
    );
};