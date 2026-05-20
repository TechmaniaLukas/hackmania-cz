"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const LINKS = [
  { href: "/hackathony", label: "Hackathony" },
  { href: "/akce", label: "Akce & workshopy" },
  { href: "/novinky", label: "Novinky" },
  { href: "/komunita", label: "Komunita" },
  { href: "/partneri", label: "Partneři" },
  { href: "/o-nas", label: "O nás" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-line)] bg-white/5 text-white hover:bg-white/10 transition"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="lg:hidden fixed left-0 right-0 top-16 h-[calc(100vh-4rem)] z-40 bg-[var(--color-ink)] overflow-y-auto">
          <nav className="flex flex-col px-6 py-6 gap-1">
            {LINKS.map((l) => {
              const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-4 py-4 text-lg font-[family-name:var(--font-display)] transition ${
                    active
                      ? "bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                      : "text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/hackathony"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3.5 font-semibold text-[var(--color-ink)] hover:brightness-110 transition"
            >
              Najít hackathon <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
