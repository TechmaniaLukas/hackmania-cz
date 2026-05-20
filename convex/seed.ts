/**
 * Seed mutation pro Hackmania.
 *
 * Použití (po `npx convex dev`):
 *
 *   npx convex run seed:all
 *
 * Vyprázdní všechny tabulky a naseeduje reprezentativní obsah.
 * Pro produkci NEPOUŽÍVEJ — internalMutation, dostupné jen z CLI / Convex dashboardu.
 */

import { internalMutation } from "./_generated/server";

const d = (iso: string) => new Date(iso).getTime();

// ────────────────────────────────────────────────────────────────────────────
// HACKATHONY
// ────────────────────────────────────────────────────────────────────────────
const HACKATHONS = [
  {
    slug: "hackmania-praha-2026",
    name: "Hackmania Praha 2026",
    description: "Největší studentský AI hackathon v Česku. 48 hodin kódu, kávy a překvapení.",
    longDescription:
      "Hackmania Praha je vlajková akce komunity Hackmania. Sejdou se studenti ze všech koutů republiky, rozdělí se do týmů a za 48 hodin postaví reálný AI produkt. V porotě zasednou zakladatelé startupů, inženýři z big tech firem i učitelé z MFF UK.",
    city: "Praha",
    venue: "Národní technická knihovna",
    startDate: d("2026-05-15T09:00:00"),
    endDate: d("2026-05-17T18:00:00"),
    registrationUrl: "https://hackmania.cz/registrace",
    topics: ["AI", "Vibecoding", "Web"],
    organizer: "Hackmania z.s.",
    prizePool: "250 000 Kč + mentoring",
    capacity: 200,
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "brno-robotika-jam-2026",
    name: "Brno Robotika Jam",
    description: "Weekendový hackathon zaměřený na autonomní roboty a počítačové vidění.",
    city: "Brno",
    venue: "FIT VUT",
    startDate: d("2026-06-06T10:00:00"),
    endDate: d("2026-06-07T20:00:00"),
    topics: ["Robotika", "AI kamery", "Embedded"],
    organizer: "VUT Brno",
    prizePool: "80 000 Kč",
    capacity: 80,
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "plzen-math-code-2026",
    name: "Plzeň Math & Code",
    description: "Hackathon pro matematiky a programátory. Algoritmy, simulace, modely.",
    city: "Plzeň",
    venue: "Techmania Science Center",
    startDate: d("2026-04-25T09:00:00"),
    endDate: d("2026-04-26T18:00:00"),
    topics: ["Matematika", "Simulace", "AI"],
    organizer: "Techmania + ZČU",
    prizePool: "50 000 Kč",
    capacity: 60,
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "ostrava-vibecoding-night",
    name: "Ostrava Vibecoding Night",
    description: "Jedna noc, jeden prompt, jeden produkt. Přijď zažít vibecoding naživo.",
    city: "Ostrava",
    venue: "VŠB-TUO",
    startDate: d("2026-05-30T18:00:00"),
    endDate: d("2026-05-31T08:00:00"),
    topics: ["Vibecoding", "AI nástroje"],
    organizer: "VŠB",
    prizePool: "30 000 Kč",
    isOnline: false,
    featured: false,
    status: "upcoming" as const,
  },
  {
    slug: "online-ai-cameras-challenge",
    name: "AI Cameras Challenge",
    description: "Online výzva: postav model pro reálné video v 72 hodinách.",
    city: "Online",
    startDate: d("2026-07-01T00:00:00"),
    endDate: d("2026-07-04T23:59:00"),
    topics: ["AI kamery", "Computer Vision"],
    organizer: "Hackmania",
    prizePool: "100 000 Kč",
    isOnline: true,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "hackmania-praha-2025",
    name: "Hackmania Praha 2025",
    description: "Ročník 2025 — 180 studentů, 42 týmů, 3 vítězné projekty.",
    longDescription:
      "Druhý ročník vlajkové akce Hackmania. 48 hodin v Národní technické knihovně, 42 týmů a přes 180 účastníků z 24 českých škol.",
    city: "Praha",
    venue: "Národní technická knihovna",
    startDate: d("2025-05-16T09:00:00"),
    endDate: d("2025-05-18T18:00:00"),
    topics: ["AI", "Web", "Vibecoding"],
    organizer: "Hackmania z.s.",
    prizePool: "200 000 Kč",
    isOnline: false,
    featured: false,
    status: "past" as const,
    recap: {
      summary:
        "Rekordní ročník. 180 studentů ze 24 škol, 42 týmů, 38 funkčních projektů. Nejlepší tři si rozdělili 200 000 Kč a roční mentoring.",
      stats: { attendees: 180, teams: 42, submissions: 38, prizePool: "200 000 Kč" },
      winners: [
        {
          place: 1 as const,
          teamName: "NeuroNavi",
          projectName: "AI navigátor pro nevidomé",
          members: ["Tomáš Dvořák", "Petra Horáková", "Jakub Zelený"],
          category: "Best AI Application",
          oneLiner:
            "Multimodální AI asistent, který nevidomým popisuje scénu a vede je v prostoru.",
        },
        {
          place: 2 as const,
          teamName: "Codecast",
          projectName: "Live code review pro školy",
          members: ["Klára Malá", "Lukáš Beneš"],
          oneLiner:
            "Collaborative editor s LLM code reviewem speciálně pro výuku algoritmizace.",
        },
        {
          place: 3 as const,
          teamName: "Ekodata",
          projectName: "Dashboard pro městskou správu",
          members: ["Martina Křížová", "Filip Král", "Daniela Nováková", "Jan Veverka"],
          oneLiner:
            "Otevřená data měst agregovaná do dashboardu s AI komentářem odchylek.",
        },
      ],
      gallery: [
        { src: "https://picsum.photos/seed/hm25-a/1200/800", caption: "Pátek večer" },
        { src: "https://picsum.photos/seed/hm25-b/1200/800", caption: "Mentoři v akci" },
        { src: "https://picsum.photos/seed/hm25-c/1200/800", caption: "Sobotní noc" },
        { src: "https://picsum.photos/seed/hm25-d/1200/800", caption: "Pitch" },
      ],
      updates: [
        {
          date: d("2025-05-21T09:00:00"),
          title: "Fotky z celé akce",
          body: "230 fotek od tří fotografů.",
          type: "recap" as const,
        },
        {
          date: d("2025-05-18T19:00:00"),
          title: "Vyhlášení vítězů",
          body: "1. NeuroNavi · 2. Codecast · 3. Ekodata. Speciální cena: DeepBrno.",
          type: "winners" as const,
        },
      ],
    },
  },
];

