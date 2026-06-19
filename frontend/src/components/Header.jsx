import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { CONTACT } from "../data/site";

const LINKS = [
  { to: "/servicios", label: "Servicios" },
  { to: "/precios", label: "Precios" },
  { to: "/opiniones", label: "Opiniones" },
  { to: "/faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="header scrolled"
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid="site-header"
    >
      <div className="container header-inner">
        <Link to="/" className="brand" data-testid="brand-logo" onClick={() => setOpen(false)}>
          <img src="/assets/icon_transparent.png" alt="RevolTek" />
          <span className="brand-name">
            {CONTACT.brand}
            <small>Reparar es revolucionar.</small>
          </span>
        </Link>

        <nav className="nav" data-testid="desktop-nav">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} data-testid={`nav-${l.label.toLowerCase()}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={`tel:${CONTACT.phoneRaw}`}
          className="btn btn-primary header-cta"
          data-testid="header-call-btn"
        >
          <Phone size={18} /> Llámanos
        </a>

        <button
          className="burger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          data-testid="burger-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
            data-testid="mobile-menu"
          >
            <div className="mobile-menu">
              <NavLink to="/" onClick={() => setOpen(false)} end>
                Inicio
              </NavLink>
              {LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
