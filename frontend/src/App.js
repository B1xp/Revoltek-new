import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/precios" element={<Calculator />} />
          <Route path="/opiniones" element={<Testimonials />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
