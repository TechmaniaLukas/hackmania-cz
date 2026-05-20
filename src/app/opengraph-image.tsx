import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hackmania — Portál českých hackathonů";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(800px 500px at 80% 20%, rgba(57,240,255,0.25), transparent 60%), radial-gradient(1100px 600px at 20% 110%, rgba(180,255,57,0.28), transparent 60%), #05060a",
          color: "#e7e9f0",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#b4ff39",
              color: "#05060a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 38,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.5 }}>
            hackmania<span style={{ color: "#b4ff39" }}>.cz</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Česko, které <span style={{ color: "#b4ff39" }}>hackuje.</span>
          </div>
          <div style={{ fontSize: 28, color: "#8b93a8", maxWidth: 900 }}>
            Portál českých hackathonů, workshopů a AI novinek.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 20,
            color: "#8b93a8",
            borderTop: "1px solid #1e2230",
            paddingTop: 20,
          }}
        >
          <span>12+ hackathonů ročně</span>
          <span>·</span>
          <span>2 400+ studentů</span>
          <span>·</span>
          <span>40 škol</span>
        </div>
      </div>
    ),
    size
  );
}