// ────────────────────────────────────────────────────────────────────────────
// AKCE
// ────────────────────────────────────────────────────────────────────────────
const EVENTS = [
  {
    slug: "workshop-vibecoding-zaklady",
    name: "Vibecoding: postav MVP za víkend",
    description:
      "Dvoudenní workshop — od promptu k nasazené aplikaci. Cursor, v0, Claude a Convex v praxi.",
    type: "workshop" as const,
    city: "Praha",
    venue: "Paralelní Polis",
    startDate: d("2026-05-03T10:00:00"),
    endDate: d("2026-05-04T18:00:00"),
    topics: ["Vibecoding", "AI nástroje", "Web"],
    organizer: "Hackmania z.s.",
    lecturer: "Lukáš Šuser",
    price: "1 490 Kč (student 790 Kč)",
    capacity: 30,
    isOnline: false,
  },
  {
    slug: "meetup-ai-kamery-brno",
    name: "AI kamery meetup #4 — Brno",
    description: "Ukázky computer vision projektů studentů VUT a Mendelu.",
    type: "meetup" as const,
    city: "Brno",
    venue: "Impact Hub Brno",
    startDate: d("2026-04-28T18:00:00"),
    endDate: d("2026-04-28T21:30:00"),
    topics: ["AI kamery", "Computer Vision"],
    organizer: "VUT FIT",
    price: "Zdarma",
    capacity: 80,
    isOnline: false,
  },
  {
    slug: "konference-hackmania-summit-2026",
    name: "Hackmania Summit 2026",
    description:
      "Jednodenní konference o budoucnosti AI, vibecodingu a startupů. 12 řečníků, 3 panely.",
    type: "conference" as const,
    city: "Praha",
    venue: "Forum Karlín",
    startDate: d("2026-10-15T09:00:00"),
    endDate: d("2026-10-15T19:00:00"),
    topics: ["AI", "Startupy", "Vibecoding"],
    organizer: "Hackmania z.s.",
    price: "1 990 Kč (student 590 Kč)",
    capacity: 600,
    isOnline: false,
  },
  {
    slug: "prednaska-matematika-ai-ostrava",
    name: "Kde končí matematika a začíná AI?",
    description: "Večerní přednáška prof. Jana Nováka o reasoning modelech.",
    type: "prednaska" as const,
    city: "Ostrava",
    venue: "Aula VŠB-TUO",
    startDate: d("2026-05-12T19:00:00"),
    endDate: d("2026-05-12T20:30:00"),
    topics: ["Matematika", "AI"],
    organizer: "VŠB-TUO",
    lecturer: "prof. Jan Novák",
    price: "Zdarma",
    capacity: 200,
    isOnline: false,
  },
];

