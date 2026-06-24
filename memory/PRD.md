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
- 6 modules: Sound Systems, Pirate Radio, Hip-Hop/Turntablism, House & Techno, Rave Culture, Bonus (Corporate vs Real + Goblin Mode case study using instructor's own photos).
- Themed interactive reader (hero, bento module grid, chapter pages with pull quotes + key terms, prev/next).
- Teacher's Guide page: objectives, 6 lesson plans, discussion questions, assessments, glossary, resources, 3-pass editorial provenance.
- Downloads: print-ready Student Edition (/print/student) + Teacher's Edition (/print/teacher) via browser "Save as PDF".
- RAWDJA Certificate: issue (name → ledger cert w/ serial, seq, SHA-256 hash, Founder badge for seq=1) + verify (serial → Authentic/Not verified) + ledger integrity endpoint. Ledger reset to 0 so first live issuance = Founder No. 1.
- Tested: testing_agent iteration_1 — backend 100% (9/9), frontend 100% (18/18).

## Backlog / Next
- P1: Real NFT certificates (testnet first, then Polygon mainnet) — deferred per user (verifiable ledger chosen for launch).
- P1: Copy-to-clipboard for certificate serial/hash; public verify deep-link (/verify/:serial).
- P2: Audio embeds of cited tracks (Planet Rock, Acid Tracks, Strings of Life) where licensing allows.
- P2: Server-generated PDF files (currently browser print-to-PDF).
- P2: Migrate FastAPI on_event handlers to lifespan; tighten CORS allow_origins for production domain (xophur.com).
- Deployment: point xophur.com at the app.

## No auth in this product.
