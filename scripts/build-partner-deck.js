/* eslint-disable */
// Generates Hackmania partner deck (.pptx) in /public.
// Run: node scripts/build-partner-deck.js

const path = require("path");
const PptxGenJS = require("pptxgenjs");

const OUT = path.join(__dirname, "..", "public", "hackmania-partner-deck.pptx");

// Brand palette
const C = {
  ink: "05060A",
  ink2: "0B0D14",
  ink3: "12151F",
  line: "1E2230",
  fg: "E7E9F0",
  muted: "8B93A8",
  brand: "B4FF39",
  brand2: "39F0FF",
  magenta: "FF3D9A",
};

const FONT_HEADER = "Calibri"; // pptx fallback-friendly; header weight handled via bold
const FONT_BODY = "Calibri";

const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE"; // 13.333 × 7.5 inches
pres.author = "Hackmania z.s.";
pres.title = "Hackmania × vaše firma — Partner Deck 2026";

const W = 13.333;
const H = 7.5;

// ---- helpers ----
function bg(slide, color = C.ink) {
  slide.background = { color };
}
function gridDot(slide) {
  // subtle accent dot grid corners
  for (let i = 0; i < 4; i++) {
    slide.addShape(pres.shapes.OVAL, {
      x: 0.4 + i * 0.28,
      y: H - 0.55,
      w: 0.06,
      h: 0.06,
      fill: { color: C.line },
      line: { color: C.line, width: 0 },
    });
  }
}
function brandDot(slide, x, y, size = 0.15) {
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size,
    fill: { color: C.brand },
    line: { color: C.brand, width: 0 },
  });
}
function footerTag(slide, pageNum, total) {
  slide.addText(
    [
      { text: "hackmania", options: { color: C.fg, bold: true } },
      { text: ".cz", options: { color: C.brand, bold: true } },
    ],
    { x: 0.6, y: H - 0.6, w: 3, h: 0.4, fontSize: 11, margin: 0, fontFace: FONT_BODY }
  );
  slide.addText(
    `${pageNum} / ${total}`,
    { x: W - 1.5, y: H - 0.6, w: 1, h: 0.4, fontSize: 10, color: C.muted, align: "right", margin: 0, fontFace: FONT_BODY }
  );
}
function eyebrow(slide, text, color = C.brand) {
  slide.addText(text, {
    x: 0.6, y: 0.55, w: 8, h: 0.4,
    fontSize: 11, color, bold: true, charSpacing: 6,
    fontFace: FONT_BODY, margin: 0,
  });
}
function rectShadow() {
  return { type: "outer", blur: 12, offset: 4, angle: 90, color: "000000", opacity: 0.35 };
}

// ------------------------------------------------------------------
// Slide 1 — COVER
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  // Big glow blob (rectangle with high transparency as pseudo-gradient)
  s.addShape(pres.shapes.OVAL, { x: W - 6, y: -3, w: 10, h: 10, fill: { color: C.brand, transparency: 88 }, line: { color: C.brand, width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: -3, y: H - 5, w: 9, h: 9, fill: { color: C.brand2, transparency: 92 }, line: { color: C.brand2, width: 0 } });

  brandDot(s, 0.75, 0.78);
  s.addText("hackmania.cz", { x: 1.0, y: 0.6, w: 4, h: 0.4, fontSize: 12, color: C.fg, bold: true, fontFace: FONT_BODY, margin: 0 });

  s.addText("Hackmania", {
    x: 0.75, y: 2.3, w: W - 1.5, h: 1.3,
    fontSize: 96, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0, charSpacing: -2,
  });
  s.addText("× vaše firma", {
    x: 0.75, y: 3.55, w: W - 1.5, h: 1.3,
    fontSize: 96, bold: true, italic: true, color: C.brand, fontFace: FONT_HEADER, margin: 0, charSpacing: -2,
  });

  s.addText("Partnerství s největší českou hackathon komunitou.", {
    x: 0.75, y: 5.05, w: W - 1.5, h: 0.5,
    fontSize: 22, color: C.muted, fontFace: FONT_BODY, margin: 0,
  });

  // Thin brand line
  s.addShape(pres.shapes.RECTANGLE, { x: 0.75, y: 6.3, w: 1.4, h: 0.04, fill: { color: C.brand }, line: { color: C.brand, width: 0 } });

  s.addText("Partner Deck · 2026", {
    x: 0.75, y: 6.45, w: 8, h: 0.4,
    fontSize: 12, color: C.fg, bold: true, charSpacing: 4, fontFace: FONT_BODY, margin: 0,
  });
}

