import { MessageCircle, Phone, Clock, MapPin, Mail } from "lucide-react";
import { CONTACT, waLink } from "../data/site";
import Reveal from "./Reveal";

export default function Contact() {
  const wa = waLink("Hola RevolTek, me gustaría pedir un presupuesto para mi dispositivo Apple.");

  return (
    <section className="section" id="contacto">
      <div className="container">
        <Reveal>
          <div className="panel contact-card" data-testid="contact-card">
            <div className="contact-grid">
              <div>
                <div className="eyebrow">Hablemos</div>
                <h2 className="display">
                  ¿Tu Apple necesita una mano? <span className="grad-text">Escríbenos.</span>
                </h2>
                <p>
                  Diagnóstico gratuito y sin compromiso. Cuéntanos qué le pasa a
                  tu dispositivo y te damos precio cerrado al momento.
                </p>
                <div className="contact-info">
                  <div><Clock size={17} /> {CONTACT.hours}</div>
                  <div><MapPin size={17} /> {CONTACT.address}</div>
                  <div><Mail size={17} /> {CONTACT.email}</div>
                </div>
              </div>

              <div className="contact-ctas">
                <a href={wa} target="_blank" rel="noreferrer" className="btn btn-wa" data-testid="contact-wa-btn">
                  <MessageCircle size={20} /> Escribir por WhatsApp
                </a>
                <a href={`tel:${CONTACT.phoneRaw}`} className="btn btn-primary" data-testid="contact-call-btn">
                  <Phone size={20} /> {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