// ────────────────────────────────────────────────────────────────────────────
// NOVINKY
// ────────────────────────────────────────────────────────────────────────────
const NEWS = [
  {
    slug: "claude-4-7-pro-vyvojare",
    title: "Claude 4.7 přináší 1M context a rychlejší agenty",
    summary:
      "Anthropic uvedl nový model Opus 4.7 s rozšířeným kontextovým oknem a vylepšeným tool-use pro agenty.",
    sourceUrl: "https://www.anthropic.com",
    sourceName: "Anthropic",
    category: "ai" as const,
    publishedAt: d("2026-04-18T09:00:00"),
    featured: true,
  },
  {
    slug: "vibecoding-roste-v-cr",
    title: "Vibecoding: jak čeští studenti staví produkty bez znalosti kódu",
    summary:
      "Fenomén vibecodingu láká na středoškolské vývojáře. Za měsíc vznikají první funkční MVP.",
    sourceUrl: "https://lupa.cz",
    sourceName: "Lupa.cz",
    category: "vibecoding" as const,
    publishedAt: d("2026-04-17T14:30:00"),
    featured: true,
  },
  {
    slug: "matematika-ai-proof",
    title: "AI model uspěl v mezinárodní matematické olympiádě",
    summary:
      "Systém postavený na reasoning modelech dosáhl stříbrné medaile v IMO 2026.",
    sourceUrl: "https://deepmind.com",
    sourceName: "DeepMind",
    category: "matematika" as const,
    publishedAt: d("2026-04-15T08:00:00"),
    featured: true,
  },
  {
    slug: "robotika-humanoidi-levnejsi",
    title: "Humanoidní roboti pod 200 000 Kč reálně dostupní",
    summary:
      "Nová generace open-source humanoidů míří do škol a univerzitních laboratoří.",
    sourceUrl: "https://techcrunch.com",
    sourceName: "TechCrunch",
    category: "robotika" as const,
    publishedAt: d("2026-04-14T16:00:00"),
    featured: false,
  },
];

