export type HackathonWinner = {
  place: 1 | 2 | 3 | "special";
  teamName: string;
  projectName: string;
  projectUrl?: string;
  repoUrl?: string;
  members?: string[];
  category?: string;
  oneLiner?: string;
};

export type GalleryPhoto = {
  src: string;
  caption?: string;
  credit?: string;
};

export type HackathonUpdate = {
  date: number;
  title: string;
  body: string;
  type: "live" | "winners" | "recap" | "press";
};

export type HackathonRecap = {
  summary: string;
  stats: {
    attendees: number;
    teams: number;
    submissions: number;
    prizePool?: string;
  };
  winners: HackathonWinner[];
  gallery: GalleryPhoto[];
  updates: HackathonUpdate[];
  recapUrl?: string;
  videoUrl?: string;
};

export type Hackathon = {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  city: string;
  venue?: string;
  startDate: number;
  endDate: number;
  registrationUrl?: string;
  websiteUrl?: string;
  imageUrl?: string;
  topics: string[];
  organizer: string;
  prizePool?: string;
  capacity?: number;
  isOnline: boolean;
  featured: boolean;
  status: "upcoming" | "ongoing" | "past";
  recap?: HackathonRecap;
};

export type EventItem = {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  type: "workshop" | "meetup" | "conference" | "prednaska";
  city: string;
  venue?: string;
  startDate: number;
  endDate?: number;
  registrationUrl?: string;
  imageUrl?: string;
  topics: string[];
  organizer: string;
  price?: string;
  capacity?: number;
  isOnline: boolean;
  lecturer?: string;
};

export type NewsItem = {
  slug: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  imageUrl?: string;
  category:
    | "ai"
    | "vibecoding"
    | "ai-kamery"
    | "ai-nastroje"
    | "matematika"
    | "technika"
    | "robotika"
    | "ostatni";
  publishedAt: number;
  featured: boolean;
};

export type School = {
  slug: string;
  name: string;
  short: string;
  city: string;
  region: string;
  type: "university" | "highschool" | "other";
  websiteUrl?: string;
  lat: number;
  lng: number;
  hackathonsHosted?: number;
};

export type Partner = {
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
};

const d = (iso: string) => new Date(iso).getTime();

