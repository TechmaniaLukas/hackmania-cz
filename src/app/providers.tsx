"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

// Fallback URL pro Vercel build, když env var ještě není nastavená.
// V runtime klient hydratuje s reálnou URL z env vars (NEXT_PUBLIC_* je inlined).
const url = process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";
const convex = new ConvexReactClient(url);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
