// =============================================================================
//  THE NEEDLE DROP — A History of DJ & Rave Culture
//  Long-form course content. Edited in three passes:
//    1) Accuracy   2) Clarity / fluff-cut   3) Grammar + fact re-verification
// =============================================================================
import { ART, STOCK } from "./assets";

export const COURSE = {
  title: "The Needle Drop",
  subtitle:
    "From sound systems to stadiums — a history of DJing, pirate radio, hip-hop, house, and the rave.",
  tagline: "A digital course by Xophur",
  description:
    "Six modules trace the DJ from a Kingston dancehall to the Bronx, through the pirate airwaves of Britain, into the warehouses of Chicago and Detroit, out to the orbital raves of the UK, and finally to the fork in the road where festivals became financial products — and the real rave went back to the woods.",
};

export const CHAPTERS = [
  // ---------------------------------------------------------------- CH 1
  {
    id: "sound-systems",
    num: "01",
    kicker: "Roots",
    title: "Sound System Culture & the Birth of the DJ",
    summary:
      "Before the DJ was a star, they were a selector — and the rig was the real headliner. The story starts in 1950s Jamaica.",
    image: ART.soundSystem,
    readTime: "8 min",
    sections: [
      {
        heading: "The rig is the act",
        paragraphs: [
          "Modern DJ culture begins not in a nightclub but on the streets of 1950s Kingston, Jamaica. Mobile 'sound systems' — towering, hand-built speaker stacks hauled to a yard or dancehall — turned recorded music into a live event. The operator who chose and sequenced the records was the 'selector,' and the crews behind the biggest rigs became local celebrities.",
          "Pioneers like Clement 'Sir Coxsone' Dodd and Arthur 'Duke' Reid ran rival systems that battled for crowds in 'sound clashes,' competitions decided by who had the heaviest bass, the loudest system, and the rarest records. To win, operators pressed exclusive one-off acetates called 'dubplates' that no rival could play. The idea that a DJ is judged by selection, exclusivity, and crowd control was set here, decades before turntables reached the Bronx.",
        ],
        pullQuote:
          "The selector didn't make the records. They made the night.",
      },
      {
        heading: "Toasting and dub",
        paragraphs: [
          "Sound system MCs known as 'toasters' — U-Roy, King Stitt, and others — chanted and hyped the crowd over instrumental tracks, a direct ancestor of rap. Meanwhile, engineers such as King Tubby and Lee 'Scratch' Perry stripped vocals from songs and drenched the leftover rhythm in reverb and echo, inventing 'dub.' Dub treated the mixing desk as an instrument and the B-side as a blank canvas — a remix philosophy that still defines electronic music.",
          "As Jamaicans emigrated through the 1960s and 70s, they carried sound system culture to London and New York. One of those immigrants, a Bronx teenager born Clive Campbell, would soon plug in his father's speakers and light the fuse for hip-hop.",
        ],
      },
    ],
    terms: ["Sound system", "Selector", "Dubplate", "Sound clash", "Toasting", "Dub"],
  },

  // ---------------------------------------------------------------- CH 2
  {
    id: "pirate-radio",
    num: "02",
    kicker: "Outlaw Airwaves",
    title: "Pirate Radio",
    summary:
      "When the official stations wouldn't play the music, DJs built their own transmitters — first on ships, then on tower-block rooftops.",
    image: ART.pirateRadio,
    readTime: "7 min",
    sections: [
      {
        heading: "Broadcasting from the sea",
        paragraphs: [
          "In 1960s Britain, the BBC held a near-monopoly on radio and rationed pop music. So in 1964, Radio Caroline began broadcasting from a ship anchored in international waters, beyond the reach of UK law. These 'offshore pirates' fed a hungry teenage audience and forced the BBC to launch Radio 1 in 1967 in response.",
          "Pirate radio proved a permanent point: when gatekeepers ignore a sound, the audience will route around them. That lesson would be relearned, loudly, twenty years later.",
        ],
      },
      {
        heading: "Rooftops and rave",
        paragraphs: [
          "By the 1980s and 90s the pirates had moved onshore, transmitting illegally from rooftop aerials across London. Stations like Kiss FM, Rinse FM, and Sunrise championed soul, reggae, hip-hop, and the new dance sounds the mainstream wouldn't touch. Kiss began as a pirate in 1985 and went legal in 1990; Rinse broadcast illegally from 1994 and was finally licensed in 2010.",
          "Crucially, pirate radio became the nervous system of the UK rave scene. DJs broke jungle, hardcore, and garage on air, and MCs read out the phone lines and meeting points that led ravers to secret parties. The DIY, anti-authority spirit of the sound system had simply changed frequency.",
        ],
        pullQuote:
          "When the gatekeepers ignore a sound, the audience routes around them.",
      },
    ],
    terms: ["Pirate radio", "Offshore broadcasting", "Aerial", "Kiss FM", "Rinse FM"],
  },

  // ---------------------------------------------------------------- CH 3
  {
    id: "hip-hop",
    num: "03",
    kicker: "The Bronx",
    title: "Hip-Hop & the Art of Turntablism",
    summary:
      "In a Bronx rec room, a DJ figured out how to loop the best four seconds of a record forever — and a culture was born.",
    image: ART.hiphop,
    readTime: "9 min",
    sections: [
      {
        heading: "The Merry-Go-Round",
        paragraphs: [
          "On August 11, 1973, at a back-to-school party at 1520 Sedgwick Avenue in the Bronx, DJ Kool Herc (Clive Campbell) made a simple discovery with enormous consequences. He noticed dancers went wildest during a song's 'break' — the short, percussion-heavy section. Using two copies of the same record and two turntables, he played the break on one deck, then cut to the break on the second deck, extending those few seconds indefinitely. He called it the 'Merry-Go-Round.'",
          "Herc had isolated the breakbeat, the rhythmic core that b-boys and b-girls danced to and MCs rapped over. The DJ was no longer just playing songs; the DJ was now building new ones in real time.",
        ],
        pullQuote:
          "He took the best four seconds of a record and made them last all night.",
      },
      {
        heading: "Flash, Theodore, and the science of the cut",
        paragraphs: [
          "Grandmaster Flash turned Herc's party trick into a precise technique. He developed 'clock theory' — reading a record's label like a clock face to find the break by hand — and perfected 'cutting' between two copies so seamlessly the loop never broke. His protégé Grand Wizzard Theodore is widely credited with inventing the 'scratch' around 1975, the deliberate back-and-forth rub of a record under the needle that became hip-hop's signature sound.",
          "This pursuit of manual virtuosity on the turntable became its own discipline: turntablism, the DJ as instrumentalist.",
        ],
      },
      {
        heading: "Bambaataa and the electro blueprint",
        paragraphs: [
          "Afrika Bambaataa reframed the music as a movement, founding the Universal Zulu Nation and naming hip-hop's four elements: DJing, MCing, breaking, and graffiti. In 1982 his single 'Planet Rock,' built around the Roland TR-808 drum machine and melodies borrowed from German group Kraftwerk, fused hip-hop with electronics and launched 'electro.'",
          "That collision matters for everything that follows. The 808's booming kick and the embrace of machines as instruments connect the Bronx directly to the drum machines about to reshape Chicago and Detroit.",
        ],
      },
    ],
    terms: ["Breakbeat", "Merry-Go-Round", "Cutting", "Scratch", "Turntablism", "TR-808", "Electro"],
  },

  // ---------------------------------------------------------------- CH 4
  {
    id: "house-techno",
    num: "04",
    kicker: "The Machines Sing",
    title: "House & Techno — The Birth of EDM",
    summary:
      "Cheap drum machines, a disco backlash, and two American cities gave the world a new four-to-the-floor language.",
    image: ART.warehouse,
    readTime: "9 min",
    sections: [
      {
        heading: "Chicago: house from the Warehouse",
        paragraphs: [
          "After the 'disco backlash' of 1979, dance music retreated to Black and gay clubs in cities like Chicago. At a club called The Warehouse, resident DJ Frankie Knuckles — later called the 'Godfather of House' — re-edited disco records, layered in a relentless drum machine, and stretched tracks for the dancefloor. The music took its name from the club: 'house.'",
          "Producers soon made house from scratch using affordable Roland gear: the TR-808 and TR-909 drum machines and the TB-303 bass synth. Jesse Saunders' 'On and On' (1984) is often cited as the first house record, and in 1987 Phuture's 'Acid Tracks' coaxed a squelching, mutant sound out of the 303 — birthing 'acid house,' the strain that would detonate in Britain.",
        ],
        pullQuote:
          "House didn't need a band. It needed a drum machine and a room that wouldn't quit.",
      },
      {
        heading: "Detroit: techno and the Belleville Three",
        paragraphs: [
          "Ninety minutes away, three friends from the Detroit suburb of Belleville — Juan Atkins, Derrick May, and Kevin Saunderson — imagined a colder, more futuristic machine music. Inspired by Kraftwerk and funk pioneer George Clinton, Atkins (as Cybotron and Model 500) laid the groundwork, May produced the soaring 'Strings of Life' (1987), and Saunderson scored crossover hits as Inner City.",
          "The distinction is worth teaching: house is warmer, soulful, rooted in disco and gospel; techno is leaner, mechanical, and science-fiction in spirit. Together, these two American sounds form the genetic code of virtually everything later marketed as EDM.",
        ],
      },
    ],
    terms: ["House music", "Acid house", "Techno", "TR-909", "TB-303", "Four-to-the-floor", "Belleville Three"],
  },

  // ---------------------------------------------------------------- CH 5
  {
    id: "rave-culture",
    num: "05",
    kicker: "Second Summer of Love",
    title: "Rave Culture",
    summary:
      "Chicago and Detroit's records crossed the Atlantic, met a new drug and a holiday island, and exploded into a youth movement the state tried to ban.",
    image: STOCK.raveLaser,
    readTime: "9 min",
    sections: [
      {
        heading: "Ibiza, Shoom, and 1988",
        paragraphs: [
          "In the summer of 1987, a handful of British DJs — among them Danny Rampling and Paul Oakenfold — experienced the open-air, all-night, eclectic 'Balearic' scene on the island of Ibiza. They brought it home. Rampling's club Shoom opened in London in late 1987, and acid house, MDMA (ecstasy), and a euphoric communal vibe ignited what the press dubbed the 'Second Summer of Love' in 1988.",
          "The smiley face became its emblem. As demand outgrew small clubs, promoters threw enormous illegal parties in warehouses and fields around the M25 orbital motorway, spread by word of mouth and pirate radio.",
        ],
        pullQuote:
          "A field, a generator, a sound system, and a phone number on a pirate station.",
      },
      {
        heading: "Free parties and the traveler sound systems",
        paragraphs: [
          "Alongside the commercial raves grew a radical free-party movement led by sound system collectives like Spiral Tribe — a direct descendant of Jamaican sound system culture, now wrapped in techno and traveler life. In May 1992, an illegal gathering at Castlemorton Common swelled to tens of thousands over several days and dominated national headlines.",
          "The state responded. The Criminal Justice and Public Order Act 1994 gave police sweeping powers to shut down gatherings playing — in the law's now-infamous wording — music 'characterised by the emission of a succession of repetitive beats.' A government had literally legislated against a rhythm. Many crews left Britain to throw parties across Europe, while the sound mutated at home into jungle, drum and bass, and UK garage.",
        ],
      },
    ],
    terms: ["Balearic beat", "Second Summer of Love", "Acid house", "Free party", "Spiral Tribe", "Castlemorton", "Criminal Justice Act 1994"],
  },

  // ---------------------------------------------------------------- CH 6 (BONUS)
  {
    id: "corporate-vs-real",
    num: "06",
    kicker: "Bonus Module",
    title: "From Free Party to Financial Product",
    summary:
      "How the rave became an investment asset for corporations and hedge funds — and why the real rave went back underground.",
    image: ART.corporateVsUnderground,
    readTime: "11 min",
    isBonus: true,
    sections: [
      {
        heading: "The EDM gold rush",
        paragraphs: [
          "By the late 2000s, the underground sounds of Chicago, Detroit, and Britain had been repackaged for arenas under a single marketing label: 'EDM.' Brand-name festivals scaled up fast — Electric Daisy Carnival (run by Insomniac's Pasquale Rotella), Ultra in Miami, and Belgium's Tomorrowland — selling hundreds of thousands of tickets and pyrotechnic spectacle.",
          "Where there is a crowd that size, there is capital. The festival stopped being a party and started becoming an asset class.",
        ],
        pullQuote: "The festival stopped being a party and became an asset class.",
      },
      {
        heading: "When the rave got an IPO",
        paragraphs: [
          "In 2012, media mogul Robert F.X. Sillerman founded SFX Entertainment to roll up dance-music promoters, ticketing, and brands into one company, taking it public in a 2013 IPO. The thesis was simple: own the festivals, the ticketing data, and the sponsorships, and treat youth culture like a portfolio. The model overreached — SFX filed for bankruptcy in 2016 and was restructured as LiveStyle.",
          "Consolidation continued anyway. In 2013, concert giant Live Nation acquired a majority stake in Insomniac, the company behind EDC. Today, much of the 'mainstream' festival landscape sits inside publicly traded companies and private-equity portfolios. The ticket you buy feeds quarterly earnings, dynamic pricing, sponsorship decks, and data harvesting. A movement that began with hand-built speakers in a Kingston yard can now appear on a hedge fund's balance sheet.",
        ],
      },
      {
        heading: "The law follows the money — and the panic",
        paragraphs: [
          "The United States wrote its own version of Britain's repetitive-beats law. In 2002, then-Senator Joe Biden introduced the RAVE Act (Reducing Americans' Vulnerability to Ecstasy Act); a version passed in 2003 as the Illicit Drug Anti-Proliferation Act. It extended 'crack house' statutes to let prosecutors target event organizers and venue owners for drug use by attendees.",
          "The chilling effect was real for the people actually throwing parties. (Your instructor was running one of three rave companies in Delaware at the time — close enough to the scene that legislation like this was aimed squarely at operators like him.) The cruel irony, harm-reduction advocates argued, is that the law discouraged organizers from providing free water, cooling rooms, and on-site medical and drug-checking services, for fear that doing so would be used as evidence that they 'knew' drug use was occurring. Safety measures became legal liabilities.",
        ],
      },
      {
        heading: "Case study: the real rave — 'Goblin Mode'",
        paragraphs: [
          "Strip away the LED walls and the shareholders and the original article is still out there, doing exactly what it did in 1988. Consider a real underground rave from a Saturday night: 'Goblin Mode,' an 18+ party thrown by a Philadelphia underground crew.",
          "There is no public address. The flyer lists a date, '10pm–damn,' a stacked DIY lineup, and a single instruction: DM the crew the password 'GOBLIN' for the location. The venue is a graffiti-covered ruin in the woods. The rig — Pioneer CDJs on a road case, a KRK monitor, a stack lighting the trees blood-red — is the whole production. The crowd found it by word of mouth and a password, exactly as ravers found the M25 parties through a phone number read out on pirate radio.",
          "This is the throughline of the entire course. The corporate festival and the secret woods rave share one ancestor — the sound system — but only one of them still runs on the original ethos: do it yourself, tell the right people, let the rig and the selection do the talking.",
        ],
        pullQuote:
          "DM the password GOBLIN for the location. That's the whole marketing budget.",
      },
    ],
    terms: ["EDM", "SFX Entertainment", "Live Nation / Insomniac", "RAVE Act", "Harm reduction", "DIY rave"],
  },
];

