import Link from "next/link";
import {
  MessageCircle,
  Bell,
  Users,
  CalendarDays,
  Trophy,
  Heart,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { QrCard } from "@/components/QrCard";

const title = "Komunita";
const description =
  "Přidej se ke komunitě Hackmania na Discordu a WhatsApp. Chat, oznámení, mentoři, tipy na hackathony a hledání týmů.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/komunita" },
  openGraph: { title, description, url: "https://hackmania.cz/komunita", type: "website" as const, images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image" as const, title, description, images: ["/twitter-image"] },
};

export default function KomunitaPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
            Komunita
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]">
            Stavíme to <span className="text-[var(--color-brand)]">spolu.</span>
            <br />
            <span className="text-[var(--color-brand-2)]">Každý den.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-muted)]">
            Hackmania není jen web — je to lidi. Studenti, mentoři, organizátoři
            a firmy, kteří se denně potkávají na našem Discordu a ve WhatsApp
            skupině. Přidej se.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <QrCard platform="discord" />
          <QrCard platform="whatsapp" />
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-2)]">
              Co tam najdeš
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Živá komunita, která ti pomůže ze zákulisí
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Perk
              icon={MessageCircle}
              title="Kanály podle akcí"
              desc="Každý hackathon má svůj Discord kanál — dotazy na pořadatele, týmové diskuze, sdílení zdrojů."
            />
            <Perk
              icon={Bell}
              title="Push oznámení"
              desc="Ve WhatsApp skupině ti neuniknou deadliny, early bird registrace ani změny programu."
            />
            <Perk
              icon={Users}
              title="Hledání týmů"
              desc="Kanál #teammate-search — napiš, co umíš a čím bys chtěl přispět. Tým najdeš za hodiny, ne dny."
            />
            <Perk
              icon={CalendarDays}
              title="Kalendář akcí"
              desc="Workshopy, meetupy, přednášky po celé ČR. Synchronizace s Google Calendar přímo z Discord botu."
            />
            <Perk
              icon={Trophy}
              title="Archiv projektů"
              desc="Pitch decky, repozitáře a videa z minulých ročníků — inspirace pro ten tvůj další projekt."
            />
            <Perk
              icon={Heart}
              title="Mentoři online"
              desc="Senioři ze Seznamu, Applifting, JetBrains i zakladatelé startupů. Ptej se v #mentoring."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-xl bg-[var(--color-brand)]/10 p-3">
            <ShieldCheck className="h-6 w-6 text-[var(--color-brand)]" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white">
              Pravidla komunity
            </h2>
            <p className="mt-3 text-[var(--color-muted)] leading-relaxed">
              Chováme se k sobě slušně — žádný rasismus, sexismus, homofobie nebo
              osobní útoky. Nezveřejňujeme soukromé zprávy bez souhlasu. Reklama
              a nábor jen v kanálu <code className="rounded bg-white/5 px-1.5 py-0.5 text-white">#jobs</code>.
              AI generovaný obsah označujeme. Když máš pocit, že něco není v
              pořádku, napiš adminům nebo{" "}
              <a
                href="mailto:ahoj@hackmania.cz"
                className="text-[var(--color-brand)] underline underline-offset-4 hover:text-white transition"
              >
                ahoj@hackmania.cz
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-10 md:p-16">
          <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--color-brand-2)]/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-[var(--color-brand)]/15 blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-white">
              Organizuješ lokální <span className="text-[var(--color-brand-2)]">meetup?</span>
            </h2>
            <p className="mt-4 text-lg text-[var(--color-muted)]">
              Založíme ti na Discordu vlastní kanál, propojíme se školami v
              regionu a přidáme tvou akci do kalendáře. Stačí se ozvat.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
              >
                Napiš nám <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hackathony"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Prozkoumat akce
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Perk({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-3)] p-6">
      <Icon className="h-6 w-6 text-[var(--color-brand)]" />
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{desc}</p>
    </div>
  );
}
