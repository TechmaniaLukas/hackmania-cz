import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Ochrana osobních údajů";
const description =
  "Jak Hackmania z.s. zpracovává vaše osobní údaje v souladu s GDPR. Jaké údaje sbíráme, proč a jak s nimi nakládáme.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ochrana-osobnich-udaju" },
  openGraph: { title, description, url: "https://hackmania.cz/ochrana-osobnich-udaju", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Právní" title="Ochrana osobních údajů" updated="19. dubna 2026">
      <p>
        Tyto zásady popisují, jak <strong>Hackmania z.s.</strong> (dále jen „my"
        nebo „Hackmania") jako správce osobních údajů zpracovává osobní údaje
        návštěvníků webu hackmania.cz a účastníků našich akcí, v souladu s
        nařízením GDPR (EU 2016/679) a zákonem č. 110/2019 Sb. o zpracování
        osobních údajů.
      </p>

      <h2>Správce a kontakt</h2>
      <p>
        <strong>Hackmania z.s.</strong>
        <br />
        Zapsaný spolek, IČO: <em>doplněno po registraci</em>
        <br />
        Sídlo: <em>doplněno po registraci</em>
        <br />
        E-mail pro ochranu údajů: <a href="mailto:gdpr@hackmania.cz">gdpr@hackmania.cz</a>
      </p>

      <h2>Jaké údaje zpracováváme</h2>
      <h3>Návštěvníci webu</h3>
      <ul>
        <li>Technické údaje: IP adresa, typ prohlížeče, jazyk, referrer, čas návštěvy (anonymizováno analytickým nástrojem).</li>
        <li>Cookies — podrobněji v <a href="/cookies">zásadách cookies</a>.</li>
      </ul>
      <h3>Odběratelé newsletteru</h3>
      <ul>
        <li>E-mailová adresa, datum přihlášení, případně jméno a oslovení.</li>
      </ul>
      <h3>Účastníci hackathonů a akcí</h3>
      <ul>
        <li>Jméno, e-mail, případně škola a kontakt na tým.</li>
        <li>Fotografie a videozáznamy z akcí (pro dokumentaci a marketing).</li>
      </ul>
      <h3>Partneři a kontaktní osoby</h3>
      <ul>
        <li>Jméno, e-mail, pozice ve firmě, telefon (pokud ho sami uvedete).</li>
      </ul>

      <h2>Proč údaje zpracováváme (právní tituly)</h2>
      <ul>
        <li><strong>Plnění smlouvy nebo žádosti</strong> — organizace hackathonu, registrace, vyřízení dotazu.</li>
        <li><strong>Oprávněný zájem</strong> — bezpečnost webu, analytika agregovaná anonymně, fotodokumentace akcí.</li>
        <li><strong>Souhlas</strong> — newsletter, marketingová sdělení, cookies jiné než nezbytné.</li>
        <li><strong>Zákonná povinnost</strong> — účetnictví, dotace.</li>
      </ul>

      <h2>Jak dlouho údaje uchováváme</h2>
      <ul>
        <li>Newsletter — dokud se neodhlásíte; po odhlášení 30 dnů pro řešení reklamací.</li>
        <li>Registrace k akci — 3 roky od konání akce (pro archiv a případné reference).</li>
        <li>Fotodokumentace — bez časového omezení, ale na žádost dotčené osoby odstraníme.</li>
        <li>Kontaktní údaje partnerů — po dobu spolupráce + 3 roky.</li>
        <li>Účetní doklady — 10 let dle zákona.</li>
      </ul>

      <h2>Komu údaje předáváme</h2>
      <ul>
        <li>Poskytovatelé infrastruktury (Vercel, Convex, Resend, Plausible) — v rámci EU/EEA nebo s standardními smluvními doložkami.</li>
        <li>Partneři konkrétní akce — <strong>pouze s vaším výslovným souhlasem</strong> při registraci.</li>
        <li>Účetní a daňoví poradci — v rozsahu nutném pro vedení agendy.</li>
      </ul>
      <p>
        Údaje <strong>neprodáváme</strong> třetím stranám a nepředáváme je do
        zemí mimo EU bez patřičných záruk.
      </p>

      <h2>Vaše práva</h2>
      <p>Dle GDPR máte právo:</p>
      <ul>
        <li><strong>Přístup</strong> k údajům, které o vás vedeme.</li>
        <li><strong>Opravu</strong> nepřesných údajů.</li>
        <li><strong>Výmaz</strong> („právo být zapomenut"), pokud nemáme jiný zákonný důvod údaje uchovávat.</li>
        <li><strong>Omezení zpracování</strong>.</li>
        <li><strong>Přenositelnost</strong> — získat vaše údaje ve strukturovaném formátu.</li>
        <li><strong>Námitku</strong> proti zpracování na základě oprávněného zájmu.</li>
        <li><strong>Odvolání souhlasu</strong> kdykoli — bez dopadu na předchozí zpracování.</li>
        <li><strong>Stížnost</strong> u Úřadu pro ochranu osobních údajů (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">uoou.cz</a>).</li>
      </ul>
      <p>
        Žádost pošlete na <a href="mailto:gdpr@hackmania.cz">gdpr@hackmania.cz</a>. Vyřídíme ji do 30 dnů.
      </p>

      <h2>Cookies a analytika</h2>
      <p>
        Používáme anonymizovanou analytiku (Plausible) bez trackovacích cookies.
        Ostatní cookies jsou popsány v samostatných <a href="/cookies">zásadách cookies</a>.
      </p>

      <h2>Změny zásad</h2>
      <p>
        Zásady můžeme aktualizovat. Datum poslední aktualizace je uvedeno na
        začátku tohoto dokumentu. O významných změnách informujeme e-mailem
        registrované uživatele.
      </p>
    </LegalLayout>
  );
}
