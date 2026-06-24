import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Chapter from "@/pages/Chapter";
import TeachersGuide from "@/pages/TeachersGuide";
import Downloads from "@/pages/Downloads";
import Certificate from "@/pages/Certificate";
import VerifyCertificate from "@/pages/VerifyCertificate";
import PrintEdition from "@/pages/PrintEdition";

function Shell() {
  const { pathname } = useLocation();
  const isPrint = pathname.startsWith("/print");

  return (
    <div className="grain min-h-screen bg-ink text-white">
      {!isPrint && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chapter/:id" element={<Chapter />} />
          <Route path="/teachers-guide" element={<TeachersGuide />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/verify/:serial" element={<VerifyCertificate />} />
          <Route path="/print/:edition" element={<PrintEdition />} />
        </Routes>
      </main>
      {!isPrint && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell />
    </BrowserRouter>
  );
}
