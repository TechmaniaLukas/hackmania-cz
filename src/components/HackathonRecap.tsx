import Image from "next/image";
import { Trophy, Camera, Megaphone, PlayCircle, ExternalLink, Code2, Award } from "lucide-react";
import type { Hackathon, HackathonWinner, HackathonUpdate } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function HackathonRecap({ h }: { h: Hackathon }) {
  const r = h.recap;
  if (!r) return null;

  return (
    <>
      <RecapStats r={r} />
      <Winners winners={r.winners} />
      <Gallery photos={r.gallery} videoUrl={r.videoUrl} />
      <RecapSummary summary={r.summary} />
      <Updates updates={r.updates} />
    </>
  );
}

function RecapStats({ r }: { r: NonNullable<Hackathon["recap"]> }) {
  const stats = [
    { k: `${r.stats.attendees}`, v: "účastníků" },
    { k: `${r.stats.teams}`, v: "týmů" },
    { k: `${r.stats.submissions}`, v: "projektů" },
    r.stats.prizePool ? { k: r.stats.prizePool, v: "na cenách" } : null,
  ].filter(Boolean) as { k: string; v: string }[];
  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.v}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 text-center"
          >
            <div className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white">
              {s.k}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest text-[var(--color-muted)]">
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Winners({ winners }: { winners: HackathonWinner[] }) {
  if (winners.length === 0) return null;
  const podium = [winners.find((w) => w.place === 1), winners.find((w) => w.place === 2), winners.find((w) => w.place === 3)].filter(Boolean) as HackathonWinner[];
  const specials = winners.filter((w) => w.place === "special");

  const placeMeta: Record<number, { label: string; color: string }> = {
    1: { label: "1. místo", color: "var(--color-brand)" },
    2: { label: "2. místo", color: "var(--color-brand-2)" },
    3: { label: "3. místo", color: "var(--color-magenta)" },
  };

  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
          <Trophy className="h-4 w-4" aria-hidden="true" /> Vítězové
        </div>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white">
          Týmy, které se zapsaly do historie
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {podium.map((w) => {
            const meta = placeMeta[w.place as 1 | 2 | 3];
            return (
              <article
                key={w.teamName}
                className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-3)] p-6 flex flex-col"
              >
                <div
                  className="absolute -top-14 -right-14 h-36 w-36 rounded-full blur-3xl opacity-40"
                  style={{ background: meta.color }}
                />
                <div className="relative flex items-center justify-between">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: `${meta.color}22`, color: meta.color }}
                  >
                    <Award className="h-3.5 w-3.5" aria-hidden="true" /> {meta.label}
                  </div>
                  {w.category && (
                    <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)]">
                      {w.category}
                    </span>
                  )}
                </div>
                <h3 className="relative mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {w.projectName}
                </h3>
                <div className="relative mt-1 text-sm text-[var(--color-muted)]">
                  Tým <span className="text-white">{w.teamName}</span>
                </div>
                {w.oneLiner && (
                  <p className="relative mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
                    {w.oneLiner}
                  </p>
                )}
                {w.members && w.members.length > 0 && (
                  <div className="relative mt-4 text-xs text-[var(--color-muted)]">
                    {w.members.join(", ")}
                  </div>
                )}
                {(w.projectUrl || w.repoUrl) && (
                  <div className="relative mt-5 flex gap-3 text-sm">
                    {w.projectUrl && (
                      <a
                        href={w.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--color-brand)] hover:text-white transition"
                      >
                        Projekt <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {w.repoUrl && (
                      <a
                        href={w.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[var(--color-brand-2)] hover:text-white transition"
                      >
                        Repo <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {specials.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {specials.map((w) => (
              <div
                key={w.teamName}
                className="rounded-2xl border border-dashed border-[var(--color-line)] bg-[var(--color-ink-3)]/50 p-5"
              >
                <div className="text-[10px] uppercase tracking-widest text-[var(--color-magenta)]">
                  {w.category ?? "Speciální cena"}
                </div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  {w.projectName}
                </div>
                <div className="text-sm text-[var(--color-muted)]">{w.teamName}</div>
                {w.oneLiner && <div className="mt-2 text-sm text-[var(--color-muted)]">{w.oneLiner}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Gallery({
  photos,
  videoUrl,
}: {
  photos: NonNullable<Hackathon["recap"]>["gallery"];
  videoUrl?: string;
}) {
  if (photos.length === 0 && !videoUrl) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-brand-2)]">
        <Camera className="h-4 w-4" aria-hidden="true" /> Galerie
      </div>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white">
          Atmosféra víkendu
        </h2>
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <PlayCircle className="h-4 w-4" aria-hidden="true" /> Videozáznam
          </a>
        )}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--color-line)] ${
              i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[3/2] sm:aspect-[16/10]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={p.src}
              alt={p.caption ?? "Fotka z hackathonu"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              unoptimized
            />
            {p.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-sm text-white opacity-0 group-hover:opacity-100 transition">
                {p.caption}
                {p.credit && (
                  <span className="block text-[10px] text-white/70 mt-0.5">© {p.credit}</span>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

function RecapSummary({ summary }: { summary: string }) {
  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-ink-2)] py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">Ohlédnutí</div>
        <p className="mt-4 font-[family-name:var(--font-display)] text-2xl md:text-3xl text-white leading-snug">
          {summary}
        </p>
      </div>
    </section>
  );
}

function Updates({ updates }: { updates: HackathonUpdate[] }) {
  if (updates.length === 0) return null;

  const typeMeta: Record<HackathonUpdate["type"], { label: string; color: string }> = {
    live: { label: "Live update", color: "var(--color-brand-2)" },
    winners: { label: "Vítězové", color: "var(--color-brand)" },
    recap: { label: "Recap", color: "#ffb547" },
    press: { label: "Tisk", color: "var(--color-magenta)" },
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
        <Megaphone className="h-4 w-4" aria-hidden="true" /> Aktuality & archiv
      </div>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-white">
        Timeline víkendu a po něm
      </h2>
      <ol className="mt-10 relative border-l border-[var(--color-line)] ml-3 space-y-8">
        {updates.map((u) => {
          const meta = typeMeta[u.type];
          return (
            <li key={u.title + u.date} className="pl-6 relative">
              <span
                className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[var(--color-ink-2)]"
                style={{ background: meta.color }}
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className="rounded-full px-2 py-0.5 font-semibold uppercase tracking-widest"
                  style={{ background: `${meta.color}22`, color: meta.color }}
                >
                  {meta.label}
                </span>
                <time className="text-[var(--color-muted)]">{formatDate(u.date)}</time>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                {u.title}
              </h3>
              <p className="mt-1 text-[var(--color-muted)] leading-relaxed">{u.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
