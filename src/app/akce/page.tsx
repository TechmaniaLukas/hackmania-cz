"use client";

import { useMemo, useState } from "react";
import { events, eventTypeLabels, type EventItem } from "@/lib/mock-data";
import { EventCard } from "@/components/EventCard";
import { Search } from "lucide-react";

const allCities = Array.from(new Set(events.map((e) => e.city))).sort();
type TypeFilter = "all" | EventItem["type"];
type TimeFilter = "upcoming" | "past" | "all";

export default function AkcePage() {
  const [q, setQ] = useState("");
  const [time, setTime] = useState<TimeFilter>("upcoming");
  const [type, setType] = useState<TypeFilter>("all");
  const [city, setCity] = useState<string>("");

  const filtered = useMemo(() => {
    const now = Date.now();
    return events
      .filter((e) => {
        const end = e.endDate ?? e.startDate;
        const isPast = end < now;
        if (time === "upcoming" && isPast) return false;
        if (time === "past" && !isPast) return false;
        return true;
      })
      .filter((e) => {
        if (type !== "all" && e.type !== type) return false;
        if (city && e.city !== city) return false;
        if (q) {
          const needle = q.toLowerCase();
          if (
            !e.name.toLowerCase().includes(needle) &&
            !e.description.toLowerCase().includes(needle) &&
            !e.city.toLowerCase().includes(needle)
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        const aPast = (a.endDate ?? a.startDate) < Date.now();
        const bPast = (b.endDate ?? b.startDate) < Date.now();
        if (aPast !== bPast) return aPast ? 1 : -1; // upcoming first
        return aPast ? b.startDate - a.startDate : a.startDate - b.startDate;
      });
  }, [q, time, type, city]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
            Kalendář
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white">
            Workshopy, meetupy a <span className="text-[var(--color-brand)]">konference</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Menší formáty pro ty, kdo se chtějí učit a potkávat. Výuková víkendová i večerní
            setkání po celé ČR a online.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <label htmlFor="event-search" className="sr-only">
              Hledat akci
            </label>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              id="event-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hledat akci…"
              className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none"
            />
          </div>
          <select
            aria-label="Termín"
            value={time}
            onChange={(e) => setTime(e.target.value as TimeFilter)}
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] px-3 py-2.5 text-sm text-white focus:border-[var(--color-brand)] focus:outline-none"
          >
            <option value="upcoming">Nadcházející</option>
            <option value="past">Uplynulé</option>
            <option value="all">Vše</option>
          </select>
          <select
            aria-label="Typ akce"
            value={type}
            onChange={(e) => setType(e.target.value as TypeFilter)}
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] px-3 py-2.5 text-sm text-white focus:border-[var(--color-brand)] focus:outline-none"
          >
            <option value="all">Všechny typy</option>
            {(Object.keys(eventTypeLabels) as EventItem["type"][]).map((t) => (
              <option key={t} value={t}>
                {eventTypeLabels[t]}
              </option>
            ))}
          </select>
          <select
            aria-label="Město"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] px-3 py-2.5 text-sm text-white focus:border-[var(--color-brand)] focus:outline-none"
          >
            <option value="">Všechna města</option>
            {allCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-[var(--color-muted)]">
          Nalezeno <span className="text-white font-semibold">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "akce" : filtered.length < 5 ? "akce" : "akcí"}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.slug} e={e} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-20 rounded-2xl border border-dashed border-[var(--color-line)] p-16 text-center text-[var(--color-muted)]">
            Nic jsme nenašli. Zkus uvolnit filtry.
          </div>
        )}
      </section>
    </>
  );
}
