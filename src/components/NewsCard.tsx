import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryLabels, type NewsItem } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

export function NewsCard({ n, large = false }: { n: NewsItem; large?: boolean }) {
  return (
    <Link
      href={n.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 transition hover:border-[var(--color-brand-2)]/50 hover:bg-[var(--color-ink-3)] ${
        large ? "md:p-8" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full bg-[var(--color-brand-2)]/10 px-2 py-0.5 text-[var(--color-brand-2)] uppercase tracking-widest">
          {categoryLabels[n.category]}
        </span>
        <span className="text-[var(--color-muted)]">· {relativeTime(n.publishedAt)}</span>
      </div>
      <h3
        className={`mt-3 font-[family-name:var(--font-display)] font-semibold leading-snug text-white transition group-hover:text-[var(--color-brand)] ${
          large ? "text-2xl md:text-3xl" : "text-lg"
        }`}
      >
        {n.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-[var(--color-muted)]">{n.summary}</p>
      <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line)] pt-3 text-xs text-[var(--color-muted)]">
        <span>{n.sourceName}</span>
        <ArrowUpRight className="h-4 w-4 transition group-hover:text-[var(--color-brand)]" />
      </div>
    </Link>
  );
}
