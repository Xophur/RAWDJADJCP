import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Download, FileText, GraduationCap, BookOpen, Loader2, Eye } from "lucide-react";
import { CHAPTERS } from "../data/content";
import { downloadEdition } from "../lib/downloads";
import { Reveal } from "../components/Reveal";

export default function Downloads() {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const grab = async (edition) => {
    setError("");
    setLoading(edition);
    try {
      await downloadEdition(edition);
    } catch (e) {
      setError("Download failed. Please try again in a moment.");
    } finally {
      setLoading("");
    }
  };

  const cards = [
    {
      edition: "student",
      icon: BookOpen,
      title: "Student Edition",
      body: `The full course: all ${CHAPTERS.length} modules, pull quotes, key terms, and the complete glossary.`,
      view: "/print/student",
      border: "border-neon-green/25",
      iconColor: "text-neon-green",
    },
    {
      edition: "teacher",
      icon: GraduationCap,
      title: "Teacher's Edition",
      body: "Lesson plans, objectives, discussion questions, assessments, glossary, resources & the 3-pass editorial notes.",
      view: "/print/teacher",
      border: "border-neon-blue/25",
      iconColor: "text-neon-blue",
    },
  ];

  return (
    <div data-testid="downloads-page" className="relative z-10 pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <span className="font-mono-x text-neon-green text-xs uppercase tracking-[0.3em]">Take it offline</span>
          <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-6xl">
            Down<span className="text-neon-orange">loads</span>
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl leading-relaxed">
            Click a button to download a real, formatted <span className="text-neon-green font-semibold">PDF file</span> —
            straight to your device, no print dialog required. Prefer to read first? Use “View online.”
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {cards.map((c, i) => (
            <Reveal key={c.edition} delay={i * 0.08}>
              <div className={`bg-cardp border ${c.border} rounded-md p-8 h-full flex flex-col`}>
                <c.icon className={`w-10 h-10 ${c.iconColor} mb-5`} />
                <h2 className="font-display uppercase tracking-tight text-2xl mb-2">{c.title}</h2>
                <p className="text-white/65 text-sm leading-relaxed mb-6 flex-1">{c.body}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    data-testid={`download-${c.edition}`}
                    onClick={() => grab(c.edition)}
                    disabled={loading === c.edition}
                    className="inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide text-xs px-5 py-3 rounded-sm hover:brightness-110 glow-orange transition-all disabled:opacity-60"
                  >
                    {loading === c.edition ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {loading === c.edition ? "Building PDF…" : "Download PDF"}
                  </button>
                  <Link
                    to={c.view}
                    data-testid={`view-${c.edition}`}
                    className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-bold uppercase tracking-wide text-xs px-5 py-3 rounded-sm hover:border-neon-green hover:text-neon-green transition-all"
                  >
                    <Eye className="w-4 h-4" /> View online
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {error && <p data-testid="download-error" className="mt-6 text-neon-orange text-sm">{error}</p>}

        <div className="mt-10 flex items-start gap-3 text-white/45 text-xs font-mono-x bg-surface border border-white/10 rounded-md p-5">
          <FileText className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
          <p>Each PDF is generated fresh from the latest course content, formatted for clean printing and sharing with students.</p>
        </div>
      </div>
    </div>
  );
}
