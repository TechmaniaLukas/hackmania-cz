import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { buildIcs } from "@/lib/ics";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const h = await fetchQuery(api.hackathons.getBySlug, { slug }).catch(() => null);
  if (!h) notFound();

  const ics = buildIcs({
    uid: `hackathon-${h.slug}`,
    title: h.name,
    description: `${h.description}\n\nWeb: https://hackmania.cz/hackathony/${h.slug}`,
    location: h.venue ? `${h.venue}, ${h.city}` : h.city,
    url: `https://hackmania.cz/hackathony/${h.slug}`,
    start: h.startDate,
    end: h.endDate,
    organizer: { name: h.organizer },
  });

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${h.slug}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
