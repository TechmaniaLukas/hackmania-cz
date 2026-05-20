import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, ExternalLink, MapPin, Trophy, Users, Wifi, CalendarPlus } from "lucide-react";
import { hackathons } from "@/lib/mock-data";
import { formatDateRange } from "@/lib/utils";
import { HackathonCard } from "@/components/HackathonCard";
import { HackathonRecap } from "@/components/HackathonRecap";
import { ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return hackathons.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = hackathons.find((x) => x.slug === slug);
  if (!h) return { title: "Hackathon nenalezen — Hackmania" };
  return {
    title: h.name,
    description: h.description,
    alternates: { canonical: `/hackathony/${h.slug}` },
    openGraph: {
      title: h.name,
      description: h.description,
      type: "article",
      url: `https://hackmania.cz/hackathony/${h.slug}`,
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title: h.name, description: h.description, images: ["/twitter-image"] },
  };
}

export default async function HackathonDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = hackathons.find((x) => x.slug === slug);
  if (!h) notFound();

  const isPast = h.status === "past";
  const related = hackathons
    .filter((x) => x.slug !== h.slug)
    .filter((x) => (isPast ? x.status === "past" : x.status !== "past"))
    .slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hackmania", item: "https://hackmania.cz" },
      { "@type": "ListItem", position: 2, name: "Hackathony", item: "https://hackmania.cz/hackathony" },
      { "@type": "ListItem", position: 3, name: h.name, item: `https://hackmania.cz/hackathony/${h.slug}` },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: h.name,
    description: h.longDescription ?? h.description,
    startDate: new Date(h.startDate).toISOString(),
    endDate: new Date(h.endDate).toISOString(),
    eventAttendanceMode: h.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: h.isOnline
      ? { "@type": "VirtualLocation", url: h.websiteUrl ?? h.registrationUrl }
      : {
          "@type": "Place",
          name: h.venue ?? h.city,
          address: { "@type": "PostalAddress", addressLocality: h.city, addressCountry: "CZ" },
        },
    organizer: { "@type": "Organization", name: h.organizer },
    offers: h.registrationUrl
      ? {
          "@type": "Offer",
          url: h.registrationUrl,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-16">
          <Link
            href="/hackathony"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět na katalog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest">
            {isPast && (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white">Uplynulý ročník</span>
            )}
            {h.isOnline ? (
              <span className="rounded-full bg-[var(--color-brand-2)]/10 px-2.5 py-1 text-[var(--color-brand-2)]">Online</span>
            ) : (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white">{h.city}</span>
            )}
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-[var(--color-muted)]">{h.organizer}</span>
            {!isPast && h.featured && (
              <span className="rounded-full bg-[var(--color-brand)]/15 px-2.5 py-1 text-[var(--color-brand)]">Doporučené</span>
            )}
            {isPast && h.recap && (
              <span className="rounded-full bg-[var(--color-brand)]/15 px-2.5 py-1 text-[var(--color-brand)]">📸 Ohlédnutí</span>
            )}
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {h.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-[var(--color-muted)] leading-relaxed">
            {h.longDescription ?? h.description}
          </p>
          {!isPast && (
            <div className="mt-8 flex flex-wrap gap-3">
              {h.registrationUrl && (
                <a
                  href={h.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
                >
                  Registrovat se <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <a
                href={`/hackathony/${h.slug}/ical`}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                <CalendarPlus className="h-4 w-4" /> Přidat do kalendáře
              </a>
              {h.websiteUrl && (
                <a
                  href={h.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  Web akce
                </a>
              )}
            </div>
          )}
          <div className="mt-8">
            <ShareButtons title={`${h.name} — Hackmania`} path={`/hackathony/${h.slug}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Info icon={CalendarDays} label="Termín" value={formatDateRange(h.startDate, h.endDate)} />
          <Info icon={MapPin} label="Místo" value={h.venue ?? h.city} />
          {h.prizePool && <Info icon={Trophy} label="Ceny" value={h.prizePool} />}
          {h.capacity ? (
            <Info icon={Users} label="Kapacita" value={`${h.capacity} účastníků`} />
          ) : (
            <Info icon={Wifi} label="Formát" value={h.isOnline ? "Online" : "Na místě"} />
          )}
        </div>

        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Témata
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {h.topics.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--color-line)] bg-[var(--color-ink-2)] px-3 py-1.5 text-sm text-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {isPast && h.recap && <HackathonRecap h={h} />}

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 border-t border-[var(--color-line)]">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white">
            {isPast ? "Další uplynulé ročníky" : "Mohlo by tě zajímat"}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <HackathonCard key={r.slug} h={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-muted)]">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-2 text-white font-semibold">{value}</div>
    </div>
  );
}
