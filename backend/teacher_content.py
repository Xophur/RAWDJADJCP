"""Teacher's Edition content — served ONLY to holders of a valid RAWDJA
certificate. Kept server-side (not in the frontend bundle) so the gate is real."""

TEACHER_GUIDE = {
    "intro": "This guide accompanies 'The Needle Drop' for use in DJ lessons — in person or virtual. Each module pairs a historical narrative with hands-on turntable / controller exercises so students feel the history in their hands, not just on the page. Time estimates assume a 60–75 minute session.",
    "objectives": [
        "Trace a single, unbroken line from Jamaican sound systems to modern festivals.",
        "Explain how technology (dubplates, drum machines, synths, pirate transmitters) drove each creative leap.",
        "Distinguish house from techno, and hip-hop DJing from selecting, by ear and by technique.",
        "Critically evaluate the commercialization of dance music and the trade-offs of corporate vs. underground events.",
        "Connect each historical technique to a practical skill on the decks.",
    ],
    "lessons": [
        {
            "module": "Module 1 — Sound System Roots",
            "duration": "60 min",
            "objective": "Students explain why selection and crowd-reading define the DJ, using 1950s Jamaica as the origin point.",
            "activities": [
                "Mini-lecture: sound systems, selectors, clashes, dubplates (15 min).",
                "Listen: a dub track vs. its original vocal version; identify what was removed and added (10 min).",
                "Decks exercise: students 'selector battle' — each picks three tracks to win an imaginary crowd; defend the choices (25 min).",
                "Wrap: how does exclusivity (the dubplate) still show up today? (10 min).",
            ],
        },
        {
            "module": "Module 2 — Pirate Radio",
            "duration": "60 min",
            "objective": "Students connect media gatekeeping to DIY broadcasting and the spread of underground scenes.",
            "activities": [
                "Mini-lecture: offshore to rooftop pirates; their role in rave (15 min).",
                "Discussion: today's 'pirate radio' equivalents — who are the gatekeepers now? (15 min).",
                "Decks exercise: record a 20-minute 'radio set' with mic intros announcing tracks like a pirate DJ (30 min).",
            ],
        },
        {
            "module": "Module 3 — Hip-Hop & Turntablism",
            "duration": "75 min",
            "objective": "Students perform the foundational hip-hop DJ techniques and explain their origins.",
            "activities": [
                "Mini-lecture: Herc, Flash, Theodore, Bambaataa (15 min).",
                "Demo + drill: looping a break with two copies (the Merry-Go-Round) (25 min).",
                "Demo + drill: a basic baby scratch and cut (25 min).",
                "Reflect: why did this start in the Bronx, with these tools, at this time? (10 min).",
            ],
        },
        {
            "module": "Module 4 — House & Techno",
            "duration": "75 min",
            "objective": "Students beatmatch four-to-the-floor tracks and articulate the house/techno distinction.",
            "activities": [
                "Mini-lecture: Chicago vs. Detroit; the Roland machines (15 min).",
                "Listen-and-sort: classify ten clips as house or techno and justify (15 min).",
                "Decks exercise: beatmatch and blend two house tracks; hold the mix for 32 bars (35 min).",
                "Wrap: 'every EDM track owes these two cities' — agree or disagree? (10 min).",
            ],
        },
        {
            "module": "Module 5 — Rave Culture",
            "duration": "60 min",
            "objective": "Students analyze how a music scene becomes a social movement and a legal target.",
            "activities": [
                "Mini-lecture: Ibiza, 1988, free parties, the 1994 Act (20 min).",
                "Debate: should governments be able to ban events by the type of music played? (20 min).",
                "Decks exercise: build a euphoric 4-track 'peak time' progression (20 min).",
            ],
        },
        {
            "module": "Module 6 — Corporate vs. Real (Bonus)",
            "duration": "75 min",
            "objective": "Students evaluate the commercialization of rave culture and compare corporate and underground models.",
            "activities": [
                "Mini-lecture: EDM boom, SFX/Live Nation, festivals as financial products, the RAVE Act (20 min).",
                "Case study: examine the 'Goblin Mode' underground rave; list what it shares with 1988 raves (20 min).",
                "Structured debate: corporate festival vs. underground rave — culture, safety, access, ethics (25 min).",
                "Wrap + capstone prompt assignment (10 min).",
            ],
        },
    ],
    "discussion": [
        "If a DJ doesn't produce the records they play, what is the DJ's actual art?",
        "Pirate radio broke the law to spread music. When is breaking the rules culturally justified?",
        "Hip-hop turned 'using two copies of a record' into a new art form. What everyday tools today are being used in ways their makers never intended?",
        "House is 'warm' and techno is 'cold.' Is that a useful distinction or a lazy one? Defend your view with specific tracks.",
        "The UK banned events with 'repetitive beats'; the US passed the RAVE Act. What does it say about a society when it legislates against a kind of music or gathering?",
        "Did the RAVE Act make ravers safer or less safe? Use the harm-reduction argument.",
        "Is a 100,000-person corporate festival still a 'rave'? What, exactly, is lost and gained at that scale?",
        "Who should own dance music culture — the artists and crews who built it, or the companies that can scale it?",
        "Why does the underground (like 'Goblin Mode') keep regenerating no matter how big the mainstream gets?",
    ],
    "assessmentIdeas": [
        "Timeline build: students place 12 events/inventions on a wall timeline and explain the cause-and-effect links.",
        "Listening quiz: identify genre and era of 8 audio clips.",
        "Practical: demonstrate a clean beatmatched blend (Module 4) and a baby scratch (Module 3).",
        "Capstone essay (500–750 words): 'Trace one technique or idea from the Jamaican sound system to a song or event from this year.'",
    ],
    "resources": [
        {"type": "Book", "text": "Bill Brewster & Frank Broughton — Last Night a DJ Saved My Life (the definitive DJ history)."},
        {"type": "Book", "text": "Simon Reynolds — Energy Flash: A Journey Through Rave Music and Dance Culture."},
        {"type": "Book", "text": "Jeff Chang — Can't Stop Won't Stop: A History of the Hip-Hop Generation."},
        {"type": "Film", "text": "Scratch (2001) — documentary on hip-hop DJs and turntablism."},
        {"type": "Film", "text": "Wild Style (1983) — early hip-hop culture on film."},
        {"type": "Listening", "text": "Phuture — 'Acid Tracks' (1987); Derrick May — 'Strings of Life' (1987); Afrika Bambaataa — 'Planet Rock' (1982)."},
        {"type": "Topic", "text": "Harm reduction & the RAVE Act — research the Amend the RAVE Act ('Save Lives') advocacy debate."},
    ],
}

