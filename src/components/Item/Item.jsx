// Por parametro recibimos el spread operator de las props del item
// 3) Es usado por ItemList para renderizar cada producto

import "./Item.css";

export const Item = ({ name, price, description, imageUrl, children }) => {
    const imagenPorDefecto = "/images/default.png"; // ruta de tu imagen default
    const imagenFinal = imageUrl || imagenPorDefecto;
    return <article className="item-card">
        <div className="item-info">
            <img
                src={imagenFinal}
                alt={description || name}
                onError={(e) => {
                    e.target.src = imagenPorDefecto;
                    console.log(`Imagen no encontrada de ${name}`)
                }}
                className="item-img" />
            <h2 className="product-title">{name}</h2>
            <p className="product-price">$ {price}</p>
            {children && <div className="item-actions">{children}</div>}
        </div>
    </article>;
};
