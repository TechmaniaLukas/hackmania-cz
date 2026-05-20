"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

type Subject = "general" | "add-hackathon" | "partner" | "school" | "press" | "other";
type Status =
  | { type: "idle" }
  | { type: "sending" }
  | { type: "ok" }
  | { type: "error"; message: string };

const SUBJECT_OPTIONS: { v: Subject; l: string }[] = [
  { v: "general", l: "Obecný dotaz" },
  { v: "add-hackathon", l: "Přidat hackathon do katalogu" },
  { v: "partner", l: "Firemní partnerství" },
  { v: "school", l: "Spolupráce se školou" },
  { v: "press", l: "Dotaz z médií" },
  { v: "other", l: "Jiné" },
];

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general" as Subject,
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ type: "error", message: data?.error ?? "Něco se pokazilo." });
        return;
      }
      setStatus({ type: "ok" });
    } catch {
      setStatus({ type: "error", message: "Chyba připojení. Zkus to znovu." });
    }
  }

  if (status.type === "ok") {
    return (
      <div className="mt-6 rounded-2xl border border-[var(--color-brand)]/40 bg-[var(--color-brand)]/10 p-6 text-center">
        <Check className="mx-auto h-10 w-10 text-[var(--color-brand)]" aria-hidden="true" />
        <div className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          Díky, přišlo nám to.
        </div>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Ozveme se nejpozději do 48 hodin.
        </p>
      </div>
    );
  }

  const disabled = status.type === "sending";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0 pointer-events-none"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Jméno" htmlFor="c-name">
          <input
            id="c-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
            disabled={disabled}
          />
        </Field>
        <Field label="E-mail" htmlFor="c-email">
          <input
            id="c-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
            disabled={disabled}
          />
        </Field>
      </div>

      <Field label="Téma" htmlFor="c-subject">
        <select
          id="c-subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value as Subject })}
          className={inputCls}
          disabled={disabled}
        >
          {SUBJECT_OPTIONS.map((o) => (
            <option key={o.v} value={o.v} className="bg-[var(--color-ink-2)]">
              {o.l}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Zpráva" htmlFor="c-message">
        <textarea
          id="c-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputCls} resize-y`}
          disabled={disabled}
        />
        <div className="mt-1 text-xs text-[var(--color-muted)]">
          {form.message.length} / 5000
        </div>
      </Field>

      {status.type === "error" && (
        <div className="rounded-lg border border-[var(--color-magenta)]/40 bg-[var(--color-magenta)]/10 p-3 text-sm text-[var(--color-magenta)]">
          {status.message}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-[var(--color-muted)]">
          Odesláním souhlasíš se{" "}
          <a href="/ochrana-osobnich-udaju" className="underline underline-offset-4 hover:text-white">
            zpracováním údajů
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 font-semibold text-[var(--color-ink)] hover:brightness-110 transition disabled:opacity-60"
        >
          {status.type === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Odesílám…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Odeslat
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-ink)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)] focus:outline-none disabled:opacity-60";