EDITORIAL = {
    "passes": [
        {"pass": "Pass 1 — Accuracy", "note": "Verified names, dates, and attributions: Kool Herc's 1973 party at 1520 Sedgwick Ave; Theodore and the scratch (~1975); 'Planet Rock' (1982, TR-808, Kraftwerk); Frankie Knuckles at The Warehouse; Jesse Saunders' 'On and On' (1984) and Phuture's 'Acid Tracks' (1987); the Belleville Three; Radio Caroline (1964); Castlemorton (1992) and the Criminal Justice Act 1994; SFX Entertainment (2012 founding, 2013 IPO, 2016 bankruptcy -> LiveStyle); Live Nation's 2013 Insomniac stake; the RAVE Act (introduced 2002, passed 2003)."},
        {"pass": "Pass 2 — Clarity & fluff-cut", "note": "Tightened every module to one clear throughline (the sound system lineage), removed redundant phrasing and hedging, and made each technical claim concrete (specific tracks, dates, and machines instead of vague generalities)."},
        {"pass": "Pass 3 — Grammar & re-verification", "note": "Corrected grammar, punctuation, and consistency (genre names, capitalization, em-dashes), then re-checked that edits introduced no factual drift. Subjective framing (e.g., 'an inspiration for the RAVE Act') is presented as perspective, not asserted fact."},
    ]
}

COURSE_META = {
    "title": "The Needle Drop",
    "subtitle": "From sound systems to stadiums — a history of DJing, pirate radio, hip-hop, house, and the rave.",
}

GLOSSARY = [
    {"term": "Sound system", "def": "A mobile, hand-built rig of amplifiers and speaker stacks used to play recorded music as a live event; originated in 1950s Jamaica."},
    {"term": "Selector", "def": "The person who chooses and sequences records on a sound system — the original meaning of 'DJ' in dancehall culture."},
    {"term": "Dubplate", "def": "A one-off acetate cut so a sound system could play an exclusive record no rival owned."},
    {"term": "Toasting", "def": "Rhythmic chanting or hyping over an instrumental track by a sound system MC; a direct ancestor of rap."},
    {"term": "Dub", "def": "A remix style invented in Jamaica that strips a song to its rhythm and adds heavy echo and reverb, treating the mixing desk as an instrument."},
    {"term": "Pirate radio", "def": "Unlicensed radio broadcasting; vital for spreading dance music and rave information in the UK."},
    {"term": "Breakbeat", "def": "The percussion-heavy 'break' of a record, isolated and looped by hip-hop DJs as the foundation for rapping and dancing."},
    {"term": "Scratch", "def": "Moving a record back and forth under the needle to create rhythmic sound; credited to Grand Wizzard Theodore (~1975)."},
    {"term": "Turntablism", "def": "The art of using turntables and a mixer as musical instruments."},
    {"term": "House", "def": "Four-to-the-floor dance music born in early-1980s Chicago, named after the club The Warehouse."},
    {"term": "Techno", "def": "Leaner, more futuristic electronic dance music pioneered in 1980s Detroit by the Belleville Three."},
    {"term": "Acid house", "def": "House music defined by the TB-303's squelch; the catalyst for Britain's rave explosion."},
    {"term": "Second Summer of Love", "def": "The 1988–89 explosion of acid house and rave culture in Britain."},
    {"term": "Free party", "def": "A non-commercial, unlicensed rave run by collective sound systems, often in fields or empty buildings."},
    {"term": "EDM", "def": "'Electronic Dance Music' — a 2010s marketing umbrella for the festival-scale commercial form of dance music."},
    {"term": "RAVE Act (2003)", "def": "US law (introduced by Senator Joe Biden in 2002) extending 'crack house' statutes to event organizers, criticized for chilling harm-reduction efforts."},
]

