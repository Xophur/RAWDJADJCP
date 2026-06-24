import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Disc3 } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/chapter/sound-systems", label: "Read", match: "/chapter" },
  { to: "/teachers-guide", label: "Teacher's Guide" },
  { to: "/downloads", label: "Downloads" },
  { to: "/certificate", label: "Get Certified" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (l) => (l.match ? pathname.startsWith(l.match) : pathname === l.to);

  return (
    <header
      data-testid="main-nav"
      className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-ink/85 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <Disc3 className="w-6 h-6 text-neon-green group-hover:rotate-180 transition-transform duration-700" />
          <span className="font-display font-extrabold uppercase tracking-tighter text-base sm:text-lg">
            The Needle Drop
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className={`px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                isActive(l)
                  ? "text-neon-green"
                  : "text-white/70 hover:text-neon-orange"
              } ${l.to === "/certificate" ? "ml-2 border border-neon-orange/60 text-neon-orange hover:bg-neon-orange hover:text-black rounded-sm" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink/95 backdrop-blur-xl border-b border-white/10 px-5 pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-mobile-${l.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className={`block py-3 text-sm font-semibold uppercase tracking-wide border-b border-white/5 ${
                isActive(l) ? "text-neon-green" : "text-white/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
