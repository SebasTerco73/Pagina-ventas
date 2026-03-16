import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./AdminLogin.css";

export const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [form, setForm] = useState({
        name: "",
        price: "",
        list_price: "",
        category: "hogar",
        description: ""
    });
    const [imagen, setImagen] = useState(null);
    const [nombreImagen, setNombreImagen] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
    const esAdmin = localStorage.getItem("admin") === "true";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === PASSWORD) {
            localStorage.setItem("admin", "true");
            navigate("/");
        } else {
            alert("Contraseña incorrecta");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin");
        setPassword("");
        navigate("/");
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        let image_url = "";

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

        const { error } = await supabase.from("productos").insert({
            name: form.name,
            price: Number(form.price) || 0,
            list_price: Number(form.list_price) || 0,
            category: form.category,
            description: form.description || "Sin detalle",
            image_url: image_url || "",
        });

        if (error) {
            alert("Error al crear el producto: " + error.message);
        } else {
            alert("✅ Producto creado correctamente");
            setForm({ name: "", price: "", list_price: "", category: "hogar", description: "" });
            setImagen(null);
            setNombreImagen("");
            setMostrarFormulario(false);
        }

        setLoading(false);
    };

    return (
        <div className="admin-login">
            {!esAdmin ? (
                <form onSubmit={handleLogin}>
                    <h2>Acceso administrador</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        className="admin-login-input"
                    />
                    <button type="submit">Entrar</button>
                </form>
            ) : (
                <>
                    <h2>Sesión de administrador activa</h2>
                    <div className="admin-botones">
                        <button onClick={handleLogout}>Cerrar sesión</button>
                        <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                            {mostrarFormulario ? "Cancelar" : "Nuevo producto"}
                        </button>
                    </div>

                    {mostrarFormulario && (
                        <form onSubmit={handleSubmit}>
                            <h3>Nuevo producto</h3>
                            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                            <input name="price" placeholder="Precio" type="number" min="0" value={form.price} onChange={handleChange} />
                            <input name="list_price" placeholder="Precio de lista" type="number" min="0" value={form.list_price} onChange={handleChange} />
                            <select name="category" value={form.category} onChange={handleChange}>
                                <option value="hogar">Hogar</option>
                                <option value="tecnologia">Tecnología</option>
                                <option value="herramientas">Herramientas</option>
                                <option value="cocina">Cocina</option>
                                <option value="infantil">Infantil</option>
                            </select>
                            <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} rows={4} />
                            <input type="file" accept="image/*" onChange={handleImagen} />
                            {nombreImagen && <small style={{ color: "#aaa" }}>Archivo: {nombreImagen}</small>}
                            <button type="submit" disabled={loading}>
                                {loading ? "Guardando..." : "Crear producto"}
                            </button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};