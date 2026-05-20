import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  TrendingUp,
  Quote,
  Check,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
  Handshake,
} from "lucide-react";

const title = "Pro školy — partnerství s Hackmania";
const description =
  "Zapojte svou univerzitu nebo střední školu do hackathon komunity. Curriculum integrace, mentoring od firem, praxe pro studenty, reputace v tech světě.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pro-skoly" },
  openGraph: { title, description, url: "https://hackmania.cz/pro-skoly", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default function ProSkolyPage() {
  return (
    <>
      <Hero />
      <WhyItMatters />
      <Models />
      <Numbers />
      <Testimonial />
      <TrustSignals />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div className="absolute inset-0 radial-glow opacity-70 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/5 px-3 py-1 text-xs text-[var(--color-muted)]">
          <GraduationCap className="h-3.5 w-3.5 text-[var(--color-brand)]" />
          Pro univerzity, fakulty a střední školy
        </div>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95] max-w-4xl">
          Vaši studenti si <span className="text-[var(--color-brand-2)]">zaslouží víc</span> než
          jen přednášky.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-[var(--color-muted)] leading-relaxed">
          Dejte jim hackathon, mentora z praxe a první kontakt s firmou. Hackmania propojuje
          15+ VŠ a 5+ SŠ s partnery jako Seznam.cz, Applifting nebo JetBrains.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="mailto:skoly@hackmania.cz?subject=Spolupráce se školou"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            Ozvat se <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/skoly"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" /> Mapa zapojených škol
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyItMatters() {
  const reasons = [
    {
      icon: TrendingUp,
      title: "Vyšší atraktivita školy",
      desc: "Hackathon na vaší fakultě = content pro sociální sítě, tisk a dny otevřených dveří. Uchazeči hledají školy, které reálně učí.",
      color: "var(--color-brand)",
    },
    {
      icon: Handshake,
      title: "Most k firmám",
      desc: "Bez Hackmania si školy budují partnerství s firmami jednotlivě. My to děláme centralizovaně — Seznam, JetBrains, Applifting už známe.",
      color: "var(--color-brand-2)",
    },
    {
      icon: Sparkles,
      title: "Reální studenti → reální projekty",
      desc: "Studenti s AI hackathonem v CV mají 3× vyšší šanci dostat první tech job. Pomůžeme jim postavit portfolio ještě během studia.",
      color: "var(--color-magenta)",
    },
  ];

  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-2)]">
          Proč to dává smysl
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          Tři věci, které hackathon udělá pro školu, kterou běžná výuka nemůže.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map((r) => (
            <article
              key={r.title}
              className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-3)] p-7"
            >
              <div
                className="absolute -top-14 -right-14 h-40 w-40 rounded-full blur-3xl opacity-30"
                style={{ background: r.color }}
              />
              <div
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${r.color}22`, color: r.color }}
              >
                <r.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {r.title}
              </h3>
              <p className="relative mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                {r.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Models() {
  const models = [
    {
      tag: "A",
      title: "Hostování akce",
      badge: "Nejnižší threshold",
      color: "var(--color-brand-2)",
      when: "Máte prostor, nemáte energii na organizaci.",
      what: [
        "Poskytnete místo (tělocvična, atrium, auditoria) a WiFi",
        "Hackmania zařídí program, mentory, catering, ceny, partnery",
        "Zapojíte se logo, v PR, na foto z akce",
      ],
      deliverable: "Lokální hackathon na vaší půdě · 80–150 studentů · 1 víkend",
    },
    {
      tag: "B",
      title: "Spoluorganizace",
      badge: "Nejčastější model",
      color: "var(--color-brand)",
      popular: true,
      when: "Máte garanta z pedagogického sboru a chcete vlastní identitu akce.",
      what: [
        "Společná propagace, logo vedle sebe v materiálech",
        "Ředitel/děkan dává opening keynote",
        "Studenti dostanou credit do předmětu (volitelně)",
        "Hackmania přinese know-how, partnery, program",
      ],
      deliverable: "[Škola] × Hackmania edice · vlastní branding · 2× ročně",
    },
    {
      tag: "C",
      title: "Curriculum partnerství",
      badge: "Dlouhodobý dopad",
      color: "var(--color-magenta)",
      when: "Chcete hackathony a AI praxi integrovat do bakalářského/magisterského programu.",
      what: [
        "Workshopy a přednášky v rámci výuky (AI nástroje, vibecoding, MLOps)",
        "Kredit za účast na akci (ECTS)",
        "Bakalářky a diplomky s reálným zadáním od partnerů",
        "Co-created learning materials",
      ],
      deliverable: "Víceletá spolupráce · MoU · 1–2 semestry na přípravu",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">Modely spolupráce</div>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
        Začněte kdekoli — od poskytnutí prostoru po plnou integraci do výuky.
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {models.map((m) => (
          <article
            key={m.tag}
            className={`relative flex flex-col rounded-2xl border bg-[var(--color-ink-2)] p-7 ${
              m.popular
                ? "border-[var(--color-brand)] shadow-[0_0_0_1px_var(--color-brand)]"
                : "border-[var(--color-line)]"
            }`}
          >
            {m.popular && (
              <div className="absolute -top-3 left-6 rounded-full bg-[var(--color-brand)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)]">
                Nejoblíbenější
              </div>
            )}
            <div className="flex items-center justify-between">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg font-[family-name:var(--font-display)] font-bold text-lg"
                style={{ background: `${m.color}22`, color: m.color }}
              >
                {m.tag}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
                {m.badge}
              </span>
            </div>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              {m.title}
            </h3>
            <p className="mt-2 text-sm italic text-[var(--color-muted)]">{m.when}</p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--color-fg)]/90">
              {m.what.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: m.color }} aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-lg bg-[var(--color-ink-3)] p-3 text-xs text-[var(--color-muted)]">
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: m.color }}>
                Výstup
              </div>
              {m.deliverable}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Numbers() {
  const stats = [
    { k: "15", v: "zapojených VŠ", icon: GraduationCap },
    { k: "5+", v: "SŠ v programu", icon: BookOpen },
    { k: "2 400+", v: "studentů v komunitě", icon: Users },
    { k: "60+", v: "firemních partnerů", icon: Trophy },
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-20">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.v} className="text-center">
            <s.icon className="mx-auto h-6 w-6 text-[var(--color-brand)]" aria-hidden="true" />
            <div className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white">
              {s.k}
            </div>
            <div className="mt-1 text-sm text-[var(--color-muted)]">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <Quote className="mx-auto h-10 w-10 text-[var(--color-brand-2)]" aria-hidden="true" />
      <blockquote className="mt-6 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-white leading-snug">
        „Po prvním Hackmania × FIT jsme viděli posun v motivaci studentů ve třetím ročníku. Tři
        týmy pokračují na své nápady jako diplomky."
      </blockquote>
      <div className="mt-6 text-sm text-[var(--color-muted)]">
        <span className="text-white font-semibold">doc. Hana Klimešová</span>,
        proděkanka pro studium, ČVUT FIT
      </div>
    </section>
  );
}

function TrustSignals() {
  const items = [
    "ČVUT FIT",
    "MFF UK",
    "VUT FIT",
    "MU FI",
    "VŠB-TUO",
    "ZČU FAV",
    "UHK FIM",
    "TUL FM",
    "UPOL PřF",
    "MENDELU",
    "UPCE FEI",
    "SPŠE Ječná",
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Spolupracujeme s
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg md:text-xl font-[family-name:var(--font-display)] text-white/50">
          {items.map((i) => (
            <span key={i} className="hover:text-white transition">
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Musí škola něco platit?",
      a: "Ne. U modelů A a B jsou náklady na straně Hackmania a partnerů. U modelu C (curriculum) některé workshopy mohou mít symbolickou odměnu pro lektory, ale typicky je to bez poplatku pro školu.",
    },
    {
      q: "Kolik lidí potřebujeme zapojit ze školy?",
      a: "Model A: 1 kontaktní osoba. Model B: garant + 1–2 pedagogové. Model C: koordinátor z rektorátu + minimálně jeden vedoucí katedry.",
    },
    {
      q: "Jak dlouho trvá příprava?",
      a: "Jednorázový hackathon: 6–8 týdnů. Spoluorganizace: 2–3 měsíce. Curriculum: 1–2 semestry (kvůli akreditačním procesům).",
    },
    {
      q: "Kdo si řídí obsah a kritéria?",
      a: "Společně. Hackmania přináší know-how z 12+ akcí, škola si řekne, co chce studentům předat. Konkrétní výzvy dělají partneři.",
    },
    {
      q: "Získá škola kontakt na naše vlastní partnery?",
      a: "Ano. Partnerská síť je sdílená — pokud už pracujete se Seznam.cz, můžeme to rozšířit. Pokud ne, představíme vás.",
    },
  ];
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">FAQ pro školy</div>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold tracking-tight text-white">
        Co se nás nejčastěji ptáte
      </h2>
      <div className="mt-8 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)]">
        {items.map((i) => (
          <details key={i.q} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left list-none [&::-webkit-details-marker]:hidden">
              <span className="font-[family-name:var(--font-display)] font-semibold text-white">
                {i.q}
              </span>
              <span className="shrink-0 text-[var(--color-brand)] text-2xl leading-none transition group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-[var(--color-muted)] leading-relaxed">{i.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-10 md:p-16">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--color-brand-2)]/25 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-[var(--color-brand)]/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-white">
            Začněme <span className="text-[var(--color-brand-2)]">prvním hackathonem</span> u vás.
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            30 minut online call. Předvedu vám formát, přineseme první zadání. Pokud se shodneme,
            posuneme to k harmonogramu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:skoly@hackmania.cz?subject=Spolupráce se školou"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> skoly@hackmania.cz
            </a>
            <Link
              href="/pro-firmy"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Jsem firma, ne škola →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
