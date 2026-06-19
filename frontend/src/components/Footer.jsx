import { CONTACT } from "../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="brand" data-testid="footer-brand">
          <img src="/assets/logo_full_transparent.png" alt="RevolTek Reparaciones" />
        </a>
        <small>
          © {new Date().getFullYear()} {CONTACT.brandFull} · {CONTACT.tagline}. Precios orientativos editables.
        </small>
      </div>
    </footer>
  );
}
