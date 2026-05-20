export type CommunityPlatform = {
  name: string;
  tagline: string;
  url: string;
  memberLabel: string;
  accent: string;
  ctaLabel: string;
};

export const COMMUNITY: Record<"discord" | "whatsapp" | "linkedin", CommunityPlatform> = {
  discord: {
    name: "Discord Hackmania",
    tagline:
      "Live chat, kanály podle hackathonů, hlasové místnosti, bot s oznámeními o akcích.",
    // TODO: doplnit reálný invite z Discord Server Settings → Invites
    url: "https://discord.gg/hackmania",
    memberLabel: "Přidej se k 1 200+ členům",
    accent: "var(--color-brand-2)",
    ctaLabel: "Otevřít Discord",
  },
  whatsapp: {
    name: "WhatsApp hackmania.cz",
    tagline:
      "Rychlé novinky, push notifikace o akcích, domluva jízd a ubytování na hackathony.",
    // TODO: invite link ze skupiny → Pozvat přes odkaz
    url: "https://chat.whatsapp.com/HACKMANIA_PLACEHOLDER",
    memberLabel: "Aktivní skupina pro celé Česko",
    accent: "var(--color-brand)",
    ctaLabel: "Vstoupit do skupiny",
  },
  linkedin: {
    name: "Hackmania na LinkedIn",
    tagline:
      "Recap posty, winner spotlights, partner stories, alumni journeys. Profesionální tvář komunity.",
    // TODO: reálný LinkedIn Page URL
    url: "https://www.linkedin.com/company/hackmania-cz",
    memberLabel: "2 400+ sledujících",
    accent: "#0a66c2",
    ctaLabel: "Sledovat",
  },
};
