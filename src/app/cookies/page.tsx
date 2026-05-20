import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Zásady používání cookies";
const description =
  "Jaké cookies Hackmania používá, proč, jak dlouho trvají a jak souhlas spravovat.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookies" },
  openGraph: { title, description, url: "https://hackmania.cz/cookies", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalLayout eyebrow="Právní" title="Zásady cookies" updated="19. dubna 2026">
      <p>
        Tento dokument popisuje, jaké cookies a podobné technologie používáme
        na webu hackmania.cz. Dokument je doplněk k{" "}
        <a href="/ochrana-osobnich-udaju">zásadám ochrany osobních údajů</a>.
      </p>

      <h2>Co jsou cookies</h2>
      <p>
        Cookies jsou malé textové soubory, které váš prohlížeč ukládá při
        návštěvě webu. Slouží k zapamatování preferencí, měření návštěvnosti
        nebo zajištění funkce webu (např. přihlášení).
      </p>

      <h2>Jaké cookies používáme</h2>

      <h3>Nezbytné</h3>
      <p>
        Zajišťují základní fungování webu (routing, preference zobrazení).
        Nevyžadují souhlas.
      </p>
      <ul>
        <li><code>NEXT_LOCALE</code> — zapamatování jazyka. Trvání: session.</li>
        <li><code>convex-auth</code> — pokud používáte přihlášení přes Convex. Trvání: session.</li>
      </ul>

      <h3>Analytické</h3>
      <p>
        Používáme <strong>Plausible Analytics</strong> — službu, která
        <strong> neukládá cookies</strong> a nesleduje konkrétní uživatele. Měří
        pouze anonymizované agregované statistiky (počet návštěv, referrer,
        země).
      </p>

      <h3>Marketingové / třetí strany</h3>
      <p>
        Aktuálně žádné marketingové cookies nepoužíváme. Pokud bychom v
        budoucnu zavedli remarketing nebo tracking (Meta Pixel, Google Ads,
        LinkedIn Insight Tag), budeme vás výslovně žádat o souhlas prostřednictvím
        cookie banneru před jejich aktivací.
      </p>

      <h2>Správa souhlasu</h2>
      <p>
        Nezbytné cookies nelze vypnout, protože bez nich by web nefungoval.
        Analytika je anonymní a bez cookies, takže není třeba souhlas.
      </p>
      <p>
        Cookies ve vašem prohlížeči můžete kdykoli smazat přes nastavení
        (návody{" "}
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>,{" "}
        <a href="https://support.mozilla.org/cs/kb/vymazani-cookies" target="_blank" rel="noopener noreferrer">Firefox</a>,{" "}
        <a href="https://support.apple.com/cs-cz/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>).
      </p>

      <h2>Kontakt</h2>
      <p>
        Dotazy k cookies:{" "}
        <a href="mailto:gdpr@hackmania.cz">gdpr@hackmania.cz</a>.
      </p>
    </LegalLayout>
  );
}