// ---------------------------------------------------------------------------
//  GLOSSARY
// ---------------------------------------------------------------------------
export const GLOSSARY = [
  { term: "Sound system", def: "A mobile, hand-built rig of amplifiers and speaker stacks used to play recorded music as a live event; originated in 1950s Jamaica." },
  { term: "Selector", def: "The person who chooses and sequences records on a sound system — the original meaning of 'DJ' in dancehall culture." },
  { term: "Dubplate", def: "A one-off acetate cut so a sound system could play an exclusive record no rival owned." },
  { term: "Toasting", def: "Rhythmic chanting or hyping over an instrumental track by a sound system MC; a direct ancestor of rap." },
  { term: "Dub", def: "A remix style invented in Jamaica that strips a song to its rhythm and adds heavy echo and reverb, treating the mixing desk as an instrument." },
  { term: "Pirate radio", def: "Unlicensed radio broadcasting; vital for spreading dance music and rave information in the UK." },
  { term: "Breakbeat", def: "The percussion-heavy 'break' of a record, isolated and looped by hip-hop DJs as the foundation for rapping and dancing." },
  { term: "Merry-Go-Round", def: "DJ Kool Herc's technique of using two copies of a record to extend the break indefinitely." },
  { term: "Cutting", def: "Switching cleanly between two turntables to maintain a continuous loop or beat." },
  { term: "Scratch", def: "Moving a record back and forth under the needle to create rhythmic sound; credited to Grand Wizzard Theodore (~1975)." },
  { term: "Turntablism", def: "The art of using turntables and a mixer as musical instruments." },
  { term: "TR-808 / TR-909", def: "Roland drum machines whose distinctive sounds underpin hip-hop, house, and techno." },
  { term: "TB-303", def: "A Roland bass synthesizer whose squelchy tone created the 'acid' sound." },
  { term: "House", def: "Four-to-the-floor dance music born in early-1980s Chicago, named after the club The Warehouse." },
  { term: "Techno", def: "Leaner, more futuristic electronic dance music pioneered in 1980s Detroit by the Belleville Three." },
  { term: "Four-to-the-floor", def: "A steady kick drum on every beat of the bar — the rhythmic engine of house and techno." },
  { term: "Acid house", def: "House music defined by the TB-303's squelch; the catalyst for Britain's rave explosion." },
  { term: "Balearic beat", def: "The eclectic, open-air DJ style of Ibiza that British DJs imported in 1987." },
  { term: "Second Summer of Love", def: "The 1988–89 explosion of acid house and rave culture in Britain." },
  { term: "Free party", def: "A non-commercial, unlicensed rave run by collective sound systems, often in fields or empty buildings." },
  { term: "Criminal Justice Act 1994", def: "UK law granting police powers against gatherings playing music with 'repetitive beats.'" },
  { term: "EDM", def: "'Electronic Dance Music' — a 2010s marketing umbrella for the festival-scale commercial form of dance music." },
  { term: "RAVE Act (2003)", def: "US law (introduced by Senator Joe Biden in 2002) extending 'crack house' statutes to event organizers, criticized for chilling harm-reduction efforts." },
  { term: "Harm reduction", def: "Practical measures — free water, cooling areas, medical tents, drug-checking — that reduce risk at events." },
];

