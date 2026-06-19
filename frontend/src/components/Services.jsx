import { Smartphone, Tablet, Laptop, Watch, Monitor, Gamepad2, Apple, Check } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import Reveal from "./Reveal";

const ICONS = { Smartphone, Tablet, Laptop, Watch, Monitor, Gamepad2, Apple };

export default function Services() {
  const { catalog } = useCatalog();
  return (
    <section className="section" id="servicios">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Qué reparamos</div>
          <h2 className="display">Reparamos todas tus marcas y dispositivos</h2>
          <p>
            Apple, Samsung y Android, además de portátiles de cualquier marca,
            ordenadores de sobremesa y ratones de marca. Diagnóstico gratuito y
            presupuesto cerrado.
          </p>
        </Reveal>

        <div className="services-grid">
          {catalog.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <Reveal key={c.id} delay={i * 0.06}>
                <div className="panel service-card" data-testid={`service-${c.id}`}>
                  <div className="ico">
                    <Icon size={28} />
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.tagline}</p>
                  <ul className="service-list">
                    {c.highlights.map((s) => (
                      <li key={s}>
                        <Check size={15} /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
