import api from "./api";
import { COURSE, CHAPTERS, GLOSSARY } from "../data/content";

// Build the block list for the Student Edition PDF (public content only).
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

export async function downloadStudentPdf() {
  const filename = "The-Needle-Drop-Student-Edition.pdf";
  const res = await api.post(
    "/downloads/pdf",
    { filename, blocks: studentBlocks() },
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
