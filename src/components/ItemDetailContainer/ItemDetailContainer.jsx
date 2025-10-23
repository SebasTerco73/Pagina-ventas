import {ItemDetail} from "../ItemDetail/ItemDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   
import "./ItemDetailContainer.css";

export const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({});
    // Obtengo el id de los params de la URL que se envio desde el Link
    const { id } = useParams();
    
    useEffect(() => {
        // Pido los datos del JSON
        fetch('/data/products.json')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Hubo un error al cargar los productos');
            }
            // Lo convierto a un objeto JS = array de productos
            return res.json();
        })
        // Recorro el array para encontrar el producto con el id que recibo por params
        .then((data) => {
            const found = data.find((prod) => prod.id === id);
            if (found) {
                setDetail(found);
            } else {
                throw new Error('Producto no encontrado');
            }
        })
        .catch((err) => {});
    }, [id]);

    return (
        <main className="card-detail">  
        {/* // Object.keys devuelve un array con las claves del objeto, si tiene alguna clave es que no esta vacio */}
            {Object.keys(detail).length ? (
                <ItemDetail detail={detail}/>
            ) : (
                <p>Cargando...</p>
            )}      
        </main>
    );
};