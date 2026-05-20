# Resend setup — kontaktní formulář + newsletter

> Aktuální stav: `src/app/api/kontakt/route.ts` posílá maily přes Resend.
> Bez `RESEND_API_KEY` běží v **dev módu** — vrátí success uživateli ale
> ve skutečnosti nic neodešle (jen log do serveru). To je správně pro
> lokální vývoj.

---

## Krok 1 — Vytvoř Resend účet (2 min)

1. Otevři <https://resend.com/signup>
2. Sign up s GitHub účtem (rychlejší než e-mail)
3. Free tier: **100 e-mailů/den, 3 000/měsíc** — pro Hackmania bohatě stačí

## Krok 2 — Vytvoř API key (30 s)

1. V dashboardu: <https://resend.com/api-keys>
2. Klik **Create API Key**
3. Name: `hackmania-prod`
4. Permission: **Full access** (nebo Sending access, pokud chceš restrikce)
5. Domain: nech default („All domains") než nastavíš vlastní
6. **Zkopíruj klíč** ve formátu `re_xxxxxxxxxxxxxxxxxxx` — uvidíš ho jen jednou

## Krok 3 — Přidej klíč do Vercelu (1 min)

1. Vercel dashboard → project `hackmania-cz` → **Settings** → **Environment Variables**
2. Add new:
   - **Key:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxxxx` (paste)
   - **Environments:** zaškrtni `Production`, `Preview`, `Development`
3. **Save**
4. Otevři **Deployments** → klik na nejnovější → tři tečky **…** → **Redeploy** (env vary se aplikují až po novém buildu)

Bez vlastní domény nyní lze posílat z **`onboarding@resend.dev`** — funguje, ale dostupní adresáti uvidí Reply-To pole správně. Pro produkci viz Krok 4.

## Krok 4 — Ověř doménu hackmania.cz (5 min + DNS propagace)

> Tento krok není nutný teď. Bez něj posíláš z `onboarding@resend.dev`,
> což je OK pro malé objemy. S vlastní doménou ale e-maily nepadají do
> spamu a vypadají profesionálně (`web@hackmania.cz`).

1. Resend dashboard → **Domains** → **Add Domain**
2. Doména: `hackmania.cz`
3. Region: **Europe (EU)** — kvůli GDPR a rychlosti
4. Resend ti ukáže DNS záznamy k nastavení (SPF, DKIM, optional DMARC):

   ```text
   Type   Name                       Value
   MX     send                       feedback-smtp.eu-west-1.amazonses.com (priorita 10)
   TXT    send                       "v=spf1 include:amazonses.com ~all"
   TXT    resend._domainkey          "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN..." (dlouhý)
   ```

5. Přidej je u registrátora domény (kde máš DNS — Wedos / Forpsi / Cloudflare …)
6. V Resend dashboardu klik **Verify DNS Records** — propaguje se obvykle do 15 min, někdy hodinu
7. Až je status **Verified ✓**, přidej do Vercelu env var:

   ```text
   CONTACT_FROM=Hackmania web <web@hackmania.cz>
   ```

   (Hodnota se použije v `from:` poli každého mailu z `/api/kontakt`.)

## Krok 5 — Test (1 min)

Po deploy (Krok 3) otevři <https://hackmania.cz/kontakt> (nebo preview URL),
vyplň formulář a odešli. Měl bys dostat e-mail na adresu, která odpovídá zvolenému tématu:

| Téma ve formuláři     | Cílová adresa            |
|-----------------------|--------------------------|
| Obecný dotaz          | ahoj@hackmania.cz        |
| Přidat hackathon      | ahoj@hackmania.cz        |
| Firemní partnerství   | partneri@hackmania.cz    |
| Spolupráce se školou  | skoly@hackmania.cz       |
| Dotaz z médií         | press@hackmania.cz       |
| Jiné                  | ahoj@hackmania.cz        |

Jeden klik na **Odpovědět** ve tvém mailu pošle odpověď přímo odesílateli
(`reply-to` header).

## Krok 6 — Forwarding e-mailů (volitelné)

Pokud nemáš všech 4 e-maily (ahoj@, partneri@, skoly@, press@) reálně
existující jako schránky, nastav forwarding na svůj hlavní e-mail
(`lukas@futureshop.cz`) přes:

- **Cloudflare Email Routing** (zdarma, jen DNS, nejjednodušší)
- **Wedos Forwarding** (pokud máš tam doménu)
- **Forpsi Smart Mailbox**

---

## Newsletter (až bude potřeba)

`NewsletterBand` v patičce má teď mock submit. Pro reálné fungování:

1. V Resend dashboardu → **Audiences** → **Create Audience** „Hackmania Newsletter"
2. Vytvoř route handler `src/app/api/subscribe/route.ts`:

   ```ts
   import { Resend } from "resend";
   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(req: Request) {
     const { email } = await req.json();
     await resend.contacts.create({
       email,
       audienceId: process.env.RESEND_AUDIENCE_ID!,
     });
     return Response.json({ ok: true });
   }
   ```

3. Upravit `NewsletterBand.tsx` `onSubmit` aby volal `/api/subscribe`.
4. Přidat env var `RESEND_AUDIENCE_ID` (z dashboardu audience).

---

## Troubleshooting

**E-mail nepřišel, ale UI ukazuje success**

`RESEND_API_KEY` není nastavený — endpoint běží v dev módu. Zkontroluj Vercel
env vars (musí být v správném environment scope) a po nastavení **redeploy**.

**Resend vrací 401 Unauthorized**

API klíč je špatně zkopírovaný (chybí znaky) nebo byl revoked. Vytvoř nový.

**Maily padají do spamu**

Nemáš ověřenou doménu (Krok 4). Bez SPF/DKIM cíloví poskytovatelé (Gmail,
Outlook) automaticky filtrují jako podezřelé.
