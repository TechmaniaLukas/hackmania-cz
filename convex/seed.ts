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
// HACKATHONY — 22 reálných českých hackathonů 2025/2026 + jeden showcase past
// ročník Hackmania Praha 2025 s plnou recap demonstrací (vítězové, galerie,
// timeline). Tu si po seedu klidně smaž z dashboardu, jestli nechceš mít na
// webu Hackmania-značku jako "demo".
// ────────────────────────────────────────────────────────────────────────────
const HACKATHONS = [
  // ── 2026 NADCHÁZEJÍCÍ ─────────────────────────────────────────────
  {
    slug: "ethprague-2026",
    name: "ETHPrague Conference & Hackathon 2026",
    description:
      "Web3 a Ethereum hackathon a konference zaměřené na „Ethereum's Solarpunk Future\" a aplikace s reálným společenským dopadem.",
    city: "Praha",
    venue: "Obecní dům, Praha",
    startDate: d("2026-05-08T09:00:00"),
    endDate: d("2026-05-10T18:00:00"),
    websiteUrl: "https://ethprague.com/",
    topics: ["Ethereum", "Web3", "DeFi", "Solarpunk"],
    organizer: "ETHPrague",
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "european-defense-tech-2026",
    name: "European Defense Tech Hackathon Prague 2026",
    description:
      "Hackathon propojující technologické týmy, veřejný sektor, investory a obranné operátory.",
    city: "Praha",
    startDate: d("2026-05-15T09:00:00"),
    endDate: d("2026-05-17T18:00:00"),
    websiteUrl: "https://luma.com/edth-2026-prague",
    topics: ["Defense tech", "Dual-use", "Demo day"],
    organizer: "EDTH",
    capacity: 100,
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "expo-strv-hackathon-2026",
    name: "Expo × STRV Hackathon Prague 2026",
    description:
      "Jednodenní hackathon — týmy postavily reálnou aplikaci pro reálný byznys, nikoli fiktivní startup.",
    city: "Praha",
    venue: "STRV, Rohanské nábřeží, Praha–Karlín",
    startDate: d("2026-05-01T09:00:00"),
    endDate: d("2026-05-01T22:00:00"),
    websiteUrl: "https://luma.com/Expo_STRV_Hackathon",
    topics: ["Mobile", "React Native", "Expo", "Prototypování"],
    organizer: "Expo + STRV",
    prizePool: "Expo kredity + App.js Conf tickets + benefity",
    capacity: 60,
    isOnline: false,
    featured: false,
    status: "upcoming" as const,
  },
  {
    slug: "creathon-hackithon-2026",
    name: "CreaThon — HACKITHON 2026",
    description:
      "Studentský 24hodinový hackathon zaměřený na prototypy využitelné ve zdravotnictví, veřejné správě nebo monitoringu životního prostředí.",
    city: "Ústí nad Labem",
    venue: "CPTO UJEP",
    startDate: d("2026-05-22T09:00:00"),
    endDate: d("2026-05-23T09:00:00"),
    websiteUrl:
      "https://odas.ujep.cz/2026/05/20/creathon-hackithon-2026-24-hodin-plnych-kodu-kreativity-a-chaosu/",
    topics: ["Open source", "Machine learning", "Zdravotnictví", "Veřejná správa"],
    organizer: "UJEP",
    isOnline: false,
    featured: false,
    status: "upcoming" as const,
  },
  {
    slug: "hackni-politiku-2026",
    name: "#HackniPolitiku",
    description:
      "Hackathon pro návrh nástrojů, které pomohou zdravějšímu informačnímu prostoru, demokratickým politikům a lepší orientaci voličů.",
    city: "Praha",
    startDate: d("2026-05-29T09:00:00"),
    endDate: d("2026-05-30T22:00:00"),
    websiteUrl: "https://luma.com/hackathonHP052026",
    topics: ["Civic tech", "Demokracie", "Bezpečnost", "Komunikace"],
    organizer: "Iniciativa občanské společnosti",
    isOnline: false,
    featured: false,
    status: "upcoming" as const,
  },
  {
    slug: "prague-builder-day-2026",
    name: "Prague Builder Day Hackathon",
    description:
      "Jednodenní builderský hackathon od Duvo AI a Anthropic. Účastníci staví automatizace reálných pracovních procesů.",
    city: "Praha",
    venue: "Scott.Weber Workspace, Praga Office & Garden, Praha–Karlín",
    startDate: d("2026-06-02T09:00:00"),
    endDate: d("2026-06-02T22:00:00"),
    websiteUrl: "https://luma.com/cp12p78n",
    topics: ["AI agenti", "Automatizace", "Anthropic", "Claude"],
    organizer: "Duvo AI + Anthropic",
    capacity: 80,
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "urbis-hackateen-2026",
    name: "URBIS Challenge HackaTEEN 2026",
    description:
      "24hodinová soutěž pro žáky a studenty zaměřená na návrhy pro lepší města. Vítězný tým získává cestu a prezentaci v Barceloně.",
    city: "Brno",
    venue: "Kongresák.space, BVV, Brno",
    startDate: d("2026-06-02T09:00:00"),
    endDate: d("2026-06-03T09:00:00"),
    websiteUrl: "https://www.gotobrno.cz/akce/urbis-challenge-hackateen-2026/",
    topics: ["Smart city", "Studentské", "Urbanismus"],
    organizer: "Go To Brno",
    prizePool: "Cesta do Barcelony + finanční odměny",
    capacity: 100,
    isOnline: false,
    featured: false,
    status: "upcoming" as const,
  },
  {
    slug: "greenhack-2026",
    name: "GreenHack 2026",
    description:
      "Víkendový hackathon zaměřený na praktické AI řešení pro udržitelnost. Tématem jsou odpovědní AI agenti, energetika, blackout a renovace budov.",
    city: "Praha",
    venue: "42 Prague, Praha 9",
    startDate: d("2026-06-05T09:00:00"),
    endDate: d("2026-06-06T22:00:00"),
    websiteUrl: "https://www.greenhack.eu/",
    topics: ["AI", "Udržitelnost", "Energetika", "Blackout"],
    organizer: "GreenHack",
    prizePool: "2 000 € + 1 000 € + 500 € + speciální cena ČEPS",
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "ai-programming-hackathon-cheb-2026",
    name: "AI & Programming Hackathon 2026",
    description:
      "Regionální 48hodinový hackathon pro středoškoláky, připravovaný KIC Karlovarského kraje, Praut a ISŠ Cheb.",
    city: "Cheb",
    startDate: d("2026-06-19T09:00:00"),
    endDate: d("2026-06-21T18:00:00"),
    websiteUrl: "https://kickk.cz/ai-programming-hackathon-2026/",
    topics: ["AI", "Programování", "Středoškoláci"],
    organizer: "KIC Karlovarského kraje + Praut + ISŠ Cheb",
    isOnline: false,
    featured: false,
    status: "upcoming" as const,
  },
  {
    slug: "rakathon-2026",
    name: "Rakathon 2026",
    description:
      "Celostátní AI hackathon proti rakovině pro studenty IT, medicíny, biomedicíny, data science a příbuzných oborů. Praha · Brno · Ostrava paralelně.",
    city: "Praha, Brno, Ostrava",
    startDate: d("2026-10-16T09:00:00"),
    endDate: d("2026-10-18T18:00:00"),
    websiteUrl: "https://www.rakathon.cz/",
    topics: ["AI", "Medicína", "Onkologie", "Data science"],
    organizer: "Národní hackathon proti rakovině",
    prizePool: "100 000 Kč + 50 000 Kč + 25 000 Kč",
    capacity: 150,
    isOnline: false,
    featured: true,
    status: "upcoming" as const,
  },
  {
    slug: "upick-hackathon-2026",
    name: "U!Pick Hackathon",
    description:
      "Mezinárodní studentský hackathon v angličtině. Úkolem je navrhnout aplikaci, která studentům pomůže vybrat zahraniční studijní pobyt.",
    city: "Ostrava",
    venue: "VŠB-TUO",
    startDate: d("2026-11-05T09:00:00"),
    endDate: d("2026-11-07T18:00:00"),
    websiteUrl: "https://info.vsb.cz/cs/51697",
    topics: ["Web", "UX", "Studentská mobilita", "Aplikace"],
    organizer: "VŠB-TUO",
    prizePool: "Ubytování a strava hrazeny",
    isOnline: false,
    featured: false,
    status: "upcoming" as const,
  },

  // ── 2026 UPLYNULÉ ─────────────────────────────────────────────────
  {
    slug: "senior-resilience-hackathon-2026",
    name: "Senior Resilience Hackathon",
    description:
      "Jednodenní studentský hackathon zaměřený na praktická řešení pro seniory a mezigenerační programy.",
    city: "Praha",
    venue: "PEF ČZU, Praha",
    startDate: d("2026-04-09T09:00:00"),
    endDate: d("2026-04-09T20:00:00"),
    websiteUrl:
      "https://www.pef.czu.cz/cs/r-7006-o-fakulte/r-7179-aktuality/senior-resilience-hackathon.html",
    topics: ["Senioři", "Aktivní stárnutí", "Sociální inkluze"],
    organizer: "PEF ČZU",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "eudis-defence-spring-2026",
    name: "EUDIS Defence Hackathon — Spring 2026",
    description:
      "Evropský obranný hackathon pořádaný paralelně ve více zemích; českou část hostila Univerzita obrany a JIC.",
    city: "Brno",
    venue: "Univerzita obrany / JIC",
    startDate: d("2026-03-26T09:00:00"),
    endDate: d("2026-03-28T18:00:00"),
    websiteUrl: "https://www.mo.gov.cz/scripts/modules/diary/action.php?id=8256",
    topics: ["Obrana", "Bezpečnost", "Airspace defence"],
    organizer: "Univerzita obrany + JIC",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "stavebni-hackathon-2026",
    name: "Stavební hackathon 2026",
    description:
      "Studentský stavební hackathon zaměřený na inovace v dostupném bydlení a digitalizaci stavebnictví. Šestičlenné týmy ze sedmi stavebních fakult.",
    city: "Brno",
    venue: "Festival architektury / Stavební veletrh Brno",
    startDate: d("2026-03-25T09:00:00"),
    endDate: d("2026-03-27T18:00:00"),
    websiteUrl: "https://www.obecon.cz/novinky/hackaton-2026/",
    topics: ["Stavebnictví", "Dostupné bydlení", "Construction 4.0"],
    organizer: "Festival architektury",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "game-jam-ostrava-2026",
    name: "Game Jam Ostrava + AI Hackathon",
    description:
      "Herní jam doplněný o AI hackathon, kde účastníci pracovali s reálnými herními daty z platformy Rankacy.",
    city: "Ostrava",
    venue: "Impact Hub Ostrava",
    startDate: d("2026-03-27T09:00:00"),
    endDate: d("2026-03-29T18:00:00"),
    websiteUrl: "https://impacthub.cz/kalendar/game-jam-ostrava-a-ai-hackathon/",
    topics: ["Hry", "AI", "Herní data"],
    organizer: "Impact Hub Ostrava",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "aimtec-hackathon-2026",
    name: "#AimtecHackathon 2026",
    description:
      "40hodinový hackathon, kde týmy vytvářely technická řešení usnadňující život lidem s postižením.",
    city: "Plzeň",
    venue: "Moving Station, Plzeň",
    startDate: d("2026-03-20T09:00:00"),
    endDate: d("2026-03-22T01:00:00"),
    websiteUrl: "https://www.movingstation.eu/program/it/aimtechackathon-2026/",
    topics: ["Accessibility", "Aplikace", "Prototypy"],
    organizer: "Aimtec",
    capacity: 70,
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "ai-hackathon-renomia-2026",
    name: "AI Hackathon RENOMIA",
    description:
      "24hodinový in-person hackathon s praktickými výzvami od pojišťovacího brokera RENOMIA.",
    city: "Praha",
    venue: "RENOMIA HQ, Florentinum, Praha",
    startDate: d("2026-03-14T09:00:00"),
    endDate: d("2026-03-15T09:00:00"),
    websiteUrl: "https://luma.com/nbiw26ay",
    topics: ["AI", "Pojišťovnictví", "Data"],
    organizer: "RENOMIA",
    prizePool: "40 000 + 15 000 + 5 000 Kč (celkem 60 000 Kč)",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "kreativeu-hackathon-2026",
    name: "KreativEU Hackathon 2026",
    description:
      "Mezinárodní hackathon „Smart Archives: Unlocking knowledge with AI\" zaměřený na zpřístupnění kulturních a archivních dat pomocí AI.",
    city: "Vodňany",
    venue: "MEVPIS",
    startDate: d("2026-03-09T09:00:00"),
    endDate: d("2026-03-13T18:00:00"),
    websiteUrl:
      "https://www.jcu.cz/cz/univerzita/kreativeucz/aktualne/kreativeu-hackathon-2026-kdyz-se-ai-potkava-s-kulturnim-dedictvim",
    topics: ["AI", "Kulturní dědictví", "Archivy", "Muzejní sbírky"],
    organizer: "Jihočeská univerzita",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "engeto-kbc-hackathon-2026",
    name: "ENGETO & KBC Hackathon 2026",
    description:
      "Jednodenní hackathon pro vývoj AI řešení; účast zdarma, možnost hlásit se jako jednotlivec i tým.",
    city: "Brno",
    startDate: d("2026-03-07T09:00:00"),
    endDate: d("2026-03-07T22:00:00"),
    websiteUrl: "https://engeto.cz/hackathon-kbc-2026/",
    topics: ["AI", "Finance", "Lifestyle"],
    organizer: "ENGETO + KBC",
    prizePool: "5 000 / 3 000 / 1 000 Kč na člena (10 týmů × 5)",
    capacity: 50,
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "hackuj-stat-71-2026",
    name: "Hackuj stát 7.1 — Hackathon veřejné správy",
    description:
      "Národní finále studentských regionálních hackathonů nad otevřenými daty a problémy veřejné správy.",
    city: "Praha",
    venue: "NKÚ, Praha 7",
    startDate: d("2026-03-06T09:00:00"),
    endDate: d("2026-03-07T22:00:00"),
    websiteUrl: "https://www.hackujstat.cz/",
    topics: ["Open data", "Veřejná správa", "Vizualizace"],
    organizer: "Hackuj stát + NKÚ",
    capacity: 120,
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "mobility-hackathon-2026",
    name: "Mobility Hackathon 2026",
    description:
      "Studentský hackathon s tématem digitálního kolapsu města a hledání způsobů, jak udržet město v pohybu.",
    city: "Plzeň",
    venue: "TechTower, Plzeň",
    startDate: d("2026-02-13T09:00:00"),
    endDate: d("2026-02-13T22:00:00"),
    websiteUrl: "https://czechstartups.gov.cz/events/event/mobility-hackathon-2026/",
    topics: ["Mobilita", "Krizové řízení", "Kyberbezpečnost"],
    organizer: "TechTower Plzeň",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },
  {
    slug: "hackathon-olomouckeho-kraje-2025",
    name: "Hackathon Olomouckého kraje 2025",
    description:
      "Třídenní hackathon „Když data promluví\" zaměřený na využití dat pro zlepšení života v Olomouckém kraji.",
    city: "Olomouc",
    venue: "Envelopa Hub",
    startDate: d("2025-11-14T09:00:00"),
    endDate: d("2025-11-16T18:00:00"),
    websiteUrl: "https://hackathon.upol.cz/",
    topics: ["Open data", "Doprava", "Klima", "Smart city"],
    organizer: "Univerzita Palackého",
    prizePool: "100 000 Kč + EnCLOD speciální cena 1 000 €",
    isOnline: false,
    featured: false,
    status: "past" as const,
  },

  // ── HACKMANIA DEMO PAST — recap showcase (vítězové, galerie, timeline) ───
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
