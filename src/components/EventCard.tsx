import Link from "next/link";
import { CalendarDays, MapPin, User, Users, Tag } from "lucide-react";
import { type EventItem, eventTypeLabels } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const typeAccent: Record<EventItem["type"], string> = {
  workshop: "var(--color-brand)",
  meetup: "var(--color-brand-2)",
  conference: "var(--color-magenta)",
  prednaska: "#ffb547",
};

export function EventCard({ e }: { e: EventItem }) {
  const accent = typeAccent[e.type];
  const isPast = (e.endDate ?? e.startDate) < Date.now();
  return (
    <Link
      href={`/akce/${e.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 transition hover:bg-[var(--color-ink-3)]"
      style={{ ["--card-accent" as string]: accent }}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition group-hover:opacity-30"
        style={{ background: accent }}
      />
      <div className="relative flex items-center gap-2 text-xs uppercase tracking-widest">
        {isPast && (
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/80">Uplynulá</span>
        )}
        <span
          className="rounded-full px-2 py-0.5"
          style={{ background: `${accent}22`, color: accent }}
        >
          {eventTypeLabels[e.type]}
        </span>
        {e.isOnline ? (
          <span className="rounded-full bg-[var(--color-brand-2)]/10 px-2 py-0.5 text-[var(--color-brand-2)]">Online</span>
        ) : (
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[var(--color-muted)]">{e.city}</span>
        )}
      </div>
      <h3 className="relative mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-white group-hover:text-[color:var(--card-accent)] transition">
        {e.name}
      </h3>
      <p className="relative mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">{e.description}</p>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {e.topics.slice(0, 3).map((t) => (
          <span key={t} className="rounded-md border border-[var(--color-line)] px-2 py-0.5 text-[11px] text-[var(--color-fg)]/80">
            {t}
          </span>
        ))}
      </div>
      <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-[var(--color-line)] pt-4 text-xs text-[var(--color-muted)]">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {formatDate(e.startDate)}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {e.venue ?? e.city}
        </div>
        {e.lecturer && (
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {e.lecturer}
          </div>
        )}
        {e.price && (
          <div className="flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" aria-hidden="true" />
            {e.price}
          </div>
        )}
        {!e.lecturer && e.capacity && (
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {e.capacity} míst
          </div>
        )}
      </div>
    </Link>
  );
}
