import React from "react";
import { Link } from "react-router-dom";
import { Download, FileText, GraduationCap, BookOpen } from "lucide-react";
import { CHAPTERS } from "../data/content";
import { Reveal } from "../components/Reveal";

export default function Downloads() {
  return (
    <div data-testid="downloads-page" className="relative z-10 pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <span className="font-mono-x text-neon-green text-xs uppercase tracking-[0.3em]">Take it offline</span>
          <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-6xl">
            Down<span className="text-neon-orange">loads</span>
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl leading-relaxed">
            Two print-ready editions. Click a card, then use your browser's print dialog and choose
            <span className="text-neon-green font-semibold"> “Save as PDF.”</span> Both are themed for screen and
            clean for paper.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Reveal>
            <Link to="/print/student" data-testid="download-student" className="group block bg-cardp border border-neon-green/25 rounded-md p-8 hover:border-neon-orange hover:glow-orange transition-all duration-200">
              <BookOpen className="w-10 h-10 text-neon-green mb-5" />
              <h2 className="font-display uppercase tracking-tight text-2xl mb-2">Student Edition</h2>
              <p className="text-white/65 text-sm leading-relaxed mb-4">
                The full course: all {CHAPTERS.length} modules, pull quotes, key terms, and the complete glossary.
              </p>
              <span className="inline-flex items-center gap-2 text-neon-orange font-bold uppercase text-xs tracking-wide">
                <Download className="w-4 h-4" /> Open & save as PDF
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <Link to="/print/teacher" data-testid="download-teacher" className="group block bg-cardp border border-neon-blue/25 rounded-md p-8 hover:border-neon-orange hover:glow-orange transition-all duration-200">
              <GraduationCap className="w-10 h-10 text-neon-blue mb-5" />
              <h2 className="font-display uppercase tracking-tight text-2xl mb-2">Teacher's Edition</h2>
              <p className="text-white/65 text-sm leading-relaxed mb-4">
                Lesson plans, learning objectives, discussion questions, assessments, glossary, resources & the 3-pass editorial notes.
              </p>
              <span className="inline-flex items-center gap-2 text-neon-orange font-bold uppercase text-xs tracking-wide">
                <Download className="w-4 h-4" /> Open & save as PDF
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 flex items-start gap-3 text-white/45 text-xs font-mono-x bg-surface border border-white/10 rounded-md p-5">
          <FileText className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
          <p>Tip: in the print dialog, set margins to “Default” and enable “Background graphics” for the best look. Landscape works well for the Teacher's Edition tables.</p>
        </div>
      </div>
    </div>
  );
}
