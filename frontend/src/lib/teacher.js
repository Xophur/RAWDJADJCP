import api from "./api";

const keyFor = (program) => `rawdja_teacher_token_${program}`;

export const getTeacherToken = (program = "dj") => localStorage.getItem(keyFor(program)) || "";
export const setTeacherToken = (program, t) => localStorage.setItem(keyFor(program), t);
export const clearTeacherToken = (program = "dj") => localStorage.removeItem(keyFor(program));

const authHeader = (program) => ({ Authorization: `Bearer ${getTeacherToken(program)}` });

// Unlock a program's Teacher's Edition with a valid RAWDJA certificate serial.
// The backend derives the program from the certificate itself.
export async function unlockTeacher(serial) {
  const res = await api.post("/teacher/unlock", { serial: serial.trim() });
  const { token, program } = res.data;
  setTeacherToken(program, token);
  return res.data; // { token, holder, serial, program }
}

export async function fetchTeacherContent(program = "dj") {
  const res = await api.get(`/teacher/content?program=${program}`, { headers: authHeader(program) });
  return res.data;
}

export async function downloadTeacherPdf(program = "dj") {
  const res = await api.post(`/teacher/pdf?program=${program}`, {}, { headers: authHeader(program), responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = program === "promoter" ? "The-Promoter-Teachers-Edition.pdf" : "The-Needle-Drop-Teachers-Edition.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
