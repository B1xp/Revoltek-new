import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone, Tablet, Laptop, Watch, Monitor, Gamepad2, Apple,
  MessageCircle, Phone, Info,
} from "lucide-react";
import { CONTACT, waLink } from "../data/site";
import { useCatalog } from "../context/CatalogContext";
import Reveal from "./Reveal";

const ICONS = { Smartphone, Tablet, Laptop, Watch, Monitor, Gamepad2, Apple };

function AnimatedPrice({ value }) {
  const [display, setDisplay] = useState(value);
  const raf = useRef();
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    const dur = 600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <>{display}</>;
}

export default function Calculator() {
  const { catalog } = useCatalog();
  const [catId, setCatId] = useState("apple");
  const [deviceId, setDeviceId] = useState("iphone");
  const [brandId, setBrandId] = useState("xiaomi");
  const [modelIdx, setModelIdx] = useState(0);
  const [serviceIdx, setServiceIdx] = useState(0);
  const [repair, setRepair] = useState("screen");
  const [quality, setQuality] = useState("original");
  const [screenType, setScreenType] = useState("oled");
  const [customModel, setCustomModel] = useState("");
  const [notes, setNotes] = useState("");

  const cat = useMemo(() => catalog.find((c) => c.id === catId) || catalog[0], [catalog, catId]);
  const isServices = cat.kind === "services";
  const isConsoles = cat.kind === "consoles";
  const isPhoneCat = cat.kind === "phoneDevices" || cat.kind === "models" || cat.kind === "brands";

  // ----- Phone-type resolution -----
  const device = cat.kind === "phoneDevices" ? cat.devices.find((d) => d.id === deviceId) || cat.devices[0] : null;
  const phoneBrand = cat.kind === "brands" ? cat.brands.find((b) => b.id === brandId) || cat.brands[0] : null;
  const models = device ? device.models : phoneBrand ? phoneBrand.models : cat.models || [];
  const labels = device ? device.labels : cat.labels || { screen: "Pantalla", battery: "Batería" };
  const isPhone = device ? device.phone : cat.phone || false;
  const isOther = isPhoneCat && modelIdx === -1;
  const phoneModel = isOther
    ? { name: customModel.trim() ? customModel.trim() : "Otro modelo (a especificar)", screen: 0, battery: 0 }
    : models[Math.min(modelIdx, models.length - 1)] || {};

  // ----- Console resolution -----
  const consoleBrand = isConsoles ? cat.brands.find((b) => b.id === brandId) || cat.brands[0] : null;
  const consoleModels = isConsoles ? consoleBrand.models : [];
  const consoleModel = isConsoles ? consoleModels[Math.min(modelIdx, consoleModels.length - 1)] || consoleModels[0] : null;
  const consoleServices = isConsoles ? consoleModel.services : [];

  // ----- Service (flat / console) -----
  const isServiceLike = isServices || isConsoles;
  const serviceList = isConsoles ? consoleServices : isServices ? cat.services : [];
  const selectedService = isServiceLike ? serviceList[Math.min(serviceIdx, serviceList.length - 1)] || serviceList[0] : null;

  const price = isServiceLike ? selectedService.price : phoneModel[repair];

  useEffect(() => {
    setQuality("original");
  }, [catId, deviceId, brandId, modelIdx, repair]);

  useEffect(() => {
    setServiceIdx(0);
  }, [catId, brandId, modelIdx]);

  const onCategory = (id) => {
    setCatId(id);
    setDeviceId("iphone");
    setBrandId(id === "consoles" ? "xbox" : "xiaomi");
    setModelIdx(0);
    setServiceIdx(0);
    setRepair("screen");
    setQuality("original");
    setCustomModel("");
  };
  const onDevice = (id) => { setDeviceId(id); setModelIdx(0); setRepair("screen"); setCustomModel(""); };
  const onBrand = (id) => { setBrandId(id); setModelIdx(0); setRepair("screen"); setCustomModel(""); };

  const qualityOpts = [
    { id: "original", label: "Original" },
    { id: "compatible", label: "Compatible" },
  ];
  if (repair === "battery" && phoneModel.olderBattery) {
    qualityOpts.push({
      id: "capacidad",
      label: "Mayor capacidad",
      info: "Consulte a nuestros técnicos para más información sobre la capacidad de la batería.",
    });
  }
  const showScreenTypes = isPhoneCat && repair === "screen" && quality === "compatible" && isPhone;

  const pieceLabel = (() => {
    if (repair === "battery") {
      if (quality === "capacidad") return "Batería de mayor capacidad";
      return quality === "original" ? "Batería original" : "Batería compatible";
    }
    if (quality === "original") return "Pantalla original";
    if (isPhone) return `Pantalla compatible · ${screenType === "oled" ? "OLED-OEM" : "Incell"}`;
    return "Pantalla compatible";
  })();

  // device label for ticket / messages
  const consoleTitle = isConsoles ? `${consoleBrand.name} ${consoleModel.name}` : "";

  const message = (() => {
    const notesPart = notes.trim() ? ` Observaciones: ${notes.trim()}.` : "";
    if (isConsoles) {
      return `Hola RevolTek, quiero presupuesto para *Consolas — ${consoleTitle}*: *${selectedService.name}* (desde ${price}€).${notesPart} ¿Me confirmáis disponibilidad?`;
    }
    if (isServices) {
      return `Hola RevolTek, quiero presupuesto para *${cat.name}* — *${selectedService.name}* (desde ${price}€).${notesPart} ¿Me confirmáis disponibilidad?`;
    }
    return `Hola RevolTek, quiero presupuesto para un *${cat.name} ${phoneModel.name}* — *${pieceLabel}*${
      price > 0 ? ` (precio web: ${price}€)` : " (precio a consultar)"
    }.${notesPart} ¿Me confirmáis disponibilidad?`;
  })();

  return (
    <section className="section" id="precios">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Calculadora de precios</div>
          <h2 className="display">Tu presupuesto al instante</h2>
          <p>
            Elige la categoría, el dispositivo y la reparación. Precios de ejemplo
            orientativos: el precio final se confirma en el diagnóstico gratuito.
          </p>
        </Reveal>

        <div className="calc">
          {/* Configurador */}
          <Reveal>
            <div className="panel calc-config" data-testid="calculator">
              <p className="calc-step-label">
                <span>1</span> ¿Qué quieres reparar?
              </p>
              <div className="device-tabs cat-tabs">
                {catalog.map((c) => {
                  const Icon = ICONS[c.icon];
                  return (
                    <button
                      key={c.id}
                      className={`device-tab ${catId === c.id ? "active" : ""}`}
                      onClick={() => onCategory(c.id)}
                      data-testid={`cat-${c.id}`}
                    >
                      <Icon size={22} />
                      {c.name}
                    </button>
                  );
                })}
              </div>

              {/* ---------- CONSOLES ---------- */}
              {isConsoles && (
                <>
                  <p className="calc-step-label">
                    <span>2</span> Marca de consola
                  </p>
                  <div className="brand-tabs">
                    {cat.brands.map((b) => (
                      <button
                        key={b.id}
                        className={`brand-tab ${brandId === b.id ? "active" : ""}`}
                        onClick={() => onBrand(b.id)}
                        data-testid={`console-brand-${b.id}`}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>

                  <p className="calc-step-label">
                    <span>3</span> Modelo de consola
                  </p>
                  <div className="model-grid">
                    {consoleModels.map((m, i) => (
                      <button
                        key={m.name}
                        className={`model-chip ${modelIdx === i ? "active" : ""}`}
                        onClick={() => setModelIdx(i)}
                        data-testid={`console-model-${i}`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>

                  <p className="calc-step-label">
                    <span>4</span> Elige el servicio
                  </p>
                  <div className="svc-list">
                    {consoleServices.map((s, i) => (
                      <button
                        key={s.name}
                        className={`svc-opt ${serviceIdx === i ? "active" : ""}`}
                        onClick={() => setServiceIdx(i)}
                        data-testid={`service-opt-${i}`}
                      >
                        <span>{s.name}</span>
                        <span className="svc-price">
                          <small>desde</small> {s.price}€
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ---------- FLAT SERVICES (laptops / desktops) ---------- */}
              {isServices && (
                <>
                  {cat.note && <p className="cat-note">{cat.note}</p>}
                  <p className="calc-step-label">
                    <span>2</span> Elige el servicio
                  </p>
                  <div className="svc-list">
                    {cat.services.map((s, i) => (
                      <button
                        key={s.name}
                        className={`svc-opt ${serviceIdx === i ? "active" : ""}`}
                        onClick={() => setServiceIdx(i)}
                        data-testid={`service-opt-${i}`}
                      >
                        <span>{s.name}</span>
                        <span className="svc-price">
                          <small>desde</small> {s.price}€
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* ---------- PHONES / TABLETS / MAC / WATCH ---------- */}
              {isPhoneCat && (
                <>
                  {cat.kind === "phoneDevices" && (
                    <>
                      <p className="calc-step-label">
                        <span>2</span> Tipo de dispositivo
                      </p>
                      <div className="device-tabs">
                        {cat.devices.map((d) => {
                          const Icon = ICONS[d.icon];
                          return (
                            <button
                              key={d.id}
                              className={`device-tab ${deviceId === d.id ? "active" : ""}`}
                              onClick={() => onDevice(d.id)}
                              data-testid={`device-tab-${d.id}`}
                            >
                              <Icon size={22} />
                              {d.name}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {cat.kind === "brands" && (
                    <>
                      <p className="calc-step-label">
                        <span>2</span> Marca
                      </p>
                      <div className="brand-tabs">
                        {cat.brands.map((b) => (
                          <button
                            key={b.id}
                            className={`brand-tab ${brandId === b.id ? "active" : ""}`}
                            onClick={() => onBrand(b.id)}
                            data-testid={`brand-${b.id}`}
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <p className="calc-step-label">
                    <span>{cat.kind === "models" ? 2 : 3}</span> Selecciona el modelo
                  </p>
                  <div className="model-grid">
                    {models.map((m, i) => (
                      <button
                        key={m.name}
                        className={`model-chip ${modelIdx === i ? "active" : ""}`}
                        onClick={() => setModelIdx(i)}
                        data-testid={`model-${i}`}
                      >
                        {m.name}
                      </button>
                    ))}
                    <button
                      className={`model-chip other ${isOther ? "active" : ""}`}
                      onClick={() => setModelIdx(-1)}
                      data-testid="model-other"
                    >
                      + Otro modelo
                    </button>
                  </div>

                  {isOther && (
                    <input
                      className="calc-input"
                      placeholder="Escribe tu modelo exacto (ej. iPhone 8 Plus, Galaxy A52...)"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      data-testid="custom-model-input"
                    />
                  )}

                  <p className="calc-step-label">
                    <span>{cat.kind === "models" ? 3 : 4}</span> Tipo de reparación
                  </p>
                  <div className="repair-toggle">
                    {["screen", "battery"].map((r) => (
                      <button
                        key={r}
                        className={`repair-opt ${repair === r ? "active" : ""}`}
                        onClick={() => setRepair(r)}
                        data-testid={`repair-${r}`}
                      >
                        <span>{labels[r]}</span>
                        <span className="dot" />
                      </button>
                    ))}
                  </div>

                  <p className="calc-step-label">
                    <span>{cat.kind === "models" ? 4 : 5}</span> Calidad de la pieza
                  </p>
                  <div className="quality-grid">
                    {qualityOpts.map((o) => (
                      <button
                        key={o.id}
                        className={`repair-opt quality-opt ${quality === o.id ? "active" : ""}`}
                        onClick={() => setQuality(o.id)}
                        data-testid={`quality-${o.id}`}
                      >
                        <span className="qlabel">
                          {o.label}
                          {o.info && (
                            <span
                              className="info-tip"
                              onClick={(e) => e.stopPropagation()}
                              data-testid="battery-info"
                            >
                              <Info size={15} />
                              <span className="info-bubble">{o.info}</span>
                            </span>
                          )}
                        </span>
                        <span className="dot" />
                      </button>
                    ))}
                  </div>

                  <AnimatePresence initial={false}>
                    {showScreenTypes && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="calc-substep">Tipo de pantalla compatible</p>
                        <div className="quality-grid">
                          <button
                            className={`repair-opt quality-opt ${screenType === "oled" ? "active" : ""}`}
                            onClick={() => setScreenType("oled")}
                            data-testid="screen-oled"
                          >
                            <span className="qlabel">Igual a la original · OLED-OEM</span>
                            <span className="dot" />
                          </button>
                          <button
                            className={`repair-opt quality-opt ${screenType === "incell" ? "active" : ""}`}
                            onClick={() => setScreenType("incell")}
                            data-testid="screen-incell"
                          >
                            <span className="qlabel">Baja calidad · Incell</span>
                            <span className="dot" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              <p className="calc-substep" style={{ marginTop: "0.4rem" }}>
                Observaciones (opcional)
              </p>
              <textarea
                className="calc-textarea"
                rows={3}
                placeholder="Cuéntanos el problema: si enciende, golpes, daños por líquidos, color, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                data-testid="notes-input"
              />
            </div>
          </Reveal>

          {/* Ficha de diagnóstico */}
          <Reveal delay={0.1}>
            <div className="panel ticket" data-testid="ticket">
              <div className="scanline" />
              <div className="ticket-top">
                <div className="ticket-dots">
                  <i style={{ background: "var(--orange)" }} />
                  <i style={{ background: "var(--cyan)" }} />
                  <i style={{ background: "var(--muted)" }} />
                </div>
                <span className="ticket-title">Ficha de diagnóstico</span>
              </div>

              <div className="ticket-body">
                <div className="ticket-row">
                  <span>Categoría</span>
                  <span>{cat.name}</span>
                </div>

                {isConsoles && (
                  <>
                    <div className="ticket-row">
                      <span>Marca</span>
                      <span>{consoleBrand.name}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={consoleModel.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="ticket-row"
                      >
                        <span>Modelo</span>
                        <span>{consoleModel.name}</span>
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}

                {isServiceLike ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedService.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="ticket-row"
                    >
                      <span>Servicio</span>
                      <span>{selectedService.name}</span>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <>
                    {device && (
                      <div className="ticket-row">
                        <span>Dispositivo</span>
                        <span>{device.name}</span>
                      </div>
                    )}
                    {phoneBrand && (
                      <div className="ticket-row">
                        <span>Marca</span>
                        <span>{phoneBrand.name}</span>
                      </div>
                    )}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={phoneModel.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="ticket-row"
                      >
                        <span>Modelo</span>
                        <span>{phoneModel.name}</span>
                      </motion.div>
                    </AnimatePresence>
                    <div className="ticket-row">
                      <span>Reparación</span>
                      <span>{labels[repair]}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pieceLabel}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="ticket-row"
                      >
                        <span>Pieza</span>
                        <span>{pieceLabel}</span>
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}

                {notes.trim() && (
                  <div className="ticket-row ticket-notes">
                    <span>Observaciones</span>
                    <span>{notes.trim()}</span>
                  </div>
                )}

                <div className="price-box">
                  <div className="label">{isServiceLike ? "Precio desde" : "Precio estimado"}</div>
                  {price > 0 ? (
                    <div className="amount grad-text" data-testid="price-amount">
                      <AnimatedPrice value={price} />€
                    </div>
                  ) : (
                    <div className="amount grad-text" data-testid="price-amount">
                      Consultar
                    </div>
                  )}
                  <div className="from">Garantía y mano de obra incluidas</div>
                </div>

                <div className="ticket-cta">
                  <a
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-wa"
                    data-testid="ticket-wa-btn"
                  >
                    <MessageCircle size={18} /> Reservar por WhatsApp
                  </a>
                  <a href={`tel:${CONTACT.phoneRaw}`} className="btn btn-ghost" data-testid="ticket-call-btn">
                    <Phone size={18} /> Llamar ahora
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
