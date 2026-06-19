import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, Calculator, ShieldCheck, Clock, BadgeCheck, Cpu } from "lucide-react";
import { CONTACT, waLink } from "../data/site";

const ease = [0.22, 1, 0.36, 1];
const chips = [
  { icon: ShieldCheck, text: "Garantía por escrito" },
  { icon: Clock, text: "Reparaciones en el día" },
  { icon: BadgeCheck, text: "Diagnóstico gratuito" },
];
const marquee = ["iPhone", "iPad", "MacBook", "iMac", "Apple Watch", "AirPods", "Mac mini", "iPad Pro"];

export default function Hero() {
  const wa = waLink("Hola RevolTek, quiero información sobre una reparación.");

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {CONTACT.tagline} · Técnicos certificados
          </motion.div>

          <motion.h1
            className="display"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            Reparamos tu Apple <br />
            <span className="grad-text">hoy mismo.</span>
          </motion.h1>

          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
          >
            iPhone, iPad, Mac y Apple Watch. Pantalla, batería y mucho más con
            precio cerrado antes de empezar. Calcula tu reparación en segundos.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            <Link to="/precios" className="btn btn-primary" data-testid="hero-calc-btn">
              <Calculator size={19} /> Calcular precio
            </Link>
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-wa" data-testid="hero-wa-btn">
              <MessageCircle size={19} /> WhatsApp
            </a>
          </motion.div>

          <motion.div
            className="hero-chips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.34 }}
          >
            {chips.map((c, i) => (
              <span className="chip" key={i}>
                <c.icon size={15} style={{ color: "var(--cyan)" }} /> {c.text}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow" />
          <div className="hero-glow orange" />
          <motion.img
            src="/assets/logo_full_transparent.png"
            alt="RevolTek Reparaciones"
            className="hero-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            style={{ animation: "floaty 6s ease-in-out infinite" }}
          />

          <motion.div
            className="float-badge glass"
            style={{ top: "8%", left: "0%" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ShieldCheck size={18} style={{ color: "var(--cyan)" }} /> Garantía incluida
          </motion.div>

          <motion.div
            className="float-badge glass"
            style={{ bottom: "10%", right: "-2%" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <Cpu size={18} style={{ color: "var(--orange)" }} /> Recambios de calidad
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="marquee">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((m, i) => (
              <span className="marquee-item" key={i}>
                <ShieldCheck size={16} /> {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
