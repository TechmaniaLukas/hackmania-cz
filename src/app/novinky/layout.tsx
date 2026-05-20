import type { Metadata } from "next";

const title = "Novinky";
const description =
  "Novinky ze světa AI, vibecodingu, robotiky, matematiky a techniky. Agregujeme z nejlepších českých i světových zdrojů.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/novinky" },
  openGraph: { title, description, url: "https://hackmania.cz/novinky", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default function NovinkyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
