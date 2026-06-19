// ============================================================
//  RevolTek Reparaciones — DATOS EDITABLES
//  Cambia aquí tus teléfonos, textos y precios fácilmente.
// ============================================================

export const CONTACT = {
  brand: "RevolTek",
  brandFull: "RevolTek Reparaciones",
  tagline: "Reparación multimarca",
  // --- TELÉFONO PARA LLAMADA DIRECTA (edítalo) ---
  phoneDisplay: "+34 633 58 79 24",
  phoneRaw: "+34633587924",
  // --- WHATSAPP (solo números, con prefijo país, sin + ni espacios) ---
  whatsapp: "34633587924",
  email: "hola@revoltek.es",
  address: "C/ Fray Bartolomé de las Casas, 4 · 41849 Aznalcázar, Sevilla",
  hours: "Lun – Sáb · 10:00 – 20:00",
  instagram: "https://instagram.com",
};

export const waLink = (msg) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

// ============================================================
//  CATÁLOGO Y PRECIOS DE EJEMPLO — edita libremente (en €)
//  screen = pantalla/cristal · battery = batería
//  Precios orientativos basados en tarifas de mercado en España.
//  kind: "phoneDevices" | "models" | "brands" | "services"
// ============================================================

export const CATALOG = [
  // ---------- APPLE ----------
  {
    id: "apple",
    name: "Apple",
    icon: "Apple",
    kind: "phoneDevices",
    tagline: "Especialistas en todo el ecosistema Apple.",
    highlights: ["iPhone · iPad", "Mac · Apple Watch", "Pantalla y batería", "Daños por líquidos"],
    devices: [
      {
        id: "iphone",
        name: "iPhone",
        icon: "Smartphone",
        phone: true,
        labels: { screen: "Pantalla", battery: "Batería" },
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
        phone: false,
        labels: { screen: "Cristal / Táctil", battery: "Batería" },
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
        phone: false,
        labels: { screen: "Pantalla", battery: "Batería" },
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
        phone: false,
        labels: { screen: "Cristal / Pantalla", battery: "Batería" },
        models: [
          { name: "Apple Watch Ultra 2", screen: 160, battery: 80 },
          { name: "Apple Watch Series 10", screen: 130, battery: 70 },
          { name: "Apple Watch Series 9", screen: 120, battery: 65 },
          { name: "Apple Watch SE", screen: 95, battery: 55 },
        ],
      },
    ],
  },

  // ---------- SAMSUNG ----------
  {
    id: "samsung",
    name: "Samsung",
    icon: "Smartphone",
    kind: "models",
    phone: true,
    labels: { screen: "Pantalla", battery: "Batería" },
    tagline: "Galaxy reparados con piezas de calidad.",
    highlights: ["Galaxy S · A · Z", "Pantalla AMOLED", "Batería", "Puerto de carga"],
    models: [
      { name: "Galaxy S24 Ultra", screen: 230, battery: 75 },
      { name: "Galaxy S24 / S23", screen: 180, battery: 70 },
      { name: "Galaxy S22 / S21", screen: 150, battery: 65 },
      { name: "Galaxy S20 / S10", screen: 120, battery: 60 },
      { name: "Galaxy Z Flip / Fold", screen: 320, battery: 90 },
      { name: "Galaxy A55 / A54", screen: 95, battery: 60 },
      { name: "Galaxy A35 / A34", screen: 85, battery: 55 },
      { name: "Galaxy A15 / A14", screen: 60, battery: 45 },
      { name: "Galaxy A05 / A04", screen: 50, battery: 40 },
    ],
  },

  // ---------- OTRA MARCA ANDROID ----------
  {
    id: "android",
    name: "Otra marca Android",
    icon: "Smartphone",
    kind: "brands",
    phone: true,
    labels: { screen: "Pantalla", battery: "Batería" },
    tagline: "Reparamos las marcas Android más populares.",
    highlights: ["Xiaomi · Redmi · POCO", "Realme · Oppo · Motorola", "Honor · OnePlus · Pixel", "Pantalla y batería"],
    brands: [
      {
        id: "xiaomi",
        name: "Xiaomi / Redmi / POCO",
        models: [
          { name: "Xiaomi 14 / 13", screen: 130, battery: 60 },
          { name: "Redmi Note 14/13 Pro", screen: 75, battery: 50 },
          { name: "Redmi Note 14 / 13", screen: 60, battery: 45 },
          { name: "POCO X7 / X6", screen: 65, battery: 48 },
          { name: "Redmi 13C / A3", screen: 50, battery: 40 },
        ],
      },
      {
        id: "realme",
        name: "Realme",
        models: [
          { name: "Realme GT 6 / 5", screen: 110, battery: 60 },
          { name: "Realme 12 / 11", screen: 70, battery: 50 },
          { name: "Realme C67 / C55", screen: 55, battery: 42 },
        ],
      },
      {
        id: "oppo",
        name: "Oppo",
        models: [
          { name: "Oppo Find X", screen: 160, battery: 70 },
          { name: "Oppo Reno 12 / 11", screen: 120, battery: 60 },
          { name: "Oppo A98 / A78", screen: 70, battery: 48 },
        ],
      },
      {
        id: "motorola",
        name: "Motorola",
        models: [
          { name: "Moto Edge 50", screen: 110, battery: 60 },
          { name: "Moto G84 / G54", screen: 70, battery: 48 },
          { name: "Moto E14 / G play", screen: 55, battery: 42 },
        ],
      },
      {
        id: "honor",
        name: "Honor",
        models: [
          { name: "Honor Magic 6", screen: 150, battery: 65 },
          { name: "Honor 90 / 70", screen: 90, battery: 55 },
          { name: "Honor X8 / X6", screen: 60, battery: 45 },
        ],
      },
      {
        id: "oneplus",
        name: "OnePlus",
        models: [
          { name: "OnePlus 12 / 11", screen: 150, battery: 65 },
          { name: "OnePlus Nord 4 / 3", screen: 90, battery: 55 },
        ],
      },
      {
        id: "pixel",
        name: "Google Pixel",
        models: [
          { name: "Pixel 9 / 8 Pro", screen: 170, battery: 70 },
          { name: "Pixel 8 / 7", screen: 140, battery: 65 },
          { name: "Pixel 8a / 7a", screen: 110, battery: 60 },
        ],
      },
    ],
  },

  // ---------- PORTÁTILES ----------
  {
    id: "laptops",
    name: "Portátiles",
    icon: "Laptop",
    kind: "services",
    note: "Todas las marcas: HP, Lenovo, Asus, Acer, Dell, MSI, Huawei, MacBook y más.",
    tagline: "Portátiles de cualquier marca.",
    highlights: ["Todas las marcas", "Pantalla y teclado", "SSD · RAM · batería", "Formateo y virus"],
    services: [
      { name: "Cambio de pantalla", price: 120 },
      { name: "Cambio de batería", price: 49 },
      { name: "Cambio de teclado", price: 69 },
      { name: "Instalación / ampliación SSD", price: 45 },
      { name: "Ampliación de RAM", price: 35 },
      { name: "Formateo + reinstalación SO", price: 49 },
      { name: "Eliminación de virus", price: 39 },
      { name: "Limpieza interna + pasta térmica", price: 35 },
      { name: "Reparación puerto de carga", price: 60 },
      { name: "Reparación de placa base", price: 120 },
      { name: "Recuperación de datos", price: 60 },
    ],
  },

  // ---------- ORDENADORES DE SOBREMESA ----------
  {
    id: "desktops",
    name: "Ordenadores sobremesa",
    icon: "Monitor",
    kind: "services",
    note: "Sobremesa de cualquier marca o equipos montados a medida.",
    tagline: "Tu sobremesa como el primer día.",
    highlights: ["Sobremesa y a medida", "SSD · RAM · fuente", "Formateo y limpieza", "Diagnóstico hardware"],
    services: [
      { name: "Montaje de PC a medida", price: 49 },
      { name: "Instalación SSD / disco duro", price: 35 },
      { name: "Ampliación de RAM", price: 30 },
      { name: "Cambio fuente de alimentación", price: 45 },
      { name: "Formateo + reinstalación SO", price: 45 },
      { name: "Eliminación de virus", price: 39 },
      { name: "Limpieza interna + mantenimiento", price: 30 },
      { name: "Reparación de placa base", price: 90 },
      { name: "Diagnóstico de hardware", price: 20 },
      { name: "Recuperación de datos", price: 60 },
    ],
  },

  // ---------- CONSOLAS ----------
  {
    id: "consoles",
    name: "Consolas",
    icon: "Gamepad2",
    kind: "consoles",
    note: "Consolas y mandos de Xbox, PlayStation y Nintendo.",
    tagline: "Reparamos consolas y mandos de todas las marcas.",
    highlights: ["Xbox · PlayStation · Switch", "Cambio de HDMI y limpieza", "Lector, disco y placa", "Mandos: joysticks y botones"],
    brands: [
      {
        id: "xbox",
        name: "Xbox",
        models: [
          {
            name: "Xbox Series X",
            services: [
              { name: "Reparación puerto HDMI", price: 70 },
              { name: "Limpieza interna + pasta térmica", price: 40 },
              { name: "Cambio de ventilador", price: 50 },
              { name: "Reparación lector de discos", price: 60 },
              { name: "Ampliación / cambio de SSD", price: 80 },
              { name: "Reparación de placa", price: 90 },
            ],
          },
          {
            name: "Xbox Series S",
            services: [
              { name: "Reparación puerto HDMI", price: 65 },
              { name: "Limpieza interna + pasta térmica", price: 35 },
              { name: "Cambio de ventilador", price: 45 },
              { name: "Ampliación / cambio de SSD", price: 70 },
              { name: "Reparación de placa", price: 85 },
            ],
          },
          {
            name: "Xbox One X",
            services: [
              { name: "Reparación puerto HDMI", price: 60 },
              { name: "Limpieza interna + pasta térmica", price: 35 },
              { name: "Cambio de ventilador", price: 45 },
              { name: "Reparación lector de discos", price: 55 },
              { name: "Cambio de disco duro / SSD", price: 45 },
              { name: "Reparación de placa", price: 80 },
            ],
          },
          {
            name: "Xbox One S",
            services: [
              { name: "Reparación puerto HDMI", price: 55 },
              { name: "Limpieza interna + pasta térmica", price: 30 },
              { name: "Cambio de ventilador", price: 40 },
              { name: "Reparación lector de discos", price: 50 },
              { name: "Cambio de disco duro / SSD", price: 45 },
              { name: "Reparación de placa", price: 75 },
            ],
          },
          {
            name: "Mando Xbox",
            services: [
              { name: "Reparación de joystick (drift)", price: 25 },
              { name: "Botones y gatillos", price: 25 },
              { name: "Reparación puerto de carga", price: 30 },
              { name: "Limpieza y mantenimiento", price: 15 },
            ],
          },
        ],
      },
      {
        id: "playstation",
        name: "PlayStation",
        models: [
          {
            name: "PlayStation 5",
            services: [
              { name: "Reparación puerto HDMI", price: 75 },
              { name: "Limpieza interna + pasta térmica", price: 40 },
              { name: "Cambio de ventilador", price: 50 },
              { name: "Reparación lector de discos", price: 65 },
              { name: "Ampliación / cambio de SSD", price: 80 },
              { name: "Reparación de placa", price: 95 },
            ],
          },
          {
            name: "PlayStation 4",
            services: [
              { name: "Reparación puerto HDMI", price: 60 },
              { name: "Limpieza interna + pasta térmica", price: 35 },
              { name: "Cambio de ventilador", price: 45 },
              { name: "Reparación lector de discos", price: 55 },
              { name: "Cambio de disco duro / SSD", price: 45 },
              { name: "Reparación de placa", price: 80 },
            ],
          },
          {
            name: "PlayStation 3",
            services: [
              { name: "Reparación puerto HDMI", price: 55 },
              { name: "Limpieza interna + pasta térmica", price: 30 },
              { name: "Reparación lector de discos", price: 50 },
              { name: "Cambio de disco duro", price: 40 },
              { name: "Reparación luz amarilla (YLOD)", price: 70 },
              { name: "Reparación de placa", price: 75 },
            ],
          },
          {
            name: "Mando DualSense / DualShock",
            services: [
              { name: "Reparación de joystick (drift)", price: 25 },
              { name: "Botones y gatillos", price: 25 },
              { name: "Cambio de batería", price: 25 },
              { name: "Limpieza y mantenimiento", price: 15 },
            ],
          },
        ],
      },
      {
        id: "nintendo",
        name: "Nintendo",
        models: [
          {
            name: "Nintendo Switch 2",
            services: [
              { name: "Cambio de pantalla", price: 120 },
              { name: "Cambio de batería", price: 60 },
              { name: "Reparación puerto de carga", price: 50 },
              { name: "Lector de tarjetas de juego", price: 45 },
              { name: "Limpieza interna + ventilador", price: 30 },
              { name: "Reparación de placa", price: 90 },
            ],
          },
          {
            name: "Nintendo Switch 1",
            services: [
              { name: "Cambio de pantalla", price: 90 },
              { name: "Cambio de batería", price: 45 },
              { name: "Reparación puerto de carga", price: 45 },
              { name: "Lector de cartuchos", price: 40 },
              { name: "Limpieza interna + ventilador", price: 25 },
              { name: "Reparación de placa", price: 80 },
            ],
          },
          {
            name: "Joy-Con / Mando Pro",
            services: [
              { name: "Joystick Joy-Con (drift)", price: 25 },
              { name: "Botones y gatillos", price: 25 },
              { name: "Cambio de batería", price: 25 },
              { name: "Limpieza y mantenimiento", price: 15 },
            ],
          },
        ],
      },
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
    title: "Multimarca",
    text: "Apple, Samsung y Android, además de portátiles, sobremesa y ratones de marca.",
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
    device: "Portátil HP",
    rating: 5,
    text: "Le pusieron un SSD y le hicieron formateo al portátil y va volando. Me explicaron todo el proceso. Muy profesionales.",
  },
  {
    name: "Andrea Gómez",
    device: "Xiaomi Redmi Note 13",
    rating: 5,
    text: "Pantalla rota sustituida el mismo día y a muy buen precio. Me avisaron por WhatsApp en cuanto estuvo listo. Repetiré sin duda.",
  },
  {
    name: "David Martín",
    device: "PlayStation 5",
    rating: 5,
    text: "Tenía drift en el joystick del mando y la consola fallaba por el HDMI. Me lo dejaron todo perfecto y por mucho menos de lo que esperaba. Genial.",
  },
  {
    name: "Nerea Castro",
    device: "Samsung Galaxy S22",
    rating: 5,
    text: "Batería nueva y el móvil aguanta todo el día otra vez. Atención de 10 y garantía por escrito. Totalmente recomendable.",
  },
];

export const FAQS = [
  {
    q: "¿Qué dispositivos y marcas reparáis?",
    a: "Reparamos Apple (iPhone, iPad, Mac y Apple Watch), Samsung Galaxy y otras marcas Android (Xiaomi, Redmi, POCO, Realme, Oppo, Motorola, Honor, OnePlus y Google Pixel). Además reparamos portátiles de todas las marcas, ordenadores de sobremesa y ratones de marca.",
  },
  {
    q: "¿Cuánto tarda una reparación?",
    a: "La mayoría de reparaciones de pantalla o batería se entregan el mismo día, normalmente en menos de 24 horas. Para casos más complejos (placa lógica, daños por líquidos, recuperación de datos) te damos un plazo concreto tras el diagnóstico.",
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
    a: "Trabajamos con recambios de máxima calidad y, según el modelo, puedes elegir entre pieza original o compatible. Te informamos siempre del tipo de pieza utilizada.",
  },
  {
    q: "¿Los precios de la web son definitivos?",
    a: "Son precios orientativos de ejemplo. El precio final se confirma tras el diagnóstico gratuito, pero te garantizamos un presupuesto cerrado antes de tocar tu dispositivo.",
  },
];
