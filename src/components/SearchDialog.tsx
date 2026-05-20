"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Calendar, Newspaper, GraduationCap, Building2, Trophy, X } from "lucide-react";
import { hackathons, events, news, schools } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export function SearchTriggerButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "/" && (e.target as HTMLElement)?.tagName !== "INPUT" && (e.target as HTMLElement)?.tagName !== "TEXTAREA" && (e.target as HTMLElement)?.tagName !== "SELECT") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Otevřít vyhledávání (Ctrl+K)"
        className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-white/5 px-3 py-2 text-sm text-[var(--color-muted)] hover:bg-white/10 hover:text-white transition"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden md:inline">Hledat…</span>
        <kbd className="hidden md:inline-flex h-5 items-center rounded border border-[var(--color-line)] bg-[var(--color-ink)] px-1.5 font-mono text-[10px] text-[var(--color-muted)]">
          Ctrl K
        </kbd>
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!open) setValue("");
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Globální vyhledávání"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] shadow-2xl shadow-black/60">
        <Command label="Globální vyhledávání" shouldFilter={true} className="flex flex-col max-h-[70vh]">
          <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-5">
            <Search className="h-5 w-5 text-[var(--color-muted)]" aria-hidden="true" />
            <Command.Input
              autoFocus
              placeholder="Hledej hackathon, akci, školu, novinku…"
              value={value}
              onValueChange={setValue}
              className="flex-1 bg-transparent py-4 text-white placeholder:text-[var(--color-muted)] outline-none"
            />
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Zavřít vyhledávání"
              className="rounded-md p-1.5 text-[var(--color-muted)] hover:bg-white/5 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <Command.List className="overflow-y-auto py-2">
            <Command.Empty className="px-5 py-8 text-center text-sm text-[var(--color-muted)]">
              Nic jsme nenašli. Zkus jiné klíčové slovo.
            </Command.Empty>

            <Command.Group heading="Hackathony">
              {hackathons.map((h) => (
                <Command.Item
                  key={h.slug}
                  value={`hackathon ${h.name} ${h.city} ${h.topics.join(" ")}`}
                  onSelect={() => go(`/hackathony/${h.slug}`)}
                  className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--color-fg)] data-[selected=true]:bg-white/10"
                >
                  <Trophy className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium text-white">{h.name}</div>
                    <div className="truncate text-xs text-[var(--color-muted)]">
                      {h.city} · {formatDate(h.startDate)}
                    </div>
                  </div>
                  {h.status === "past" && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/70">
                      Uplynulý
                    </span>
                  )}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Akce & workshopy">
              {events.map((e) => (
                <Command.Item
                  key={e.slug}
                  value={`akce ${e.name} ${e.city} ${e.type} ${e.topics.join(" ")}`}
                  onSelect={() => go(`/akce/${e.slug}`)}
                  className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-white/10"
                >
                  <Calendar className="h-4 w-4 text-[var(--color-brand-2)]" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium text-white">{e.name}</div>
                    <div className="truncate text-xs text-[var(--color-muted)]">
                      {e.city} · {formatDate(e.startDate)}
                    </div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Novinky">
              {news.slice(0, 10).map((n) => (
                <Command.Item
                  key={n.slug}
                  value={`novinka ${n.title} ${n.category} ${n.summary}`}
                  onSelect={() => {
                    onOpenChange(false);
                    window.open(n.sourceUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-white/10"
                >
                  <Newspaper className="h-4 w-4 text-[var(--color-magenta)]" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium text-white">{n.title}</div>
                    <div className="truncate text-xs text-[var(--color-muted)]">{n.sourceName}</div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Školy">
              {schools.map((s) => (
                <Command.Item
                  key={s.slug}
                  value={`skola ${s.name} ${s.short} ${s.city}`}
                  onSelect={() => go(`/skoly`)}
                  className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-white/10"
                >
                  {s.type === "highschool" ? (
                    <Building2 className="h-4 w-4 text-[var(--color-brand-2)]" aria-hidden="true" />
                  ) : (
                    <GraduationCap className="h-4 w-4 text-[var(--color-brand)]" aria-hidden="true" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium text-white">{s.name}</div>
                    <div className="truncate text-xs text-[var(--color-muted)]">
                      {s.city} · {s.region}
                    </div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Stránky">
              {[
                { href: "/hackathony", label: "Katalog hackathonů" },
                { href: "/akce", label: "Kalendář akcí" },
                { href: "/novinky", label: "Novinky" },
                { href: "/komunita", label: "Komunita (Discord, WhatsApp)" },
                { href: "/skoly", label: "Mapa škol" },
                { href: "/partneri", label: "Partneři" },
                { href: "/pro-firmy", label: "Pro firmy — partnerství" },
                { href: "/faq", label: "Často kladené otázky" },
                { href: "/kodex", label: "Kodex komunity" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((l) => (
                <Command.Item
                  key={l.href}
                  value={`page ${l.label} ${l.href}`}
                  onSelect={() => go(l.href)}
                  className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-white/10"
                >
                  <Search className="h-4 w-4 text-[var(--color-muted)]" aria-hidden="true" />
                  <div className="flex-1 text-white">{l.label}</div>
                  <div className="text-xs text-[var(--color-muted)]">{l.href}</div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <div className="flex items-center justify-between border-t border-[var(--color-line)] px-4 py-2.5 text-[11px] text-[var(--color-muted)]">
            <div className="flex items-center gap-3">
              <span><kbd className="rounded bg-white/5 px-1.5 py-0.5">↑↓</kbd> navigace</span>
              <span><kbd className="rounded bg-white/5 px-1.5 py-0.5">Enter</kbd> vybrat</span>
              <span><kbd className="rounded bg-white/5 px-1.5 py-0.5">Esc</kbd> zavřít</span>
            </div>
            <span>Hackmania</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
