import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, waLink } from "../data/site";

export default function MobileBar() {
  const wa = waLink("Hola RevolTek, quiero información sobre una reparación.");
  return (
    <div className="mobile-bar" data-testid="mobile-contact-bar">
      <a href={wa} target="_blank" rel="noreferrer" className="btn btn-wa" data-testid="mobilebar-wa">
        <MessageCircle size={18} /> WhatsApp
      </a>
      <a href={`tel:${CONTACT.phoneRaw}`} className="btn btn-primary" data-testid="mobilebar-call">
        <Phone size={18} /> Llamar
      </a>
    </div>
  );
}
