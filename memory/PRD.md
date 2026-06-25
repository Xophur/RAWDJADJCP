# PRD — The Needle Drop (RAWDJA Digital Course)

## Original Problem Statement
A complete digital product on the history of DJing through hip-hop & EDM, pirate radio DJs, and sound system culture; bonus material on the birth of house/rave culture and its evolution into corporate festivals (investment products for hedge funds) vs. real underground raves (the attached "Goblin Mode" rave). Content reviewed in 3 passes (accuracy → clarity/fluff-cut → grammar). EDM dark purple/blue + neon green/orange theme. Delivered with a Teacher's Guide. Plus (added in-session): an official RAWDJA certificate of completion, verifiable via a hash-linked ledger.

## Owner / Instructor
Xophur — 31-year DJ career. Students: DJ Sivart, Soundjack, GalaxyBoy, Psybod (taught beatmatching 1998; now runs Our Velocity Productions). Ran one of 3 Delaware rave companies when the RAVE Act was introduced (2002). Hosting target: xophur.com. Founder of the Rave And Warehouse DJ Association (RAWDJA), a non-profit professional association.

## Architecture
- Frontend: React 19 + React Router + Tailwind + framer-motion. Theme via CSS vars + tailwind tokens (ink/surface/cardp + neon green/orange/blue/magenta). Fonts: Unbounded (display) + Manrope (body) + Space Mono.
- Backend: FastAPI + MongoDB (motor). Hash-linked certificate ledger (SHA-256, prev_hash chaining), unique index on seq+serial with retry-on-duplicate for concurrency safety.
- Content: /app/frontend/src/data/content.js (6 modules, glossary, full teacher's guide, editorial notes); assets in /app/frontend/src/data/assets.js.

## Implemented (2026-06-24)
- 6 modules + themed reader, bonus Goblin Mode case study (Trowl face shots removed for privacy; only non-identifying photos shown).
- Teacher's Guide: now GATED — unlocked by a valid RAWDJA certificate serial (JWT, 12h, scope 'teacher'). Teacher content moved server-side (/app/backend/teacher_content.py) so the gate is real (not bypassable from the JS bundle).
- Downloads: REAL downloadable PDF files (reportlab, server-generated). Student Edition public; Teacher's Edition PDF protected by teacher token. Print views kept as "view online".
- RAWDJA Certificate: asks for "Full DJ Name". Hash-linked ledger (SHA-256), unique seq+serial index, retry-on-duplicate. Founder No. 1 = "Jason Theory", serial RAWDJA-2026-00001-QQ2EDR (the master unlock key).
- Endpoints: /api/teacher/unlock, /api/teacher/content, /api/teacher/pdf (gated); /api/downloads/pdf (public); certificates issue/verify/integrity/stats.
- Tested: iteration_1 (base) + iteration_2 (gating, PDFs, DJ-name) — both 100% backend & frontend.

## Owner note
- Instructor brand "Xophur"; DJ name "Jason Theory". Ran 1 of 3 Delaware rave companies during the RAVE Act (2002). Founder of RAWDJA. Hosting: xophur.com.

## Backlog / Next
- P1: Per-region franchisee accounts (evolve beyond single-serial unlock); franchise dashboard.
- P1: Public shareable verify URL (/verify/:serial); copy-to-clipboard for serial/hash.
- P1: Real NFT certs (testnet -> Polygon) — deferred (hash-ledger chosen for launch).
- P2: axios 401 interceptor to auto-clear teacher token; CORS_ORIGINS lockdown for prod; FastAPI lifespan migration; guide_version field.
- Deployment: push to user's GitHub for review, then DigitalOcean / point xophur.com (subdomain rawdja.xophur.com recommended).

## Original Architecture / Personas (unchanged)

## Promoter Program added (2026-06-24)
- NEW second certification: "The Promoter" at /promoter (DJ stays at root). Same functionality: 6-module reader, certificate-gated Teacher's Edition, RAWDJA certificate, public verify, downloadable PDFs.
- Promoter modules (3-pass edited, researched): The Host (Mancuso/Loft 1970), Reach (flyers→password drop), Building the Night (booking/production), The Money (door→financial products), The Law (permits/RAVE Act), and bonus Duty of Care (harm reduction/DanceSafe, Goblin Mode case study).
- Per-program ledger: certificates tagged `program`; serials RAWDJA-DJ-... and RAWDJA-PRMO-...; independent seq + hash chains; unique (program, seq) index. Each program has its own Founder No. 1.
- Cross-program lock: a DJ certificate cannot unlock the Promoter Teacher's Edition and vice versa (JWT scoped to program; 403 enforced server-side, friendly message client-side).
- Frontend is program-aware via /app/frontend/src/data/programs.js registry; pages take a `program` prop; Nav/Footer have a DJ⇄Promoter switcher; per-program teacher token localStorage keys.
- Public shareable verify deep-link added: /verify/:serial (auto-verifies any serial from either program).
- CertificateRequest.program validated via Literal (422 on bad input).
- Tested: iteration_3 — backend 100% (22/22) incl. cross-program lock both directions; frontend 100%.
- Ledger wiped to 0 for launch.

## No auth in this product.
