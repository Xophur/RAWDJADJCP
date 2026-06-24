import api from "./api";
import { COURSE, CHAPTERS, GLOSSARY, TEACHER_GUIDE, EDITORIAL } from "../data/content";

// Build the block list for the Student Edition PDF.
function studentBlocks() {
  const b = [{ t: "cover", text: COURSE.title, sub: COURSE.subtitle, edition: "STUDENT EDITION" }];
  CHAPTERS.forEach((ch) => {
    b.push({ t: "kicker", text: `${ch.num} · ${ch.kicker}` });
    b.push({ t: "h1", text: ch.title });
    ch.sections.forEach((s) => {
      b.push({ t: "h2", text: s.heading });
      s.paragraphs.forEach((p) => b.push({ t: "p", text: p }));
      if (s.pullQuote) b.push({ t: "quote", text: s.pullQuote });
    });
    if (ch.terms?.length) b.push({ t: "terms", text: ch.terms.join(" · ") });
    b.push({ t: "pagebreak" });
  });
  b.push({ t: "h1", text: "Glossary" });
  GLOSSARY.forEach((g) => b.push({ t: "p", text: `${g.term} — ${g.def}` }));
  return b;
}

// Build the block list for the Teacher's Edition PDF.
function teacherBlocks() {
  const b = [{ t: "cover", text: COURSE.title, sub: COURSE.subtitle, edition: "TEACHER'S EDITION" }];
  b.push({ t: "h1", text: "How to use this guide" });
  b.push({ t: "p", text: TEACHER_GUIDE.intro });
  b.push({ t: "h2", text: "Learning objectives" });
  TEACHER_GUIDE.objectives.forEach((o) => b.push({ t: "li", text: o }));
  b.push({ t: "pagebreak" });

  b.push({ t: "h1", text: "Lesson plans" });
  TEACHER_GUIDE.lessons.forEach((l) => {
    b.push({ t: "h2", text: `${l.module}  (${l.duration})` });
    b.push({ t: "p", text: `Objective: ${l.objective}` });
    l.activities.forEach((a) => b.push({ t: "li", text: a }));
  });
  b.push({ t: "pagebreak" });

  b.push({ t: "h1", text: "Discussion questions" });
  TEACHER_GUIDE.discussion.forEach((q, i) => b.push({ t: "li", text: `Q${i + 1}. ${q}` }));
  b.push({ t: "h2", text: "Assessment ideas" });
  TEACHER_GUIDE.assessmentIdeas.forEach((a) => b.push({ t: "li", text: a }));
  b.push({ t: "pagebreak" });

  b.push({ t: "h1", text: "Glossary" });
  GLOSSARY.forEach((g) => b.push({ t: "p", text: `${g.term} — ${g.def}` }));
  b.push({ t: "h2", text: "Further resources" });
  TEACHER_GUIDE.resources.forEach((r) => b.push({ t: "li", text: `${r.type}: ${r.text}` }));
  b.push({ t: "h2", text: "Editorial process (3-pass review)" });
  EDITORIAL.passes.forEach((p) => {
    b.push({ t: "p", text: `${p.pass}` });
    b.push({ t: "note", text: p.note });
  });
  return b;
}

export async function downloadEdition(edition) {
  const isTeacher = edition === "teacher";
  const blocks = isTeacher ? teacherBlocks() : studentBlocks();
  const filename = isTeacher
    ? "The-Needle-Drop-Teachers-Edition.pdf"
    : "The-Needle-Drop-Student-Edition.pdf";

  const res = await api.post(
    "/downloads/pdf",
    { filename, blocks },
    { responseType: "blob" }
  );

  const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