# ============================ PROMOTER PROGRAM ============================
PROMOTER_COURSE_META = {
    "title": "The Promoter",
    "subtitle": "How to build the night — from the Loft to the warehouse, the flyer to the algorithm, the door to the duty of care.",
}

PROMOTER_TEACHER_GUIDE = {
    "intro": "This guide accompanies 'The Promoter' for use in promoter/event-production lessons — in person or virtual. Each module pairs history and theory with a hands-on producing exercise (build a flyer, draft a budget, plan a harm-reduction kit) so students leave able to actually throw a safe, well-run event. Time estimates assume a 60–75 minute session.",
    "objectives": [
        "Trace the promoter's craft from David Mancuso's Loft to today's gated-location underground.",
        "Promote an event effectively across legacy (flyer, pirate radio) and modern (social, password drop) channels.",
        "Curate a lineup, source a sound system, and write a run-of-show.",
        "Build an event budget and calculate a break-even point before booking.",
        "Plan for the law (permits, capacity, liability, the RAVE Act) and, above all, for harm reduction and duty of care.",
    ],
    "lessons": [
        {"module": "Module 1 — The Host", "duration": "60 min",
         "objective": "Students explain why the promoter's real product is a feeling and a safe space, using the Loft as origin.",
         "activities": [
             "Mini-lecture: Mancuso, the Loft, the non-commercial/invite model (15 min).",
             "Discussion: what 'feeling' does a great party sell, and how is it engineered? (15 min).",
             "Exercise: define the vibe, crowd, and one rule for an imaginary party in three sentences (30 min)."]},
        {"module": "Module 2 — Reach", "duration": "60 min",
         "objective": "Students design promotion that fills a floor while protecting an underground event.",
         "activities": [
             "Mini-lecture: flyer culture, pirate radio, the gated-location/password model (15 min).",
             "Exercise: design a flyer (paper or digital) with date, lineup, vibe, and rules (30 min).",
             "Discussion: where is the line between hype and exposing a party to risk? (15 min)."]},
        {"module": "Module 3 — Production", "duration": "75 min",
         "objective": "Students plan the logistics that turn a space into a venue.",
         "activities": [
             "Mini-lecture: booking, riders, sound-system hire, venue choice (15 min).",
             "Exercise: build a run-of-show from load-in to load-out for a 4-act night (35 min).",
             "Exercise: sequence a 4-artist lineup (opener -> peak -> close) and justify it (25 min)."]},
        {"module": "Module 4 — The Money", "duration": "75 min",
         "objective": "Students build a budget and find the break-even point.",
         "activities": [
             "Mini-lecture: revenue vs. cost, presales, ticketing platforms, corporate rollups (20 min).",
             "Exercise: draft a full event budget and calculate break-even attendance (40 min).",
             "Discussion: break-even community party vs. scalable financial product — which are you? (15 min)."]},
        {"module": "Module 5 — The Law", "duration": "60 min",
         "objective": "Students identify legal obligations and the RAVE Act's chilling effect.",
         "activities": [
             "Mini-lecture: permits, capacity, liability, the RAVE Act (2003) (20 min).",
             "Debate: does the RAVE Act make events safer or more dangerous? (20 min).",
             "Exercise: write a one-page door/capacity/ID plan for an event (20 min)."]},
        {"module": "Module 6 — Duty of Care (Bonus)", "duration": "75 min",
         "objective": "Students design a complete harm-reduction plan for an event.",
         "activities": [
             "Mini-lecture: harm reduction, DanceSafe, cool-down/medical/water, safer spaces (20 min).",
             "Case study: examine 'Goblin Mode' — what did the crew get right and what would you add? (20 min).",
             "Capstone exercise: build a harm-reduction & safety plan (water, cooling, medical, sober point, exits) (35 min)."]},
    ],
    "discussion": [
        "If the promoter's product is 'a feeling,' how do you measure whether you delivered it?",
        "Mancuso refused to sell anything at the Loft. What did that buy him, and what would it cost a promoter today?",
        "When does marketing a secret party start to endanger it?",
        "Is a break-even free party 'more real' than a profitable ticketed one? Defend your view.",
        "Should a promoter book a bigger headliner they can't really afford to fill the room? Why or why not?",
        "The RAVE Act can treat safety measures as evidence of guilt. As a promoter, how do you respond?",
        "Whose responsibility is an attendee's safety — theirs, the promoter's, or both? Where are the limits?",
        "What is the minimum harm-reduction setup you would refuse to throw a party without?",
        "Why do communities trust some promoters for decades and abandon others after one night?",
    ],
    "assessmentIdeas": [
        "Event plan: students submit a one-page plan (vibe, venue, lineup, budget, break-even, safety) for a hypothetical party.",
        "Budget exercise: build a budget and correctly calculate break-even attendance.",
        "Flyer + promo plan: a flyer plus a 3-channel promotion strategy.",
        "Capstone: a complete harm-reduction & duty-of-care plan, graded on whether it would actually get everyone home safe.",
    ],
    "resources": [
        {"type": "Book", "text": "Tim Lawrence — Love Saves the Day: A History of American Dance Music Culture, 1970–1979."},
        {"type": "Book", "text": "Simon Reynolds — Energy Flash: A Journey Through Rave Music and Dance Culture."},
        {"type": "Org", "text": "DanceSafe (dancesafe.org) — harm-reduction resources and the 'Amend the RAVE Act' campaign."},
        {"type": "Topic", "text": "Resident Advisor & DICE — modern ticketing/capacity tools for events."},
        {"type": "Topic", "text": "Local event permitting, occupancy limits, and liability insurance basics for your region."},
    ],
}

