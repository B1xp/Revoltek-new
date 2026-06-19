import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Tablet, Laptop, Watch, MessageCircle, Phone } from "lucide-react";
import { DEVICES, CONTACT, waLink } from "../data/site";
import Reveal from "./Reveal";

const ICONS = { Smartphone, Tablet, Laptop, Watch };

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
  const [deviceId, setDeviceId] = useState("iphone");
  const [modelIdx, setModelIdx] = useState(0);
  const [repair, setRepair] = useState("screen");

  const device = useMemo(() => DEVICES.find((d) => d.id === deviceId), [deviceId]);
  const model = device.models[modelIdx];
  const price = model[repair];
  const repairLabel = device.labels[repair];

  const onDevice = (id) => {
    setDeviceId(id);
    setModelIdx(0);
    setRepair("screen");
  };

  const message = `Hola RevolTek, quiero presupuesto para un *${model.name}* — *${repairLabel}*${
    price > 0 ? ` (precio web: ${price}€)` : ""
  }. ¿Me confirmáis disponibilidad?`;

  return (
    <section className="section" id="precios">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Calculadora de precios</div>
          <h2 className="display">Tu presupuesto en 3 toques</h2>
          <p>
            Elige dispositivo, modelo y tipo de reparación. Precios de ejemplo
            orientativos: el precio final se confirma en el diagnóstico gratuito.
          </p>
        </Reveal>

        <div className="calc">
          {/* Configurador */}
          <Reveal>
            <div className="panel calc-config" data-testid="calculator">
              <p className="calc-step-label">
                <span>1</span> Elige tu dispositivo
              </p>
              <div className="device-tabs">
                {DEVICES.map((d) => {
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

              <p className="calc-step-label">
                <span>2</span> Selecciona el modelo
              </p>
              <div className="model-grid">
                {device.models.map((m, i) => (
                  <button
                    key={m.name}
                    className={`model-chip ${modelIdx === i ? "active" : ""}`}
                    onClick={() => setModelIdx(i)}
                    data-testid={`model-${i}`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>

              <p className="calc-step-label">
                <span>3</span> Tipo de reparación
              </p>
              <div className="repair-toggle">
                {["screen", "battery"].map((r) => (
                  <button
                    key={r}
                    className={`repair-opt ${repair === r ? "active" : ""}`}
                    onClick={() => setRepair(r)}
                    data-testid={`repair-${r}`}
                  >
                    <span>{device.labels[r]}</span>
                    <span className="dot" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Ticket de diagnóstico */}
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
                  <span>Dispositivo</span>
                  <span>{device.name}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="ticket-row"
                  >
                    <span>Modelo</span>
                    <span>{model.name}</span>
                  </motion.div>
                </AnimatePresence>
                <div className="ticket-row">
                  <span>Reparación</span>
                  <span>{repairLabel}</span>
                </div>

                <div className="price-box">
                  <div className="label">Precio estimado</div>
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
                  <a
                    href={`tel:${CONTACT.phoneRaw}`}
                    className="btn btn-ghost"
                    data-testid="ticket-call-btn"
                  >
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