// ────────────────────────────────────────────────────────────────────────────
// ŠKOLY
// ────────────────────────────────────────────────────────────────────────────
const SCHOOLS = [
  { slug: "cvut-fit", name: "ČVUT FIT", short: "Fakulta informačních technologií ČVUT", city: "Praha", region: "Hlavní město Praha", type: "university" as const, websiteUrl: "https://fit.cvut.cz", lat: 50.105, lng: 14.3903, hackathonsHosted: 6 },
  { slug: "mff-uk", name: "MFF UK", short: "Matematicko-fyzikální fakulta UK", city: "Praha", region: "Hlavní město Praha", type: "university" as const, websiteUrl: "https://mff.cuni.cz", lat: 50.0761, lng: 14.3978, hackathonsHosted: 4 },
  { slug: "vut-fit", name: "VUT FIT", short: "Fakulta informačních technologií VUT", city: "Brno", region: "Jihomoravský kraj", type: "university" as const, websiteUrl: "https://fit.vut.cz", lat: 49.2267, lng: 16.5967, hackathonsHosted: 5 },
  { slug: "mu-fi", name: "MU FI", short: "Fakulta informatiky Masarykovy univerzity", city: "Brno", region: "Jihomoravský kraj", type: "university" as const, websiteUrl: "https://fi.muni.cz", lat: 49.2101, lng: 16.5966, hackathonsHosted: 3 },
  { slug: "vsb-tuo", name: "VŠB-TUO", short: "Vysoká škola báňská — Technická univerzita Ostrava", city: "Ostrava", region: "Moravskoslezský kraj", type: "university" as const, websiteUrl: "https://vsb.cz", lat: 49.8341, lng: 18.1614, hackathonsHosted: 2 },
  { slug: "zcu-fav", name: "ZČU FAV", short: "Fakulta aplikovaných věd Západočeské univerzity", city: "Plzeň", region: "Plzeňský kraj", type: "university" as const, websiteUrl: "https://fav.zcu.cz", lat: 49.7268, lng: 13.3522, hackathonsHosted: 2 },
  { slug: "spse-jecna", name: "SPŠE Ječná", short: "Střední průmyslová škola elektrotechnická", city: "Praha", region: "Hlavní město Praha", type: "highschool" as const, websiteUrl: "https://spse-jecna.cz", lat: 50.075, lng: 14.4253, hackathonsHosted: 2 },
  { slug: "gym-prazacka", name: "Gymnázium Na Pražačce", short: "Matematické gymnázium", city: "Praha", region: "Hlavní město Praha", type: "highschool" as const, websiteUrl: "https://gymnazium-prazacka.cz", lat: 50.085, lng: 14.454, hackathonsHosted: 1 },
];

// ────────────────────────────────────────────────────────────────────────────
// PARTNEŘI
// ────────────────────────────────────────────────────────────────────────────
const PARTNERS = [
  { name: "Techmania Science Center", tier: "platinum" as const, websiteUrl: "https://techmania.cz" },
  { name: "ČVUT FIT", tier: "platinum" as const },
  { name: "VUT FIT", tier: "gold" as const },
  { name: "MFF UK", tier: "gold" as const },
  { name: "VŠB-TUO", tier: "gold" as const },
  { name: "ZČU", tier: "silver" as const },
  { name: "Seznam.cz", tier: "silver" as const },
  { name: "JetBrains", tier: "bronze" as const },
  { name: "Avast", tier: "bronze" as const },
];

// ────────────────────────────────────────────────────────────────────────────
// MUTATION
// ────────────────────────────────────────────────────────────────────────────

export const all = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Wipe existing data (idempotent seed)
    for (const table of ["hackathons", "events", "news", "schools", "partners"] as const) {
      const rows = await ctx.db.query(table).collect();
      for (const r of rows) await ctx.db.delete(r._id);
    }

    let count = 0;
    for (const h of HACKATHONS) {
      await ctx.db.insert("hackathons", h);
      count++;
    }
    for (const e of EVENTS) {
      await ctx.db.insert("events", e);
      count++;
    }
    for (const n of NEWS) {
      await ctx.db.insert("news", n);
      count++;
    }
    for (const s of SCHOOLS) {
      await ctx.db.insert("schools", s);
      count++;
    }
    for (const p of PARTNERS) {
      await ctx.db.insert("partners", p);
      count++;
    }

    return {
      inserted: count,
      tables: {
        hackathons: HACKATHONS.length,
        events: EVENTS.length,
        news: NEWS.length,
        schools: SCHOOLS.length,
        partners: PARTNERS.length,
      },
    };
  },
});