PROMOTER_EDITORIAL = {
    "passes": [
        {"pass": "Pass 1 — Accuracy", "note": "Verified: David Mancuso's Loft ('Love Saves the Day', Feb 14, 1970, 647 Broadway, invite-only/no-sales model); DanceSafe founded 1998 (San Francisco Bay Area); the RAVE Act (introduced 2002, passed 2003 as the Illicit Drug Anti-Proliferation Act, expanding 21 U.S.C. 856) with civil penalties up to $250,000 and criminal penalties up to 20 years, plus the 2018 DOJ clarification on water/education; SFX Entertainment (2012 founding, 2013 IPO, 2016 bankruptcy -> LiveStyle); Live Nation's 2013 majority stake in Insomniac."},
        {"pass": "Pass 2 — Clarity & fluff-cut", "note": "Each module reduced to one promoter takeaway; replaced vague advice with concrete, teachable tasks (budget, run-of-show, flyer, safety plan)."},
        {"pass": "Pass 3 — Grammar & re-verification", "note": "Corrected grammar and consistency, then re-checked facts; first-person/instructor claims are framed as perspective, not asserted fact."},
    ]
}

PROMOTER_GLOSSARY = [
    {"term": "Promoter", "def": "The person who organizes, funds, books, markets, and takes responsibility for an event."},
    {"term": "Musical host", "def": "Mancuso's term for the curator of a party — room, sound, and crowd over performance."},
    {"term": "Gated location", "def": "Releasing the venue address only to people who request it with a password."},
    {"term": "Rider", "def": "A document listing an artist's required gear, hospitality, and travel for a booking."},
    {"term": "Run-of-show", "def": "The minute-by-minute schedule of an event, from load-in to last call."},
    {"term": "Capacity", "def": "The maximum safe number of people for a space — a hard limit, not a target."},
    {"term": "Break-even", "def": "The revenue point at which an event's income covers its costs."},
    {"term": "Harm reduction", "def": "Practical measures (water, cooling, medical, drug-checking) that reduce risk to attendees."},
    {"term": "DanceSafe", "def": "US non-profit (1998) that pioneered free drug-checking and harm-reduction education at events."},
    {"term": "RAVE Act (2003)", "def": "US law extending 'crack house' statutes to event organizers; criticized for chilling harm reduction."},
    {"term": "Duty of care", "def": "The promoter's moral and practical responsibility for everyone's safety at their event."},
]

# Program registry consumed by the API.
PROGRAMS = {
    "dj": {"course": COURSE_META, "guide": TEACHER_GUIDE, "editorial": EDITORIAL, "glossary": GLOSSARY, "code": "DJ"},
    "promoter": {"course": PROMOTER_COURSE_META, "guide": PROMOTER_TEACHER_GUIDE, "editorial": PROMOTER_EDITORIAL, "glossary": PROMOTER_GLOSSARY, "code": "PRMO"},
}
PROGRAM_CODES = {"dj": "DJ", "promoter": "PRMO"}
