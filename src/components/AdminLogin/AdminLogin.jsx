import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    const esAdmin = localStorage.getItem("admin") === "true";

    const handleLogin = (e) => {
        e.preventDefault();

        // if (password === "sophie") {
        //     localStorage.setItem("admin", "true");
        //     navigate("/");
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
                    <button onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </>
            )}
        </div>
    );
};