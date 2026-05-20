import type { Metadata } from "next";

const title = "Akce a workshopy";
const description =
  "Workshopy, meetupy, přednášky a konference napříč ČR i online. Vibecoding, AI, robotika a další.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/akce" },
  openGraph: { title, description, url: "https://hackmania.cz/akce", type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/twitter-image"] },
};

export default function AkceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
