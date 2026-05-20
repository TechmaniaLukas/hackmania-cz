"use client";

// Metadata must live in a server-component file. This page is client because of
// the filter state; we export metadata from the nested detail route and rely on
// the root layout title template. See src/app/hackathony/layout.tsx for page title.
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { HackathonCard } from "@/components/HackathonCard";
import { Search } from "lucide-react";

export default function HackathonsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "upcoming" | "ongoing" | "past">("upcoming");
  const [topic, setTopic] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const hackathons = useQuery(api.hackathons.list, {}) ?? [];
  const loading = useQuery(api.hackathons.list, {}) === undefined;
  const allTopics = useMemo(
    () => Array.from(new Set(hackathons.flatMap((h) => h.topics))).sort(),
    [hackathons]
  );
  const allCities = useMemo(
    () => Array.from(new Set(hackathons.map((h) => h.city))).sort(),
    [hackathons]
  );

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      if (status !== "all" && h.status !== status) return false;
      if (topic && !h.topics.includes(topic)) return false;
      if (city && h.city !== city) return false;
      if (q) {
        const needle = q.toLowerCase();
        if (
          !h.name.toLowerCase().includes(needle) &&
          !h.description.toLowerCase().includes(needle) &&
          !h.city.toLowerCase().includes(needle)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [hackathons, q, status, topic, city]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
            Katalog
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white">
            Všechny <span className="text-[var(--color-brand)]">hackathony</span> v ČR
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Filtruj podle tématu, města a termínu. Přidáváme průběžně z celé republiky.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <label htmlFor="hack-search" className="sr-only">Hledat hackathon</label>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
            <input
              id="hack-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Hledat hackathon…"
              className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none"
            />
          </div>
          <Select label="Stav akce" value={status} onChange={(v) => setStatus(v as "all" | "upcoming" | "ongoing" | "past")} options={[
            { v: "upcoming", l: "Nadcházející" },
            { v: "ongoing", l: "Probíhá" },
            { v: "past", l: "Uplynulé" },
            { v: "all", l: "Vše" },
          ]} />
          <Select label="Téma" value={topic} onChange={setTopic} options={[{ v: "", l: "Všechna témata" }, ...allTopics.map((t) => ({ v: t, l: t }))]} />
          <Select label="Město" value={city} onChange={setCity} options={[{ v: "", l: "Všechna města" }, ...allCities.map((c) => ({ v: c, l: c }))]} />
        </div>

        <div className="mt-4 text-sm text-[var(--color-muted)]">
          {loading ? (
            "Načítám hackathony…"
          ) : (
            <>
              Nalezeno <span className="text-white font-semibold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "hackathon" : filtered.length < 5 ? "hackathony" : "hackathonů"}
            </>
          )}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => (
            <HackathonCard key={h.slug} h={h} />
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

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-[var(--color-line)] bg-[var(--color-ink-2)] px-3 py-2.5 text-sm text-white focus:border-[var(--color-brand)] focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.v} value={o.v} className="bg-[var(--color-ink-2)]">
          {o.l}
        </option>
      ))}
    </select>
  );
}
