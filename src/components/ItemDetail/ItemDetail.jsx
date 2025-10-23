import { Item } from "../Item/Item";
import "./ItemDetail.css";

export const ItemDetail = ({detail}) => {
    return (
        <Item {...detail}>
            <p>{detail.description}</p>
            <p>Precio de lista: ${detail.listPrice}</p>
            <h3 className="product-price">Precio final: ${detail.price}</h3>
        </Item>
       
    );
};