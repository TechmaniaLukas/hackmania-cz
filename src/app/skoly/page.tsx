"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Building2, GraduationCap, Trophy, Search } from "lucide-react";
import { schools, type School } from "@/lib/mock-data";

const SchoolsMap = dynamic(
  () => import("@/components/SchoolsMap").then((m) => m.SchoolsMap),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[460px] md:h-[560px] w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] flex items-center justify-center text-[var(--color-muted)]">
        Načítání mapy…
      </div>
    ),
  }
);

const typeLabels: Record<School["type"], string> = {
  university: "Vysoká škola",
  highschool: "Střední škola",
  other: "Jiná instituce",
};
type TypeFilter = "all" | School["type"];

const allRegions = Array.from(new Set(schools.map((s) => s.region))).sort();

export default function SkolyPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [region, setRegion] = useState("");
  const [focused, setFocused] = useState<string | undefined>();

  const filtered = useMemo(() => {
    return schools
      .filter((s) => {
        if (type !== "all" && s.type !== type) return false;
        if (region && s.region !== region) return false;
        if (q) {
          const n = q.toLowerCase();
          if (
            !s.name.toLowerCase().includes(n) &&
            !s.short.toLowerCase().includes(n) &&
            !s.city.toLowerCase().includes(n)
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => (b.hackathonsHosted ?? 0) - (a.hackathonsHosted ?? 0));
  }, [q, type, region]);

  const stats = {
    uni: schools.filter((s) => s.type === "university").length,
    hs: schools.filter((s) => s.type === "highschool").length,
    hackathons: schools.reduce((a, s) => a + (s.hackathonsHosted ?? 0), 0),
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">Komunita</div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white">
            Školy na <span className="text-[var(--color-brand)]">mapě Česka</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Střední i vysoké školy, které s námi pořádají hackathony nebo workshopy. Jste zástupce
            školy? Podívejte se na{" "}
            <a href="/pro-skoly" className="text-[var(--color-brand)] underline underline-offset-4">
              možnosti partnerství
            </a>
            .
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl">
            <Stat k={`${stats.uni}`} v="vysokých škol" />
            <Stat k={`${stats.hs}`} v="středních škol" />
            <Stat k={`${stats.hackathons}+`} v="hostovaných akcí" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 space-y-6">
        <SchoolsMap schools={filtered} focusedSlug={focused} />

        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <label htmlFor="school-search" className="sr-only">Hledat školu</label>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              id="school-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hledat školu, město…"
              className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none"
            />
          </div>
          <select
            aria-label="Typ školy"
            value={type}
            onChange={(e) => setType(e.target.value as TypeFilter)}
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] px-3 py-2.5 text-sm text-white focus:border-[var(--color-brand)] focus:outline-none"
          >
            <option value="all">Všechny typy</option>
            <option value="university">Vysoké školy</option>
            <option value="highschool">Střední školy</option>
          </select>
          <select
            aria-label="Kraj"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] px-3 py-2.5 text-sm text-white focus:border-[var(--color-brand)] focus:outline-none"
          >
            <option value="">Všechny kraje</option>
            {allRegions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-[var(--color-muted)]">
          Nalezeno <span className="text-white font-semibold">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "škola" : filtered.length < 5 ? "školy" : "škol"}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const Icon = s.type === "university" ? GraduationCap : s.type === "highschool" ? Building2 : MapPin;
            const accent = s.type === "university" ? "var(--color-brand)" : s.type === "highschool" ? "var(--color-brand-2)" : "var(--color-magenta)";
            return (
              <button
                key={s.slug}
                onMouseEnter={() => setFocused(s.slug)}
                onMouseLeave={() => setFocused(undefined)}
                onFocus={() => setFocused(s.slug)}
                onBlur={() => setFocused(undefined)}
                className="group text-left rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-5 transition hover:border-[color:var(--accent)] hover:bg-[var(--color-ink-3)]"
                style={{ ["--accent" as string]: accent }}
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: accent }}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {typeLabels[s.type]}
                </div>
                <div className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  {s.name}
                </div>
                <div className="mt-1 text-sm text-[var(--color-muted)] line-clamp-2">{s.short}</div>
                <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" /> {s.city}
                  </span>
                  {typeof s.hackathonsHosted === "number" && s.hackathonsHosted > 0 && (
                    <span className="flex items-center gap-1 text-[var(--color-brand)]">
                      <Trophy className="h-3 w-3" aria-hidden="true" /> {s.hackathonsHosted}×
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[var(--color-line)] p-16 text-center text-[var(--color-muted)]">
            Nic jsme nenašli. Zkus uvolnit filtry.
          </div>
        )}
      </section>
    </>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)]/60 p-4 backdrop-blur">
      <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white">{k}</div>
      <div className="mt-0.5 text-xs text-[var(--color-muted)]">{v}</div>
    </div>
  );
}
