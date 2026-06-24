import api from "./api";

const KEY = "rawdja_teacher_token";

export const getTeacherToken = () => localStorage.getItem(KEY) || "";
export const setTeacherToken = (t) => localStorage.setItem(KEY, t);
export const clearTeacherToken = () => localStorage.removeItem(KEY);

const authHeader = () => ({ Authorization: `Bearer ${getTeacherToken()}` });

// Unlock the Teacher's Edition with a valid RAWDJA certificate serial.
export async function unlockTeacher(serial) {
  const res = await api.post("/teacher/unlock", { serial: serial.trim() });
  setTeacherToken(res.data.token);
  return res.data; // { token, holder, serial }
}

export async function fetchTeacherContent() {
  const res = await api.get("/teacher/content", { headers: authHeader() });
  return res.data; // { course, guide, editorial, glossary }
}

export async function downloadTeacherPdf() {
  const res = await api.post("/teacher/pdf", {}, { headers: authHeader(), responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "The-Needle-Drop-Teachers-Edition.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
