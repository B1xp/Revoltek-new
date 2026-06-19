// ============================================================
//  RevolTek Reparaciones — DATOS EDITABLES
//  Cambia aquí tus teléfonos, textos y precios fácilmente.
// ============================================================

export const CONTACT = {
  brand: "RevolTek",
  brandFull: "RevolTek Reparaciones",
  tagline: "Especialistas en Apple",
  // --- TELÉFONO PARA LLAMADA DIRECTA (edítalo) ---
  phoneDisplay: "+34 633 58 79 24",
  phoneRaw: "+34633587924",
  // --- WHATSAPP (solo números, con prefijo país, sin + ni espacios) ---
  whatsapp: "34633587924",
  email: "hola@revoltek.es",
  address: "Calle de ejemplo 123 · Tu ciudad",
  hours: "Lun – Sáb · 10:00 – 20:00",
  instagram: "https://instagram.com",
};

export const waLink = (msg) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

// ============================================================
//  PRECIOS DE EJEMPLO — edita libremente (en €)
//  screen = pantalla/cristal · battery = batería
//  Pon 0 si no aplica (se mostrará "Consultar").
// ============================================================

export const DEVICES = [
  {
    id: "iphone",
    name: "iPhone",
    icon: "Smartphone",
    labels: { screen: "Pantalla", battery: "Batería" },
    blurb: "Cambio de pantalla, batería, cámara y daños por líquidos.",
    services: ["Cambio de pantalla", "Sustitución de batería", "Reparación de cámara", "Daño por líquidos"],
    models: [
      { name: "iPhone 16 Pro Max", screen: 320, battery: 90 },
      { name: "iPhone 16 Pro", screen: 290, battery: 85 },
      { name: "iPhone 16", screen: 220, battery: 75 },
      { name: "iPhone 15 Pro Max", screen: 280, battery: 80 },
      { name: "iPhone 15", screen: 200, battery: 70 },
      { name: "iPhone 14 Pro", screen: 230, battery: 70 },
      { name: "iPhone 14", screen: 170, battery: 65 },
      { name: "iPhone 13", screen: 150, battery: 60 },
      { name: "iPhone 12", screen: 130, battery: 55, olderBattery: true },
      { name: "iPhone 11", screen: 110, battery: 50, olderBattery: true },
      { name: "iPhone SE", screen: 90, battery: 45, olderBattery: true },
    ],
  },
  {
    id: "ipad",
    name: "iPad",
    icon: "Tablet",
    labels: { screen: "Cristal / Táctil", battery: "Batería" },
    blurb: "Cristal y táctil, batería, puerto de carga y botones.",
    services: ["Cristal y táctil", "Batería", "Puerto de carga", "Botones físicos"],
    models: [
      { name: 'iPad Pro 12.9"', screen: 280, battery: 110 },
      { name: 'iPad Pro 11"', screen: 250, battery: 100 },
      { name: "iPad Air", screen: 190, battery: 90 },
      { name: "iPad (10ª gen)", screen: 150, battery: 80 },
      { name: "iPad mini", screen: 170, battery: 85 },
    ],
  },
  {
    id: "mac",
    name: "Mac",
    icon: "Laptop",
    labels: { screen: "Pantalla", battery: "Batería" },
    blurb: "Teclado, pantalla, ampliación SSD/RAM y diagnóstico lógico.",
    services: ["Teclado y trackpad", "Pantalla", "Ampliación SSD / RAM", "Diagnóstico lógico"],
    models: [
      { name: 'MacBook Pro 16"', screen: 480, battery: 160 },
      { name: 'MacBook Pro 14"', screen: 420, battery: 150 },
      { name: 'MacBook Pro 13"', screen: 350, battery: 140 },
      { name: "MacBook Air M2 / M3", screen: 320, battery: 130 },
      { name: "iMac", screen: 390, battery: 0 },
    ],
  },
  {
    id: "watch",
    name: "Apple Watch",
    icon: "Watch",
    labels: { screen: "Cristal / Pantalla", battery: "Batería" },
    blurb: "Cristal/pantalla, batería, corona digital y carcasa.",
    services: ["Cristal / pantalla", "Batería", "Corona digital", "Correas y carcasa"],
    models: [
      { name: "Apple Watch Ultra 2", screen: 160, battery: 80 },
      { name: "Apple Watch Series 10", screen: 130, battery: 70 },
      { name: "Apple Watch Series 9", screen: 120, battery: 65 },
      { name: "Apple Watch SE", screen: 95, battery: 55 },
    ],
  },
];

