import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "../data/site";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#precios", label: "Precios" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid="site-header"
    >
      <div className="container header-inner">
        <a href="#top" className="brand" data-testid="brand-logo">
          <img src="/assets/icon_transparent.png" alt="RevolTek" />
          <span className="brand-name">
            {CONTACT.brand}
            <small>Reparaciones Apple</small>
          </span>
        </a>

        <nav className="nav" data-testid="desktop-nav">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} data-testid={`nav-${l.label.toLowerCase()}`}>
              {l.label}
            </a>
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
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
