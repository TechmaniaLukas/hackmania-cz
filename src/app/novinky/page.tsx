"use client";

import { useState } from "react";
import { news, categoryLabels, type NewsItem } from "@/lib/mock-data";
import { NewsCard } from "@/components/NewsCard";

type Category = NewsItem["category"] | "all";

const tabs: { v: Category; l: string }[] = [
  { v: "all", l: "Vše" },
  { v: "ai", l: "AI" },
  { v: "vibecoding", l: "Vibecoding" },
  { v: "ai-kamery", l: "AI kamery" },
  { v: "ai-nastroje", l: "AI nástroje" },
  { v: "matematika", l: "Matematika" },
  { v: "technika", l: "Technika" },
  { v: "robotika", l: "Robotika" },
];

export default function NovinkyPage() {
  const [cat, setCat] = useState<Category>("all");
  const filtered = cat === "all" ? news : news.filter((n) => n.category === cat);
  const [hero, ...rest] = filtered;

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-70 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-2)]">Novinky</div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white">
            Svět AI, techniky a <span className="text-[var(--color-brand-2)]">robotiky</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Denně agregujeme novinky ze světových i českých zdrojů. AI modely, vibecoding, kamery,
            matematika, robotika — vše na jednom místě.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.v}
              onClick={() => setCat(t.v)}
              className={`rounded-full border px-4 py-2.5 text-sm min-h-[40px] transition ${
                cat === t.v
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[var(--color-ink)] font-semibold"
                  : "border-[var(--color-line)] bg-[var(--color-ink-2)] text-[var(--color-muted)] hover:text-white"
              }`}
            >
              {t.l}
              {t.v !== "all" && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  {news.filter((n) => n.category === t.v).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-[var(--color-line)] p-16 text-center text-[var(--color-muted)]">
            V této kategorii zatím není žádný článek.
          </div>
        ) : (
          <>
            <h2 className="sr-only">Nejnovější článek</h2>
            <div className="mt-8">{hero && <NewsCard n={hero} large />}</div>
            <h2 className="sr-only">Další články</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((n) => (
                <NewsCard key={n.slug} n={n} />
              ))}
            </div>
          </>
        )}

        <aside className="mt-16 rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 text-sm text-[var(--color-muted)]">
          <div className="font-[family-name:var(--font-display)] text-white font-semibold mb-2">
            Odkud novinky pocházejí?
          </div>
          Novinky automaticky agregujeme z RSS feedů a vybraných zdrojů (Anthropic, DeepMind,
          HuggingFace, TechCrunch, Lupa.cz, Zdroják a další) a obohacujeme o stručné české shrnutí.
          Zdroj je vždy uveden v patičce článku a prokliká tě přímo na původní text.
        </aside>
      </section>
    </>
  );
}
