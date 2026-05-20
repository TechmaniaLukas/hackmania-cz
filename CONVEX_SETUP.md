# Convex setup — backend databáze a queries

> Aktuální stav: schema je definovaný v `convex/schema.ts`, seed mutation
> v `convex/seed.ts`, ale **frontend stále používá `src/lib/mock-data.ts`**.
> Tento setup tě dovede přes 3 fáze:
> 1. Spustit Convex dev deployment lokálně
> 2. Naseed data do Convex
> 3. (Volitelně) přepnout pages na Convex queries

---

## Fáze 1 — Convex dev deployment (5 min)

### 1.1 Spusť `npx convex dev` (interaktivní)

```bash
cd C:\Users\lukas.suser\Hackmania
npx convex dev
```

První spuštění:
- Otevře prohlížeč → přihlásíš se ke Convex (GitHub OAuth, zdarma)
- Vytvoří **dev deployment** (URL formátu `https://acidic-bunny-123.convex.cloud`)
- Vyplní `.env.local`:
  ```text
  CONVEX_DEPLOYMENT=dev:acidic-bunny-123
  NEXT_PUBLIC_CONVEX_URL=https://acidic-bunny-123.convex.cloud
  ```
- Vygeneruje `convex/_generated/` (typed API klient)
- Nahraje schema z `convex/schema.ts` do dev backendu
- Začne sledovat změny v `convex/` a re-deployuje při každém uložení

**Nech tento terminál běžet.** V dalším terminálu pokračuj.

### 1.2 Pokud vidíš "Schema validation failed"

Schema neodpovídá existujícím datům. V dev deploymentu je první spuštění
čisté (žádná data) → nemělo by selhat. Pokud ano:

```bash
npx convex dashboard
# Smaž obsah tabulek v dashboardu a opakuj `npx convex dev`.
```

---

## Fáze 2 — Naseed mock data (1 příkaz)

V novém terminálu:

```bash
cd C:\Users\lukas.suser\Hackmania
npx convex run seed:all
```

Výstup:

```text
{
  "inserted": 27,
  "tables": {
    "hackathons": 6,
    "events": 4,
    "news": 4,
    "schools": 8,
    "partners": 9
  }
}
```

Otevři dashboard `npx convex dashboard` → uvidíš všechny tabulky naplněné.
Seed je **idempotentní** — můžeš ho spustit znovu, vždy nejdřív vyprázdní tabulky a vloží čerstvá data.

---

## Fáze 3 — Přepnout frontend na Convex queries (postupně)

Toto NENÍ nutné dělat hned. Aplikace funguje s mock daty i bez Convex.
Když budeš chtít přejít:

### 3.1 ConvexProvider v root layoutu

Vytvoř `src/app/providers.tsx`:

```tsx
"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

V `src/app/layout.tsx` obal obsah:

```tsx
import { Providers } from "./providers";
// ...
<body className="...">
  <Providers>
    <SiteHeader />
    <main id="main" ...>{children}</main>
    <SiteFooter />
  </Providers>
</body>
```

### 3.2 Page-by-page swap

**Klient komponenty** (`"use client"`) — `useQuery`:

```tsx
// src/app/hackathony/page.tsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const hackathons = useQuery(api.hackathons.list, { status: "upcoming" }) ?? [];
```

**Server komponenty** (detail stránky) — `fetchQuery`:

```tsx
// src/app/hackathony/[slug]/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

const h = await fetchQuery(api.hackathons.getBySlug, { slug });
```

### 3.3 Po každém page swapu

- Smaž import z `@/lib/mock-data` na dané stránce
- Otestuj že stránka funguje
- Commit & push

Až jsou všechny pages převedené, smaž `src/lib/mock-data.ts` úplně.

---

## Fáze 4 — Produkční Convex deployment (až po fázi 3)

```bash
npx convex deploy
```

Output: URL formátu `https://xxx.convex.cloud` a `CONVEX_DEPLOY_KEY` (zobrazí se v dashboardu).

V Vercel **Settings → Environment Variables** přidej (Production scope):

```text
NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.cloud
CONVEX_DEPLOY_KEY=<z Convex dashboardu>
```

V Vercel **Settings → General → Build & Development Settings** změň **Build Command**:

```text
npx convex deploy --cmd 'next build' --cmd-url-env-var-name NEXT_PUBLIC_CONVEX_URL
```

Tímto se při každém Vercel buildu nejdřív synchronizuje Convex schema, pak
se postaví Next.js s aktuální URL.

### Seed v produkci

Seed mutation je `internalMutation` → není volatelná z klienta, jen z CLI nebo dashboardu.

```bash
# V produkci:
npx convex run seed:all --prod
```

⚠️ **POZOR**: Seed vyprázdní tabulky! V produkci ho spusť jednou na začátek, pak NIKDY znovu. Pro přidávání obsahu používej dashboard nebo dedikované mutace.

---

## Troubleshooting

**`npx convex dev` zamrzne na "Login required"**

Otevři manuálně URL, kterou ti vypíše do prohlížeče. Někdy se autoredirect neaktivuje.

**`Cannot find module './_generated/api'`**

`convex/_generated/` se vytváří jen při běhu `npx convex dev` nebo `npx convex codegen`. Pokud děláš build bez `convex dev` (např. v Vercel build), použij build command z Fáze 4.

**Frontend ukazuje prázdná data po seed**

Restartuj `npm run dev` — Convex dev a Next dev běží samostatně, query může mít cache. Také zkontroluj že `NEXT_PUBLIC_CONVEX_URL` je v `.env.local`.

**Schema mismatch při seed**

Někdy přidáš pole do schema.ts ale Convex backend ho ještě nezaznamenal. Stačí uložit schema.ts (HMR re-deployuje) a opakovat seed.
