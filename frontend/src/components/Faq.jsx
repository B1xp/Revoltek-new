import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../data/site";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Preguntas frecuentes</div>
          <h2 className="display">Resolvemos tus dudas</h2>
          <p>Y si te queda alguna, escríbenos por WhatsApp y te respondemos al momento.</p>
        </Reveal>

        <Reveal>
          <div className="faq-list">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className={`glass faq-item ${isOpen ? "open" : ""}`} key={i} data-testid={`faq-${i}`}>
                  <button
                    className="faq-q"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    {f.q}
                    <span className="pm">
                      <Plus size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="faq-a">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
