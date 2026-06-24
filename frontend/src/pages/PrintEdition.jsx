import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Printer, ArrowLeft } from "lucide-react";
import { COURSE, CHAPTERS, GLOSSARY, TEACHER_GUIDE, EDITORIAL } from "../data/content";

const PrintBar = ({ title }) => (
  <div className="no-print sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-white/10 px-5 py-3 flex items-center justify-between">
    <Link to="/downloads" className="inline-flex items-center gap-1.5 text-white/70 hover:text-neon-green text-xs uppercase tracking-wide font-semibold">
      <ArrowLeft className="w-4 h-4" /> Back
    </Link>
    <span className="font-display uppercase text-sm tracking-tight hidden sm:block">{title}</span>
    <button
      onClick={() => window.print()}
      data-testid="print-button"
      className="inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide text-xs px-5 py-2.5 rounded-sm hover:brightness-110"
    >
      <Printer className="w-4 h-4" /> Print / Save as PDF
    </button>
  </div>
);

const Cover = ({ edition }) => (
  <div className="print-page text-center py-16 border-b-2 border-black/20">
    <div className="font-mono-x text-xs uppercase tracking-[0.4em] text-neon-orange">{COURSE.tagline}</div>
    <h1 className="font-display font-black uppercase tracking-tighter text-5xl sm:text-6xl mt-6 leading-[0.95]">
      {COURSE.title}
    </h1>
    <p className="mt-4 max-w-xl mx-auto text-white/70 print-surface leading-relaxed">{COURSE.subtitle}</p>
    <div className="mt-8 inline-block border border-neon-green/40 px-6 py-2 font-display uppercase tracking-wide text-neon-green">
      {edition === "teacher" ? "Teacher's Edition" : "Student Edition"}
    </div>
    <p className="mt-10 font-mono-x text-xs uppercase tracking-widest text-white/40">
      Rave And Warehouse DJ Association · A non-profit professional association
    </p>
  </div>
);

function StudentEdition() {
  return (
    <>
      <Cover edition="student" />
      {CHAPTERS.map((ch) => (
        <section key={ch.id} className="print-page py-10 max-w-3xl mx-auto">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-display font-black text-neon-orange text-2xl">{ch.num}</span>
            <span className="font-mono-x text-[10px] uppercase tracking-[0.2em] text-neon-green">{ch.kicker}</span>
          </div>
          <h2 className="font-display font-bold uppercase tracking-tight text-3xl mb-5">{ch.title}</h2>
          {ch.sections.map((s, i) => (
            <div key={i} className="mb-7">
              <h3 className="font-display uppercase tracking-tight text-xl text-neon-green mb-3">{s.heading}</h3>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="leading-[1.75] mb-3 print-surface text-white/85">{p}</p>
              ))}
              {s.pullQuote && (
                <p className="my-4 pl-4 border-l-4 border-neon-orange font-display uppercase text-lg leading-tight">“{s.pullQuote}”</p>
              )}
            </div>
          ))}
          {ch.terms?.length > 0 && (
            <p className="text-sm print-surface text-white/60 mt-4">
              <strong className="text-neon-blue">Key terms:</strong> {ch.terms.join(" · ")}
            </p>
          )}
        </section>
      ))}
      <section className="py-10 max-w-3xl mx-auto">
        <h2 className="font-display font-bold uppercase tracking-tight text-3xl mb-6 text-neon-orange">Glossary</h2>
        <dl className="space-y-3">
          {GLOSSARY.map((g) => (
            <div key={g.term}>
              <dt className="font-display uppercase text-sm text-neon-green inline">{g.term}: </dt>
              <dd className="inline print-surface text-white/80 text-sm">{g.def}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

function TeacherEdition() {
  return (
    <>
      <Cover edition="teacher" />
      <section className="print-page py-10 max-w-3xl mx-auto">
        <h2 className="font-display font-bold uppercase tracking-tight text-2xl mb-3 text-neon-green">How to use this guide</h2>
        <p className="print-surface text-white/85 leading-relaxed mb-6">{TEACHER_GUIDE.intro}</p>
        <h3 className="font-display uppercase tracking-tight text-xl text-neon-orange mb-3">Learning objectives</h3>
        <ol className="list-decimal pl-5 space-y-2 print-surface text-white/85">
          {TEACHER_GUIDE.objectives.map((o, i) => <li key={i}>{o}</li>)}
        </ol>
      </section>

      {TEACHER_GUIDE.lessons.map((l, i) => (
        <section key={i} className="py-8 max-w-3xl mx-auto break-inside-avoid">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display uppercase tracking-tight text-xl text-neon-green">{l.module}</h2>
            <span className="font-mono-x text-xs uppercase">{l.duration}</span>
          </div>
          <p className="print-surface text-white/85 text-sm mb-3"><strong className="text-neon-orange">Objective:</strong> {l.objective}</p>
          <ul className="list-disc pl-5 space-y-1 print-surface text-white/85 text-sm">
            {l.activities.map((a, j) => <li key={j}>{a}</li>)}
          </ul>
        </section>
      ))}

      <section className="print-page py-8 max-w-3xl mx-auto">
        <h2 className="font-display uppercase tracking-tight text-2xl text-neon-blue mb-4">Discussion questions</h2>
        <ol className="list-decimal pl-5 space-y-2 print-surface text-white/85 text-sm">
          {TEACHER_GUIDE.discussion.map((q, i) => <li key={i}>{q}</li>)}
        </ol>
        <h2 className="font-display uppercase tracking-tight text-2xl text-neon-orange mt-8 mb-4">Assessment ideas</h2>
        <ul className="list-disc pl-5 space-y-2 print-surface text-white/85 text-sm">
          {TEACHER_GUIDE.assessmentIdeas.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      </section>

      <section className="py-8 max-w-3xl mx-auto">
        <h2 className="font-display uppercase tracking-tight text-2xl text-neon-green mb-4">Glossary</h2>
        <dl className="space-y-2">
          {GLOSSARY.map((g) => (
            <div key={g.term}>
              <dt className="font-display uppercase text-sm text-neon-green inline">{g.term}: </dt>
              <dd className="inline print-surface text-white/80 text-sm">{g.def}</dd>
            </div>
          ))}
        </dl>
        <h2 className="font-display uppercase tracking-tight text-2xl text-neon-blue mt-8 mb-4">Further resources</h2>
        <ul className="space-y-2 print-surface text-white/85 text-sm">
          {TEACHER_GUIDE.resources.map((r, i) => <li key={i}><strong className="text-neon-orange">{r.type}:</strong> {r.text}</li>)}
        </ul>
        <h2 className="font-display uppercase tracking-tight text-2xl text-neon-orange mt-8 mb-4">Editorial process (3-pass review)</h2>
        {EDITORIAL.passes.map((p, i) => (
          <div key={i} className="mb-3">
            <div className="font-display uppercase text-sm text-neon-orange">{p.pass}</div>
            <p className="print-surface text-white/80 text-sm leading-relaxed">{p.note}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default function PrintEdition() {
  const { edition } = useParams();
  const isTeacher = edition === "teacher";

  useEffect(() => {
    document.title = `${COURSE.title} — ${isTeacher ? "Teacher's" : "Student"} Edition`;
  }, [isTeacher]);

  return (
    <div data-testid={`print-${edition}`} className="bg-ink min-h-screen">
      <PrintBar title={isTeacher ? "Teacher's Edition" : "Student Edition"} />
      <div className="px-5 sm:px-8 py-10">
        {isTeacher ? <TeacherEdition /> : <StudentEdition />}
      </div>
    </div>
  );
}
