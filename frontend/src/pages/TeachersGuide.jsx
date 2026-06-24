import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Target, ClipboardList, MessageSquare, BookMarked, GraduationCap, CheckSquare,
  Download, Library, Lock, ShieldCheck, Loader2, Award, KeyRound, LogOut, Printer,
} from "lucide-react";
import {
  getTeacherToken, clearTeacherToken, unlockTeacher, fetchTeacherContent, downloadTeacherPdf,
} from "../lib/teacher";
import { Reveal } from "../components/Reveal";
import { RawdjaSeal } from "../components/RawdjaSeal";

const Panel = ({ icon: Icon, title, children, color = "green", testid }) => (
  <div data-testid={testid} className="bg-cardp border border-white/10 rounded-md p-6 sm:p-8">
    <div className="flex items-center gap-3 mb-5">
      <Icon className={`w-5 h-5 ${color === "green" ? "text-neon-green" : color === "orange" ? "text-neon-orange" : "text-neon-blue"}`} />
      <h2 className="font-display uppercase tracking-tight text-xl sm:text-2xl">{title}</h2>
    </div>
    {children}
  </div>
);

function UnlockGate({ onUnlocked }) {
  const [serial, setSerial] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!serial.trim()) return;
    setError("");
    setLoading(true);
    try {
      const data = await unlockTeacher(serial);
      onUnlocked(data.holder);
    } catch (e) {
      setError(e.response?.data?.detail || "Could not unlock. Check your certificate serial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="teacher-gate" className="max-w-2xl mx-auto px-5 sm:px-8 pt-28 pb-32">
      <Reveal>
        <div className="flex justify-center mb-6"><RawdjaSeal size={120} className="animate-floaty" /></div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 font-mono-x text-neon-orange text-xs uppercase tracking-[0.3em]">
            <Lock className="w-3.5 h-3.5" /> Restricted · Certified DJs only
          </div>
          <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-5xl">
            Teacher's <span className="text-neon-green">Edition</span>
          </h1>
          <p className="mt-5 text-white/75 leading-relaxed">
            The Teacher's Edition is reserved for holders of a valid RAWDJA certificate — the foundation of the
            regional franchise program. Enter your certificate serial number to unlock the full instructor toolkit.
          </p>
        </div>

        <div className="mt-8 bg-cardp border border-neon-orange/30 rounded-md p-6 sm:p-8">
          <label className="font-display uppercase text-sm tracking-tight text-neon-orange flex items-center gap-2">
            <KeyRound className="w-4 h-4" /> Certificate serial number
          </label>
          <p className="text-white/50 text-xs mt-1 mb-3">Find this on your RAWDJA certificate, e.g. RAWDJA-2026-00001-XXXXXX</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              data-testid="teacher-unlock-input"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="RAWDJA-2026-00001-XXXXXX"
              className="flex-1 bg-ink border border-white/15 rounded-sm px-4 py-3 text-white placeholder-white/30 focus:border-neon-orange focus:outline-none font-mono-x text-sm"
            />
            <button
              data-testid="teacher-unlock-btn"
              onClick={submit}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:brightness-110 glow-orange transition-all disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Unlock
            </button>
          </div>
          {error && <p data-testid="teacher-unlock-error" className="mt-3 text-sm text-neon-orange">{error}</p>}
        </div>

        <p className="mt-6 text-center text-white/50 text-sm">
          Don't have a certificate yet?{" "}
          <Link to="/certificate" className="text-neon-green hover:underline inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Complete the course & get certified
          </Link>
        </p>
      </Reveal>
    </div>
  );
}

