import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MessageCircle, Building2, GraduationCap, Newspaper } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

const title = "Kontakt";
const description =
  "Ozvěte se Hackmania týmu. Přidejte hackathon do katalogu, staňte se partnerem nebo se jen pozdravte.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kontakt" },
  openGraph: { title, description, url: "https://hackmania.cz/kontakt", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

const DIRECT_CONTACTS = [
  { icon: Mail, label: "Obecný dotaz", value: "ahoj@hackmania.cz", href: "mailto:ahoj@hackmania.cz" },
  { icon: Building2, label: "Partnerství s firmou", value: "partneri@hackmania.cz", href: "mailto:partneri@hackmania.cz" },
  { icon: GraduationCap, label: "Spolupráce se školou", value: "skoly@hackmania.cz", href: "mailto:skoly@hackmania.cz" },
  { icon: Newspaper, label: "Média a press", value: "press@hackmania.cz", href: "mailto:press@hackmania.cz" },
];

export default function KontaktPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 radial-glow opacity-50 pointer-events-none" />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-14">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">Kontakt</div>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Ozvěte se <span className="text-[var(--color-brand)]">nám.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[var(--color-muted)]">
            Hackathon do katalogu, partnerství, spolupráce se školou, dotaz od novináře —
            všechno si tu vyřešíme. Odpovídáme do 48 hodin.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
            Přímo na osobu
          </h2>
          {DIRECT_CONTACTS.map((c) => (
            <a
              key={c.value}
              href={c.href}
              className="flex items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-4 transition hover:border-[var(--color-brand)]/60 hover:bg-[var(--color-ink-3)]"
            >
              <div className="shrink-0 rounded-lg bg-[var(--color-brand)]/10 p-2 text-[var(--color-brand)]">
                <c.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-[var(--color-muted)]">
                  {c.label}
                </div>
                <div className="truncate text-white font-[family-name:var(--font-display)] font-semibold">
                  {c.value}
                </div>
              </div>
            </a>
          ))}
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-5 text-sm">
            <div className="flex items-center gap-2 text-white font-semibold">
              <MessageCircle className="h-4 w-4 text-[var(--color-brand-2)]" aria-hidden="true" />
              Rychlejší cestou
            </div>
            <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
              Ping na{" "}
              <a href="/komunita" className="text-[var(--color-brand)] underline underline-offset-4 hover:text-white">
                Discord
              </a>{" "}
              nebo DM na{" "}
              <a
                href="https://www.linkedin.com/company/hackmania-cz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--color-brand)] underline underline-offset-4 hover:text-white"
              >
                LinkedIn <LinkedInIcon className="h-3 w-3" />
              </a>
              .
            </p>
          </div>
        </aside>

        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 md:p-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Napište formulář
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Vyplňte, odešleme přímo na správnou adresu.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
