import type { Metadata } from "next";
import Link from "next/link";

const title = "O nás";
const description =
  "Hackmania propojuje české studenty, školy, firmy a tvůrce kolem hackathonů, workshopů a AI technologií. Nezisková komunita od roku 2024.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/o-nas" },
  openGraph: { title, description, url: "https://hackmania.cz/o-nas", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default function ONasPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-60 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">O nás</div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white">
            Jsme česká hackathon <span className="text-[var(--color-brand)]">komunita</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 space-y-6 text-lg text-[var(--color-muted)] leading-relaxed">
        <p>
          Hackmania vznikla jako jednoduchý nápad — dát dohromady studenty, školy, firmy a tvůrce,
          kteří mají rádi technologie. Z toho vyrostl portál, který mapuje hackathony, workshopy a
          novinky napříč celou Českou republikou.
        </p>
        <p>
          Věříme, že nejlepší projekty vznikají přes víkend. Že kreativita má doma v tělocvičně, ve
          fakultní knihovně, v technickém muzeu. A že příští česká AI firma se právě teď schází na
          hackathonu někde mezi Plzní, Brnem a Ostravou.
        </p>
        <p>
          Portál vznikl ve spolupráci s <span className="text-white">Techmania Science Center</span>{" "}
          a sítí partnerských škol a univerzit. Je a zůstane neziskový — provoz financují partneři,
          kterým jsme za podporu vděční.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/hackathony"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            Prozkoumat hackathony
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
          >
            Kontaktovat nás
          </Link>
        </div>
      </section>
    </>
  );
}
