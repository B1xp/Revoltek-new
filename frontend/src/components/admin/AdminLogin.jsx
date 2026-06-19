import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LogIn, Lock, User, ArrowLeft } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { username, password });
      localStorage.setItem("rvtk_token", data.token);
      navigate("/admin");
    } catch (err) {
      const d = err.response?.data?.detail;
      setError(typeof d === "string" ? d : "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rv admin-auth">
      <div className="panel admin-login-card">
        <Link to="/" className="admin-back" data-testid="admin-back-home">
          <ArrowLeft size={16} /> Volver a la web
        </Link>
        <img src="/assets/icon_transparent.png" alt="RevolTek" className="admin-logo" />
        <h1 className="display">Panel de administración</h1>
        <p className="admin-sub">Accede para editar los precios de las reparaciones.</p>

        <form onSubmit={submit}>
          <label className="admin-label">Usuario</label>
          <div className="admin-input-wrap">
            <User size={18} />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu usuario"
              data-testid="admin-username"
              autoComplete="username"
            />
          </div>

          <label className="admin-label">Contraseña</label>
          <div className="admin-input-wrap">
            <Lock size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              data-testid="admin-password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="admin-error" data-testid="admin-error">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} data-testid="admin-login-btn" style={{ width: "100%", justifyContent: "center" }}>
            <LogIn size={18} /> {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
