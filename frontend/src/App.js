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
  const isPrint = pathname.includes("/print/");
  const program = pathname.startsWith("/promoter") ? "promoter" : "dj";

  return (
    <div className="grain min-h-screen bg-ink text-white">
      {!isPrint && <Nav program={program} />}
      <main>
        <Routes>
          {/* DJ program (root) */}
          <Route path="/" element={<Home program="dj" />} />
          <Route path="/chapter/:id" element={<Chapter program="dj" />} />
          <Route path="/teachers-guide" element={<TeachersGuide program="dj" />} />
          <Route path="/downloads" element={<Downloads program="dj" />} />
          <Route path="/certificate" element={<Certificate program="dj" />} />
          <Route path="/print/:edition" element={<PrintEdition program="dj" />} />

          {/* Promoter program */}
          <Route path="/promoter" element={<Home program="promoter" />} />
          <Route path="/promoter/chapter/:id" element={<Chapter program="promoter" />} />
          <Route path="/promoter/teachers-guide" element={<TeachersGuide program="promoter" />} />
          <Route path="/promoter/downloads" element={<Downloads program="promoter" />} />
          <Route path="/promoter/certificate" element={<Certificate program="promoter" />} />
          <Route path="/promoter/print/:edition" element={<PrintEdition program="promoter" />} />

          {/* Shared public verification */}
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/verify/:serial" element={<VerifyCertificate />} />
        </Routes>
      </main>
      {!isPrint && <Footer program={program} />}
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
