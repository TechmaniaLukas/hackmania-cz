# Nasazení hackmania.cz

Tento dokument je krok-za-krokem návod jak dostat web do produkce. Cílový
stack: **Vercel (frontend) + Convex (backend) + Resend (e-maily) + custom
doména hackmania.cz**.

> Aktuální stav: web běží na **mock datech** (`src/lib/mock-data.ts`). Můžeš ho
> nasadit i bez Convex a všechno bude fungovat. Convex napojíš až ti to bude
> dávat smysl (krok 4 níže).

---

## Před prvním deploy — checklist

- [ ] GitHub repo (push existující kódu)
- [ ] Vercel účet propojený s GitHubem
- [ ] Convex účet (pro krok 4, ne nutně teď)
- [ ] Resend účet (pro kontaktní formulář a newsletter)
- [ ] Doména hackmania.cz s přístupem k DNS

---

## 1) Push do GitHubu

```bash
cd Hackmania
git add .
git commit -m "Initial Hackmania portal"
gh repo create hackmania-cz --public --source=. --push
# nebo manuálně: vytvoř repo na github.com a `git push -u origin main`
```

Ověř, že `.env.local` **není** v Gitu (`.gitignore` to řeší, ale jistota).

---

## 2) Vercel deploy (5 minut, web v produkci)

1. Otevři <https://vercel.com/new>.
2. Importuj repo `hackmania-cz`.
3. Vercel automaticky detekuje **Next.js** — žádná konfigurace netřeba.
4. V **Environment Variables** přidej (Production scope):

   ```text
   RESEND_API_KEY=re_xxxxxxxxxx           # volitelné, dev mode bez něj
   CONTACT_FROM=Hackmania web <web@hackmania.cz>
   ```

5. Klikni **Deploy**.

Po cca 90 vteřinách dostaneš URL `https://hackmania-cz-xxx.vercel.app`. Web
funguje s mock daty.

---

## 3) Připojení domény hackmania.cz

1. Ve Vercel dashboardu projektu → **Settings → Domains** → přidej `hackmania.cz` a `www.hackmania.cz`.
2. Vercel ti ukáže DNS záznamy, které máš nastavit u svého registrátora:

   ```text
   Type    Name    Value
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

3. Po propagaci DNS (typicky 1–60 minut) Vercel automaticky vystaví SSL
   přes Let's Encrypt. Web pojede na `https://hackmania.cz`.
4. Doporuč redirect `www → naked domain` (Vercel to nabídne checkboxem).

---

## 4) Convex backend (až budeš chtít skutečnou databázi)

### 4.1 Inicializace dev prostředí

```bash
cd Hackmania
npx convex dev
```

První spuštění:
- Otevře prohlížeč pro přihlášení k Convex účtu.
- Vytvoří dev deployment a uloží `CONVEX_DEPLOYMENT` do `.env.local`.
- Vygeneruje `convex/_generated/` (typed API klienti).
- Nahraje schema z `convex/schema.ts` a spustí queries z `convex/*.ts`.

Nech `npx convex dev` běžet — sleduje změny a re-deployuje schema při úpravě.

### 4.2 Seedování mock dat

V dashboardu Convex (`npx convex dashboard`) lze importovat data z
`src/lib/mock-data.ts` přes mutation. Doporučený přístup:

```bash
# Vytvořit jednorázovou seed mutation:
# convex/seed.ts — internalMutation který vloží hackathony, akce, novinky, školy, partnery.
# Spustit z dashboardu nebo přes `npx convex run seed:all`.
```

Šablonu seed mutation můžeš vygenerovat (ChatGPT/Claude) z typu v
`src/lib/mock-data.ts` — přímý 1:1 mapping na tabulky v `convex/schema.ts`.

### 4.3 Přepnutí frontendu z mock data na Convex queries

Pro jednu stránku jako příklad (`src/app/hackathony/page.tsx`):

```tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Nahradit
//   import { hackathons } from "@/lib/mock-data";
// za
const hackathons = useQuery(api.hackathons.list, { status: "upcoming" }) ?? [];
```

Pro server komponenty (detail stránky) použij `fetchQuery` z `convex/nextjs`:

```tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

const h = await fetchQuery(api.hackathons.getBySlug, { slug });
```

