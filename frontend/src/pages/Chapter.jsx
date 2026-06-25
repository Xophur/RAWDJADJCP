import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { getProgram } from "../data/programs";
import { RAVE_PHOTOS } from "../data/assets";
import { Reveal } from "../components/Reveal";

export default function Chapter({ program = "dj" }) {
  const prog = getProgram(program);
  const base = prog.base;
  const { id } = useParams();
  const chapters = prog.chapters;
  const idx = chapters.findIndex((c) => c.id === id);
  const ch = chapters[idx];

  if (!ch) {
    return (
      <div className="pt-32 pb-40 text-center">
        <p className="text-white/70">Chapter not found.</p>
        <Link to={base || "/"} className="text-neon-green underline">Back home</Link>
      </div>
    );
  }

  const prev = chapters[idx - 1];
  const next = chapters[idx + 1];

  return (
    <article data-testid={`chapter-${ch.id}`} className="relative z-10">
      <div className="relative h-[55vh] min-h-[360px]">
        <img src={ch.image} alt={ch.title} className="absolute inset-0 w-full h-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 w-full pb-12">
            <Link to={base || "/"} className="inline-flex items-center gap-1.5 text-white/60 hover:text-neon-green text-xs uppercase tracking-wide font-semibold mb-5">
              <ArrowLeft className="w-3.5 h-3.5" /> {prog.label}
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-display font-black text-neon-orange text-2xl">{ch.num}</span>
              <span className="font-mono-x text-[10px] uppercase tracking-[0.2em] text-neon-green border border-neon-green/40 px-2 py-0.5 rounded-sm">{ch.kicker}</span>
              {ch.isBonus && <span className="font-mono-x text-[10px] uppercase tracking-[0.2em] text-black bg-neon-orange px-2 py-0.5 rounded-sm">Bonus</span>}
            </div>
            <h1 className="font-display font-black uppercase tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">{ch.title}</h1>
            <p className="mt-4 text-white/75 max-w-2xl leading-relaxed">{ch.summary}</p>
            <div className="mt-4 flex items-center gap-2 text-white/50 text-xs uppercase tracking-wide font-mono-x">
              <Clock className="w-3.5 h-3.5" /> {ch.readTime} read
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16">
        {ch.sections.map((s, i) => (
          <Reveal key={s.heading} className="mb-12">
            <h2 className="font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl text-neon-green mb-5">{s.heading}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j} className="text-white/80 leading-[1.8] mb-5 text-[1.02rem]">{p}</p>
            ))}
            {s.pullQuote && (
              <blockquote className="my-8 pl-5 border-l-4 border-neon-orange">
                <p className="font-display uppercase tracking-tight text-xl sm:text-2xl leading-tight text-white">“{s.pullQuote}”</p>
              </blockquote>
            )}
          </Reveal>
        ))}

        {ch.isBonus && (
          <Reveal className="my-12">
            <h2 className="font-display font-bold uppercase tracking-tight text-2xl sm:text-3xl text-neon-orange mb-2">
              The case file: Goblin Mode
            </h2>
            <p className="text-white/60 text-sm mb-6">Photographs from a real underground rave — Saturday night, Philadelphia underground.</p>
            <div className="grid grid-cols-2 gap-4">
              {RAVE_PHOTOS.map((p, i) => (
                <figure key={p.url} className={`rounded-md overflow-hidden border border-white/10 ${i === 0 ? "col-span-2" : ""}`}>
                  <img src={p.url} alt={p.caption} className="w-full h-56 object-cover" />
                  <figcaption className="text-xs text-white/55 p-3 bg-cardp font-mono-x">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}

        {ch.terms?.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 mb-4 text-neon-blue">
              <Tag className="w-4 h-4" />
              <span className="font-display uppercase text-sm tracking-wide">Key terms in this module</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ch.terms.map((t) => (
                <span key={t} className="font-mono-x text-xs uppercase tracking-wide text-white/70 border border-white/15 px-3 py-1.5 rounded-sm">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-20 grid sm:grid-cols-2 gap-4">
        {prev ? (
          <Link to={`${base}/chapter/${prev.id}`} data-testid="chapter-prev" className="group bg-cardp border border-white/10 rounded-md p-6 hover:border-neon-green transition-colors">
            <span className="inline-flex items-center gap-1 text-white/50 text-xs uppercase tracking-wide mb-2"><ArrowLeft className="w-3.5 h-3.5" /> Previous</span>
            <div className="font-display uppercase tracking-tight text-lg group-hover:text-neon-green transition-colors">{prev.title}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`${base}/chapter/${next.id}`} data-testid="chapter-next" className="group bg-cardp border border-white/10 rounded-md p-6 hover:border-neon-orange transition-colors sm:text-right">
            <span className="inline-flex items-center gap-1 text-white/50 text-xs uppercase tracking-wide mb-2 sm:justify-end w-full">Next <ArrowRight className="w-3.5 h-3.5" /></span>
            <div className="font-display uppercase tracking-tight text-lg group-hover:text-neon-orange transition-colors">{next.title}</div>
          </Link>
        ) : (
          <Link to={`${base}/certificate`} data-testid="chapter-finish" className="group bg-neon-orange text-black rounded-md p-6 hover:brightness-110 transition-all sm:text-right">
            <span className="inline-flex items-center gap-1 text-black/70 text-xs uppercase tracking-wide mb-2 sm:justify-end w-full font-bold">Course complete</span>
            <div className="font-display uppercase tracking-tight text-lg font-bold">Claim your RAWDJA certificate →</div>
          </Link>
        )}
      </div>
    </article>
  );
}
