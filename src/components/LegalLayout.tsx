import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-50 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Zpět na hlavní
          </Link>
          <div className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
            {eyebrow}
          </div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Aktualizováno: {updated}
          </p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-6 py-14 space-y-8 text-[var(--color-fg)]/90 leading-relaxed legal-prose">
        {children}
      </article>
    </>
  );
}
