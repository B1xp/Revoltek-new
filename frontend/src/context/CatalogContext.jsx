import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CATALOG } from "../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const CatalogContext = createContext({ catalog: CATALOG, reload: () => {} });

export function CatalogProvider({ children }) {
  const [catalog, setCatalog] = useState(CATALOG);

  const load = async () => {
    try {
      const { data } = await axios.get(`${API}/catalog`);
      const c = data.catalog;
      setCatalog(Array.isArray(c) && c.length ? c : CATALOG);
    } catch (e) {
      setCatalog(CATALOG);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <CatalogContext.Provider value={{ catalog, reload: load }}>
      {children}
    </CatalogContext.Provider>
  );
}

export const useCatalog = () => useContext(CatalogContext);
export { API };
