// Utilidades para precios editables: aplanar el catálogo en claves estables
// y aplicar los "overrides" guardados por el administrador.

import { CATALOG } from "./site";

const clone = (obj) => JSON.parse(JSON.stringify(obj));

// Genera una lista plana de campos de precio editables con clave única.
export function flattenPrices(catalog = CATALOG) {
  const out = [];
  const push = (key, label, value, group) => out.push({ key, label, value, group });

  for (const cat of catalog) {
    if (cat.kind === "phoneDevices") {
      for (const d of cat.devices) {
        for (const m of d.models) {
          push(`${cat.id}|${d.id}|${m.name}|screen`, `${d.name} · ${m.name} · ${d.labels.screen}`, m.screen, cat.name);
          push(`${cat.id}|${d.id}|${m.name}|battery`, `${d.name} · ${m.name} · ${d.labels.battery}`, m.battery, cat.name);
        }
      }
    } else if (cat.kind === "models") {
      for (const m of cat.models) {
        push(`${cat.id}|${m.name}|screen`, `${m.name} · ${cat.labels.screen}`, m.screen, cat.name);
        push(`${cat.id}|${m.name}|battery`, `${m.name} · ${cat.labels.battery}`, m.battery, cat.name);
      }
    } else if (cat.kind === "brands") {
      for (const b of cat.brands) {
        for (const m of b.models) {
          push(`${cat.id}|${b.id}|${m.name}|screen`, `${b.name} · ${m.name} · ${cat.labels.screen}`, m.screen, cat.name);
          push(`${cat.id}|${b.id}|${m.name}|battery`, `${b.name} · ${m.name} · ${cat.labels.battery}`, m.battery, cat.name);
        }
      }
    } else if (cat.kind === "services") {
      for (const s of cat.services) {
        push(`${cat.id}|svc|${s.name}`, `${s.name}`, s.price, cat.name);
      }
    } else if (cat.kind === "consoles") {
      for (const b of cat.brands) {
        for (const m of b.models) {
          for (const s of m.services) {
            push(`${cat.id}|${b.id}|${m.name}|${s.name}`, `${b.name} · ${m.name} · ${s.name}`, s.price, cat.name);
          }
        }
      }
    }
  }
  return out;
}

// Aplica los overrides (clave -> precio) sobre una copia del catálogo.
export function applyOverrides(overrides = {}, catalog = CATALOG) {
  const data = clone(catalog);
  const get = (key, fallback) => (overrides[key] != null ? Number(overrides[key]) : fallback);

  for (const cat of data) {
    if (cat.kind === "phoneDevices") {
      for (const d of cat.devices) {
        for (const m of d.models) {
          m.screen = get(`${cat.id}|${d.id}|${m.name}|screen`, m.screen);
          m.battery = get(`${cat.id}|${d.id}|${m.name}|battery`, m.battery);
        }
      }
    } else if (cat.kind === "models") {
      for (const m of cat.models) {
        m.screen = get(`${cat.id}|${m.name}|screen`, m.screen);
        m.battery = get(`${cat.id}|${m.name}|battery`, m.battery);
      }
    } else if (cat.kind === "brands") {
      for (const b of cat.brands) {
        for (const m of b.models) {
          m.screen = get(`${cat.id}|${b.id}|${m.name}|screen`, m.screen);
          m.battery = get(`${cat.id}|${b.id}|${m.name}|battery`, m.battery);
        }
      }
    } else if (cat.kind === "services") {
      for (const s of cat.services) {
        s.price = get(`${cat.id}|svc|${s.name}`, s.price);
      }
    } else if (cat.kind === "consoles") {
      for (const b of cat.brands) {
        for (const m of b.models) {
          for (const s of m.services) {
            s.price = get(`${cat.id}|${b.id}|${m.name}|${s.name}`, s.price);
          }
        }
      }
    }
  }
  return data;
}
