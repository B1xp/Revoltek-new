import { ShieldCheck, Zap, Tag, Award } from "lucide-react";
import { WHY, STATS } from "../data/site";
import Reveal from "./Reveal";

const ICONS = { ShieldCheck, Zap, Tag, Award };

export default function WhyUs() {
  return (
    <section className="section" id="porque">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Por qué RevolTek</div>
          <h2 className="display">Reparaciones serias, sin sorpresas</h2>
          <p>
            Transparencia, rapidez y garantía. Así trabajamos cada dispositivo
            que llega a nuestras manos.
          </p>
        </Reveal>

        <div className="why-grid">
          {WHY.map((w, i) => {
            const Icon = ICONS[w.icon];
            return (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="glass why-card" data-testid={`why-${i}`}>
                  <div className="ico">
                    <Icon size={24} />
                  </div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="glass stat" data-testid={`stat-${i}`}>
                <div className="value grad-text">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