// ------------------------------------------------------------------
// Slide 2 — Problem / Opportunity
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "PROBLÉM & PŘÍLEŽITOST");

  s.addText("Kde hledáte příští", {
    x: 0.6, y: 1.1, w: W - 1.2, h: 1.0,
    fontSize: 56, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });
  s.addText("tým juniorek?", {
    x: 0.6, y: 2.0, w: W - 1.2, h: 1.0,
    fontSize: 56, bold: true, color: C.brand, fontFace: FONT_HEADER, margin: 0,
  });

  // 4 stat-style stacked cards (2x2)
  const cards = [
    { big: "80 %", small: "recruiterů říká, že junior talent je nejdražší najmout." },
    { big: "2–3 %", small: "typický conversion rate na uni kariérních veletrzích." },
    { big: "48 h", small: "pozorujete lidi na hackathonu při reálném problému." },
    { big: "1", small: "centralizovaný přístup napříč ČR — Hackmania." },
  ];
  const cw = 2.9, ch = 1.55, gap = 0.25, startX = 0.6, startY = 3.6;
  cards.forEach((c, i) => {
    const x = startX + i * (cw + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: C.ink2 }, line: { color: C.line, width: 1 },
    });
    s.addText(c.big, {
      x: x + 0.25, y: startY + 0.15, w: cw - 0.5, h: 0.7,
      fontSize: 36, bold: true, color: i === 3 ? C.brand : C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(c.small, {
      x: x + 0.25, y: startY + 0.9, w: cw - 0.5, h: 0.6,
      fontSize: 11, color: C.muted, fontFace: FONT_BODY, margin: 0,
    });
  });

  s.addText("Hackmania propojuje tuto ukázku s firmou, která hledá — v reálu, v 48 hodinách.", {
    x: 0.6, y: 5.4, w: W - 1.2, h: 0.4,
    fontSize: 14, color: C.fg, italic: true, fontFace: FONT_BODY, margin: 0,
  });

  gridDot(s);
  footerTag(s, 2, 11);
}