export default function TeachersGuide() {
  const [content, setContent] = useState(null);
  const [holder, setHolder] = useState("");
  const [checking, setChecking] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  const load = useCallback(async () => {
    if (!getTeacherToken()) {
      setChecking(false);
      return;
    }
    try {
      const data = await fetchTeacherContent();
      setContent(data);
    } catch (e) {
      clearTeacherToken();
      setContent(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const lock = () => {
    clearTeacherToken();
    setContent(null);
    setHolder("");
  };

  const getPdf = async () => {
    setPdfLoading(true);
    try {
      await downloadTeacherPdf();
    } catch (e) {
      clearTeacherToken();
      setContent(null);
    } finally {
      setPdfLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="pt-40 pb-40 flex justify-center">
        <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
      </div>
    );
  }

  if (!content) {
    return <UnlockGate onUnlocked={() => load()} />;
  }

  const { guide, glossary, editorial } = content;

  return (
    <div data-testid="teachers-guide-page" className="relative z-10 pt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="font-mono-x text-neon-green text-xs uppercase tracking-[0.3em] inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Unlocked · Certified access
            </span>
            <button
              data-testid="teacher-lock-btn"
              onClick={lock}
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-neon-orange text-xs uppercase tracking-wide font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock again
            </button>
          </div>
          <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-6xl">
            Teacher's <span className="text-neon-green">Guide</span>
          </h1>
          <p className="mt-5 text-white/75 max-w-3xl leading-relaxed">{guide.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              data-testid="teacher-download-pdf"
              onClick={getPdf}
              disabled={pdfLoading}
              className="inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:brightness-110 glow-orange transition-all disabled:opacity-60"
            >
              {pdfLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {pdfLoading ? "Building PDF…" : "Download Teacher's PDF"}
            </button>
            <button
              onClick={() => window.print()}
              className="no-print inline-flex items-center gap-2 border border-white/20 text-white/80 font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:border-neon-green hover:text-neon-green transition-all"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </Reveal>
      </div>

      <div className="neon-divider max-w-6xl mx-auto my-14" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-6">
        <Reveal>
          <Panel icon={Target} title="Course Learning Objectives" color="green" testid="tg-objectives">
            <ul className="grid sm:grid-cols-2 gap-3">
              {guide.objectives.map((o, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <span className="text-neon-orange font-display font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>{o}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal>
          <div className="flex items-center gap-3 mb-4 mt-4">
            <ClipboardList className="w-5 h-5 text-neon-orange" />
            <h2 className="font-display uppercase tracking-tight text-2xl">Lesson Plans</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {guide.lessons.map((l, i) => (
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

        <Reveal>
          <Panel icon={MessageSquare} title="Discussion Questions" color="blue" testid="tg-discussion">
            <ol className="space-y-3">
              {guide.discussion.map((q, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <span className="text-neon-blue font-display font-bold shrink-0">Q{i + 1}</span>{q}
                </li>
              ))}
            </ol>
          </Panel>
        </Reveal>

        <Reveal>
          <Panel icon={CheckSquare} title="Assessment Ideas" color="orange" testid="tg-assessment">
            <ul className="space-y-3">
              {guide.assessmentIdeas.map((a, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <CheckSquare className="w-4 h-4 text-neon-green mt-0.5 shrink-0" />{a}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal>
          <Panel icon={BookMarked} title="Glossary" color="green" testid="tg-glossary">
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {glossary.map((g) => (
                <div key={g.term}>
                  <dt className="font-display uppercase text-sm tracking-tight text-neon-green">{g.term}</dt>
                  <dd className="text-white/70 text-sm leading-relaxed mt-1">{g.def}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>

        <Reveal>
          <Panel icon={Library} title="Further Resources" color="blue" testid="tg-resources">
            <ul className="space-y-3">
              {guide.resources.map((r, i) => (
                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                  <span className="font-mono-x text-[10px] uppercase tracking-wide text-black bg-neon-green px-2 py-1 rounded-sm shrink-0 h-fit">{r.type}</span>{r.text}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>

        <Reveal>
          <Panel icon={GraduationCap} title="Editorial Process (3-Pass Review)" color="orange" testid="tg-editorial">
            <div className="space-y-4">
              {editorial.passes.map((p, i) => (
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
