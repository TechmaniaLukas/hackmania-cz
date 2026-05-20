import type { Metadata } from "next";

const title = "Katalog hackathonů";
const description =
  "Všechny české hackathony na jednom místě. Filtruj podle tématu, města a termínu. 12+ akcí ročně.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hackathony" },
  openGraph: { title, description, url: "https://hackmania.cz/hackathony", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default function HackathonyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
