import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Headphones, Radio, Disc3, Award, GraduationCap, BookOpen } from "lucide-react";
import { COURSE, CHAPTERS } from "../data/content";
import { ART, RAVE_PHOTOS, RAVE_HERO } from "../data/assets";
import { Reveal, Equalizer } from "../components/Reveal";
import { RawdjaSeal } from "../components/RawdjaSeal";

const stats = [
  { k: "06", v: "Modules" },
  { k: "70+", v: "Years of history" },
  { k: "31", v: "Years teaching" },
  { k: "1", v: "Real rave case study" },
];

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ART.heroTurntable} alt="Neon-lit turntable" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent" />
        </div>

        <div className="absolute top-20 left-0 right-0 h-4 chevron-strip opacity-70" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 w-full">
          <div className="flex items-center gap-3 mb-6">
            <Equalizer />
            <span className="font-mono-x text-neon-green text-xs sm:text-sm uppercase tracking-[0.3em]">
              {COURSE.tagline}
            </span>
          </div>

          <h1 className="font-display font-black uppercase tracking-tighter text-5xl sm:text-7xl lg:text-8xl leading-[0.9] max-w-4xl">
            <span className="text-white">The</span>{" "}
            <span className="text-neon-green text-glow-green">Needle</span>{" "}
            <span className="text-neon-orange text-glow-orange">Drop</span>
          </h1>

          <p className="mt-7 text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed">
            {COURSE.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/chapter/sound-systems"
              data-testid="hero-start-reading"
              className="group inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide px-7 py-3.5 rounded-sm hover:brightness-110 glow-orange transition-all duration-200"
            >
              Start the course
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/certificate"
              data-testid="hero-get-certified"
              className="inline-flex items-center gap-2 border border-neon-green/60 text-neon-green font-bold uppercase tracking-wide px-7 py-3.5 rounded-sm hover:bg-neon-green hover:text-black transition-all duration-200"
            >
              <Award className="w-4 h-4" /> Get certified
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden max-w-3xl">
            {stats.map((s) => (
              <div key={s.v} className="bg-ink/80 px-5 py-5">
                <div className="font-display font-black text-2xl sm:text-3xl text-neon-blue">{s.k}</div>
                <div className="text-white/60 text-xs uppercase tracking-wide mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="neon-divider max-w-7xl mx-auto" />

      {/* INTRO */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <span className="font-mono-x text-neon-orange text-xs uppercase tracking-[0.3em]">The throughline</span>
          <p className="mt-5 font-display text-2xl sm:text-3xl lg:text-4xl leading-tight uppercase tracking-tight">
            One unbroken line runs from a <span className="text-neon-green">Kingston sound system</span> to a{" "}
            <span className="text-neon-orange">secret rave in the woods</span> — and straight through a{" "}
            <span className="text-neon-blue">hedge fund's balance sheet</span>.
          </p>
          <p className="mt-6 text-white/70 leading-relaxed max-w-3xl">{COURSE.description}</p>
        </Reveal>
      </section>

      {/* CHAPTERS */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-10">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display font-extrabold uppercase tracking-tighter text-3xl sm:text-4xl">
            The <span className="text-neon-green">Modules</span>
          </h2>
          <BookOpen className="w-7 h-7 text-neon-orange" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[minmax(220px,auto)]">
          {CHAPTERS.map((ch, i) => {
            const big = i === 0 || i === CHAPTERS.length - 1;
            return (
              <Reveal
                key={ch.id}
                delay={i * 0.05}
                className={big ? "md:col-span-4" : "md:col-span-2"}
              >
                <Link
                  to={`/chapter/${ch.id}`}
                  data-testid={`chapter-card-${ch.id}`}
                  className="group relative block h-full min-h-[220px] rounded-md overflow-hidden border border-neon-green/25 hover:border-neon-orange transition-all duration-200"
                >
                  <img src={ch.image} alt={ch.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display font-black text-neon-orange text-lg">{ch.num}</span>
                      <span className="font-mono-x text-[10px] uppercase tracking-[0.2em] text-neon-green border border-neon-green/40 px-2 py-0.5 rounded-sm">
                        {ch.kicker}
                      </span>
                      {ch.isBonus && (
                        <span className="font-mono-x text-[10px] uppercase tracking-[0.2em] text-black bg-neon-orange px-2 py-0.5 rounded-sm">
                          Bonus
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold uppercase tracking-tight text-xl sm:text-2xl leading-tight">
                      {ch.title}
                    </h3>
                    <p className="mt-2 text-white/65 text-sm leading-relaxed max-w-md">{ch.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-neon-green text-xs font-bold uppercase tracking-wide">
                      Read · {ch.readTime} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* REAL RAVE CASE STUDY */}
      <section className="relative z-10 mt-24">
        <div className="relative">
          <img src={RAVE_HERO} alt="Goblin Mode underground rave" className="w-full h-[60vh] object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
              <Reveal>
                <span className="font-mono-x text-neon-orange text-xs uppercase tracking-[0.3em]">Bonus · Real-rave case study</span>
                <h2 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-6xl max-w-2xl leading-[0.95]">
                  Goblin <span className="text-neon-green">Mode</span>
                </h2>
                <p className="mt-5 text-white/80 max-w-xl leading-relaxed">
                  No address. Just a date, a stacked DIY lineup, and one instruction: DM the password
                  <span className="text-neon-green font-bold"> GOBLIN </span> for the location. The same way ravers
                  found the M25 parties in 1989 — proof the underground still runs on the original ethos.
                </p>
                <Link
                  to="/chapter/corporate-vs-real"
                  data-testid="case-study-link"
                  className="mt-7 inline-flex items-center gap-2 bg-neon-green text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:brightness-110 glow-green transition-all"
                >
                  Read the bonus module <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 -mt-12 relative z-10">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {RAVE_PHOTOS.map((p, i) => (
              <div key={i} className="shrink-0 w-64 rounded-md overflow-hidden border border-white/10 hover:border-neon-orange transition-colors">
                <img src={p.url} alt={p.caption} className="w-full h-40 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="font-mono-x text-neon-green text-xs uppercase tracking-[0.3em]">Your instructor</span>
            <h2 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-5xl">Xophur</h2>
            <p className="mt-6 text-white/75 leading-relaxed">
              A working DJ and educator with a <span className="text-neon-green font-semibold">31-year career</span>.
              Over three decades he has mentored a generation of artists — among them DJ Sivart, Soundjack, GalaxyBoy,
              and Psybod, whom he taught to beatmatch back in 1998 and who now runs{" "}
              <span className="text-white">Our Velocity Productions</span>.
            </p>
            <p className="mt-4 text-white/75 leading-relaxed">
              He was running one of three rave companies in Delaware when then-Senator Joe Biden introduced the
              RAVE Act in 2002 — close enough to the fire that legislation aimed at operators like him became
              personal history. This course is that lived experience, organized into something you can teach from.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["DJ Sivart", "Soundjack", "GalaxyBoy", "Psybod"].map((n) => (
                <span key={n} className="font-mono-x text-xs uppercase tracking-wide text-neon-blue border border-neon-blue/30 px-3 py-1.5 rounded-sm">
                  {n}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Disc3, label: "Turntablism" },
                { icon: Radio, label: "Pirate Radio" },
                { icon: Headphones, label: "Mixing & Beatmatching" },
                { icon: GraduationCap, label: "31 Years Teaching" },
              ].map((b, i) => (
                <div key={i} className="bg-cardp border border-neon-green/20 rounded-md p-6 hover:border-neon-orange hover:glow-orange transition-all duration-200">
                  <b.icon className="w-8 h-8 text-neon-green mb-3" />
                  <div className="font-display uppercase text-sm tracking-tight">{b.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA TILES */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pb-10">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { to: "/teachers-guide", icon: GraduationCap, title: "Teacher's Guide", body: "Lesson plans, objectives, discussion questions, glossary & resources.", color: "green" },
            { to: "/downloads", icon: BookOpen, title: "Download PDFs", body: "Student Edition and Teacher's Edition, ready to print or save as PDF.", color: "blue" },
            { to: "/certificate", icon: Award, title: "RAWDJA Certificate", body: "An official, ledger-verified certificate of completion in your name.", color: "orange" },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              data-testid={`cta-${c.title.toLowerCase().replace(/[^a-z]/g, "-")}`}
              className="group bg-cardp border border-white/10 rounded-md p-8 hover:border-neon-orange transition-all duration-200"
            >
              <c.icon className={`w-9 h-9 mb-4 ${c.color === "green" ? "text-neon-green" : c.color === "blue" ? "text-neon-blue" : "text-neon-orange"}`} />
              <h3 className="font-display uppercase tracking-tight text-xl mb-2">{c.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{c.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-neon-green text-xs font-bold uppercase tracking-wide">
                Open <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEAL STRIP */}
      <section className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-20 flex flex-col items-center text-center">
        <RawdjaSeal size={140} className="animate-floaty" />
        <p className="mt-6 font-mono-x text-xs uppercase tracking-[0.3em] text-white/50 max-w-md">
          Issued by the Rave And Warehouse DJ Association — a non-profit professional association.
        </p>
      </section>
    </div>
  );
}
