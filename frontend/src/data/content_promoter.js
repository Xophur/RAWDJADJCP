// =============================================================================
//  THE DROP — RAWDJA Promoter Certification (student-facing content)
//  Parallel to "The Needle Drop" DJ course. Edited in three passes
//  (accuracy -> clarity/fluff-cut -> grammar + fact re-verification).
// =============================================================================
import { ART, STOCK } from "./assets";

export const COURSE_PROMO = {
  title: "The Promoter",
  subtitle:
    "How to build the night — from the Loft to the warehouse, the flyer to the algorithm, the door to the duty of care.",
  tagline: "RAWDJA Promoter Certification",
  description:
    "The DJ plays the records; the promoter builds the room they play in. This program traces the promoter's craft from David Mancuso's invite-only Loft to today's password-for-location underground — covering promotion, booking, production, the economics of the door, the law, and the single thing that separates a great promoter from a dangerous one: harm reduction.",
};

export const CHAPTERS_PROMO = [
  {
    id: "promoter-origins",
    num: "01",
    kicker: "Origins",
    title: "The Host: Where the Promoter Began",
    summary:
      "Before tickets and LED walls, the promoter was a host who built a room around a feeling. It starts with a sound system and a private party.",
    image: ART.soundSystem,
    readTime: "8 min",
    sections: [
      {
        heading: "The party as a private world",
        paragraphs: [
          "The modern promoter's blueprint was drawn on February 14, 1970, when David Mancuso threw a party he called 'Love Saves the Day' in his New York loft at 647 Broadway. It was invite-only, sold nothing — no alcohol, no food — and charged a small contribution at the door to cover costs. By avoiding sales, Mancuso sidestepped the cabaret-license system entirely and built a private, members-style world instead of a commercial club.",
          "Mancuso refused the title of 'DJ,' calling himself a 'musical host.' That word matters. The host's job was not to perform; it was to curate the room, the sound, and the crowd so that everyone felt safe enough to lose themselves. That is the promoter's true product: not a lineup, but a feeling and a space to have it in.",
        ],
        pullQuote: "The promoter's product isn't a lineup. It's a feeling, and a safe room to have it in.",
      },
      {
        heading: "The blueprint spreads",
        paragraphs: [
          "The Loft's model — private, non-commercial, radically inclusive, built around a world-class sound system — became the template for the venues that defined dance music: the Paradise Garage, the Gallery, and Chicago's Warehouse, where house music got its name. Every one of them was shaped by a promoter's choices about who gets in, what it sounds like, and how the night is allowed to feel.",
          "The lineage is the same one the DJ course traces from the Jamaican sound system: the rig and the crew come first, and the promoter is the person who points them at a crowd.",
        ],
      },
    ],
    terms: ["Musical host", "The Loft", "Invite-only", "Cabaret license", "Members model"],
  },
  {
    id: "promotion-and-the-flyer",
    num: "02",
    kicker: "Reach",
    title: "Word of Mouth to Algorithm",
    summary:
      "How a promoter fills a room they can't advertise — from flyers and pirate-radio shout-outs to the DM-the-password underground of today.",
    image: ART.pirateRadio,
    readTime: "7 min",
    sections: [
      {
        heading: "The flyer is the brand",
        paragraphs: [
          "For decades the flyer was the promoter's primary tool — a piece of design that had to signal the vibe, the lineup, and the rules in one glance. In the UK rave scene, flyers worked alongside pirate radio: DJs broke the music on air while MCs read out phone lines and meeting points that led ravers to the party. Promotion and secrecy ran on the same channel.",
          "The craft never changed, only the medium. Forums, then Facebook events, then Instagram and Telegram. The underground simply moved to wherever the gatekeepers weren't looking.",
        ],
      },
      {
        heading: "Hype without a map",
        paragraphs: [
          "The sharpest move in modern underground promotion is the gated location: a flyer lists the date, the lineup, and an instruction — DM the crew a password for the address. The 'Goblin Mode' rave in this program's case study did exactly that ('DM @Phillyundrgrnd the password GOBLIN for location'). It builds hype and a sense of belonging while keeping the venue off public record until the last moment.",
          "This is the promoter's tightrope: market loudly enough to fill the floor, quietly enough to keep the party safe and standing.",
        ],
        pullQuote: "Market loudly enough to fill the floor, quietly enough to keep the party standing.",
      },
    ],
    terms: ["Flyer", "Pirate radio", "Gated location", "Password drop", "Guest list"],
  },
  {
    id: "building-the-night",
    num: "03",
    kicker: "Production",
    title: "Building the Night",
    summary:
      "Booking the lineup, hiring the rig, choosing the room, and running the show — the unglamorous logistics that make the magic possible.",
    image: ART.warehouse,
    readTime: "9 min",
    sections: [
      {
        heading: "Curate the lineup, not just the names",
        paragraphs: [
          "Booking is storytelling. A good promoter sequences a night the way a DJ sequences a set: openers who warm the room, a build through the peak, and a close that lands the crowd safely. The headliner sells tickets, but the opener sets the standard and the closer writes the memory. Talent is booked with clear terms — fee, set time, and a 'rider' listing what the artist needs (gear, hospitality, travel).",
          "Curation is also a values statement. Who you book, and who you make room for, tells the scene what your party stands for.",
        ],
      },
      {
        heading: "The rig and the room",
        paragraphs: [
          "In the underground, the production is the venue. A typical setup is what you see in the case study: Pioneer CDJs and a mixer on a road case, monitors, and a stack of speakers powerful enough to turn a ruin or a field into a club. The promoter sources the sound system (often hired from a local crew), power (generators off-grid), lighting, and the load-in/load-out plan.",
          "Venue choice drives everything else: a graffiti-covered ruin in the woods sets capacity, power needs, safety risks, and the entire logistics chain. Pick the room first; the run-of-show follows from it.",
        ],
        pullQuote: "In the underground, the production is the venue.",
      },
    ],
    terms: ["Lineup", "Rider", "Sound system hire", "Load-in / load-out", "Run-of-show", "Capacity"],
  },
  {
    id: "money-and-models",
    num: "04",
    kicker: "The Money",
    title: "From Door Cash to Investment Products",
    summary:
      "How events actually make (and lose) money — and how the festival grew from a break-even free party into a hedge fund's asset.",
    image: ART.corporateVsUnderground,
    readTime: "10 min",
    sections: [
      {
        heading: "The math of a party",
        paragraphs: [
          "Every event lives or dies on a simple equation: revenue (door, presales, bar where legal) minus costs (talent, sound, venue, security, production, promotion). The DIY underground often aims only to break even — cover the crew and the rig, and call a full floor the profit. Presales reduce risk by guaranteeing some income before the doors open; platforms like Resident Advisor and DICE became standard for selling tickets and capping capacity.",
          "Knowing your break-even number before you book anything is the difference between a promoter and a person who lost money throwing a party.",
        ],
        pullQuote: "Know your break-even before you book a single act.",
      },
      {
        heading: "When the party becomes an asset",
        paragraphs: [
          "Scaled up, promotion becomes finance. In 2012, Robert F.X. Sillerman founded SFX Entertainment to roll up dance-music promoters, ticketing, and brands into one company and took it public in a 2013 IPO — treating youth culture like a portfolio. The model overreached and SFX went bankrupt in 2016 (reorganized as LiveStyle), but consolidation continued: in 2013 Live Nation took a majority stake in Insomniac, the company behind Electric Daisy Carnival.",
          "Today much of the festival landscape sits inside publicly traded companies and private-equity portfolios. The ticket you sell can feed quarterly earnings, dynamic pricing, and data harvesting. The promoter's choice — break-even community party or scalable financial product — defines what kind of operator you become.",
        ],
      },
    ],
    terms: ["Door", "Presale", "Break-even", "Ticketing platform", "SFX / LiveStyle", "Live Nation / Insomniac"],
  },
  {
    id: "law-and-the-door",
    num: "05",
    kicker: "The Law",
    title: "The Law & The Door",
    summary:
      "Permits, liability, security, and the RAVE Act — the legal reality every promoter has to plan around, above ground or below it.",
    image: STOCK.raveLaser,
    readTime: "9 min",
    sections: [
      {
        heading: "Permits, capacity, and liability",
        paragraphs: [
          "A legitimate event runs on paperwork: venue permits, occupancy/capacity limits, security staffing, and liability insurance. Capacity is not a suggestion — overcrowding is the fastest way to turn a great night into a tragedy and a lawsuit. The door is where the promoter's plan meets reality: ID checks, counting heads against capacity, and refusing entry when the room is full.",
          "Underground promoters operate without most of this scaffolding, which is exactly why their duty of care falls even more heavily on planning: clear exits, a head count, and a sober point person are non-negotiable, permit or no permit.",
        ],
      },
      {
        heading: "The RAVE Act and its perverse incentive",
        paragraphs: [
          "In 2002, then-Senator Joe Biden introduced the RAVE Act; a version passed in 2003 as the Illicit Drug Anti-Proliferation Act. It extended federal 'crack house' statutes (21 U.S.C. § 856) to event organizers and venue owners, with civil penalties up to $250,000 and criminal penalties up to 20 years. (This program's instructor was running one of three rave companies in Delaware when that law was introduced.)",
          "Its cruelest effect is the chilling of safety. Because providing water, cooling areas, medical care, or drug-checking could be argued as proof a promoter 'knew' drugs were present, the law pushed some organizers to offer less safety, not more. A 2018 DOJ clarification said free water and fact-based drug education are acceptable — but the statute was never amended, and the fear remains. The promoter's takeaway is brutal and clear: the law sometimes punishes care, so you provide it anyway, and you plan for it.",
        ],
        pullQuote: "The law sometimes punishes care. You provide it anyway.",
      },
    ],
    terms: ["Permit", "Capacity", "Liability insurance", "Security", "RAVE Act (2003)", "Duty of care"],
  },
  {
    id: "harm-reduction",
    num: "06",
    kicker: "Bonus Module",
    title: "Throwing a Rave Everyone Comes Home From",
    summary:
      "The bonus module and the heart of the program: harm reduction, community, and the promoter's real job — getting everyone home safe.",
    image: STOCK.raveCrowd,
    readTime: "10 min",
    isBonus: true,
    sections: [
      {
        heading: "Harm reduction is the job",
        paragraphs: [
          "Harm reduction means accepting that, regardless of rules, some attendees will use substances — and building the night so that fewer people get hurt. The practical toolkit is cheap and proven: free water and electrolytes, a cool-down area, earplugs, clearly marked and staffed medical help, and a sober, identifiable point person who can act fast. DanceSafe, founded in 1998 in the San Francisco Bay Area, pioneered bringing free drug-checking and education into US nightlife.",
          "None of this is optional for a serious promoter. A floor full of people is a floor full of someone's kids, friends, and partners. Your reputation — and your conscience — rides on whether they get home.",
        ],
        pullQuote: "A full floor is a room full of someone's kids. Get them home.",
      },
      {
        heading: "Community over commerce",
        paragraphs: [
          "The best underground promoters build more than events; they build scenes. That means safer-space policies and consent culture, looking out for the vulnerable, supporting sober attendees, and treating the crew, the artists, and the crowd as a community rather than a customer base. The 'Goblin Mode' rave in the case study — secret location, DIY lineup, the rig as the venue — works because a crew took responsibility for a room full of strangers.",
          "That is the throughline from Mancuso's Loft to a ruin in the Philadelphia woods: the promoter who lasts is the one the community trusts. Build the feeling, hold the door, and get everyone home — and you have done the job.",
        ],
      },
    ],
    terms: ["Harm reduction", "DanceSafe", "Cool-down area", "Drug checking", "Safer space", "Duty of care"],
  },
];

