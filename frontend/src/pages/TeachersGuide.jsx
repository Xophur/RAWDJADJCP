import React from "react";
import { Link } from "react-router-dom";
import { Target, ClipboardList, MessageSquare, BookMarked, GraduationCap, CheckSquare, Download, Library } from "lucide-react";
import { TEACHER_GUIDE, GLOSSARY, EDITORIAL } from "../data/content";
import { Reveal } from "../components/Reveal";

const Panel = ({ icon: Icon, title, children, color = "green", testid }) => (
  <div data-testid={testid} className="bg-cardp border border-white/10 rounded-md p-6 sm:p-8">
    <div className="flex items-center gap-3 mb-5">
      <Icon className={`w-5 h-5 ${color === "green" ? "text-neon-green" : color === "orange" ? "text-neon-orange" : "text-neon-blue"}`} />
      <h2 className="font-display uppercase tracking-tight text-xl sm:text-2xl">{title}</h2>
    </div>
    {children}
  </div>
);

export default function TeachersGuide() {
  return (
    <div data-testid="teachers-guide-page" className="relative z-10 pt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <span className="font-mono-x text-neon-orange text-xs uppercase tracking-[0.3em]">For the instructor</span>
          <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-6xl">
            Teacher's <span className="text-neon-green">Guide</span>
          </h1>
          <p className="mt-5 text-white/75 max-w-3xl leading-relaxed">{TEACHER_GUIDE.intro}</p>
          <Link to="/print/teacher" data-testid="print-teacher-guide" className="mt-6 inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:brightness-110 glow-orange transition-all">
            <Download className="w-4 h-4" /> Download Teacher's Edition (PDF)
          </Link>
        </Reveal>
      </div>

      <div className="neon-divider max-w-6xl mx-auto my-14" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-6">
        {/* Objectives */}
        <Reveal>
          <Panel icon={Target} title="Course Learning Objectives" color="green" testid="tg-objectives">
            <ul className="grid sm:grid-cols-2 gap-3">
              {TEACHER_GUIDE.objectives.map((o, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <span className="text-neon-orange font-display font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  {o}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        {/* Lesson plans */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4 mt-4">
            <ClipboardList className="w-5 h-5 text-neon-orange" />
            <h2 className="font-display uppercase tracking-tight text-2xl">Lesson Plans</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {TEACHER_GUIDE.lessons.map((l, i) => (
              <div key={i} data-testid={`tg-lesson-${i}`} className="bg-cardp border border-neon-green/20 rounded-md p-6 hover:border-neon-orange transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display uppercase tracking-tight text-lg text-neon-green">{l.module}</h3>
                  <span className="font-mono-x text-[10px] uppercase tracking-wide text-black bg-neon-blue px-2 py-1 rounded-sm shrink-0">{l.duration}</span>
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed"><span className="text-neon-orange font-semibold">Objective: </span>{l.objective}</p>
                <ul className="space-y-2">
                  {l.activities.map((a, j) => (
                    <li key={j} className="flex gap-2 text-white/75 text-sm leading-relaxed">
                      <span className="text-neon-green mt-1 shrink-0">▸</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Discussion */}
        <Reveal>
          <Panel icon={MessageSquare} title="Discussion Questions" color="blue" testid="tg-discussion">
            <ol className="space-y-3">
              {TEACHER_GUIDE.discussion.map((q, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <span className="text-neon-blue font-display font-bold shrink-0">Q{i + 1}</span>{q}
                </li>
              ))}
            </ol>
          </Panel>
        </Reveal>

        {/* Assessment */}
        <Reveal>
          <Panel icon={CheckSquare} title="Assessment Ideas" color="orange" testid="tg-assessment">
            <ul className="space-y-3">
              {TEACHER_GUIDE.assessmentIdeas.map((a, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <CheckSquare className="w-4 h-4 text-neon-green mt-0.5 shrink-0" />{a}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        {/* Glossary */}
        <Reveal>
          <Panel icon={BookMarked} title="Glossary" color="green" testid="tg-glossary">
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {GLOSSARY.map((g) => (
                <div key={g.term}>
                  <dt className="font-display uppercase text-sm tracking-tight text-neon-green">{g.term}</dt>
                  <dd className="text-white/70 text-sm leading-relaxed mt-1">{g.def}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>

        {/* Resources */}
        <Reveal>
          <Panel icon={Library} title="Further Resources" color="blue" testid="tg-resources">
            <ul className="space-y-3">
              {TEACHER_GUIDE.resources.map((r, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <span className="font-mono-x text-[10px] uppercase tracking-wide text-black bg-neon-green px-2 py-1 rounded-sm shrink-0 h-fit">{r.type}</span>
                  {r.text}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        {/* Editorial provenance */}
        <Reveal>
          <Panel icon={GraduationCap} title="Editorial Process (3-Pass Review)" color="orange" testid="tg-editorial">
            <p className="text-white/60 text-sm mb-5">
              This material was reviewed in three passes — accuracy, clarity, and grammar — as requested. The notes below
              document what each pass checked.
            </p>
            <div className="space-y-4">
              {EDITORIAL.passes.map((p, i) => (
                <div key={i} className="border-l-4 border-neon-orange pl-4">
                  <div className="font-display uppercase text-sm tracking-tight text-neon-orange">{p.pass}</div>
                  <p className="text-white/70 text-sm leading-relaxed mt-1">{p.note}</p>
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </div>
  );
}
