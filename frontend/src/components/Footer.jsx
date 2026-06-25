import React from "react";
import { Link } from "react-router-dom";
import { Disc3 } from "lucide-react";
import { RawdjaSeal } from "./RawdjaSeal";
import { getProgram, PROGRAMS } from "../data/programs";

export default function Footer({ program = "dj" }) {
  const prog = getProgram(program);
  const base = prog.base;
  const other = program === "dj" ? PROGRAMS.promoter : PROGRAMS.dj;

  return (
    <footer data-testid="main-footer" className="no-print relative z-10 border-t border-white/10 bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Disc3 className="w-6 h-6 text-neon-green" />
            <span className="font-display font-extrabold uppercase tracking-tighter text-lg">RAWDJA {prog.short}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">{prog.course.title} — {prog.blurb}</p>
          <Link to={other.base || "/"} className="mt-4 inline-block text-neon-blue hover:text-neon-green text-sm font-semibold">
            → {other.label}
          </Link>
        </div>

        <div className="text-sm">
          <h4 className="font-display uppercase text-neon-orange tracking-wide mb-4">Program</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link className="hover:text-neon-green" to={`${base}/chapter/${prog.chapters[0].id}`}>Read the modules</Link></li>
            <li><Link className="hover:text-neon-green" to={`${base}/teachers-guide`}>Teacher's Guide</Link></li>
            <li><Link className="hover:text-neon-green" to={`${base}/downloads`}>Download PDFs</Link></li>
            <li><Link className="hover:text-neon-green" to={`${base}/certificate`}>Get certified</Link></li>
            <li><Link className="hover:text-neon-green" to="/verify">Verify a certificate</Link></li>
          </ul>
        </div>

        <div className="flex md:justify-end items-start gap-4">
          <RawdjaSeal size={92} />
          <div className="text-xs text-white/50 max-w-[160px]">
            <p className="font-semibold text-white/70 mb-1">Rave And Warehouse DJ Association</p>
            <p>A non-profit professional association. Certificates verified via hash-linked ledger.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40 font-mono-x">
        © {new Date().getFullYear()} Xophur · RAWDJA · hosted at xophur.com
      </div>
    </footer>
  );
}
