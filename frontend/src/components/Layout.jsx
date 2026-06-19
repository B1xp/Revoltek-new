import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBar from "./MobileBar";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div className="rv" data-testid="app-root">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
