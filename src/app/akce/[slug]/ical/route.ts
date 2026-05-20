import { events } from "@/lib/mock-data";
import { buildIcs } from "@/lib/ics";
import { notFound } from "next/navigation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ev = events.find((x) => x.slug === slug);
  if (!ev) notFound();

  const ics = buildIcs({
    uid: `akce-${ev.slug}`,
    title: ev.name,
    description: `${ev.description}\n\nWeb: https://hackmania.cz/akce/${ev.slug}`,
    location: ev.venue ? `${ev.venue}, ${ev.city}` : ev.city,
    url: `https://hackmania.cz/akce/${ev.slug}`,
    start: ev.startDate,
    end: ev.endDate ?? ev.startDate + 60 * 60 * 1000, // fallback 1h
    organizer: { name: ev.organizer },
  });

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${ev.slug}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}
