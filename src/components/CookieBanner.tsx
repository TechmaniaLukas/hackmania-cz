"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "hm-consent-v1";
const CONSENT_EVENT = "hm:consent-change";

export type ConsentState = {
  analytics: boolean;
  timestamp: number;
  version: 1;
};

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean) {
  const state: ConsentState = { analytics, timestamp: Date.now(), version: 1 };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

/** Public helper for other components to subscribe to consent changes. */
export function useConsent(): ConsentState | null {
  const [state, setState] = useState<ConsentState | null>(() => readConsent());
  useEffect(() => {
    const onChange = (e: Event) => setState((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);
  return state;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (existing) return;

    // Respect Do Not Track — treat as explicit rejection.
    type LegacyNav = Navigator & { msDoNotTrack?: string };
    const dnt =
      navigator.doNotTrack === "1" ||
      (navigator as LegacyNav).msDoNotTrack === "1" ||
      // Deprecated but still common
      (typeof window !== "undefined" && (window as unknown as { doNotTrack?: string }).doNotTrack === "1");

    if (dnt) {
      writeConsent(false);
      return;
    }

    // Delay slightly so the page has time to paint
    const t = window.setTimeout(() => setVisible(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  function accept() {
    writeConsent(true);
    setVisible(false);
  }
  function reject() {
    writeConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Souhlas s cookies"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[90] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-5 shadow-2xl shadow-black/60">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-brand)]/20 blur-2xl pointer-events-none" />
        <button
          type="button"
          onClick={reject}
          aria-label="Odmítnout a zavřít"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-muted)] hover:bg-white/5 hover:text-white transition"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="relative flex items-start gap-3">
          <div className="shrink-0 rounded-lg bg-[var(--color-brand)]/15 p-2 text-[var(--color-brand)]">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
              Používáme cookies
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)] leading-relaxed">
              Nezbytné fungují vždy. Pro anonymizovanou analytiku návštěvnosti potřebujeme
              tvůj souhlas. Bez tracking cookies, bez reklamy, bez prodeje dat.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={accept}
                className="inline-flex items-center justify-center rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
              >
                Přijmout
              </button>
              <button
                type="button"
                onClick={reject}
                className="inline-flex items-center justify-center rounded-lg border border-[var(--color-line)] bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Odmítnout
              </button>
              <Link
                href="/cookies"
                className="inline-flex items-center justify-center px-2 py-2 text-sm text-[var(--color-muted)] hover:text-white transition"
              >
                Detaily →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
