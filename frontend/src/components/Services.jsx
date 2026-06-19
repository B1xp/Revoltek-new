import { Smartphone, Tablet, Laptop, Watch, Check } from "lucide-react";
import { DEVICES } from "../data/site";
import Reveal from "./Reveal";

const ICONS = { Smartphone, Tablet, Laptop, Watch };

export default function Services() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Qué reparamos</div>
          <h2 className="display">Todo el ecosistema Apple, bajo un mismo techo</h2>
          <p>
            Especialistas exclusivamente en dispositivos Apple. Diagnóstico
            gratuito y presupuesto cerrado para cada tipo de avería.
          </p>
        </Reveal>

        <div className="services-grid">
          {DEVICES.map((d, i) => {
            const Icon = ICONS[d.icon];
            return (
              <Reveal key={d.id} delay={i * 0.08}>
                <div className="panel service-card" data-testid={`service-${d.id}`}>
                  <div className="ico">
                    <Icon size={28} />
                  </div>
                  <h3>{d.name}</h3>
                  <p>{d.blurb}</p>
                  <ul className="service-list">
                    {d.services.map((s) => (
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
