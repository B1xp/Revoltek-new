import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { REVIEWS } from "../data/site";
import Reveal from "./Reveal";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const count = REVIEWS.length;

  const go = useCallback(
    (n) => {
      setDir(n > idx || (idx === count - 1 && n === 0) ? 1 : -1);
      setIdx((n + count) % count);
    },
    [idx, count]
  );

  const next = useCallback(() => {
    setDir(1);
    setIdx((i) => (i + 1) % count);
  }, [count]);

  const prev = () => {
    setDir(-1);
    setIdx((i) => (i - 1 + count) % count);
  };

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const r = REVIEWS[idx];

  return (
    <section className="section" id="opiniones">
      <div className="container">
        <Reveal className="section-head">
          <div className="eyebrow">Opiniones reales</div>
          <h2 className="display">Lo que dicen nuestros clientes</h2>
          <p>Valoración media de 4.9★ basada en cientos de reparaciones.</p>
        </Reveal>

        <Reveal>
          <div className="reviews-stage">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                className="panel review-card"
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                data-testid="review-card"
              >
                <div className="review-stars">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="review-text">
                  <Quote size={26} style={{ color: "var(--cyan)", marginRight: 6, verticalAlign: "-4px" }} />
                  {r.text}
                </p>
                <div className="review-author">
                  <div className="review-avatar">{r.name.charAt(0)}</div>
                  <div className="who">
                    <strong>{r.name}</strong>
                    <span>{r.device}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="reviews-nav">
              <div className="dots">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    className={i === idx ? "active" : ""}
                    onClick={() => go(i)}
                    aria-label={`Opinión ${i + 1}`}
                    data-testid={`review-dot-${i}`}
                  />
                ))}
              </div>
              <div className="arrows">
                <button className="arrow-btn" onClick={prev} aria-label="Anterior" data-testid="review-prev">
                  <ChevronLeft size={20} />
                </button>
                <button className="arrow-btn" onClick={next} aria-label="Siguiente" data-testid="review-next">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