// ------------------------------------------------------------------
// Slide 3 — Co je Hackmania
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "KDO JSME");

  s.addText("Hackmania je portál, kalendář a komunita.", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 1.0,
    fontSize: 44, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });

  const cols = [
    {
      tag: "KATALOG",
      color: C.brand,
      title: "Hackathony",
      desc: "12+ akcí ročně, 40 škol, napříč celou ČR. Od víkendových sprintů po týdenní konference.",
    },
    {
      tag: "KALENDÁŘ",
      color: C.brand2,
      title: "Workshopy & meetupy",
      desc: "Vibecoding, AI kamery, robotika, matematika. Menší formáty pro kontinuální kontakt.",
    },
    {
      tag: "OBSAH",
      color: C.magenta,
      title: "Recap & stories",
      desc: "Winner showcase, alumni journeys, partner stories. Distribuce přes LinkedIn, newsletter, web.",
    },
  ];
  const cw = 3.95, ch = 3.3, gap = 0.3, startX = 0.6, startY = 2.6;
  cols.forEach((c, i) => {
    const x = startX + i * (cw + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: C.ink2 }, line: { color: C.line, width: 1 },
    });
    // accent bar on left
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: 0.08, h: ch,
      fill: { color: c.color }, line: { color: c.color, width: 0 },
    });
    s.addText(c.tag, {
      x: x + 0.4, y: startY + 0.3, w: cw - 0.6, h: 0.3,
      fontSize: 10, color: c.color, bold: true, charSpacing: 4, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(c.title, {
      x: x + 0.4, y: startY + 0.65, w: cw - 0.6, h: 0.6,
      fontSize: 26, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(c.desc, {
      x: x + 0.4, y: startY + 1.45, w: cw - 0.8, h: 1.7,
      fontSize: 13, color: C.muted, fontFace: FONT_BODY, margin: 0,
    });
  });

  footerTag(s, 3, 11);
}

// ------------------------------------------------------------------
// Slide 4 — Čísla komunity
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "ČÍSLA KOMUNITY");

  s.addText("Rosteme s každým ročníkem.", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.9,
    fontSize: 44, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });

  const stats = [
    { k: "2 400+", v: "STUDENTŮ V KOMUNITĚ", c: C.brand },
    { k: "40", v: "ZAPOJENÝCH ŠKOL", c: C.brand2 },
    { k: "12+", v: "HACKATHONŮ ROČNĚ", c: C.magenta },
    { k: "1 200+", v: "ALUMNI V IT SEKTORU", c: C.brand },
  ];
  const cw = 5.85, ch = 1.9, gap = 0.3, startX = 0.6, startY = 2.5;
  stats.forEach((st, i) => {
    const x = startX + (i % 2) * (cw + gap);
    const y = startY + Math.floor(i / 2) * (ch + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: C.ink2 }, line: { color: C.line, width: 1 },
    });
    s.addText(st.k, {
      x: x + 0.4, y: y + 0.2, w: cw - 0.8, h: 1.2,
      fontSize: 72, bold: true, color: st.c, fontFace: FONT_HEADER, margin: 0, charSpacing: -1,
    });
    s.addText(st.v, {
      x: x + 0.4, y: y + ch - 0.55, w: cw - 0.8, h: 0.35,
      fontSize: 11, color: C.muted, charSpacing: 4, bold: true, fontFace: FONT_BODY, margin: 0,
    });
  });

  footerTag(s, 4, 11);
}

// ------------------------------------------------------------------
// Slide 5 — Jak se zapojit
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "JAK SE ZAPOJIT");

  s.addText("Tři cíle, tři cesty.", {
    x: 0.6, y: 1.05, w: 8, h: 0.9,
    fontSize: 44, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });
  s.addText("Vyberte cíl. Balíček seskládáme podle něj.", {
    x: 0.6, y: 1.95, w: W - 1.2, h: 0.4,
    fontSize: 16, color: C.muted, fontFace: FONT_BODY, margin: 0,
  });

  const ways = [
    {
      tag: "01",
      color: C.brand,
      title: "Recruiting",
      lines: [
        "CV batch po akci",
        "Dedicated recruiting booth",
        "Přímý DM kontakt na finalisty",
        "Post-event recruiting day",
      ],
    },
    {
      tag: "02",
      color: C.brand2,
      title: "Mentoring",
      lines: [
        "3–5 mentorů na víkend",
        "15min tech talk před akcí",
        "Workshop v edukačním portfoliu",
        "Employer branding u nejšikovnějších",
      ],
    },
    {
      tag: "03",
      color: C.magenta,
      title: "Brand visibility",
      lines: [
        "Logo na webu, tričkách, materiálech",
        "Foto z akce v PR a recap postu",
        "LinkedIn co-post o partnerství",
        "Dlouhodobá narativní stopa",
      ],
    },
  ];
  const cw = 3.95, ch = 4.0, gap = 0.3, startX = 0.6, startY = 2.7;
  ways.forEach((w, i) => {
    const x = startX + i * (cw + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: startY, w: cw, h: ch, fill: { color: C.ink2 }, line: { color: C.line, width: 1 } });
    s.addText(w.tag, {
      x: x + 0.4, y: startY + 0.3, w: 1, h: 0.4,
      fontSize: 13, color: w.color, bold: true, charSpacing: 4, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(w.title, {
      x: x + 0.4, y: startY + 0.75, w: cw - 0.6, h: 0.7,
      fontSize: 30, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    // separator
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.4, y: startY + 1.55, w: 1.0, h: 0.03, fill: { color: w.color }, line: { color: w.color, width: 0 },
    });
    const runs = w.lines.flatMap((line, idx) => [
      { text: line, options: { breakLine: idx < w.lines.length - 1, color: C.fg, fontSize: 13 } },
    ]);
    s.addText(runs, {
      x: x + 0.4, y: startY + 1.8, w: cw - 0.7, h: 2.1,
      fontSize: 13, color: C.fg, bullet: { indent: 10, code: "2022" }, paraSpaceAfter: 4, fontFace: FONT_BODY,
    });
  });

  footerTag(s, 5, 11);
}

