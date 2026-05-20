// RFC 5545 iCalendar generator — text/calendar output.
// Keeps implementation minimal (no deps) for both hackathons and events.

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatUTC(ts: number): string {
  const d = new Date(ts);
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

// Escape per RFC 5545 §3.3.11 TEXT value type.
function esc(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

// Fold long lines at 75 octets per RFC 5545 §3.1.
function fold(line: string): string {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  let i = 0;
  while (i < line.length) {
    chunks.push((i === 0 ? "" : " ") + line.slice(i, i + 73));
    i += 73;
  }
  return chunks.join("\r\n");
}

export type IcsEvent = {
  uid: string;
  title: string;
  description?: string;
  location?: string;
  url?: string;
  start: number;
  end: number;
  organizer?: { name: string; email?: string };
};

export function buildIcs(event: IcsEvent): string {
  const now = Date.now();
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hackmania//hackmania.cz//CS",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}@hackmania.cz`,
    `DTSTAMP:${formatUTC(now)}`,
    `DTSTART:${formatUTC(event.start)}`,
    `DTEND:${formatUTC(event.end)}`,
    `SUMMARY:${esc(event.title)}`,
  ];
  if (event.description) lines.push(`DESCRIPTION:${esc(event.description)}`);
  if (event.location) lines.push(`LOCATION:${esc(event.location)}`);
  if (event.url) lines.push(`URL:${event.url}`);
  if (event.organizer) {
    const org = event.organizer.email
      ? `ORGANIZER;CN=${esc(event.organizer.name)}:mailto:${event.organizer.email}`
      : `ORGANIZER;CN=${esc(event.organizer.name)}:MAILTO:nobody@hackmania.cz`;
    lines.push(org);
  }
  lines.push("STATUS:CONFIRMED", "END:VEVENT", "END:VCALENDAR");
  return lines.map(fold).join("\r\n");
}
