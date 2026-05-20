import Link from "next/link";
import { ArrowRight, Sparkles, Code2, Cpu, Rocket, Users } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";
import { HackathonCard } from "@/components/HackathonCard";
import { NewsCard } from "@/components/NewsCard";
import { QrCard } from "@/components/QrCard";
import { EventCard } from "@/components/EventCard";
import { NewsletterBand } from "@/components/NewsletterBand";

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Co je Hackmania?",
    a: "Hackmania je portál české hackathon komunity. Sdružuje katalog hackathonů a workshopů, novinky z AI a techniky, mapu škol, partnerskou síť a komunitu přes 2 400 studentů.",
  },
  {
    q: "Kolik hackathonů se koná v ČR?",
    a: "Hackmania mapuje 12+ hackathonů ročně napříč celou Českou republikou — od Prahy, Brna a Plzně až po Ostravu, Hradec a Zlín. Kompletní katalog najdete na /hackathony.",
  },
  {
    q: "Kdo může na hackathon?",
    a: "Většina hackathonů je otevřená studentům SŠ i VŠ. Některé akce jsou zaměřené specificky (jen SŠ, jen MFF, atd.) — vždy v detailu akce.",
  },
  {
    q: "Kolik stojí účast?",
    a: "Většina hackathonů v Hackmania katalogu je pro účastníky zdarma — organizátoři pokrývají jídlo, pití i ceny. Konkrétní cena je v detailu každé akce.",
  },
  {
    q: "Chci hackathon organizovat — jak?",
    a: "Napište na ahoj@hackmania.cz a váš hackathon zařadíme do katalogu. Pokud hledáte partnery nebo logistickou podporu, podívejte se na /pro-firmy.",
  },
  {
    q: "Jak se firmy zapojí jako partneři?",
    a: "Všechny možnosti partnerství (recruiting, mentoring, brand) popisujeme na /pro-firmy. Balíčky začínají od 20 000 Kč, u top partnerů 250 000 Kč+.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
};

export default async function HomePage() {
  // Build je tolerantní k chybějícím env vars — `.catch(() => [])` zajistí, že
  // Vercel build neselže, když NEXT_PUBLIC_CONVEX_URL ještě není nastavený.
  const [hackathons, news, partners, events] = await Promise.all([
    fetchQuery(api.hackathons.list, {}).catch(() => [] as Awaited<ReturnType<typeof fetchQuery<typeof api.hackathons.list>>>),
    fetchQuery(api.news.list, { limit: 20 }).catch(() => [] as Awaited<ReturnType<typeof fetchQuery<typeof api.news.list>>>),
    fetchQuery(api.partners.list, {}).catch(() => [] as Awaited<ReturnType<typeof fetchQuery<typeof api.partners.list>>>),
    fetchQuery(api.events.list, { limit: 50 }).catch(() => [] as Awaited<ReturnType<typeof fetchQuery<typeof api.events.list>>>),
  ]);

  const featuredHackathons = hackathons.filter((h) => h.featured && h.status !== "past").slice(0, 3);
  const featuredNews = news.filter((n) => n.featured).slice(0, 3);
  const upcomingCount = hackathons.filter((h) => h.status === "upcoming").length;
  const upcomingEvents = [...events]
    .filter((e) => e.startDate > Date.now())
    .sort((a, b) => a.startDate - b.startDate)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <Hero upcomingCount={upcomingCount} />
      <PartnerMarquee partners={partners} />
      <FeaturedHackathons items={featuredHackathons} />
      <HowItWorks />
      <UpcomingEvents items={upcomingEvents} />
      <FeaturedNews items={featuredNews} />
      <StatsStrip />
      <CommunityCTA />
      <FinalCTA />
      <FAQ />
      <NewsletterBand />
    </>
  );
}

function FAQ() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-2)]">FAQ</div>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
        Co se nás nejčastěji ptáte
      </h2>
      <div className="mt-10 divide-y divide-[var(--color-line)] rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)]">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-left text-white font-semibold list-none [&::-webkit-details-marker]:hidden">
              <span className="font-[family-name:var(--font-display)] text-lg">{item.q}</span>
              <span className="shrink-0 text-[var(--color-brand)] text-2xl leading-none transition group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 text-[var(--color-muted)] leading-relaxed">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function UpcomingEvents({ items }: { items: Doc<"events">[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Kalendář"
        title="Nadcházející workshopy a meetupy"
        cta={{ href: "/akce", label: "Celý kalendář" }}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => (
          <EventCard key={e.slug} e={e} />
        ))}
      </div>
    </section>
  );
}

