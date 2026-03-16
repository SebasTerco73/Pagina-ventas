import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../Item/Item";
import { supabase } from "../../supabaseClient";
import "./ItemDetail.css";

export const ItemDetail = ({ detail, onUpdate }) => {
    const esAdmin = localStorage.getItem("admin") === "true";
    const navigate = useNavigate();
    const [editando, setEditando] = useState(false);
    const [confirmarEliminar, setConfirmarEliminar] = useState(false);
    const [textoConfirm, setTextoConfirm] = useState("");
    const [form, setForm] = useState({
        name: detail.name,
        price: detail.price,
        list_price: detail.list_price,
        category: detail.category,
        description: detail.description,
    });
    const [imagen, setImagen] = useState(null);
    const [nombreImagen, setNombreImagen] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImagen = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        const nombreLimpio = archivo.name
            .replace(/ñ/g, "n")
            .replace(/Ñ/g, "N")
            .replace(/ /g, "_");
        const archivoLimpio = new File([archivo], nombreLimpio, { type: archivo.type });
        setImagen(archivoLimpio);
        setNombreImagen(nombreLimpio);
    };

    const handleGuardar = async (e) => {
        e.preventDefault();
        setLoading(true);

        let image_url = detail.image_url;

        if (imagen) {
            const { data: archivosExistentes } = await supabase.storage
                .from("productos")
                .list("public", { search: imagen.name });

            const yaExiste = archivosExistentes?.some(f => f.name === imagen.name);

            if (yaExiste) {
                const confirmar = window.confirm(
                    `Ya existe una imagen llamada "${imagen.name}". ¿Querés reemplazarla?`
                );
                if (!confirmar) {
                    setLoading(false);
                    return;
                }
            }

            // Borrar imagen vieja SOLO si es distinta a la nueva
            if (detail.image_url && detail.image_url.includes("supabase")) {
                const nombreViejo = detail.image_url.split("/public/").pop();
                if (nombreViejo !== imagen.name) {
                    await supabase.storage.from("productos").remove([`public/${nombreViejo}`]);
                }
            }

            const { error: uploadError } = await supabase.storage
                .from("productos")
                .upload(`public/${imagen.name}`, imagen, { upsert: true });

            if (uploadError) {
                alert("Error al subir la imagen: " + uploadError.message);
                setLoading(false);
                return;
            }

            image_url = `https://oboeyxvpcplodguqobpw.supabase.co/storage/v1/object/public/productos/public/${imagen.name}`;
        }

        const { error } = await supabase.from("productos").update({
            name: form.name,
            price: Number(form.price) || 0,
            list_price: Number(form.list_price) || 0,
            category: form.category,
            description: form.description || "Sin detalle",
            image_url,
        }).eq("id", detail.id);

        if (error) {
            alert("Error al actualizar: " + error.message);
        } else {
            alert("✅ Producto actualizado");
            setEditando(false);
            setImagen(null);
            setNombreImagen("");
            onUpdate();
        }

        setLoading(false);
    };

    const handleEliminar = async () => {
        if (textoConfirm !== "eliminar") {
            alert('Escribí "eliminar" para confirmar');
            return;
        }

        setLoading(true);

        if (detail.image_url && detail.image_url.includes("supabase")) {
            const nombreViejo = detail.image_url.split("/public/").pop();
            await supabase.storage.from("productos").remove([`public/${nombreViejo}`]);
        }

        const { error } = await supabase.from("productos").delete().eq("id", detail.id);

        if (error) {
            alert("Error al eliminar: " + error.message);
        } else {
            alert("🗑️ Producto eliminado");
            navigate("/");
        }

        setLoading(false);
    };

    const descargarComoJpg = async () => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = detail.image_url;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const jpgUrl = canvas.toDataURL("image/jpeg", 0.92);
            const link = document.createElement("a");
            link.href = jpgUrl;
            link.download = (detail.name || "imagen") + ".jpg";
            link.click();
        };
    };

    const handleVolver = () => navigate(-1);

    return (
        <div className="item-detail-container">
            <Item {...detail}>
                <p>{detail.description}</p>
                {esAdmin && <p>Precio de lista: ${detail.list_price}</p>}
            </Item>

            <div className="botones-detalle">
                <button className="btn-volver" onClick={handleVolver}>Volver</button>
                <button onClick={descargarComoJpg} className="download-btn">Descargar imagen</button>
            </div>

            {esAdmin && (
                <div className="admin-acciones">
                    <button onClick={() => setEditando(!editando)}>
                        {editando ? "Cancelar" : "Editar producto"}
                    </button>
                    <button className="btn-eliminar" onClick={() => setConfirmarEliminar(!confirmarEliminar)}>
                        Eliminar
                    </button>
                </div>
            )}

            {
                esAdmin && confirmarEliminar && (
                    <div className="confirm-eliminar">
                        <p>Para confirmar escribí <strong>eliminar</strong></p>
                        <input
                            type="text"
                            value={textoConfirm}
                            onChange={(e) => setTextoConfirm(e.target.value)}
                            placeholder="eliminar"
                        />
                        <button
                            className="btn-eliminar"
                            onClick={handleEliminar}
                            disabled={textoConfirm !== "eliminar" || loading}
                        >
                            {loading ? "Eliminando..." : "Confirmar eliminación"}
                        </button>
                    </div>
                )
            }

            {
                esAdmin && editando && (
                    <form onSubmit={handleGuardar} className="form-editar">
                        <h3>Editar producto</h3>
                        <input name="name" value={form.name} onChange={handleChange} required />
                        <input name="price" type="number" min="0" value={form.price} onChange={handleChange} />
                        <input name="list_price" type="number" min="0" value={form.list_price} onChange={handleChange} />
                        <select name="category" value={form.category} onChange={handleChange}>
                            <option value="hogar">Hogar</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="herramientas">Herramientas</option>
                            <option value="cocina">Cocina</option>
                            <option value="infantil">Infantil</option>
                        </select>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
                        <input type="file" accept="image/*" onChange={handleImagen} />
                        {nombreImagen && <small style={{ color: "#aaa" }}>Archivo: {nombreImagen}</small>}
                        <button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </form>
                )
            }
        </div >
    );
};