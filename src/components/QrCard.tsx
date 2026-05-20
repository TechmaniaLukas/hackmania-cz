import { QRCodeSVG } from "qrcode.react";
import { ArrowUpRight } from "lucide-react";
import { COMMUNITY } from "@/lib/community";

export function QrCard({ platform }: { platform: "discord" | "whatsapp" }) {
  const p = COMMUNITY[platform];
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-8 transition hover:border-[color:var(--accent)]/60 hover:bg-[var(--color-ink-3)]"
      style={{ ["--accent" as string]: p.accent }}
    >
      <div
        className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl opacity-0 transition group-hover:opacity-40"
        style={{ background: p.accent }}
      />
      <div className="relative flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: p.accent }}
          >
            {platform === "discord" ? "Discord" : "WhatsApp"}
          </div>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-white">
            {p.name}
          </h3>
          <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
            {p.tagline}
          </p>
          <div className="mt-2 text-xs text-[var(--color-muted)]">{p.memberLabel}</div>
        </div>
        <div className="shrink-0 self-center sm:self-auto rounded-xl bg-white p-3">
          <QRCodeSVG
            value={p.url}
            size={160}
            bgColor="#ffffff"
            fgColor="#05060a"
            level="M"
          />
        </div>
      </div>
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative mt-6 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:brightness-110"
        style={{ background: p.accent }}
      >
        {p.ctaLabel} <ArrowUpRight className="h-4 w-4" />
      </a>
      <div className="relative mt-4 text-[11px] text-[var(--color-muted)]">
        Skenuj QR kód mobilem pro okamžité připojení.
      </div>
    </div>
  );
}
