import api from "./api";
import { getProgram } from "../data/programs";

function studentBlocks(programKey) {
  const { course, chapters, glossary } = getProgram(programKey);
  const b = [{ t: "cover", text: course.title, sub: course.subtitle, edition: "STUDENT EDITION" }];
  chapters.forEach((ch) => {
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
  glossary.forEach((g) => b.push({ t: "p", text: `${g.term} — ${g.def}` }));
  return b;
}

export async function downloadStudentPdf(programKey = "dj") {
  const { course } = getProgram(programKey);
  const filename = `${course.title.replace(/[^a-z0-9]+/gi, "-")}-Student-Edition.pdf`;
  const res = await api.post("/downloads/pdf", { filename, blocks: studentBlocks(programKey) }, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
