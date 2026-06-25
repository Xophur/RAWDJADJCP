import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Disc3 } from "lucide-react";
import { getProgram, PROGRAMS } from "../data/programs";

export default function Nav({ program = "dj" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const prog = getProgram(program);
  const base = prog.base;
  const other = program === "dj" ? PROGRAMS.promoter : PROGRAMS.dj;

  const links = [
    { to: base || "/", label: "Home", exact: true },
    { to: `${base}/chapter/${prog.chapters[0].id}`, label: "Read", match: `${base}/chapter` },
    { to: `${base}/teachers-guide`, label: "Teacher's Guide" },
    { to: `${base}/downloads`, label: "Downloads" },
    { to: `${base}/certificate`, label: "Get Certified" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (l) => (l.exact ? pathname === l.to : l.match ? pathname.startsWith(l.match) : pathname === l.to);

  return (
    <header data-testid="main-nav" className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-ink/85 border-b border-white/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link to={base || "/"} data-testid="nav-logo" className="flex items-center gap-2 group">
          <Disc3 className="w-6 h-6 text-neon-green group-hover:rotate-180 transition-transform duration-700" />
          <span className="font-display font-extrabold uppercase tracking-tighter text-base sm:text-lg">
            RAWDJA <span className="text-neon-orange">{prog.short}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${isActive(l) ? "text-neon-green" : "text-white/70 hover:text-neon-orange"} ${l.label === "Get Certified" ? "ml-1 border border-neon-orange/60 text-neon-orange hover:bg-neon-orange hover:text-black rounded-sm" : ""}`}>
              {l.label}
            </Link>
          ))}
          <Link to={other.base || "/"} data-testid="nav-switch-program" className="ml-2 px-3 py-2 text-xs font-mono-x uppercase tracking-wide text-neon-blue border border-neon-blue/40 rounded-sm hover:bg-neon-blue hover:text-black transition-colors">
            {other.short} →
          </Link>
        </nav>

        <button data-testid="nav-mobile-toggle" className="md:hidden text-white" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink/95 backdrop-blur-xl border-b border-white/10 px-5 pb-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} data-testid={`nav-mobile-${l.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className={`block py-3 text-sm font-semibold uppercase tracking-wide border-b border-white/5 ${isActive(l) ? "text-neon-green" : "text-white/80"}`}>
              {l.label}
            </Link>
          ))}
          <Link to={other.base || "/"} className="block py-3 text-sm font-semibold uppercase tracking-wide text-neon-blue">
            Switch to {other.label} →
          </Link>
        </div>
      )}
    </header>
  );
}
