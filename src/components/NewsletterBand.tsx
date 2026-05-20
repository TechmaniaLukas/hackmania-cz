"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "done" | "error";

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("sending");
    // TODO: napojit na Convex mutation / newsletter provider (Resend/Mailchimp)
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  }

  return (
    <section className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-ink-2)]">
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[var(--color-brand-2)]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-[var(--color-brand)]/10 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6 py-12 md:py-16 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--color-brand)]">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Newsletter
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold tracking-tight text-white">
            Nejlepší z českého AI světa každý pátek.
          </h2>
          <p className="mt-2 text-sm md:text-base text-[var(--color-muted)] max-w-xl">
            Shrnutí týdne v hackathonech, nové akce, vybrané novinky. Žádný spam.
            Odhlásit se můžeš jedním klikem.
          </p>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 min-w-0 md:w-[380px]">
          <label htmlFor="nl-email" className="sr-only">E-mail</label>
          <input
            id="nl-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tvuj@email.cz"
            disabled={status === "sending" || status === "done"}
            className="flex-1 min-w-0 rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "done"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] hover:brightness-110 transition disabled:opacity-70"
          >
            {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {status === "done" && <Check className="h-4 w-4" aria-hidden="true" />}
            {status === "idle" && "Odebírat"}
            {status === "sending" && "Odesílám…"}
            {status === "done" && "Díky, jsi v klubu"}
            {status === "error" && "Zkus to znovu"}
          </button>
        </form>
      </div>
    </section>
  );
}
