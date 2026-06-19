import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Save, LogOut, Check, ExternalLink, Plus, X } from "lucide-react";
import { CATALOG } from "../../data/site";
import { useCatalog } from "../../context/CatalogContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const clone = (o) => JSON.parse(JSON.stringify(o));
const num = (v) => (v === "" ? 0 : Number(v));

function NumBox({ value, onChange }) {
  return (
    <div className="adm-num">
      <input type="number" min="0" value={value} onChange={(e) => onChange(num(e.target.value))} />
      <i>€</i>
    </div>
  );
}

function PhoneRow({ m, onChange, onDelete }) {
  return (
    <div className="adm-row" data-testid="model-row">
      <input className="adm-name" value={m.name} placeholder="Modelo" onChange={(e) => onChange("name", e.target.value)} />
      <NumBox value={m.screen} onChange={(v) => onChange("screen", v)} />
      <NumBox value={m.battery} onChange={(v) => onChange("battery", v)} />
      <button className="adm-del" onClick={onDelete} title="Eliminar"><X size={16} /></button>
    </div>
  );
}

function ServiceRow({ s, onChange, onDelete }) {
  return (
    <div className="adm-row" data-testid="service-row">
      <input className="adm-name" value={s.name} placeholder="Servicio" onChange={(e) => onChange("name", e.target.value)} />
      <NumBox value={s.price} onChange={(v) => onChange("price", v)} />
      <button className="adm-del" onClick={onDelete} title="Eliminar"><X size={16} /></button>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { reload } = useCatalog();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const token = localStorage.getItem("rvtk_token");
  const mutate = (fn) => {
    setSaved(false);
    setCat((prev) => {
      const c = clone(prev);
      fn(c);
      return c;
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    (async () => {
      try {
        await axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
        const { data } = await axios.get(`${API}/catalog`);
        setCat(Array.isArray(data.catalog) && data.catalog.length ? data.catalog : clone(CATALOG));
      } catch (e) {
        localStorage.removeItem("rvtk_token");
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/admin/catalog`, { catalog: cat }, { headers: { Authorization: `Bearer ${token}` } });
      setSaved(true);
      reload();
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem("rvtk_token");
        navigate("/admin/login");
      }
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("rvtk_token");
    navigate("/admin/login");
  };

  if (loading || !cat) {
    return (
      <div className="rv admin-auth">
        <p style={{ color: "var(--muted-2)" }}>Cargando panel...</p>
      </div>
    );
  }

  const SaveBtn = ({ testid }) => (
    <button className="btn btn-primary" onClick={save} disabled={saving} data-testid={testid}>
      {saved ? <Check size={18} /> : <Save size={18} />}
      {saving ? "Guardando..." : saved ? "Guardado" : "Guardar cambios"}
    </button>
  );

  return (
    <div className="rv admin-dash">
      <header className="admin-topbar glass">
        <div className="container admin-topbar-inner">
          <div className="brand">
            <img src="/assets/icon_transparent.png" alt="RevolTek" />
            <span className="brand-name">Admin<small>Editor de precios</small></span>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Link to="/" target="_blank" className="btn btn-ghost" data-testid="admin-view-site"><ExternalLink size={16} /> Ver web</Link>
            <button className="btn btn-ghost" onClick={logout} data-testid="admin-logout"><LogOut size={16} /> Salir</button>
          </div>
        </div>
      </header>

      <div className="container admin-body">
        <div className="admin-head-row">
          <h1 className="display">Editar catálogo y precios</h1>
          <p className="admin-sub">Edita precios, y añade o elimina modelos, marcas y servicios. Pulsa guardar para publicarlo en la web.</p>
        </div>

        <div className="admin-toolbar glass">
          <span className="adm-hint">Los precios están en € · Pulsa la × para eliminar un elemento.</span>
          <SaveBtn testid="admin-save-btn" />
        </div>

        {cat.map((c, ci) => (
          <div className="panel admin-group" key={ci} data-testid={`admin-group-${c.id}`}>
            <h2 className="admin-group-title">{c.name}</h2>

            {/* ---- Apple: devices > models ---- */}
            {c.kind === "phoneDevices" &&
              c.devices.map((d, di) => (
                <div className="adm-block" key={di}>
                  <h3 className="adm-subhead">{d.name}</h3>
                  <div className="adm-rowhead"><span>Modelo</span><span>{d.labels.screen}</span><span>{d.labels.battery}</span><span /></div>
                  {d.models.map((m, mi) => (
                    <PhoneRow
                      key={mi}
                      m={m}
                      onChange={(f, v) => mutate((x) => { x[ci].devices[di].models[mi][f] = v; })}
                      onDelete={() => mutate((x) => { x[ci].devices[di].models.splice(mi, 1); })}
                    />
                  ))}
                  <button className="adm-add" data-testid={`add-model-${c.id}-${d.id}`}
                    onClick={() => mutate((x) => { x[ci].devices[di].models.push({ name: "Nuevo modelo", screen: 0, battery: 0 }); })}>
                    <Plus size={15} /> Añadir modelo a {d.name}
                  </button>
                </div>
              ))}

            {/* ---- Samsung: models ---- */}
            {c.kind === "models" && (
              <div className="adm-block">
                <div className="adm-rowhead"><span>Modelo</span><span>{c.labels.screen}</span><span>{c.labels.battery}</span><span /></div>
                {c.models.map((m, mi) => (
                  <PhoneRow
                    key={mi}
                    m={m}
                    onChange={(f, v) => mutate((x) => { x[ci].models[mi][f] = v; })}
                    onDelete={() => mutate((x) => { x[ci].models.splice(mi, 1); })}
                  />
                ))}
                <button className="adm-add" data-testid={`add-model-${c.id}`}
                  onClick={() => mutate((x) => { x[ci].models.push({ name: "Nuevo modelo", screen: 0, battery: 0 }); })}>
                  <Plus size={15} /> Añadir modelo
                </button>
              </div>
            )}

            {/* ---- Android: brands > models ---- */}
            {c.kind === "brands" &&
              c.brands.map((b, bi) => (
                <div className="adm-block" key={bi}>
                  <div className="adm-brandhead">
                    <input className="adm-name adm-brandname" value={b.name} onChange={(e) => mutate((x) => { x[ci].brands[bi].name = e.target.value; })} />
                    <button className="adm-del" onClick={() => mutate((x) => { x[ci].brands.splice(bi, 1); })} title="Eliminar marca"><X size={16} /></button>
                  </div>
                  <div className="adm-rowhead"><span>Modelo</span><span>{c.labels.screen}</span><span>{c.labels.battery}</span><span /></div>
                  {b.models.map((m, mi) => (
                    <PhoneRow
                      key={mi}
                      m={m}
                      onChange={(f, v) => mutate((x) => { x[ci].brands[bi].models[mi][f] = v; })}
                      onDelete={() => mutate((x) => { x[ci].brands[bi].models.splice(mi, 1); })}
                    />
                  ))}
                  <button className="adm-add"
                    onClick={() => mutate((x) => { x[ci].brands[bi].models.push({ name: "Nuevo modelo", screen: 0, battery: 0 }); })}>
                    <Plus size={15} /> Añadir modelo a {b.name}
                  </button>
                </div>
              ))}
            {c.kind === "brands" && (
              <button className="adm-add adm-add-brand" data-testid={`add-brand-${c.id}`}
                onClick={() => mutate((x) => { x[ci].brands.push({ id: `b${Date.now()}`, name: "Nueva marca", models: [] }); })}>
                <Plus size={15} /> Añadir marca
              </button>
            )}

            {/* ---- Services: laptops / desktops ---- */}
            {c.kind === "services" && (
              <div className="adm-block">
                <div className="adm-rowhead"><span>Servicio</span><span>Precio</span><span /></div>
                {c.services.map((s, si) => (
                  <ServiceRow
                    key={si}
                    s={s}
                    onChange={(f, v) => mutate((x) => { x[ci].services[si][f] = v; })}
                    onDelete={() => mutate((x) => { x[ci].services.splice(si, 1); })}
                  />
                ))}
                <button className="adm-add" data-testid={`add-service-${c.id}`}
                  onClick={() => mutate((x) => { x[ci].services.push({ name: "Nuevo servicio", price: 0 }); })}>
                  <Plus size={15} /> Añadir servicio
                </button>
              </div>
            )}

            {/* ---- Consoles: brands > models > services ---- */}
            {c.kind === "consoles" &&
              c.brands.map((b, bi) => (
                <div className="adm-block" key={bi}>
                  <div className="adm-brandhead">
                    <input className="adm-name adm-brandname" value={b.name} onChange={(e) => mutate((x) => { x[ci].brands[bi].name = e.target.value; })} />
                    <button className="adm-del" onClick={() => mutate((x) => { x[ci].brands.splice(bi, 1); })} title="Eliminar marca"><X size={16} /></button>
                  </div>
                  {b.models.map((m, mi) => (
                    <div className="adm-console-model" key={mi}>
                      <div className="adm-brandhead">
                        <input className="adm-name" value={m.name} onChange={(e) => mutate((x) => { x[ci].brands[bi].models[mi].name = e.target.value; })} />
                        <button className="adm-del" onClick={() => mutate((x) => { x[ci].brands[bi].models.splice(mi, 1); })} title="Eliminar modelo"><X size={16} /></button>
                      </div>
                      {m.services.map((s, si) => (
                        <ServiceRow
                          key={si}
                          s={s}
                          onChange={(f, v) => mutate((x) => { x[ci].brands[bi].models[mi].services[si][f] = v; })}
                          onDelete={() => mutate((x) => { x[ci].brands[bi].models[mi].services.splice(si, 1); })}
                        />
                      ))}
                      <button className="adm-add"
                        onClick={() => mutate((x) => { x[ci].brands[bi].models[mi].services.push({ name: "Nuevo servicio", price: 0 }); })}>
                        <Plus size={15} /> Añadir servicio
                      </button>
                    </div>
                  ))}
                  <button className="adm-add"
                    onClick={() => mutate((x) => { x[ci].brands[bi].models.push({ name: "Nuevo modelo", services: [] }); })}>
                    <Plus size={15} /> Añadir modelo a {b.name}
                  </button>
                </div>
              ))}
            {c.kind === "consoles" && (
              <button className="adm-add adm-add-brand"
                onClick={() => mutate((x) => { x[ci].brands.push({ id: `b${Date.now()}`, name: "Nueva marca", models: [] }); })}>
                <Plus size={15} /> Añadir marca de consola
              </button>
            )}
          </div>
        ))}

        <div className="admin-save-bar"><SaveBtn testid="admin-save-btn-bottom" /></div>
      </div>
    </div>
  );
}
