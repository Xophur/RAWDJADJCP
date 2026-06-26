// Tracks per-program course completion in the browser.
const key = (program) => `rawdja_progress_${program}`;

export function getReadChapters(program) {
  try {
    return JSON.parse(localStorage.getItem(key(program))) || [];
  } catch {
    return [];
  }
}

export function markChapterRead(program, id) {
  const set = new Set(getReadChapters(program));
  set.add(id);
  localStorage.setItem(key(program), JSON.stringify([...set]));
}

export function courseProgress(program, chapters) {
  const read = new Set(getReadChapters(program));
  const done = chapters.filter((c) => read.has(c.id)).length;
  return { done, total: chapters.length, complete: done >= chapters.length };
}
