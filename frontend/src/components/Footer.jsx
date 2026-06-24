import React from "react";
import { Link } from "react-router-dom";
import { Disc3, Instagram } from "lucide-react";
import { RawdjaSeal } from "./RawdjaSeal";

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="no-print relative z-10 border-t border-white/10 bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Disc3 className="w-6 h-6 text-neon-green" />
            <span className="font-display font-extrabold uppercase tracking-tighter text-lg">The Needle Drop</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            A digital course on the history of DJing, pirate radio, hip-hop, house, and rave culture — by Xophur.
          </p>
        </div>

        <div className="text-sm">
          <h4 className="font-display uppercase text-neon-orange tracking-wide mb-4">Course</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link className="hover:text-neon-green" to="/chapter/sound-systems">Read the chapters</Link></li>
            <li><Link className="hover:text-neon-green" to="/teachers-guide">Teacher's Guide</Link></li>
            <li><Link className="hover:text-neon-green" to="/downloads">Download PDFs</Link></li>
            <li><Link className="hover:text-neon-green" to="/certificate">Get certified</Link></li>
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
