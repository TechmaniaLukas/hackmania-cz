import type { Metadata } from "next";

const title = "Školy na mapě";
const description =
  "Interaktivní mapa středních a vysokých škol zapojených do Hackmania komunity. 15 univerzit a 5+ středních škol napříč ČR.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/skoly" },
  openGraph: { title, description, url: "https://hackmania.cz/skoly", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default function SkolyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