// ------------------------------------------------------------------
// Slide 6 — Winner showcase
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "CO VZNIKÁ");

  s.addText("Projekty, které se zapsaly do historie.", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.9,
    fontSize: 42, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });
  s.addText("Vítězové Hackmania Praha 2025.", {
    x: 0.6, y: 1.95, w: W - 1.2, h: 0.4,
    fontSize: 16, color: C.muted, fontFace: FONT_BODY, margin: 0,
  });

  const winners = [
    {
      place: "1. MÍSTO",
      color: C.brand,
      name: "NeuroNavi",
      project: "AI navigátor pro nevidomé",
      desc: "Multimodální AI asistent, který nevidomým popisuje scénu a vede je v prostoru.",
    },
    {
      place: "2. MÍSTO",
      color: C.brand2,
      name: "Codecast",
      project: "Live code review pro školy",
      desc: "Collaborative editor s LLM code reviewem navrženým speciálně pro výuku algoritmizace.",
    },
    {
      place: "3. MÍSTO",
      color: C.magenta,
      name: "Ekodata",
      project: "Dashboard pro městskou správu",
      desc: "Otevřená data měst agregovaná do dashboardu s AI komentářem odchylek.",
    },
  ];
  const cw = 3.95, ch = 3.8, gap = 0.3, startX = 0.6, startY = 2.7;
  winners.forEach((w, i) => {
    const x = startX + i * (cw + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: startY, w: cw, h: ch, fill: { color: C.ink2 }, line: { color: C.line, width: 1 } });
    // tag pill
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.4, y: startY + 0.4, w: 1.3, h: 0.35,
      fill: { color: w.color, transparency: 80 }, line: { color: w.color, width: 1 },
    });
    s.addText(w.place, {
      x: x + 0.4, y: startY + 0.4, w: 1.3, h: 0.35,
      fontSize: 10, color: w.color, bold: true, charSpacing: 4, align: "center", valign: "middle", fontFace: FONT_BODY, margin: 0,
    });
    s.addText(w.project, {
      x: x + 0.4, y: startY + 0.95, w: cw - 0.6, h: 0.9,
      fontSize: 24, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(`Tým ${w.name}`, {
      x: x + 0.4, y: startY + 1.95, w: cw - 0.6, h: 0.4,
      fontSize: 12, color: w.color, bold: true, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(w.desc, {
      x: x + 0.4, y: startY + 2.5, w: cw - 0.7, h: 1.2,
      fontSize: 12, color: C.muted, fontFace: FONT_BODY, margin: 0,
    });
  });

  footerTag(s, 6, 11);
}

// ------------------------------------------------------------------
// Slide 7 — Testimonial
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s, C.ink2);
  s.addShape(pres.shapes.OVAL, { x: -5, y: -3, w: 12, h: 12, fill: { color: C.brand, transparency: 92 }, line: { color: C.brand, width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: W - 4, y: H - 5, w: 10, h: 10, fill: { color: C.brand2, transparency: 94 }, line: { color: C.brand2, width: 0 } });

  s.addText("„", {
    x: 0.7, y: 0.8, w: 2, h: 3,
    fontSize: 220, bold: true, color: C.brand, fontFace: FONT_HEADER, margin: 0,
  });
  s.addText(
    "Z jednoho hackathonu jsme převzali dva juniorní inženýry. ROI partnerství jsme splatili hned první měsíc.",
    {
      x: 1.5, y: 2.1, w: W - 3, h: 3.2,
      fontSize: 36, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    }
  );
  s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 5.6, w: 0.8, h: 0.04, fill: { color: C.brand }, line: { color: C.brand, width: 0 } });
  s.addText(
    [
      { text: "Petr Zelený", options: { bold: true, color: C.fg, fontSize: 16 } },
      { text: "  ·  VP Engineering, Seznam.cz", options: { color: C.muted, fontSize: 14 } },
    ],
    { x: 1.5, y: 5.75, w: W - 3, h: 0.5, fontFace: FONT_BODY, margin: 0 }
  );

  footerTag(s, 7, 11);
}