export const hackathons: Hackathon[] = [
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
    status: "upcoming",
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
    status: "upcoming",
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
    status: "upcoming",
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
    status: "upcoming",
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
    status: "upcoming",
  },
  {
    slug: "hackmania-praha-2025",
    name: "Hackmania Praha 2025",
    description: "Ročník 2025 — 180 studentů, 42 týmů, 3 vítězné projekty.",
    longDescription:
      "Druhý ročník vlajkové akce Hackmania. 48 hodin v Národní technické knihovně, 42 týmů a přes 180 účastníků z 24 českých škol. Porota v čele s Karlem Kohoutem (Apify) vybírala z 38 odevzdaných projektů.",
    city: "Praha",
    venue: "Národní technická knihovna",
    startDate: d("2025-05-16T09:00:00"),
    endDate: d("2025-05-18T18:00:00"),
    topics: ["AI", "Web", "Vibecoding"],
    organizer: "Hackmania z.s.",
    prizePool: "200 000 Kč",
    isOnline: false,
    featured: false,
    status: "past",
    recap: {
      summary:
        "Rekordní ročník. Do Národní technické knihovny dorazilo 180 studentů z 24 škol, vytvořilo 42 týmů a odevzdalo 38 funkčních projektů. Nejlepší tři si rozdělili 200 000 Kč a roční mentoring u partnerů. Z publika vzešly i tři nezávislé projekty, které dnes mají první zákazníky.",
      stats: { attendees: 180, teams: 42, submissions: 38, prizePool: "200 000 Kč" },
      winners: [
        {
          place: 1,
          teamName: "NeuroNavi",
          projectName: "AI navigátor pro nevidomé",
          projectUrl: "https://devpost.example/neuronavi",
          repoUrl: "https://github.com/example/neuronavi",
          members: ["Tomáš Dvořák", "Petra Horáková", "Jakub Zelený"],
          category: "Best AI Application",
          oneLiner:
            "Multimodální AI asistent, který nevidomým popisuje scénu a vede je v prostoru pomocí sluchátek s kostním vedením.",
        },
        {
          place: 2,
          teamName: "Codecast",
          projectName: "Live code review pro školy",
          members: ["Klára Malá", "Lukáš Beneš"],
          oneLiner:
            "Collaborative editor s LLM code reviewem navrženým speciálně pro výuku algoritmizace.",
        },
        {
          place: 3,
          teamName: "Ekodata",
          projectName: "Dashboard pro městskou správu",
          members: ["Martina Křížová", "Filip Král", "Daniela Nováková", "Jan Veverka"],
          oneLiner:
            "Otevřená data měst agregovaná do jednoho dashboardu s AI komentářem odchylek.",
        },
        {
          place: "special",
          teamName: "DeepBrno",
          projectName: "Student Favourite",
          members: ["Tým FI MU"],
          oneLiner: "Cena studentů — nejlepší demo páteční noci (AI generátor playlistu).",
          category: "Audience Choice",
        },
      ],
      gallery: [
        { src: "https://picsum.photos/seed/hm25-a/1200/800", caption: "Pátek večer — první týmy nastupují" },
        { src: "https://picsum.photos/seed/hm25-b/1200/800", caption: "Mentoři v akci" },
        { src: "https://picsum.photos/seed/hm25-c/1200/800", caption: "Sobotní noční coding" },
        { src: "https://picsum.photos/seed/hm25-d/1200/800", caption: "Finálové prezentace na hlavní scéně" },
        { src: "https://picsum.photos/seed/hm25-e/1200/800", caption: "Porota rozhoduje" },
        { src: "https://picsum.photos/seed/hm25-f/1200/800", caption: "Vyhlášení vítězů" },
      ],
      updates: [
        {
          date: d("2025-06-02T10:00:00"),
          title: "Videozáznam z finále je venku",
          body: "Sestřih finálových pitchů (14 min) i kompletní záznam (3 h) najdete na našem YouTube kanálu.",
          type: "recap",
        },
        {
          date: d("2025-05-21T09:00:00"),
          title: "Fotky z celé akce",
          body: "230 fotek od tří fotografů. Každý tým najde své.",
          type: "recap",
        },
        {
          date: d("2025-05-18T19:00:00"),
          title: "Vyhlášení vítězů",
          body: "První místo si odnesl tým NeuroNavi s AI navigátorem pro nevidomé. Druhé místo Codecast, třetí Ekodata. Speciální cena publika putuje k týmu DeepBrno.",
          type: "winners",
        },
        {
          date: d("2025-05-18T10:00:00"),
          title: "Poslední hodiny — dovolíme si vás rušit?",
          body: "Mentoři dneska chodí po sále s kávou místo otázek. Finální pitch v 15:00.",
          type: "live",
        },
        {
          date: d("2025-05-16T09:00:00"),
          title: "Kickoff — úvodní keynote Karla Kohouta",
          body: "42 týmů je v sále, úvod jede, první pizza dorazila. Let's go!",
          type: "live",
        },
      ],
      videoUrl: "https://www.youtube.com/watch?v=example",
    },
  },
  {
    slug: "hackmania-praha-2024",
    name: "Hackmania Praha 2024",
    description: "První ročník — 120 účastníků, 28 týmů, start nové komunity.",
    longDescription:
      "Vůbec první Hackmania v Praze. 28 týmů, 120 účastníků, 30 projektů. Partneři: Seznam.cz, ČVUT FIT, Techmania Science Center.",
    city: "Praha",
    venue: "Národní technická knihovna",
    startDate: d("2024-05-17T09:00:00"),
    endDate: d("2024-05-19T18:00:00"),
    topics: ["AI", "Web"],
    organizer: "Hackmania z.s.",
    prizePool: "100 000 Kč",
    isOnline: false,
    featured: false,
    status: "past",
    recap: {
      summary:
        "Premiérový ročník, který položil základy celé komunity. Díky partnerům jsme rozdali 100 000 Kč a rozjeli první mentoring program, ze kterého pět účastníků dnes vede vlastní AI startup.",
      stats: { attendees: 120, teams: 28, submissions: 30, prizePool: "100 000 Kč" },
      winners: [
        {
          place: 1,
          teamName: "PixelCraft",
          projectName: "AI asistent pro restaurátory",
          members: ["Tým FIT ČVUT"],
          oneLiner: "Rozpoznávání poškození uměleckých děl a návrh restaurátorského postupu.",
        },
        {
          place: 2,
          teamName: "AgroSense",
          projectName: "Drony pro precizní zemědělství",
          members: ["Tým MFF UK"],
          oneLiner: "Computer vision detekce chorob rostlin z dronových snímků.",
        },
        {
          place: 3,
          teamName: "Mendacium",
          projectName: "Detektor fake news v češtině",
          members: ["Tým VŠE"],
          oneLiner: "LLM pipeline pro ověřování tvrzení v českých článcích.",
        },
      ],
      gallery: [
        { src: "https://picsum.photos/seed/hm24-a/1200/800", caption: "První kickoff" },
        { src: "https://picsum.photos/seed/hm24-b/1200/800", caption: "Týmová setkání" },
        { src: "https://picsum.photos/seed/hm24-c/1200/800", caption: "Vyhlášení" },
      ],
      updates: [
        {
          date: d("2024-05-25T09:00:00"),
          title: "Press: Lupa.cz o prvním ročníku",
          body: "Reportáž z Hackmania 2024 vyšla v Lupa.cz.",
          type: "press",
        },
        {
          date: d("2024-05-19T19:00:00"),
          title: "První vítězové Hackmania",
          body: "Tým PixelCraft si odnesl první místo. Gratulujeme!",
          type: "winners",
        },
      ],
    },
  },
];

