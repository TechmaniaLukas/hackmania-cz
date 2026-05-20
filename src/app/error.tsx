"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: napojit na Sentry nebo vlastní error reporter
    console.error("App error:", error);
  }, [error]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
        <AlertTriangle
          className="mx-auto h-14 w-14 text-[var(--color-magenta)]"
          aria-hidden="true"
        />
        <div className="mt-6 font-[family-name:var(--font-display)] text-[72px] md:text-[120px] font-bold leading-none tracking-tighter bg-gradient-to-br from-[var(--color-magenta)] via-[var(--color-brand-2)] to-[var(--color-brand)] bg-clip-text text-transparent">
          500
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-white">
          Něco se pokazilo.
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-lg text-[var(--color-muted)]">
          Potkali jsme chybu, kterou jsme nečekali. Tým už o tom ví — zkus to
          načíst znovu, nebo se vrať na hlavní stránku.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-[var(--color-muted)]">
            ID chyby: <code className="rounded bg-white/5 px-2 py-0.5">{error.digest}</code>
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" /> Zkusit znovu
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            <Home className="h-4 w-4" aria-hidden="true" /> Na hlavní
          </Link>
        </div>
      </div>
    </section>
  );
}
