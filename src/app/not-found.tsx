import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export const metadata = {
  title: "Stránka nenalezena — Hackmania",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
        <div className="font-[family-name:var(--font-display)] text-[120px] md:text-[180px] font-bold leading-none tracking-tighter bg-gradient-to-br from-[var(--color-brand)] via-[var(--color-brand-2)] to-[var(--color-magenta)] bg-clip-text text-transparent">
          404
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-white">
          Tahle stránka se zatím <span className="text-[var(--color-brand)]">nehackuje.</span>
        </h1>
        <p className="mt-5 text-lg text-[var(--color-muted)]">
          Odkaz možná vypršel nebo byla stránka přesunuta. Pojď se podívat jinam —
          hackathony a novinky nikam neutekly.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět na hlavní
          </Link>
          <Link
            href="/hackathony"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            <Search className="h-4 w-4" /> Prohledat katalog
          </Link>
        </div>
      </div>
    </section>
  );
}