export const GLOSSARY_PROMO = [
  { term: "Promoter", def: "The person who organizes, funds, books, markets, and takes responsibility for an event." },
  { term: "Musical host", def: "David Mancuso's term for the curator of a party — focused on room, sound, and crowd rather than performance." },
  { term: "The Loft", def: "Mancuso's invite-only, non-commercial NYC party (from 1970) that became the blueprint for dance-music venues." },
  { term: "Flyer", def: "The promoter's core branding and information tool, historically print, now mostly digital/social." },
  { term: "Gated location", def: "A promotion tactic where the venue address is released only to people who request it with a password." },
  { term: "Lineup", def: "The curated sequence of artists for a night — openers, peak-time acts, and closers." },
  { term: "Rider", def: "A document listing an artist's required gear, hospitality, and travel for a booking." },
  { term: "Run-of-show", def: "The minute-by-minute schedule of an event, from load-in to last call." },
  { term: "Load-in / load-out", def: "Moving gear and the sound system into and out of the venue around the event." },
  { term: "Capacity", def: "The maximum safe number of people for a space — a hard limit, not a target." },
  { term: "Door", def: "Entry point and, by extension, the cash taken at entry; where ID and head counts happen." },
  { term: "Presale", def: "Tickets sold before the event to reduce financial risk and gauge demand." },
  { term: "Break-even", def: "The revenue point at which an event's income covers its costs." },
  { term: "Ticketing platform", def: "Services like Resident Advisor or DICE used to sell tickets and manage capacity." },
  { term: "Harm reduction", def: "Practical measures (water, cooling, medical, drug-checking) that reduce risk to attendees." },
  { term: "DanceSafe", def: "A US non-profit (founded 1998) that pioneered free drug-checking and harm-reduction education at events." },
  { term: "RAVE Act (2003)", def: "US law extending 'crack house' statutes to event organizers; criticized for chilling harm-reduction efforts." },
  { term: "Duty of care", def: "The promoter's moral and practical responsibility for the safety of everyone at their event." },
];