// ---------------------------------------------------------------------------
//  TEACHER'S GUIDE
// ---------------------------------------------------------------------------
export const TEACHER_GUIDE = {
  intro:
    "This guide accompanies 'The Needle Drop' for use in DJ lessons — in person or virtual. Each module pairs a historical narrative with hands-on turntable / controller exercises so students feel the history in their hands, not just on the page. Time estimates assume a 60–75 minute session.",
  objectives: [
    "Trace a single, unbroken line from Jamaican sound systems to modern festivals.",
    "Explain how technology (dubplates, drum machines, synths, pirate transmitters) drove each creative leap.",
    "Distinguish house from techno, and hip-hop DJing from selecting, by ear and by technique.",
    "Critically evaluate the commercialization of dance music and the trade-offs of corporate vs. underground events.",
    "Connect each historical technique to a practical skill on the decks.",
  ],
  lessons: [
    {
      module: "Module 1 — Sound System Roots",
      duration: "60 min",
      objective: "Students explain why selection and crowd-reading define the DJ, using 1950s Jamaica as the origin point.",
      activities: [
        "Mini-lecture: sound systems, selectors, clashes, dubplates (15 min).",
        "Listen: a dub track vs. its original vocal version; identify what was removed and added (10 min).",
        "Decks exercise: students 'selector battle' — each picks three tracks to win an imaginary crowd; defend the choices (25 min).",
        "Wrap: how does exclusivity (the dubplate) still show up today? (10 min).",
      ],
    },
    {
      module: "Module 2 — Pirate Radio",
      duration: "60 min",
      objective: "Students connect media gatekeeping to DIY broadcasting and the spread of underground scenes.",
      activities: [
        "Mini-lecture: offshore to rooftop pirates; their role in rave (15 min).",
        "Discussion: today's 'pirate radio' equivalents — who are the gatekeepers now? (15 min).",
        "Decks exercise: record a 20-minute 'radio set' with mic intros announcing tracks like a pirate DJ (30 min).",
      ],
    },
    {
      module: "Module 3 — Hip-Hop & Turntablism",
      duration: "75 min",
      objective: "Students perform the foundational hip-hop DJ techniques and explain their origins.",
      activities: [
        "Mini-lecture: Herc, Flash, Theodore, Bambaataa (15 min).",
        "Demo + drill: looping a break with two copies (the Merry-Go-Round) (25 min).",
        "Demo + drill: a basic baby scratch and cut (25 min).",
        "Reflect: why did this start in the Bronx, with these tools, at this time? (10 min).",
      ],
    },
    {
      module: "Module 4 — House & Techno",
      duration: "75 min",
      objective: "Students beatmatch four-to-the-floor tracks and articulate the house/techno distinction.",
      activities: [
        "Mini-lecture: Chicago vs. Detroit; the Roland machines (15 min).",
        "Listen-and-sort: classify ten clips as house or techno and justify (15 min).",
        "Decks exercise: beatmatch and blend two house tracks; hold the mix for 32 bars (35 min).",
        "Wrap: 'every EDM track owes these two cities' — agree or disagree? (10 min).",
      ],
    },
    {
      module: "Module 5 — Rave Culture",
      duration: "60 min",
      objective: "Students analyze how a music scene becomes a social movement and a legal target.",
      activities: [
        "Mini-lecture: Ibiza, 1988, free parties, the 1994 Act (20 min).",
        "Debate: should governments be able to ban events by the type of music played? (20 min).",
        "Decks exercise: build a euphoric 4-track 'peak time' progression (20 min).",
      ],
    },
    {
      module: "Module 6 — Corporate vs. Real (Bonus)",
      duration: "75 min",
      objective: "Students evaluate the commercialization of rave culture and compare corporate and underground models.",
      activities: [
        "Mini-lecture: EDM boom, SFX/Live Nation, festivals as financial products, the RAVE Act (20 min).",
        "Case study: examine the 'Goblin Mode' underground rave; list what it shares with 1988 raves (20 min).",
        "Structured debate: corporate festival vs. underground rave — culture, safety, access, ethics (25 min).",
        "Wrap + capstone prompt assignment (10 min).",
      ],
    },
  ],
  discussion: [
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
  assessmentIdeas: [
    "Timeline build: students place 12 events/inventions on a wall timeline and explain the cause-and-effect links.",
    "Listening quiz: identify genre and era of 8 audio clips.",
    "Practical: demonstrate a clean beatmatched blend (Module 4) and a baby scratch (Module 3).",
    "Capstone essay (500–750 words): 'Trace one technique or idea from the Jamaican sound system to a song or event from this year.'",
  ],
  resources: [
    { type: "Book", text: "Bill Brewster & Frank Broughton — Last Night a DJ Saved My Life (the definitive DJ history)." },
    { type: "Book", text: "Simon Reynolds — Energy Flash: A Journey Through Rave Music and Dance Culture." },
    { type: "Book", text: "Jeff Chang — Can't Stop Won't Stop: A History of the Hip-Hop Generation." },
    { type: "Film", text: "Scratch (2001) — documentary on hip-hop DJs and turntablism." },
    { type: "Film", text: "Wild Style (1983) — early hip-hop culture on film." },
    { type: "Listening", text: "Phuture — 'Acid Tracks' (1987); Derrick May — 'Strings of Life' (1987); Afrika Bambaataa — 'Planet Rock' (1982)." },
    { type: "Topic", text: "Harm reduction & the RAVE Act — research the Amend the RAVE Act (RAVE/'Save Lives') advocacy debate." },
  ],
};

// Editorial provenance — shown to the instructor for transparency.
export const EDITORIAL = {
  passes: [
    {
      pass: "Pass 1 — Accuracy",
      note: "Verified names, dates, and attributions: Kool Herc's 1973 party at 1520 Sedgwick Ave; Theodore and the scratch (~1975); 'Planet Rock' (1982, TR-808, Kraftwerk); Frankie Knuckles at The Warehouse; Jesse Saunders' 'On and On' (1984) and Phuture's 'Acid Tracks' (1987); the Belleville Three; Radio Caroline (1964); Castlemorton (1992) and the Criminal Justice Act 1994; SFX Entertainment (2012 founding, 2013 IPO, 2016 bankruptcy → LiveStyle); Live Nation's 2013 Insomniac stake; the RAVE Act (introduced 2002, passed 2003).",
    },
    {
      pass: "Pass 2 — Clarity & fluff-cut",
      note: "Tightened every module to one clear throughline (the sound system lineage), removed redundant phrasing and hedging, and made each technical claim concrete (specific tracks, dates, and machines instead of vague generalities).",
    },
    {
      pass: "Pass 3 — Grammar & re-verification",
      note: "Corrected grammar, punctuation, and consistency (genre names, capitalization, em-dashes), then re-checked that edits introduced no factual drift. Subjective framing (e.g., 'an inspiration for the RAVE Act') is presented as perspective, not asserted fact.",
    },
  ],
};
