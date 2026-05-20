import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Kodex komunity";
const description =
  "Pravidla chování v komunitě Hackmania. Jak se navzájem respektovat, co nedělat a kam se obrátit při porušení.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/kodex" },
  openGraph: { title, description, url: "https://hackmania.cz/kodex", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default function KodexPage() {
  return (
    <LegalLayout eyebrow="Komunita" title="Kodex Hackmania komunity" updated="19. dubna 2026">
      <p>
        Hackmania je pro všechny, kdo mají rádi technologie — studenty SŠ i VŠ,
        mentory, firmy, zaměstnance škol. Následující pravidla platí pro
        <strong> Discord, WhatsApp skupinu, hackathony i všechny další akce</strong>.
        Jejich cílem je udržet komunitu bezpečnou a produktivní.
      </p>

      <h2>Naše hodnoty</h2>
      <ul>
        <li><strong>Respekt</strong> — ke všem, bez ohledu na zkušenost, věk, pohlaví, orientaci, původ nebo názor.</li>
        <li><strong>Otevřenost</strong> — sdílíme znalosti, pomáháme nováčkům, neschováváme zdroje.</li>
        <li><strong>Férovost</strong> — soutěže mají jasná pravidla, ceny se přidělují transparentně.</li>
        <li><strong>Kreativita</strong> — odvážnější nápad než perfektní provedení.</li>
      </ul>

      <h2>Co v naší komunitě nemá místo</h2>
      <ul>
        <li>Rasismus, sexismus, homofobie, transfobie a jiné formy diskriminace.</li>
        <li>Osobní útoky, šikana, harassment — ani v soukromých zprávách.</li>
        <li>Zveřejnění cizích soukromých zpráv, fotek nebo údajů bez souhlasu (doxxing).</li>
        <li>Sexuálně explicitní obsah, obsah glorifikující násilí.</li>
        <li>Plagiát — odevzdávat cizí projekt jako vlastní. AI generovaný obsah musíte označit.</li>
        <li>Spam, nevyžádaná reklama, phishingové odkazy.</li>
        <li>Nábor uchazečů o práci mimo určený kanál <code>#jobs</code>.</li>
        <li>Obcházení pravidel soutěže nebo neoprávněný přístup k cizím systémům.</li>
      </ul>

      <h2>Specifická pravidla hackathonů</h2>
      <ul>
        <li>Týmy mají maximálně 4 členy, pokud není stanoveno jinak.</li>
        <li>Kód musí vzniknout během hackathonu. Reusing otevřených knihoven a vlastního boilerplate je OK.</li>
        <li>AI nástroje (Claude, ChatGPT, Cursor, v0) jsou povolené, pokud nejsou explicitně zakázány.</li>
        <li>Mentoři pomáhají všem týmům rovnocenně — žádná zvýhodnění.</li>
        <li>Porota hodnotí dle předem zveřejněných kritérií.</li>
        <li>Respektujte prostor — neničte vybavení, udržujte pořádek, jídlo jen v určených zónách.</li>
      </ul>

      <h2>Když se něco stane — reportování</h2>
      <p>
        Pokud zažijete nebo vidíte porušení kodexu, ozvěte se co nejdřív:
      </p>
      <ul>
        <li>
          Na hackathonu — organizátorům na místě (vesta Hackmania) nebo zavolejte
          na uvedené číslo na akreditaci.
        </li>
        <li>Online — správcům Discord / WhatsApp skupiny (role Moderátor) nebo přímo nám.</li>
        <li>
          E-mailem:{" "}
          <a href="mailto:bezpeci@hackmania.cz">bezpeci@hackmania.cz</a> —
          čteme během 24 hodin.
        </li>
      </ul>
      <p>
        Oznamování probíhá <strong>důvěrně</strong>. Vaše identita nebude
        odhalena bez vašeho svolení.
      </p>

      <h2>Jak rozhodujeme</h2>
      <p>
        Každé oznámení vyšetřujeme osobně. Podle závažnosti uplatňujeme odstupňované
        kroky:
      </p>
      <ol>
        <li><strong>Upozornění</strong> — první drobné porušení.</li>
        <li><strong>Dočasný ban</strong> (1–30 dnů) na komunitních kanálech.</li>
        <li><strong>Vyloučení</strong> z aktuální akce.</li>
        <li><strong>Trvalý ban</strong> napříč všemi kanály a akcemi Hackmania.</li>
      </ol>
      <p>
        V případě trestné činnosti spolupracujeme s orgány činnými v trestním
        řízení.
      </p>

      <h2>Přijetí kodexu</h2>
      <p>
        Účastí na hackathonu nebo vstupem do komunitní skupiny souhlasíte s
        tímto kodexem. Kodex můžeme aktualizovat; významnější změny vám
        oznámíme.
      </p>
    </LegalLayout>
  );
}
