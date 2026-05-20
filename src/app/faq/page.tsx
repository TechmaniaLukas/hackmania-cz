import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

const title = "Často kladené otázky";
const description =
  "Odpovědi na všechny otázky kolem hackathonů Hackmania — pro studenty, školy, firmy i organizátory.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/faq" },
  openGraph: { title, description, url: "https://hackmania.cz/faq", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

type FAQ = { q: string; a: string };
const GROUPS: { heading: string; anchor: string; items: FAQ[] }[] = [
  {
    heading: "O Hackmania",
    anchor: "o-hackmania",
    items: [
      { q: "Co je Hackmania?", a: "Hackmania je portál české hackathon komunity — sdružuje katalog hackathonů a workshopů, novinky z AI a techniky, mapu škol, partnerskou síť a přes 2 400 studentů v komunitě na Discordu a WhatsApp." },
      { q: "Kdo za Hackmania stojí?", a: "Provozuje nás nezisková organizace Hackmania z.s. Tým tvoří dobrovolníci z řad studentů, alumni i profesionálů z českého tech prostředí. Více na /o-nas." },
      { q: "Jaký je obchodní model?", a: "Provoz financují firemní partneři (balíčky 20 000 – 250 000+ Kč) a granty. Účast pro studenty je u většiny akcí zdarma. Viz /pro-firmy pro detaily partnerství." },
      { q: "Odkud bere Hackmania data o hackathonech?", a: "Mix editovaného katalogu (tým Hackmania přidává akce, které vidíme) a submissions od organizátorů. Pokud víte o akci, napište na ahoj@hackmania.cz." },
    ],
  },
  {
    heading: "Pro studenty",
    anchor: "studenti",
    items: [
      { q: "Jak se přihlásit na hackathon?", a: "Na detailu konkrétní akce je tlačítko Registrovat se s odkazem na oficiální registrační formulář organizátora. Hackmania sama registraci neorganizuje (pouze u vlastních akcí)." },
      { q: "Jsem začátečník, mohu se zúčastnit?", a: "Ano. Většina hackathonů explicitně vítá začátečníky a má mentor program. Hledejte akce označené Beginner-friendly v popisu." },
      { q: "Kolik to stojí?", a: "Většina akcí v katalogu je pro studenty zdarma včetně jídla, pití a swagu. Některé workshopy mají symbolický poplatek 100–500 Kč." },
      { q: "Musím mít tým?", a: "Ne. Většina hackathonů má tzv. team-matching ráno před startem. Pokud chcete už předem, ptejte se v Discord kanálu #teammate-search." },
      { q: "Co si přinést?", a: "Laptop s nabíječkou, kartáček, tričko na převlečení. Většina organizátorů poskytuje spací vak / karimatky, případně pokyny komunikují před akcí." },
      { q: "Mohu se zúčastnit, pokud jsem ze SŠ?", a: "Ano, většina hackathonů je otevřená SŠ i VŠ. Některé akce jsou specificky pro SŠ (např. školní hackathony). Vždy zkontrolujte detail akce." },
      { q: "Co dostanu, když vyhrajeme?", a: "Závisí na akci: peněžní výhry (obvykle 20 000 – 250 000 Kč rozděleno mezi top 3 týmy), mentorské programy, stáže u partnerů, cloud credits, hardware." },
      { q: "Můžu se přihlásit na více akcí současně?", a: "Ano, pokud vám to dovolí termíny. Doporučujeme však nepřepínat mezi akcemi — hackathony jsou intenzivní." },
    ],
  },
  {
    heading: "Pro školy a učitele",
    anchor: "skoly",
    items: [
      { q: "Jak zapojit moji školu?", a: "Napište na ahoj@hackmania.cz. Nabízíme: pořádání hackathonu u vás, zařazení do mapy škol, propagaci akcí mezi studenty, spolupráci na workshopech." },
      { q: "Co je potřeba k pořádání hackathonu?", a: "Místo (tělocvična, atrium, auditoria), WiFi, elektřina, catering na 100+ lidí. Hackmania pomůže s programem, mentory, propagací i partnery." },
      { q: "Dostaneme podporu?", a: "Ano — know-how z 12+ akcí ročně, templaty (registrační formulář, kodex, smlouvy), propagace na našich kanálech, zprostředkování partnerů." },
      { q: "Kolik to stojí školu?", a: "Interní akce (pro své studenty) obvykle nic — náklady pokrývají partneři. Větší formáty řešíme spoluorganizátorsky." },
    ],
  },
  {
    heading: "Pro firmy",
    anchor: "firmy",
    items: [
      { q: "Jak se stát partnerem?", a: "Detaily na /pro-firmy. Máme 3 úrovně (Silver 20–50 tis. Kč, Gold 80–150 tis. Kč, Platinum 250 tis. Kč+) a 3 cíle zapojení — recruiting, mentoring, brand visibility." },
      { q: "Co dostane firma za partnerství?", a: "Logo na akci, přístup k talentu, foto a video obsah, mentor sloty, recruiting booth. Detailní deliverables dle balíčku." },
      { q: "Jsme malá firma, má smysl se zapojit?", a: "Ano. Silver balíček od 20 000 Kč pokryje logo, QR stand a in-kind. Pro startupy máme speciální tier Startup partner — ptejte se na partneri@hackmania.cz." },
      { q: "Můžeme hackathon spoluorganizovat?", a: "Ano, titulní partneři mohou akci spoluhostit. Výsledkem může být vlastní [Firma] × Hackmania edice." },
      { q: "Jak získáme přístup k CV finalistů?", a: "Součást Gold a Platinum balíčku. Po akci dostanete seznam účastníků s jejich explicitním souhlasem (opt-in při registraci)." },
    ],
  },
  {
    heading: "Technické a logistické",
    anchor: "tech",
    items: [
      { q: "Jaké nástroje a AI můžeme používat?", a: "Vše co není explicitně zakázané. Claude, ChatGPT, Cursor, Copilot, v0, Vercel — standardně povolené. AI obsah musíte označit, jasně říct co udělala AI a co tým." },
      { q: "Musíme používat nějakou konkrétní technologii?", a: "Obvykle ne. Některé akce mají sponzorované výzvy s konkrétní technologií (např. Anthropic challenge → Claude). Detail je vždy v briefu." },
      { q: "Jak se řeší duševní vlastnictví?", a: "Kód zůstává týmu. Hackmania ani partneři nezískávají práva k projektu. Partneři mohou nabídnout follow-up spolupráci, ale to je bilaterální dohoda." },
    ],
  },
  {
    heading: "Komunita",
    anchor: "komunita",
    items: [
      { q: "Kde najdu komunitu?", a: "Discord server Hackmania a WhatsApp skupina hackmania.cz — QR kódy na /komunita. LinkedIn page je pro profesionální obsah (/pro-firmy)." },
      { q: "Jaká jsou pravidla?", a: "Viz /kodex — respekt, žádný nábor mimo #jobs, AI obsah označovat, hlásit problémy na bezpeci@hackmania.cz." },
      { q: "Můžu se stát mentorem?", a: "Pokud máte 3+ roky zkušeností v tech, napište na mentors@hackmania.cz. Přihlášku řešíme individuálně podle potřeb akce." },
    ],
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GROUPS.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-50 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zpět na hlavní
          </Link>
          <div className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">FAQ</div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Často kladené <span className="text-[var(--color-brand)]">otázky</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            {GROUPS.reduce((a, g) => a + g.items.length, 0)} odpovědí seskupených podle toho, kdo se ptá.
          </p>
          <nav aria-label="FAQ kategorie" className="mt-8 flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <a
                key={g.anchor}
                href={`#${g.anchor}`}
                className="rounded-full border border-[var(--color-line)] bg-white/5 px-4 py-1.5 text-sm text-white hover:bg-white/10 transition"
              >
                {g.heading}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-14 space-y-16">
        {GROUPS.map((g) => (
          <section key={g.anchor} id={g.anchor} className="scroll-mt-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white">
              {g.heading}
            </h2>
            <div className="mt-6 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)]">
              {g.items.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left text-white list-none [&::-webkit-details-marker]:hidden">
                    <span className="font-[family-name:var(--font-display)] font-semibold text-base md:text-lg">
                      {item.q}
                    </span>
                    <span className="shrink-0 text-[var(--color-brand)] text-2xl leading-none transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[var(--color-muted)] leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 text-center">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Nenašli jste odpověď?
          </h3>
          <p className="mt-2 text-[var(--color-muted)]">Napište nám, odpovídáme do 48 hodin.</p>
          <a
            href="mailto:ahoj@hackmania.cz"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> ahoj@hackmania.cz
          </a>
        </div>
      </div>
    </>
  );
}
