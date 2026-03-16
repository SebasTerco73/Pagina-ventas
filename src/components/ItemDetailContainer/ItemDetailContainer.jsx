import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useState, useEffect, useCallback  } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetailContainer.css";
import { supabase } from '../../supabaseClient'

export const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({});
    const { id } = useParams();

    const recargar = useCallback(() => {
        supabase
            .from('productos')
            .select('*')
            .eq('id', id)
            .single()
            .then(({ data, error }) => {
                if (error) console.error(error)
                else setDetail(data)
            })
    }, [id])

    useEffect(() => {
        recargar()
    }, [recargar])

    return (
        <main className="card-detail">
            {Object.keys(detail).length ? (
                <ItemDetail detail={detail} onUpdate={recargar} />
            ) : (
                <p>Cargando...</p>
            )}
        </main>
    );
};