function Hero({ upcomingCount }: { upcomingCount: number }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 sm:pt-24 sm:pb-28 md:pt-28 md:pb-32 lg:pt-32 lg:pb-36">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/5 px-3 py-1 text-xs text-[var(--color-muted)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-brand)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-brand)]" />
          </span>
          {upcomingCount} hackathonů v plánu na rok 2026
        </div>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-8xl font-bold tracking-tight text-white leading-[0.95]">
          Česko, které <span className="text-[var(--color-brand)]">hackuje.</span>
          <br />
          Česko, které <span className="italic text-[var(--color-brand-2)]">tvoří.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-[var(--color-muted)] leading-relaxed">
          Hackmania je portál pro všechny, kdo staví budoucnost — hackathony, workshopy, AI novinky,
          školy a partneři na jednom místě. Najdi svůj další víkendový projekt.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/hackathony"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            Prozkoumej katalog <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#jak-to-funguje"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            ↓ Jak to funguje
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Sparkles, label: "AI & Vibecoding" },
            { icon: Cpu, label: "Robotika & IoT" },
            { icon: Code2, label: "Web & produkty" },
            { icon: Rocket, label: "Startupy" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="glass rounded-2xl p-4 flex items-center gap-3 text-sm text-[var(--color-muted)]"
            >
              <Icon className="h-5 w-5 text-[var(--color-brand)]" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerMarquee({ partners }: { partners: { name: string }[] }) {
  const doubled = [...partners, ...partners];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-8 overflow-hidden">
      <div className="text-center text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
        Důvěřují nám
      </div>
      <div className="mt-5 relative">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {doubled.map((p, i) => (
            <span
              key={i}
              className="font-[family-name:var(--font-display)] text-lg md:text-xl text-white/40 hover:text-white transition"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedHackathons({ items }: { items: Doc<"hackathons">[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Nejbližší akce"
        title="Hackathony, na které se nesmí chybět"
        cta={{ href: "/hackathony", label: "Všechny hackathony" }}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((h) => (
          <HackathonCard key={h.slug} h={h} />
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Users,
      title: "Najdi svou akci",
      desc: "Prohlédni katalog hackathonů, workshopů a meetupů napříč ČR i online.",
    },
    {
      icon: Code2,
      title: "Postav projekt",
      desc: "Tvoř v týmu, využij AI nástroje, inspiruj se workshopy a mentory z oboru.",
    },
    {
      icon: Rocket,
      title: "Ukaž světu",
      desc: "Prezentuj porotě, získej partnery a posuň se k dalšímu velkému projektu.",
    },
  ];
  return (
    <section id="jak-to-funguje" className="relative border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Jak to funguje" title="Tři kroky od nápadu ke startupu" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-3)] p-7">
              <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand)] font-bold text-[var(--color-ink)]">
                {i + 1}
              </div>
              <s.icon className="h-6 w-6 text-[var(--color-brand)]" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedNews({ items }: { items: Doc<"news">[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Co se děje"
        title="Novinky ze světa AI, techniky a robotiky"
        cta={{ href: "/novinky", label: "Všechny novinky" }}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((n) => (
          <NewsCard key={n.slug} n={n} />
        ))}
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { k: "12+", v: "hackathonů ročně" },
    { k: "2 400", v: "účastníků v komunitě" },
    { k: "38", v: "škol a univerzit" },
    { k: "60+", v: "partnerů a mentorů" },
  ];
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-line)]">
      <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.v} className="text-center">
            <div className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white">
              {s.k}
            </div>
            <div className="mt-1 text-sm text-[var(--color-muted)]">{s.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CommunityCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Komunita"
        title="Přidej se k nám na Discord a WhatsApp"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <QrCard platform="discord" />
        <QrCard platform="whatsapp" />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-10 md:p-16">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--color-brand)]/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-[var(--color-brand-2)]/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-white">
            Organizuješ hackathon? <span className="text-[var(--color-brand)]">Přidej ho.</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            Zařaď svou akci do největšího českého katalogu. Dostaneš se před tisíce studentů,
            vývojářů a firemních partnerů.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
            >
              Přidat akci <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pro-firmy"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Stát se partnerem
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  cta,
}: {
  eyebrow: string;
  title: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">{eyebrow}</div>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
          {title}
        </h2>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[var(--color-brand)] transition"
        >
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
