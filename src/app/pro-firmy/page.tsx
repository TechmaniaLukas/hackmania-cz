import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Megaphone,
  Lightbulb,
  Award,
  Newspaper,
  GraduationCap,
  Heart,
  Check,
  Mail,
  Download,
  Quote,
} from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

type Winner = {
  place: 1 | 2 | 3 | "special";
  teamName: string;
  projectName: string;
  oneLiner?: string;
};

const title = "Pro firmy · partnerství";
const description =
  "Propojte firmu s nejlepším studentským talentem v ČR. Recruiting pipeline, mentoring i brand visibility — partnerství od 20 000 Kč.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pro-firmy" },
  openGraph: { title, description, url: "https://hackmania.cz/pro-firmy", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default async function ProFirmyPage() {
  const hm2025 = await fetchQuery(api.hackathons.getBySlug, {
    slug: "hackmania-praha-2025",
  }).catch(() => null);
  const winners2025: Winner[] =
    hm2025?.recap?.winners.filter((w) => w.place !== "special").slice(0, 3) ?? [];

  return (
    <>
      <Hero />
      <WaysToEngage />
      <ProofNumbers />
      <WinnerSpotlight winners={winners2025} />
      <Testimonial />
      <TrustSignals />
      <Packages />
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
          <span className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />
          Pro firmy & instituce
        </div>
        <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[0.95] max-w-4xl">
          Propojte firmu s nejlepším{" "}
          <span className="text-[var(--color-brand)]">studentským talentem</span> v ČR.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-[var(--color-muted)] leading-relaxed">
          Hackmania dává dohromady 2 400+ studentů ze 40 škol. Najděte svou další hvězdnou
          juniorku, otevřete mentoring program nebo postavte brand mezi budoucí tvůrce AI.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="mailto:partneri@hackmania.cz?subject=Partnerství Hackmania"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            Ozvat se <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="/hackmania-partner-deck.pptx"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Stáhnout partner deck
          </a>
        </div>
      </div>
    </section>
  );
}

function WaysToEngage() {
  const ways = [
    {
      icon: Users,
      title: "Recruiting pipeline",
      desc: "Přímý kontakt s finalisty, pitch day po hackathonu, přednostní přístup k CV databázi účastníků.",
      bullets: ["Dedicated recruiting booth", "CV batch po akci", "Přímý DM na finalisty"],
      color: "var(--color-brand)",
    },
    {
      icon: Lightbulb,
      title: "Mentoring & expertise",
      desc: "Vyšlete 3–5 inženýrů jako mentory. Networking, employer branding u těch nejšikovnějších.",
      bullets: ["Mentor slot na víkend", "Tech talk před hackathonem", "Workshop v portfoliu"],
      color: "var(--color-brand-2)",
    },
    {
      icon: Megaphone,
      title: "Brand visibility",
      desc: "Logo všude — od webu, přes trika, sociální sítě až po press. LinkedIn engagement z recapu.",
      bullets: ["Logo na webu a materiálech", "Foto z akce v PR", "Sdílený content na LinkedIn"],
      color: "var(--color-magenta)",
    },
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
          Jak se zapojit
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          Tři cíle, tři cesty — nebo kombinace, co dává smysl vám.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {ways.map((w) => (
            <article
              key={w.title}
              className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-3)] p-7"
            >
              <div
                className="absolute -top-14 -right-14 h-40 w-40 rounded-full blur-3xl opacity-30"
                style={{ background: w.color }}
              />
              <div
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${w.color}22`, color: w.color }}
              >
                <w.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                {w.title}
              </h3>
              <p className="relative mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                {w.desc}
              </p>
              <ul className="relative mt-5 space-y-2 text-sm text-[var(--color-fg)]/90">
                {w.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: w.color }} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofNumbers() {
  const stats = [
    { k: "2 400+", v: "studentů v komunitě" },
    { k: "40", v: "zapojených škol" },
    { k: "12+", v: "hackathonů ročně" },
    { k: "1 200+", v: "alumni" },
  ];
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div className="absolute inset-0 radial-glow opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
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

function WinnerSpotlight({ winners }: { winners: Winner[] }) {
  if (winners.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-2)]">Co vzniká</div>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
        Projekty, které vyrostly z našich akcí
      </h2>
      <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
        Ukázka vítězů Hackmania 2025. Každý z těchto týmů dnes pokračuje — buď v firmě, nebo v
        novém startupu.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {winners.map((w) => (
          <article
            key={w.teamName}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-brand)]">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              {w.place}. místo Hackmania 2025
            </div>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
              {w.projectName}
            </h3>
            <div className="text-sm text-[var(--color-muted)]">Tým {w.teamName}</div>
            {w.oneLiner && (
              <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">{w.oneLiner}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Quote className="mx-auto h-10 w-10 text-[var(--color-brand)]" aria-hidden="true" />
        <blockquote className="mt-6 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-white leading-snug">
          „Z jednoho hackathonu jsme převzali dva juniorní inženýry. ROI partnerství
          jsme splatili hned první měsíc."
        </blockquote>
        <div className="mt-6 text-sm text-[var(--color-muted)]">
          <span className="text-white font-semibold">Petr Zelený</span>,
          VP Engineering, Seznam.cz
        </div>
      </div>
    </section>
  );
}

function TrustSignals() {
  const signals = [
    {
      icon: LinkedInIcon,
      k: "2 400+",
      v: "followerů na LinkedIn",
      desc: "Aktivní feed s recap posty a partner stories.",
      url: "https://www.linkedin.com/company/hackmania-cz",
      color: "#0a66c2",
    },
    {
      icon: Newspaper,
      k: "Lupa, Zdroják, HN",
      v: "media mentions",
      desc: "Pravidelná přítomnost v českém tech tisku.",
      color: "var(--color-magenta)",
    },
    {
      icon: GraduationCap,
      k: "15",
      v: "univerzitních partnerství",
      desc: "ČVUT, MFF UK, VUT, MU, VŠB, ZČU a další.",
      url: "/skoly",
      color: "var(--color-brand)",
    },
    {
      icon: Heart,
      k: "1 200+",
      v: "alumni v ČR i zahraničí",
      desc: "Bývalí účastníci v Applifting, Seznam, Braiins, Y Combinator.",
      color: "var(--color-brand-2)",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
        Signály důvěry
      </div>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
        Neprodáváme sliby. Máme čísla, tisk a akademické vazby.
      </h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map((s) => {
          const Wrapper = s.url ? "a" : "div";
          const external = s.url?.startsWith("http");
          return (
            <Wrapper
              key={s.v}
              {...(s.url
                ? { href: s.url, target: external ? "_blank" : undefined, rel: external ? "noopener noreferrer" : undefined }
                : {})}
              className={`rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 ${
                s.url ? "hover:border-[color:var(--accent)] transition" : ""
              }`}
              style={s.url ? ({ ["--accent" as string]: s.color } as React.CSSProperties) : undefined}
            >
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${s.color}22`, color: s.color }}
              >
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                {s.k}
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] mt-1">
                {s.v}
              </div>
              <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}

