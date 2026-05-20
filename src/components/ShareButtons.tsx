"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { XIcon, FacebookIcon } from "@/components/icons/SocialIcons";

export function ShareButtons({
  title,
  path,
  label = "Sdílet",
}: {
  title: string;
  path: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `https://hackmania.cz${path}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const links = [
    {
      name: "X",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encoded}`,
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-[var(--color-muted)] mr-1">
        {label}
      </span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Sdílet na ${l.name}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] bg-white/5 text-white hover:bg-white/10 transition"
        >
          <l.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Kopírovat odkaz"
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-white/5 px-2.5 text-xs text-white hover:bg-white/10 transition"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-[var(--color-brand)]" aria-hidden="true" />
            Zkopírováno
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Kopírovat odkaz
          </>
        )}
      </button>
    </div>
  );
}
