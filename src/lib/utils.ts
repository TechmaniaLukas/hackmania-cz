import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: number, end: number): string {
  const s = new Date(start);
  const e = new Date(end);
  const months = [
    "ledna", "února", "března", "dubna", "května", "června",
    "července", "srpna", "září", "října", "listopadu", "prosince",
  ];
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}.–${e.getDate()}. ${months[s.getMonth()]} ${s.getFullYear()}`;
  }
  return `${s.getDate()}. ${months[s.getMonth()]} – ${e.getDate()}. ${months[e.getMonth()]} ${e.getFullYear()}`;
}

export function formatDate(ts: number): string {
  const d = new Date(ts);
  const months = [
    "led", "úno", "bře", "dub", "kvě", "čvn",
    "čvc", "srp", "zář", "říj", "lis", "pro",
  ];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "před chvílí";
  if (h < 24) return `před ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `před ${d} d`;
  return formatDate(ts);
}
