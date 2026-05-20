import Link from "next/link";
import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";
import { type Hackathon } from "@/lib/mock-data";
import { formatDateRange } from "@/lib/utils";

export function HackathonCard({ h }: { h: Hackathon }) {
  return (
    <Link
      href={`/hackathony/${h.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 transition hover:border-[var(--color-brand)]/60 hover:bg-[var(--color-ink-3)]"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-brand)]/0 blur-3xl transition group-hover:bg-[var(--color-brand)]/20" />
      <div className="relative flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-muted)]">
        {h.status === "past" && (
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/80">Uplynulý</span>
        )}
        {h.isOnline ? (
          <span className="rounded-full bg-[var(--color-brand-2)]/10 px-2 py-0.5 text-[var(--color-brand-2)]">Online</span>
        ) : (
          <span className="rounded-full bg-white/5 px-2 py-0.5">{h.city}</span>
        )}
        {h.status !== "past" && h.featured && (
          <span className="rounded-full bg-[var(--color-brand)]/15 px-2 py-0.5 text-[var(--color-brand)]">Doporučené</span>
        )}
        {h.status === "past" && h.recap && (
          <span className="rounded-full bg-[var(--color-brand)]/15 px-2 py-0.5 text-[var(--color-brand)]">📸 Ohlédnutí</span>
        )}
      </div>
      <h3 className="relative mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-white">
        {h.name}
      </h3>
      <p className="relative mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">{h.description}</p>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {h.topics.map((t) => (
          <span key={t} className="rounded-md border border-[var(--color-line)] px-2 py-0.5 text-[11px] text-[var(--color-fg)]/80">
            {t}
          </span>
        ))}
      </div>
      <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-[var(--color-line)] pt-4 text-xs text-[var(--color-muted)]">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDateRange(h.startDate, h.endDate)}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {h.venue ?? h.city}
        </div>
        {h.prizePool && (
          <div className="flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" />
            {h.prizePool}
          </div>
        )}
        {h.capacity && (
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {h.capacity} míst
          </div>
        )}
      </div>
    </Link>
  );
}
