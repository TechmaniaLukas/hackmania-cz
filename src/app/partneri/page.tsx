import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";

const title = "Partneři a školy";
const description =
  "Firmy, školy a instituce, které podporují Hackmania komunitu a pomáhají pořádat hackathony po celé ČR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/partneri" },
  openGraph: { title, description, url: "https://hackmania.cz/partneri", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

const tierLabel = {
  platinum: "Platinoví partneři",
  gold: "Zlatí partneři",
  silver: "Stříbrní partneři",
  bronze: "Bronzoví partneři",
} as const;

const tierOrder: (keyof typeof tierLabel)[] = ["platinum", "gold", "silver", "bronze"];

export default async function PartneriPage() {
  const partners = await fetchQuery(api.partners.list, {});
  const byTier = Object.fromEntries(
    tierOrder.map((t) => [t, partners.filter((p) => p.tier === t)])
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">Komunita</div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white">
            Partneři, školy a <span className="text-[var(--color-brand)]">instituce</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
            Bez těchto firem, škol a institucí by se Hackmania neobešla. Díky!
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 space-y-16">
        {tierOrder.map((tier) =>
          byTier[tier].length > 0 ? (
            <div key={tier}>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                {tierLabel[tier]}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {byTier[tier].map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-center rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 text-center text-white font-[family-name:var(--font-display)] font-semibold hover:border-[var(--color-brand)]/60 transition"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}

        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-10 md:p-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-brand)]/20 blur-3xl" />
          <h3 className="relative font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white">
            Staňte se partnerem Hackmania
          </h3>
          <p className="relative mt-3 max-w-xl text-[var(--color-muted)]">
            Oslovte tisíce talentovaných studentů, podpořte inovace a najděte si budoucí
            kolegy přímo mezi účastníky našich akcí.
          </p>
          <Link
            href="/pro-firmy"
            className="relative mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            Pro firmy — partnerství <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
