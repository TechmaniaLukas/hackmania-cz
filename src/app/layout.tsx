import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { MobileNav } from "@/components/MobileNav";
import { SearchTriggerButton } from "@/components/SearchDialog";
import { CookieBanner } from "@/components/CookieBanner";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://hackmania.cz";
const SITE_NAME = "Hackmania";
const DEFAULT_TITLE = "Hackmania — Portál českých hackathonů";
const DEFAULT_DESCRIPTION =
  "Katalog hackathonů, workshopů a akcí po celé ČR. Novinky ze světa AI, vibecodingu, robotiky a technologií. Partneři, školy a komunita.";

export const metadata: Metadata = {
  title: { default: DEFAULT_TITLE, template: "%s — Hackmania" },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  applicationName: SITE_NAME,
  authors: [{ name: "Hackmania z.s.", url: SITE_URL }],
  keywords: [
    "hackathon",
    "Česko",
    "AI",
    "vibecoding",
    "studenti",
    "workshopy",
    "robotika",
    "programování",
    "komunita",
  ],
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "Hackmania z.s.",
      url: SITE_URL,
      logo: `${SITE_URL}/opengraph-image`,
      sameAs: ["https://www.linkedin.com/company/hackmania-cz"],
      description: DEFAULT_DESCRIPTION,
      foundingDate: "2024",
      areaServed: { "@type": "Country", name: "Česká republika" },
      contactPoint: {
        "@type": "ContactPoint",
        email: "ahoj@hackmania.cz",
        contactType: "customer support",
        availableLanguage: ["Czech"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "cs-CZ",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/hackathony?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <Providers>
          <a href="#main" className="skip-link">Přeskočit na obsah</a>
          <SiteHeader />
          <main id="main" className="flex-1">{children}</main>
          <SiteFooter />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[rgba(5,6,10,0.7)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] font-bold tracking-tight text-lg">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand)] text-[var(--color-ink)] font-black">H</span>
          <span>hackmania<span className="text-[var(--color-brand)]">.cz</span></span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm text-[var(--color-muted)]">
          <Link href="/hackathony" className="hover:text-white transition">Hackathony</Link>
          <Link href="/akce" className="hover:text-white transition">Akce & workshopy</Link>
          <Link href="/novinky" className="hover:text-white transition">Novinky</Link>
          <Link href="/komunita" className="hover:text-white transition">Komunita</Link>
          <Link href="/partneri" className="hover:text-white transition">Partneři</Link>
          <Link href="/o-nas" className="hover:text-white transition">O nás</Link>
        </nav>
        <div className="flex items-center gap-2">
          <SearchTriggerButton />
          <Link
            href="/hackathony"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-[var(--color-brand)] px-3.5 py-2 text-sm font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
          >
            Najít hackathon →
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-[var(--color-line)] bg-[var(--color-ink-2)] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[var(--color-brand)]/20 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-[family-name:var(--font-display)] font-bold text-xl">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-brand)] text-[var(--color-ink)] font-black">H</span>
            hackmania.cz
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted)] max-w-xs">
            Portál české hackathon komunity. Propojujeme studenty, školy, firmy a tvůrce napříč ČR.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/hackmania-cz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hackmania na LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] bg-white/5 text-white hover:bg-white/10 hover:text-[#0a66c2] transition"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href="mailto:ahoj@hackmania.cz"
              aria-label="E-mail na Hackmania"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] bg-white/5 text-white hover:bg-white/10 hover:text-[var(--color-brand)] transition"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <FooterCol title="Portál" links={[
          { href: "/hackathony", label: "Katalog hackathonů" },
          { href: "/akce", label: "Workshopy & akce" },
          { href: "/novinky", label: "Novinky" },
          { href: "/partneri", label: "Partneři" },
          { href: "/pro-firmy", label: "Pro firmy" },
          { href: "/pro-skoly", label: "Pro školy" },
        ]} />
        <FooterCol title="Komunita" links={[
          { href: "/komunita", label: "Discord & WhatsApp" },
          { href: "/skoly", label: "Školy" },
          { href: "/kodex", label: "Kodex komunity" },
          { href: "/faq", label: "Často kladené otázky" },
          { href: "/o-nas", label: "O Hackmania" },
          { href: "/kontakt", label: "Kontakt" },
        ]} />
        <FooterCol title="Právní" links={[
          { href: "/ochrana-osobnich-udaju", label: "Ochrana osobních údajů" },
          { href: "/cookies", label: "Cookies" },
          { href: "/kodex", label: "Kodex" },
        ]} />
      </div>
      <div className="relative border-t border-[var(--color-line)] py-5 text-center text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} Hackmania z.s. — postaveno s ❤ v Česku
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-[family-name:var(--font-display)] font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-[var(--color-muted)]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-white transition">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