function Packages() {
  const tiers = [
    {
      name: "Podporovatel",
      price: "20 — 50 000 Kč",
      tag: "Silver",
      color: "#c9c9c9",
      features: [
        "Logo na webu + materiálech akce",
        "QR stand na místě",
        "Balíček in-kind (catering, swag, cloud credits)",
        "Foto z akce v recap postu",
      ],
    },
    {
      name: "Mentor partner",
      price: "80 — 150 000 Kč",
      tag: "Gold",
      color: "var(--color-brand)",
      popular: true,
      features: [
        "Vše z Podporovatele",
        "3× mentor na víkend",
        "15min tech talk před hackathonem",
        "Dedicated recruiting booth",
        "LinkedIn co-post o akci",
      ],
    },
    {
      name: "Titulní partner",
      price: "250 000 Kč+",
      tag: "Platinum",
      color: "var(--color-brand-2)",
      features: [
        "Vše z Mentor partner",
        "Titulní pozice na webu, tričkách i PR",
        "Vlastní kategorie ceny",
        "Keynote slot na opening",
        "Přímý DM kontakt na top 10 finalistů",
        "Post-event recruiting day",
      ],
    },
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">Balíčky</div>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          Tři úrovně podle toho, co chcete získat.
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--color-muted)]">
          Ceny jsou orientační — finální nastavení podle počtu akcí, regionu a délky spolupráce.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={`relative rounded-2xl border bg-[var(--color-ink-3)] p-7 ${
                t.popular
                  ? "border-[var(--color-brand)] shadow-[0_0_0_1px_var(--color-brand)]"
                  : "border-[var(--color-line)]"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-6 rounded-full bg-[var(--color-brand)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)]">
                  Nejoblíbenější
                </div>
              )}
              <div className="text-xs uppercase tracking-widest" style={{ color: t.color }}>
                {t.tag}
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                {t.name}
              </h3>
              <div className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-white">
                {t.price}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-[var(--color-fg)]/90">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: t.color }} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-10 md:p-16">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--color-brand)]/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-[var(--color-brand-2)]/15 blur-3xl pointer-events-none" />
        <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-white">
              Pojďme si o tom <span className="text-[var(--color-brand)]">popovídat.</span>
            </h2>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              30 minut online call — zjistíme, jestli partnerství dává smysl oběma stranám. Žádné
              PDF drama, žádný closery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:partneri@hackmania.cz?subject=Partnerství Hackmania"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> partneri@hackmania.cz
              </a>
              <a
                href="https://www.linkedin.com/company/hackmania-cz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                <LinkedInIcon className="h-4 w-4" /> DM přes LinkedIn
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-3)] p-6 text-sm">
            <div className="font-[family-name:var(--font-display)] text-white font-semibold">
              Co nám poslat
            </div>
            <ul className="mt-3 space-y-2 text-[var(--color-muted)]">
              <li>• Krátké představení firmy</li>
              <li>• Cíl partnerství (recruiting / mentoring / brand)</li>
              <li>• Orientační rozpočet a časový horizont</li>
              <li>• Kontaktní osoba</li>
            </ul>
            <div className="mt-5 rounded-lg bg-[var(--color-ink)] p-3 text-xs text-[var(--color-muted)]">
              Ozveme se do 48 hodin s návrhem packagu nebo rovnou kalendářem.
            </div>
            <Link
              href="/partneri"
              className="mt-5 inline-flex text-sm text-[var(--color-brand)] hover:text-white transition"
            >
              Podívej se na stávající partnery →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
