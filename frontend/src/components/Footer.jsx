import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";
import { CONTACT } from "../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand-block">
          <Link to="/" className="brand" data-testid="footer-brand">
            <img src="/assets/logo_full_transparent.png" alt="RevolTek Reparaciones" />
          </Link>
        </div>

        <div className="footer-info">
          <div><MapPin size={16} /> {CONTACT.address}</div>
          <div><Phone size={16} /> {CONTACT.phoneDisplay}</div>
          <div><Clock size={16} /> {CONTACT.hours}</div>
        </div>
      </div>

      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} {CONTACT.brandFull} · {CONTACT.tagline}.</small>
        <Link to="/admin/login" className="footer-admin" data-testid="footer-admin-link">
          Acceso administración
        </Link>
      </div>
    </footer>
  );
}
