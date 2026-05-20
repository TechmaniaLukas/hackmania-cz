import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CalendarPlus,
  ExternalLink,
  MapPin,
  Tag,
  User,
  Users,
  Wifi,
} from "lucide-react";
import { events, eventTypeLabels } from "@/lib/mock-data";
import { formatDate, formatDateRange } from "@/lib/utils";
import { EventCard } from "@/components/EventCard";
import { ShareButtons } from "@/components/ShareButtons";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) return { title: "Akce nenalezena — Hackmania" };
  return {
    title: ev.name,
    description: ev.description,
    alternates: { canonical: `/akce/${ev.slug}` },
    openGraph: {
      title: ev.name,
      description: ev.description,
      type: "article",
      url: `https://hackmania.cz/akce/${ev.slug}`,
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title: ev.name, description: ev.description, images: ["/twitter-image"] },
  };
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) notFound();

  const related = events.filter((x) => x.slug !== ev.slug && x.startDate > Date.now()).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hackmania", item: "https://hackmania.cz" },
      { "@type": "ListItem", position: 2, name: "Akce", item: "https://hackmania.cz/akce" },
      { "@type": "ListItem", position: 3, name: ev.name, item: `https://hackmania.cz/akce/${ev.slug}` },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.name,
    description: ev.description,
    startDate: new Date(ev.startDate).toISOString(),
    endDate: ev.endDate ? new Date(ev.endDate).toISOString() : undefined,
    eventAttendanceMode: ev.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: ev.isOnline
      ? { "@type": "VirtualLocation", url: ev.registrationUrl }
      : {
          "@type": "Place",
          name: ev.venue ?? ev.city,
          address: { "@type": "PostalAddress", addressLocality: ev.city, addressCountry: "CZ" },
        },
    organizer: { "@type": "Organization", name: ev.organizer },
    performer: ev.lecturer ? { "@type": "Person", name: ev.lecturer } : undefined,
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
            href="/akce"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zpět na přehled
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest">
            <span className="rounded-full bg-[var(--color-brand)]/15 px-2.5 py-1 text-[var(--color-brand)]">
              {eventTypeLabels[ev.type]}
            </span>
            {ev.isOnline ? (
              <span className="rounded-full bg-[var(--color-brand-2)]/10 px-2.5 py-1 text-[var(--color-brand-2)]">
                Online
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-white">{ev.city}</span>
            )}
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-[var(--color-muted)]">
              {ev.organizer}
            </span>
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {ev.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-[var(--color-muted)] leading-relaxed">
            {ev.longDescription ?? ev.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {ev.registrationUrl && (
              <a
                href={ev.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
              >
                Registrovat se <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <a
              href={`/akce/${ev.slug}/ical`}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" /> Přidat do kalendáře
            </a>
          </div>
          <div className="mt-8">
            <ShareButtons title={`${ev.name} — Hackmania`} path={`/akce/${ev.slug}`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Info
            icon={CalendarDays}
            label="Termín"
            value={
              ev.endDate
                ? formatDateRange(ev.startDate, ev.endDate)
                : formatDate(ev.startDate)
            }
          />
          <Info icon={MapPin} label="Místo" value={ev.venue ?? ev.city} />
          {ev.lecturer ? (
            <Info icon={User} label="Lektor" value={ev.lecturer} />
          ) : (
            <Info icon={Wifi} label="Formát" value={ev.isOnline ? "Online" : "Na místě"} />
          )}
          {ev.price && <Info icon={Tag} label="Cena" value={ev.price} />}
          {!ev.price && ev.capacity && (
            <Info icon={Users} label="Kapacita" value={`${ev.capacity} míst`} />
          )}
        </div>

        <div className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Témata
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {ev.topics.map((t) => (
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

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 border-t border-[var(--color-line)]">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white">
            Další akce v kalendáři
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <EventCard key={r.slug} e={r} />
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
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-muted)]">
        <Icon className="h-3.5 w-3.5" aria-hidden={true} /> {label}
      </div>
      <div className="mt-2 text-white font-semibold">{value}</div>
    </div>
  );
}
