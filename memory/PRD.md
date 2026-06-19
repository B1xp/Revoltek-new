# RevolTek Reparaciones — Landing Apple

## Problema original
Web (antes HTML básico) de reparación de dispositivos Apple. El usuario pidió
convertirla en una página React moderna, minimalista pero fluida, con animaciones
elegantes, secciones, deslizables y botones interactivos.

## Decisiones del usuario
- Stack: React con animaciones suaves/profesionales (framer-motion).
- Contacto: botón WhatsApp + llamada directa (números de EJEMPLO editables).
- Precios: de ejemplo editables (pantalla/batería por modelo).
- Alcance: iPhone, iPad, Mac, Apple Watch.
- Animación: sutil y elegante.
- Secciones extra: FAQ + reseñas/testimonios.

## Arquitectura
- Frontend-only (sin backend). React 19 + framer-motion + lucide-react.
- Datos editables en `src/data/site.js` (CONTACT, DEVICES/precios, REVIEWS, FAQS).
- Logo procesado a PNG transparente: `public/assets/logo_full_transparent.png`
  (hero) e `public/assets/icon_transparent.png` (header).
- Componentes en `src/components/`: Header, Hero, Services, Calculator, WhyUs,
  Testimonials, Faq, Contact, Footer, MobileBar, Reveal.

## Implementado (2026-06-19)
- Header fijo con blur al hacer scroll, nav + menú móvil, CTA llamar.
- Hero con logo transparente flotante, glow animado, marquee, badges, CTAs.
- Servicios (4 categorías Apple) con hover.
- Calculadora interactiva: dispositivo > modelo > pantalla/batería, ficha de
  diagnóstico tipo terminal con precio animado + CTA WhatsApp/llamar.
- Por qué nosotros + stats. Testimonios en carrusel (autoplay/flechas/dots).
- FAQ acordeón animado. Contacto con WhatsApp + llamada. Footer.
- Barra de contacto fija en móvil (WhatsApp + Llamar).

## PENDIENTE / Editar
- Sustituir números EJEMPLO en `src/data/site.js`:
  phoneRaw/phoneDisplay y whatsapp (con prefijo país, sin + ni espacios).
- Ajustar precios reales y dirección/horario/email.

## Backlog (P1/P2)
- Formulario "pide tu presupuesto" con backend + email (Resend/SendGrid).
- Galería de antes/después, reseñas de Google reales, blog/SEO.

## Update 2026-06-19 (v2)
- Catálogo ampliado: Apple, Samsung, Otra marca Android (Xiaomi/Realme/Oppo/Motorola/Honor/OnePlus/Pixel), Portátiles, Sobremesa y Consolas (Xbox/PlayStation/Nintendo con modelos→servicios).
- Calculadora: selección por categoría primero; "Otro modelo" + campo libre; calidad de pieza (original/compatible, OLED-OEM/Incell, mayor capacidad para iPhone antiguos); observaciones.
- Web multipágina (react-router): /servicios /precios /opiniones /faq /contacto + /admin.
- BACKEND (FastAPI+Mongo): auth JWT admin (usuario Ale), price overrides editables.
- Panel admin /admin/login -> /admin: edita todos los precios, busca, guarda (PUT overrides). Frontend aplica overrides sobre CATALOG base vía CatalogContext.
- Footer con dirección real (Aznalcázar, Sevilla), teléfono y horario + enlace admin.
- Eliminado botón "Enviar por email" del presupuesto (quedan WhatsApp + Llamar).
- Verificado e2e: login ok/fallo, editar precio -> refleja en web pública, overrides limpiados tras prueba.

## Backlog
- Envío automático de presupuestos por email (Resend/SendGrid) si se desea.
- Permitir editar también textos/contacto desde el panel admin.