export const events: EventItem[] = [
  {
    slug: "workshop-vibecoding-zaklady",
    name: "Vibecoding: postav MVP za víkend",
    description:
      "Dvoudenní workshop — od promptu k nasazené aplikaci. Cursor, v0, Claude a Convex v praxi.",
    longDescription:
      "Žádná zkušenost s kódem potřeba. Naučíš se, jak efektivně zadávat úkoly AI, jak posloupnost promptů skládá reálnou aplikaci a jak ji nasadit na Vercel. Na konci odcházíš s vlastním produktem na vlastní doméně.",
    type: "workshop",
    city: "Praha",
    venue: "Paralelní Polis",
    startDate: d("2026-05-03T10:00:00"),
    endDate: d("2026-05-04T18:00:00"),
    registrationUrl: "https://hackmania.cz/akce/vibecoding",
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
    description:
      "Ukázky computer vision projektů studentů VUT a Mendelu. Prezentace + pizza + networking.",
    type: "meetup",
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
      "Jednodenní konference o budoucnosti AI, vibecodingu a startupů. 12 řečníků, 3 panely, 600 účastníků.",
    longDescription:
      "Přijeďte si poslechnout zakladatele českých AI startupů, inženýry z Anthropic a DeepMind a studenty, kteří svůj první projekt postavili na hackathonu. Mezi řečníky Karel Kohout (Apify), Jana Hudcová (Scale AI), Martin Sýkora (Braiins).",
    type: "conference",
    city: "Praha",
    venue: "Forum Karlín",
    startDate: d("2026-10-15T09:00:00"),
    endDate: d("2026-10-15T19:00:00"),
    registrationUrl: "https://hackmania.cz/summit",
    topics: ["AI", "Startupy", "Vibecoding"],
    organizer: "Hackmania z.s.",
    price: "1 990 Kč (student 590 Kč)",
    capacity: 600,
    isOnline: false,
  },
  {
    slug: "prednaska-matematika-ai-ostrava",
    name: "Kde končí matematika a začíná AI?",
    description:
      "Večerní přednáška prof. Jana Nováka o reasoning modelech a matematických důkazech.",
    type: "prednaska",
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
  {
    slug: "workshop-robotika-pro-stredoskolaky",
    name: "Robotika pro středoškoláky",
    description:
      "Celodenní workshop — postav a naprogramuj autonomní robot s Arduino a AI kamerou.",
    type: "workshop",
    city: "Plzeň",
    venue: "Techmania Science Center",
    startDate: d("2026-06-14T09:00:00"),
    endDate: d("2026-06-14T17:00:00"),
    topics: ["Robotika", "Embedded", "AI kamery"],
    organizer: "Techmania",
    lecturer: "Ing. Tomáš Dvořák",
    price: "390 Kč",
    capacity: 24,
    isOnline: false,
  },
  {
    slug: "online-meetup-claude-agents",
    name: "Claude Agents: od prompt na produkci",
    description:
      "Online meetup o nasazení LLM agentů do reálných aplikací. Code walkthrough + Q&A.",
    type: "meetup",
    city: "Online",
    startDate: d("2026-05-07T19:00:00"),
    endDate: d("2026-05-07T21:00:00"),
    registrationUrl: "https://hackmania.cz/akce/claude-agents",
    topics: ["AI", "AI nástroje"],
    organizer: "Hackmania + Applifting",
    lecturer: "Daniel Vávra",
    price: "Zdarma",
    capacity: 300,
    isOnline: true,
  },
  {
    slug: "workshop-data-viz-hradec",
    name: "Data viz hackjam — Hradec Králové",
    description:
      "Půldenní jam — vizualizuj data z libovolného veřejného API. D3, Observable, nebo AI nástroje.",
    type: "workshop",
    city: "Hradec Králové",
    venue: "UHK FIM",
    startDate: d("2026-05-24T13:00:00"),
    endDate: d("2026-05-24T19:00:00"),
    topics: ["Web", "AI nástroje"],
    organizer: "UHK",
    price: "Zdarma pro studenty",
    capacity: 40,
    isOnline: false,
  },
];

// Proběhlé akce (archiv)
events.push(
  {
    slug: "meetup-ai-praha-breznove",
    name: "AI meetup #12 — Praha",
    description:
      "Březnové setkání. 120 účastníků, 6 blesk-přednášek, sponzor Seznam.cz.",
    type: "meetup",
    city: "Praha",
    venue: "Node5",
    startDate: d("2026-03-18T18:30:00"),
    endDate: d("2026-03-18T22:00:00"),
    topics: ["AI", "AI nástroje"],
    organizer: "Hackmania + AI Czech",
    price: "Zdarma",
    capacity: 120,
    isOnline: false,
  },
  {
    slug: "workshop-robotika-unor-brno",
    name: "Robotika workshop — Brno (únor 2026)",
    description:
      "Celodenní workshop pro středoškoláky. Arduino, senzory, první autonomní robot.",
    type: "workshop",
    city: "Brno",
    venue: "FIT VUT",
    startDate: d("2026-02-22T09:00:00"),
    endDate: d("2026-02-22T17:00:00"),
    topics: ["Robotika", "Embedded"],
    organizer: "VUT FIT",
    lecturer: "Mgr. Alena Krejčová",
    price: "290 Kč",
    capacity: 28,
    isOnline: false,
  },
);

export const eventTypeLabels: Record<EventItem["type"], string> = {
  workshop: "Workshop",
  meetup: "Meetup",
  conference: "Konference",
  prednaska: "Přednáška",
};

export const news: NewsItem[] = [
  {
    slug: "claude-4-7-pro-vyvojare",
    title: "Claude 4.7 přináší 1M context a rychlejší agenty",
    summary:
      "Anthropic uvedl nový model Opus 4.7 s rozšířeným kontextovým oknem a vylepšeným tool-use pro agenty.",
    sourceUrl: "https://www.anthropic.com",
    sourceName: "Anthropic",
    category: "ai",
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
    category: "vibecoding",
    publishedAt: d("2026-04-17T14:30:00"),
    featured: true,
  },
  {
    slug: "ai-kamery-nove-modely",
    title: "Nové AI kamery rozeznají kontext scény",
    summary:
      "Otevřené modely pro computer vision překonávají loňské benchmarky o 18 %.",
    sourceUrl: "https://huggingface.co",
    sourceName: "HuggingFace",
    category: "ai-kamery",
    publishedAt: d("2026-04-16T11:00:00"),
    featured: false,
  },
  {
    slug: "matematika-ai-proof",
    title: "AI model uspěl v mezinárodní matematické olympiádě",
    summary:
      "Systém postavený na reasoning modelech dosáhl stříbrné medaile v IMO 2026.",
    sourceUrl: "https://deepmind.com",
    sourceName: "DeepMind",
    category: "matematika",
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
    category: "robotika",
    publishedAt: d("2026-04-14T16:00:00"),
    featured: false,
  },
  {
    slug: "ai-nastroje-best-of-2026",
    title: "Top AI nástroje pro vývojáře 2026",
    summary:
      "Přehled devíti nástrojů, které letos změnily workflow českých startupů.",
    sourceUrl: "https://zdrojak.cz",
    sourceName: "Zdroják",
    category: "ai-nastroje",
    publishedAt: d("2026-04-13T10:00:00"),
    featured: false,
  },
];

export const schools: School[] = [
  // Vysoké školy
  { slug: "cvut-fit", name: "ČVUT FIT", short: "Fakulta informačních technologií ČVUT", city: "Praha", region: "Hlavní město Praha", type: "university", websiteUrl: "https://fit.cvut.cz", lat: 50.1050, lng: 14.3903, hackathonsHosted: 6 },
  { slug: "cvut-fel", name: "ČVUT FEL", short: "Fakulta elektrotechnická ČVUT", city: "Praha", region: "Hlavní město Praha", type: "university", websiteUrl: "https://fel.cvut.cz", lat: 50.1035, lng: 14.3912, hackathonsHosted: 3 },
  { slug: "mff-uk", name: "MFF UK", short: "Matematicko-fyzikální fakulta UK", city: "Praha", region: "Hlavní město Praha", type: "university", websiteUrl: "https://mff.cuni.cz", lat: 50.0761, lng: 14.3978, hackathonsHosted: 4 },
  { slug: "vse", name: "VŠE", short: "Vysoká škola ekonomická", city: "Praha", region: "Hlavní město Praha", type: "university", websiteUrl: "https://vse.cz", lat: 50.0840, lng: 14.4413, hackathonsHosted: 2 },
  { slug: "vut-fit", name: "VUT FIT", short: "Fakulta informačních technologií VUT", city: "Brno", region: "Jihomoravský kraj", type: "university", websiteUrl: "https://fit.vut.cz", lat: 49.2267, lng: 16.5967, hackathonsHosted: 5 },
  { slug: "mu-fi", name: "MU FI", short: "Fakulta informatiky Masarykovy univerzity", city: "Brno", region: "Jihomoravský kraj", type: "university", websiteUrl: "https://fi.muni.cz", lat: 49.2101, lng: 16.5966, hackathonsHosted: 3 },
  { slug: "vsb-tuo", name: "VŠB-TUO", short: "Vysoká škola báňská — Technická univerzita Ostrava", city: "Ostrava", region: "Moravskoslezský kraj", type: "university", websiteUrl: "https://vsb.cz", lat: 49.8341, lng: 18.1614, hackathonsHosted: 2 },
  { slug: "zcu", name: "ZČU FAV", short: "Fakulta aplikovaných věd Západočeské univerzity", city: "Plzeň", region: "Plzeňský kraj", type: "university", websiteUrl: "https://fav.zcu.cz", lat: 49.7268, lng: 13.3522, hackathonsHosted: 2 },
  { slug: "uhk-fim", name: "UHK FIM", short: "Fakulta informatiky a managementu UHK", city: "Hradec Králové", region: "Královéhradecký kraj", type: "university", websiteUrl: "https://uhk.cz/fim", lat: 50.2000, lng: 15.8319, hackathonsHosted: 1 },
  { slug: "tul", name: "TUL FM", short: "Fakulta mechatroniky, informatiky a mezioborových studií TUL", city: "Liberec", region: "Liberecký kraj", type: "university", websiteUrl: "https://fm.tul.cz", lat: 50.7724, lng: 15.0737, hackathonsHosted: 1 },
  { slug: "upol", name: "UPOL PřF", short: "Přírodovědecká fakulta Univerzity Palackého", city: "Olomouc", region: "Olomoucký kraj", type: "university", websiteUrl: "https://prf.upol.cz", lat: 49.5708, lng: 17.2802, hackathonsHosted: 1 },
  { slug: "upce", name: "UPCE FEI", short: "Fakulta elektrotechniky a informatiky UPCE", city: "Pardubice", region: "Pardubický kraj", type: "university", websiteUrl: "https://fei.upce.cz", lat: 50.0343, lng: 15.7788, hackathonsHosted: 1 },
  { slug: "jcu", name: "JČU PřF", short: "Přírodovědecká fakulta Jihočeské univerzity", city: "České Budějovice", region: "Jihočeský kraj", type: "university", websiteUrl: "https://prf.jcu.cz", lat: 48.9770, lng: 14.4472, hackathonsHosted: 0 },
  { slug: "mendelu", name: "MENDELU", short: "Mendelova univerzita v Brně", city: "Brno", region: "Jihomoravský kraj", type: "university", websiteUrl: "https://mendelu.cz", lat: 49.2104, lng: 16.6146, hackathonsHosted: 1 },
  { slug: "utb", name: "UTB FAI", short: "Fakulta aplikované informatiky UTB", city: "Zlín", region: "Zlínský kraj", type: "university", websiteUrl: "https://fai.utb.cz", lat: 49.2236, lng: 17.6700, hackathonsHosted: 0 },

  // Střední školy
  { slug: "smichov-spse", name: "SPŠE Ječná", short: "Střední průmyslová škola elektrotechnická", city: "Praha", region: "Hlavní město Praha", type: "highschool", websiteUrl: "https://spse-jecna.cz", lat: 50.0750, lng: 14.4253, hackathonsHosted: 2 },
  { slug: "gym-prazacka", name: "Gymnázium Na Pražačce", short: "Matematické gymnázium", city: "Praha", region: "Hlavní město Praha", type: "highschool", websiteUrl: "https://gymnazium-prazacka.cz", lat: 50.0850, lng: 14.4540, hackathonsHosted: 1 },
  { slug: "spse-brno", name: "SPŠE Brno", short: "Střední průmyslová škola elektrotechnická", city: "Brno", region: "Jihomoravský kraj", type: "highschool", websiteUrl: "https://spse.cz", lat: 49.2085, lng: 16.6068, hackathonsHosted: 1 },
  { slug: "spse-plzen", name: "SPŠE Plzeň", short: "Střední průmyslová škola elektrotechnická", city: "Plzeň", region: "Plzeňský kraj", type: "highschool", lat: 49.7380, lng: 13.3770, hackathonsHosted: 1 },
  { slug: "gym-unicov", name: "Gymnázium Uničov", short: "Všeobecné gymnázium", city: "Uničov", region: "Olomoucký kraj", type: "highschool", lat: 49.7716, lng: 17.1222, hackathonsHosted: 0 },
];

export const partners: Partner[] = [
  { name: "Techmania Science Center", tier: "platinum", websiteUrl: "https://techmania.cz" },
  { name: "ČVUT FIT", tier: "platinum" },
  { name: "VUT FIT", tier: "gold" },
  { name: "MFF UK", tier: "gold" },
  { name: "VŠB-TUO", tier: "gold" },
  { name: "ZČU", tier: "silver" },
  { name: "Seznam.cz", tier: "silver" },
  { name: "Škoda Auto", tier: "silver" },
  { name: "JetBrains", tier: "bronze" },
  { name: "Avast", tier: "bronze" },
];

export const categoryLabels: Record<NewsItem["category"], string> = {
  ai: "AI",
  vibecoding: "Vibecoding",
  "ai-kamery": "AI kamery",
  "ai-nastroje": "AI nástroje",
  matematika: "Matematika",
  technika: "Technika",
  robotika: "Robotika",
  ostatni: "Ostatní",
};
