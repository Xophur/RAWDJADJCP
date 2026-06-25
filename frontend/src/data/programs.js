import { COURSE, CHAPTERS, GLOSSARY } from "./content";
import { COURSE_PROMO, CHAPTERS_PROMO, GLOSSARY_PROMO } from "./content_promoter";
import { ART } from "./assets";

// Registry of certification programs. Pages are program-aware via this map.
export const PROGRAMS = {
  dj: {
    key: "dj",
    code: "DJ",
    base: "", // routes at root
    label: "DJ Certification",
    short: "DJ",
    course: COURSE,
    chapters: CHAPTERS,
    glossary: GLOSSARY,
    hero: ART.heroTurntable,
    blurb: "The history and craft of DJing — sound systems, pirate radio, hip-hop, house, techno, and rave.",
  },
  promoter: {
    key: "promoter",
    code: "PRMO",
    base: "/promoter",
    label: "Promoter Certification",
    short: "Promoter",
    course: COURSE_PROMO,
    chapters: CHAPTERS_PROMO,
    glossary: GLOSSARY_PROMO,
    hero: ART.corporateVsUnducground || ART.corporateVsUnderground,
    blurb: "How to build the night — promotion, booking, production, the money, the law, and harm reduction.",
  },
};

export const getProgram = (key) => PROGRAMS[key] || PROGRAMS.dj;
export const programBase = (key) => getProgram(key).base;
