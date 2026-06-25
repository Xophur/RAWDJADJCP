import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Download, FileText, GraduationCap, BookOpen, Loader2, Eye, Lock } from "lucide-react";
import { getProgram } from "../data/programs";
import { downloadStudentPdf } from "../lib/downloads";
import { getTeacherToken, downloadTeacherPdf } from "../lib/teacher";
import { Reveal } from "../components/Reveal";

export default function Downloads({ program = "dj" }) {
  const prog = getProgram(program);
  const base = prog.base;
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const teacherUnlocked = !!getTeacherToken(program);

  const getStudent = async () => {
    setError("");
    setLoading("student");
    try {
      await downloadStudentPdf(program);
    } catch (e) {
      setError("Download failed. Please try again in a moment.");
    } finally {
      setLoading("");
    }
  };

  const getTeacher = async () => {
    if (!teacherUnlocked) {
      navigate(`${base}/teachers-guide`);
      return;
    }
    setError("");
    setLoading("teacher");
    try {
      await downloadTeacherPdf(program);
    } catch (e) {
      setError("Teacher access expired — please unlock again with your certificate.");
      navigate(`${base}/teachers-guide`);
    } finally {
      setLoading("");
    }
  };

  return (
    <div data-testid="downloads-page" className="relative z-10 pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <span className="font-mono-x text-neon-green text-xs uppercase tracking-[0.3em]">{prog.label} · Take it offline</span>
          <h1 className="mt-4 font-display font-black uppercase tracking-tighter text-4xl sm:text-6xl">
            Down<span className="text-neon-orange">loads</span>
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl leading-relaxed">
            The Student Edition is free for everyone. The Teacher's Edition is unlocked with a valid
            <span className="text-neon-green font-semibold"> RAWDJA {prog.short} certificate</span>.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Reveal>
            <div className="bg-cardp border border-neon-green/25 rounded-md p-8 h-full flex flex-col">
              <BookOpen className="w-10 h-10 text-neon-green mb-5" />
              <h2 className="font-display uppercase tracking-tight text-2xl mb-2">Student Edition</h2>
              <p className="text-white/65 text-sm leading-relaxed mb-6 flex-1">
                The full {prog.short} course: all {prog.chapters.length} modules, pull quotes, key terms, and the complete glossary.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  data-testid="download-student"
                  onClick={getStudent}
                  disabled={loading === "student"}
                  className="inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide text-xs px-5 py-3 rounded-sm hover:brightness-110 glow-orange transition-all disabled:opacity-60"
                >
                  {loading === "student" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {loading === "student" ? "Building PDF…" : "Download PDF"}
                </button>
                <Link to={`${base}/print/student`} data-testid="view-student" className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-bold uppercase tracking-wide text-xs px-5 py-3 rounded-sm hover:border-neon-green hover:text-neon-green transition-all">
                  <Eye className="w-4 h-4" /> View online
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-cardp border border-neon-orange/30 rounded-md p-8 h-full flex flex-col relative">
              {!teacherUnlocked && (
                <span className="absolute top-5 right-5 inline-flex items-center gap-1 font-mono-x text-[10px] uppercase tracking-wide text-neon-orange border border-neon-orange/40 px-2 py-1 rounded-sm">
                  <Lock className="w-3 h-3" /> Certified only
                </span>
              )}
              <GraduationCap className="w-10 h-10 text-neon-blue mb-5" />
              <h2 className="font-display uppercase tracking-tight text-2xl mb-2">Teacher's Edition</h2>
              <p className="text-white/65 text-sm leading-relaxed mb-6 flex-1">
                Lesson plans, objectives, discussion questions, assessments, glossary, resources & the 3-pass editorial
                notes. Unlocked with your RAWDJA {prog.short} certificate serial.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  data-testid="download-teacher"
                  onClick={getTeacher}
                  disabled={loading === "teacher"}
                  className="inline-flex items-center gap-2 bg-neon-orange text-black font-bold uppercase tracking-wide text-xs px-5 py-3 rounded-sm hover:brightness-110 glow-orange transition-all disabled:opacity-60"
                >
                  {loading === "teacher" ? <Loader2 className="w-4 h-4 animate-spin" /> : teacherUnlocked ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  {loading === "teacher" ? "Building PDF…" : teacherUnlocked ? "Download PDF" : "Unlock to download"}
                </button>
                <Link to={`${base}/teachers-guide`} data-testid="view-teacher" className="inline-flex items-center gap-2 border border-white/20 text-white/80 font-bold uppercase tracking-wide text-xs px-5 py-3 rounded-sm hover:border-neon-green hover:text-neon-green transition-all">
                  <Eye className="w-4 h-4" /> Open guide
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {error && <p data-testid="download-error" className="mt-6 text-neon-orange text-sm">{error}</p>}

        <div className="mt-10 flex items-start gap-3 text-white/45 text-xs font-mono-x bg-surface border border-white/10 rounded-md p-5">
          <FileText className="w-4 h-4 text-neon-green shrink-0 mt-0.5" />
          <p>Each PDF is generated fresh from the latest course content, formatted for clean printing and sharing.</p>
        </div>
      </div>
    </div>
  );
}
