# Hackmania.cz

Portál českých hackathonů, workshopů a AI novinek. Next.js 15 + Convex + Tailwind.

## Rychlý start

```bash
npm install
npm run dev
```

Aplikace poběží na <http://localhost:3000>. Katalog teď zobrazuje mock data z
`src/lib/mock-data.ts` — pro napojení na Convex viz níže.

## Struktura

- `src/app/` — App Router stránky
  - `page.tsx` — landing
  - `hackathony/` — katalog + detail `[slug]`
  - `novinky/` — agregované novinky s filtrováním podle kategorie
  - `partneri/`, `akce/`, `skoly/`, `o-nas/`, `kontakt/`
- `src/components/` — `HackathonCard`, `NewsCard`
- `src/lib/mock-data.ts` — dočasná data (ke smazání po napojení Convex)
- `src/lib/utils.ts` — `cn`, `formatDate`, `relativeTime`
- `convex/schema.ts` — tabulky: `hackathons`, `partners`, `schools`, `events`, `news`
- `convex/*.ts` — queries (`hackathons.list`, `news.list`, …)
- `convex/newsAggregator.ts` — Node action, která parsuje RSS feedy
- `convex/newsMutations.ts` — vkládání novinek (deduplikace přes slug)
- `convex/crons.ts` — cron spouští agregátor každé 2 hodiny

## Napojení Convex

1. Přihlas se a vytvoř deployment:

   ```bash
   npx convex dev
   ```

   Při prvním spuštění tě to provede přihlášením a vyplní
   `NEXT_PUBLIC_CONVEX_URL` do `.env.local`.

2. Ve frontendu nahraď importy z `mock-data` reálnými queries:

   ```tsx
   import { useQuery } from "convex/react";
   import { api } from "../../convex/_generated/api";

   const hackathons = useQuery(api.hackathons.list, { status: "upcoming" });
   ```

   Obal komponenty `ConvexProvider` v `app/layout.tsx`:

   ```tsx
   import { ConvexProvider, ConvexReactClient } from "convex/react";
   const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
   ```

3. Naplň databázi buď přes Convex dashboard, nebo mutací.

## Agregátor novinek

`convex/newsAggregator.ts` načítá RSS feedy (Anthropic, HuggingFace, DeepMind,
TechCrunch, Lupa.cz, Zdroják). Seznam upravíš v poli `FEEDS`. Cron v `crons.ts`
spouští agregaci každé 2 hodiny. Deduplikace běží přes slug z titulku.

## Deploy

- Frontend: Vercel (Next.js preset).
- Convex: automaticky při `npx convex deploy`.
- Doména `hackmania.cz` → nasměruj CNAME na Vercel.

## Co zbývá dodělat

- [ ] Napojit stránky na Convex queries (zatím mock data).
- [ ] Doplnit `ConvexProvider` do root layoutu.
- [ ] Přidat scraper pro aktuální hackathony (zdroje: Eventbrite ČR, stránky VŠ).
- [ ] Stránka workshop/event detail.
- [ ] Stránka `/skoly` s mapou a filtrem podle kraje.
- [ ] SEO: sitemap, robots, strukturovaná data (Event schema.org).