Wrap root layoutu `ConvexProvider`:

```tsx
// src/app/providers.tsx
"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

A v `src/app/layout.tsx`:
```tsx
import { Providers } from "./providers";
// ... v body:
<Providers>{children}</Providers>
```

### 4.4 Production Convex deployment

```bash
# Vytvoří produkční deployment a vrátí URL.
npx convex deploy
```

Zapiš si URL (formát `https://xxxxx.convex.cloud`).

### 4.5 Vercel build s Convex

V Vercel project settings nastav **Build Command**:

```text
npx convex deploy --cmd 'npm run build' --cmd-url-env-var-name NEXT_PUBLIC_CONVEX_URL
```

V environment variables přidej:

```text
CONVEX_DEPLOY_KEY=<z Convex dashboard → Settings → Deploy Keys>
NEXT_PUBLIC_CONVEX_URL=https://xxxxx.convex.cloud
```

Při dalším Vercel buildu se Convex schema synchronizuje automaticky.

---

## 5) Resend (kontaktní formulář a newsletter)

1. Registrace <https://resend.com>.
2. **Domains** → přidej `hackmania.cz` → ověř DNS záznamy (SPF, DKIM).
3. **API Keys** → vytvoř key `re_xxx`, nahraj do Vercel jako `RESEND_API_KEY`.
4. Bez ověřené domény můžeš zatím posílat z `onboarding@resend.dev`
   (`CONTACT_FROM` proměnnou ponech default).

Kontaktní formulář (`/api/kontakt`) okamžitě funguje, jakmile je klíč přidaný.

### Newsletter (budoucí krok)

`NewsletterBand` v patičce má teď mock submit. Pro reálné fungování:
- Vytvořit Resend Audience (`Audiences` v dashboardu).
- Nový route handler `src/app/api/subscribe/route.ts` → `resend.contacts.create()`.
- Upravit `NewsletterBand` aby volal `/api/subscribe`.

---

## 6) Plausible Analytics (volitelné, GDPR-friendly)

Self-hostovaná nebo cloud verze <https://plausible.io>.

1. Přidej doménu `hackmania.cz` v Plausible.
2. Inject script do `app/layout.tsx`:

   ```tsx
   import Script from "next/script";
   // V <body>, podmíněně podle consent (CookieBanner):
   <Script defer data-domain="hackmania.cz" src="https://plausible.io/js/script.js" />
   ```

3. Respektuj cookie consent: použij `useConsent()` hook z `CookieBanner.tsx`
   a načti script jen když `consent?.analytics === true`.

---

## 7) Monitoring + observability (P3, nech na později)

- **Sentry** pro error tracking — `error.tsx` má TODO komentář.
- **Vercel Analytics** (Web Vitals) — 1 klik v dashboardu.
- **Google Search Console** — nahraj `sitemap.xml`, ověř doménu.

---

## Časté problémy

**Build na Vercelu selhává s "Cannot find module './_generated/api'"**

Convex `_generated` se generuje při `npx convex deploy`. Nech build command
přesně jak je v sekci 4.5 (`npx convex deploy --cmd 'npm run build'`).
Případně commituj `convex/_generated/` (změň `.gitignore`).

**Kontaktní formulář vrací `{ok: true, dev: true}`**

To je úmysl — bez `RESEND_API_KEY` endpoint zaloguje data do serveru a
předstírá úspěch. Nastav klíč ve Vercel pro produkci.

**Doména pořád ukazuje na starý hosting**

DNS propagace může trvat až 24 h. Otestuj `nslookup hackmania.cz` že vrací
`76.76.21.21`. Pak Vercel SSL doběhne sám.

**`og:image` v sdílení nefunguje**

`/opengraph-image` a `/twitter-image` jsou edge funkce — na Vercelu fungují
automaticky. Lokálně potřebují `next dev`, ne static export.

---

## Quick reference (pro tebe, ne pro AI)

```bash
# Lokální dev
npm run dev

# Convex dev (paralelně v jiném terminálu)
npx convex dev

# Lokální build (smoke test)
npm run build

# Vercel deploy z CLI
vercel              # preview
vercel --prod       # production

# Convex production deploy
npx convex deploy
```