export const STATS = [
  { value: "+500", label: "Dispositivos reparados" },
  { value: "24h", label: "Entrega media" },
  { value: "100%", label: "Diagnóstico transparente" },
  { value: "4.9★", label: "Valoración media" },
];

export const WHY = [
  {
    icon: "ShieldCheck",
    title: "Garantía real",
    text: "Todas las reparaciones incluyen garantía por escrito, sin excusas ni letra pequeña.",
  },
  {
    icon: "Zap",
    title: "Rapidez sin atajos",
    text: "La mayoría de reparaciones se entregan el mismo día sin comprometer la calidad.",
  },
  {
    icon: "Tag",
    title: "Precio cerrado",
    text: "Confirmamos el presupuesto exacto antes de tocar tu dispositivo. Cero sorpresas.",
  },
  {
    icon: "Award",
    title: "Técnicos certificados",
    text: "Especialistas formados exclusivamente en el ecosistema Apple y recambios de calidad.",
  },
];

export const REVIEWS = [
  {
    name: "Lucía Fernández",
    device: "iPhone 14 Pro",
    rating: 5,
    text: "Me cambiaron la pantalla en menos de una hora y quedó perfecta. Trato cercano y precio justo, justo lo que prometían por teléfono.",
  },
  {
    name: "Marcos Ruiz",
    device: 'MacBook Pro 14"',
    rating: 5,
    text: "Pensaba que mi MacBook era irrecuperable tras un derrame de café. Lo dejaron como nuevo y me explicaron todo el proceso. Muy profesionales.",
  },
  {
    name: "Andrea Gómez",
    device: "Apple Watch Series 9",
    rating: 5,
    text: "Cristal roto sustituido el mismo día. Me avisaron por WhatsApp en cuanto estuvo listo. Repetiré sin duda.",
  },
  {
    name: "David Martín",
    device: "iPad Air",
    rating: 5,
    text: "Presupuesto cerrado desde el principio y cumplieron al céntimo. Se nota que saben lo que hacen con productos Apple.",
  },
  {
    name: "Nerea Castro",
    device: "iPhone 13",
    rating: 5,
    text: "Batería nueva y el móvil aguanta todo el día otra vez. Atención de 10 y garantía por escrito. Totalmente recomendable.",
  },
];

export const FAQS = [
  {
    q: "¿Cuánto tarda una reparación?",
    a: "La mayoría de reparaciones de pantalla o batería se entregan el mismo día, normalmente en menos de 24 horas. Para casos más complejos (placa lógica, daños por líquidos) te damos un plazo concreto tras el diagnóstico.",
  },
  {
    q: "¿El diagnóstico tiene coste?",
    a: "No. El diagnóstico es totalmente gratuito y sin compromiso. Te confirmamos el precio cerrado antes de empezar cualquier reparación.",
  },
  {
    q: "¿Qué garantía ofrecéis?",
    a: "Todas nuestras reparaciones incluyen garantía por escrito. Si algo relacionado con la reparación falla dentro del periodo, lo solucionamos sin coste.",
  },
  {
    q: "¿Usáis recambios originales?",
    a: "Trabajamos con recambios de máxima calidad. Te informamos siempre del tipo de pieza utilizada para que elijas la opción que mejor se ajuste a ti.",
  },
  {
    q: "¿Los precios de la web son definitivos?",
    a: "Son precios orientativos de ejemplo. El precio final se confirma tras el diagnóstico gratuito, pero te garantizamos un presupuesto cerrado antes de tocar tu dispositivo.",
  },
  {
    q: "¿Reparáis todos los dispositivos Apple?",
    a: "Sí: iPhone, iPad, Mac y Apple Watch. Si tienes dudas sobre tu modelo concreto, escríbenos por WhatsApp y te lo confirmamos al momento.",
  },
];
