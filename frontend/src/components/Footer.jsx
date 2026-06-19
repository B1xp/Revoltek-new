import { Link } from "react-router-dom";
import { CONTACT } from "../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link to="/" className="brand" data-testid="footer-brand">
          <img src="/assets/logo_full_transparent.png" alt="RevolTek Reparaciones" />
        </Link>
        <small>
          © {new Date().getFullYear()} {CONTACT.brandFull} · {CONTACT.tagline}.
        </small>
      </div>
    </footer>
  );
}