// ------------------------------------------------------------------
// Slide 8 — Balíčky
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "BALÍČKY");
  s.addText("Tři úrovně podle cíle a rozpočtu.", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.9,
    fontSize: 44, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });

  const tiers = [
    {
      tag: "SILVER",
      color: "A8B0C0",
      name: "Podporovatel",
      price: "20 – 50 tis. Kč",
      popular: false,
      features: [
        "Logo na webu a materiálech",
        "QR stand na místě",
        "In-kind (catering, swag, credits)",
        "Foto z akce v recap postu",
      ],
    },
    {
      tag: "GOLD",
      color: C.brand,
      name: "Mentor partner",
      price: "80 – 150 tis. Kč",
      popular: true,
      features: [
        "Vše ze Silver",
        "3× mentor na víkend",
        "15min tech talk před akcí",
        "Recruiting booth s vlastní identitou",
        "LinkedIn co-post o spolupráci",
      ],
    },
    {
      tag: "PLATINUM",
      color: C.brand2,
      name: "Titulní partner",
      price: "250 tis. Kč +",
      popular: false,
      features: [
        "Vše z Gold",
        "Titulní pozice na webu, tričkách, PR",
        "Vlastní kategorie ceny",
        "Keynote slot v opening",
        "DM na top 10 finalistů",
        "Post-event recruiting day",
      ],
    },
  ];
  const cw = 3.95, ch = 4.7, gap = 0.3, startX = 0.6, startY = 2.3;
  tiers.forEach((t, i) => {
    const x = startX + i * (cw + gap);
    const y = startY;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: C.ink2 },
      line: { color: t.popular ? t.color : C.line, width: t.popular ? 2 : 1 },
    });
    if (t.popular) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.4, y: y - 0.18, w: 2.0, h: 0.36,
        fill: { color: t.color }, line: { color: t.color, width: 0 },
      });
      s.addText("NEJOBLÍBENĚJŠÍ", {
        x: x + 0.4, y: y - 0.18, w: 2.0, h: 0.36,
        fontSize: 10, bold: true, color: C.ink, charSpacing: 3, align: "center", valign: "middle", fontFace: FONT_BODY, margin: 0,
      });
    }
    s.addText(t.tag, {
      x: x + 0.4, y: y + 0.4, w: cw - 0.6, h: 0.3,
      fontSize: 11, color: t.color, bold: true, charSpacing: 5, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(t.name, {
      x: x + 0.4, y: y + 0.75, w: cw - 0.6, h: 0.6,
      fontSize: 24, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(t.price, {
      x: x + 0.4, y: y + 1.35, w: cw - 0.6, h: 0.5,
      fontSize: 20, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.4, y: y + 1.95, w: 1.0, h: 0.03, fill: { color: t.color }, line: { color: t.color, width: 0 },
    });
    const runs = t.features.flatMap((f, idx) => [
      { text: f, options: { breakLine: idx < t.features.length - 1, color: C.fg, fontSize: 11.5 } },
    ]);
    s.addText(runs, {
      x: x + 0.4, y: y + 2.15, w: cw - 0.7, h: ch - 2.3,
      fontSize: 11.5, color: C.fg, bullet: { indent: 10, code: "2713" }, paraSpaceAfter: 4, fontFace: FONT_BODY,
    });
  });

  s.addText("Ceny jsou orientační. Finální nastavení podle počtu akcí, regionu a délky spolupráce.", {
    x: 0.6, y: H - 1.0, w: W - 1.2, h: 0.35,
    fontSize: 11, color: C.muted, italic: true, align: "center", fontFace: FONT_BODY, margin: 0,
  });

  footerTag(s, 8, 11);
}

// ------------------------------------------------------------------
// Slide 9 — Signály důvěry
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "SIGNÁLY DŮVĚRY");

  s.addText("Neprodáváme sliby.", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.9,
    fontSize: 44, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });
  s.addText("Máme čísla, tisk a akademické vazby.", {
    x: 0.6, y: 1.95, w: W - 1.2, h: 0.5,
    fontSize: 22, color: C.muted, fontFace: FONT_BODY, margin: 0,
  });

  const signals = [
    { k: "2 400+", v: "LINKEDIN", desc: "Aktivní feed s recap posty a partner stories.", c: "0A66C2" },
    { k: "Lupa · Zdroják · HN", v: "TECH PRESS", desc: "Pravidelná přítomnost v českém tech tisku.", c: C.magenta },
    { k: "15", v: "UNIVERZITNÍCH PARTNERSTVÍ", desc: "ČVUT, MFF UK, VUT, MU, VŠB, ZČU a další.", c: C.brand },
    { k: "1 200+", v: "ALUMNI", desc: "Applifting, Seznam, Braiins, Y Combinator.", c: C.brand2 },
  ];
  const cw = 2.9, ch = 3.1, gap = 0.25, startX = 0.6, startY = 3.1;
  signals.forEach((st, i) => {
    const x = startX + i * (cw + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: startY, w: cw, h: ch, fill: { color: C.ink2 }, line: { color: C.line, width: 1 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: startY + 0.35, w: 0.5, h: 0.5, fill: { color: st.c, transparency: 80 }, line: { color: st.c, width: 1 } });
    s.addText(st.v, {
      x: x + 0.35, y: startY + 1.05, w: cw - 0.5, h: 0.3,
      fontSize: 10, color: st.c, bold: true, charSpacing: 4, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(st.k, {
      x: x + 0.35, y: startY + 1.35, w: cw - 0.5, h: 0.9,
      fontSize: 26, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(st.desc, {
      x: x + 0.35, y: startY + 2.25, w: cw - 0.5, h: 0.8,
      fontSize: 11, color: C.muted, fontFace: FONT_BODY, margin: 0,
    });
  });

  footerTag(s, 9, 11);
}

// ------------------------------------------------------------------
// Slide 10 — Kalendář 2026
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  eyebrow(s, "KALENDÁŘ 2026");

  s.addText("Rok plný akcí, které potřebují partnera.", {
    x: 0.6, y: 1.05, w: W - 1.2, h: 0.9,
    fontSize: 40, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });

  const events = [
    { date: "KVĚTEN 2026", title: "Hackmania Praha 2026", sub: "Národní technická knihovna · 200 účastníků · 42 týmů", c: C.brand, big: true },
    { date: "ČERVEN 2026", title: "Brno Robotika Jam", sub: "FIT VUT · 80 účastníků · AI kamery & roboti", c: C.brand2, big: false },
    { date: "ŘÍJEN 2026", title: "Hackmania Summit", sub: "Forum Karlín · 600 účastníků · 12 řečníků", c: C.magenta, big: true },
  ];
  let y = 2.4;
  events.forEach((ev) => {
    const h = ev.big ? 1.5 : 1.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y, w: W - 1.2, h,
      fill: { color: C.ink2 }, line: { color: C.line, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6, y, w: 0.1, h,
      fill: { color: ev.c }, line: { color: ev.c, width: 0 },
    });
    s.addText(ev.date, {
      x: 0.95, y: y + 0.2, w: 3, h: 0.35,
      fontSize: 11, color: ev.c, bold: true, charSpacing: 4, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(ev.title, {
      x: 0.95, y: y + 0.5, w: W - 2, h: 0.6,
      fontSize: ev.big ? 28 : 22, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
    s.addText(ev.sub, {
      x: 0.95, y: y + (ev.big ? 1.05 : 0.78), w: W - 2, h: 0.4,
      fontSize: 13, color: C.muted, fontFace: FONT_BODY, margin: 0,
    });
    y += h + 0.2;
  });

  s.addText("+ 8 menších workshopů, meetupů a přednášek v regionech.", {
    x: 0.6, y: y + 0.1, w: W - 1.2, h: 0.4,
    fontSize: 14, color: C.fg, italic: true, fontFace: FONT_BODY, margin: 0,
  });

  footerTag(s, 10, 11);
}

// ------------------------------------------------------------------
// Slide 11 — Kontakt
// ------------------------------------------------------------------
{
  const s = pres.addSlide();
  bg(s);
  s.addShape(pres.shapes.OVAL, { x: W - 6, y: -3, w: 10, h: 10, fill: { color: C.brand, transparency: 90 }, line: { color: C.brand, width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: -3, y: H - 4, w: 8, h: 8, fill: { color: C.brand2, transparency: 94 }, line: { color: C.brand2, width: 0 } });

  eyebrow(s, "POJĎME SI O TOM POPOVÍDAT");

  s.addText("30 minut online.", {
    x: 0.6, y: 1.2, w: W - 1.2, h: 1.2,
    fontSize: 72, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
  });
  s.addText("Bez PDF drama, bez closerů.", {
    x: 0.6, y: 2.35, w: W - 1.2, h: 1.0,
    fontSize: 50, bold: true, italic: true, color: C.brand, fontFace: FONT_HEADER, margin: 0,
  });

  // Contact card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.2, w: W - 1.2, h: 2.3,
    fill: { color: C.ink2 }, line: { color: C.line, width: 1 },
  });

  const contacts = [
    { label: "E-MAIL", value: "partneri@hackmania.cz" },
    { label: "WEB", value: "hackmania.cz/pro-firmy" },
    { label: "LINKEDIN", value: "linkedin.com/company/hackmania-cz" },
  ];
  const colW = (W - 1.8) / 3;
  contacts.forEach((c, i) => {
    const x = 0.9 + i * colW;
    s.addText(c.label, {
      x, y: 4.5, w: colW - 0.2, h: 0.3,
      fontSize: 10, color: C.brand, bold: true, charSpacing: 5, fontFace: FONT_BODY, margin: 0,
    });
    s.addText(c.value, {
      x, y: 4.85, w: colW - 0.2, h: 0.8,
      fontSize: 18, bold: true, color: C.fg, fontFace: FONT_HEADER, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.9, y: 5.95, w: W - 1.8, h: 0.04, fill: { color: C.line }, line: { color: C.line, width: 0 } });
  s.addText(
    "Ozveme se do 48 hodin s návrhem packagu, kalendářem, nebo upřímným ne.",
    {
      x: 0.9, y: 6.05, w: W - 1.8, h: 0.4,
      fontSize: 13, color: C.muted, italic: true, fontFace: FONT_BODY, margin: 0,
    }
  );

  footerTag(s, 11, 11);
}

// ------------------------------------------------------------------
pres.writeFile({ fileName: OUT }).then((p) => {
  console.log("Saved:", p);
});
