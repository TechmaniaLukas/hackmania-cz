"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { School } from "@/lib/mock-data";

// Default Leaflet markers reference assets from CDN; we inline SVG icons per type.
const universityIcon = L.divIcon({
  className: "hm-marker",
  html: `<div style="width:32px;height:32px;border-radius:50%;background:#b4ff39;color:#05060a;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;border:2px solid #05060a;box-shadow:0 2px 8px rgba(0,0,0,0.5)">VŠ</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const highschoolIcon = L.divIcon({
  className: "hm-marker",
  html: `<div style="width:28px;height:28px;border-radius:50%;background:#39f0ff;color:#05060a;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;border:2px solid #05060a;box-shadow:0 2px 8px rgba(0,0,0,0.5)">SŠ</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const otherIcon = L.divIcon({
  className: "hm-marker",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#ff3d9a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:10px;border:2px solid #05060a;box-shadow:0 2px 8px rgba(0,0,0,0.5)">•</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function iconFor(type: School["type"]) {
  if (type === "university") return universityIcon;
  if (type === "highschool") return highschoolIcon;
  return otherIcon;
}

function FitBounds({ schools }: { schools: School[] }) {
  const map = useMap();
  useEffect(() => {
    if (schools.length === 0) return;
    const bounds = L.latLngBounds(schools.map((s) => [s.lat, s.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
  }, [schools, map]);
  return null;
}

export function SchoolsMap({
  schools,
  focusedSlug,
}: {
  schools: School[];
  focusedSlug?: string;
}) {
  return (
    <div className="relative h-[460px] md:h-[560px] w-full overflow-hidden rounded-2xl border border-[var(--color-line)]">
      <MapContainer
        center={[49.82, 15.47]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full bg-[var(--color-ink-2)]"
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a>'
        />
        <FitBounds schools={schools} />
        {schools.map((s) => (
          <Marker
            key={s.slug}
            position={[s.lat, s.lng]}
            icon={iconFor(s.type)}
            zIndexOffset={s.slug === focusedSlug ? 1000 : 0}
          >
            <Popup>
              <div style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", minWidth: 200 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#05060a" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "#444", marginTop: 2 }}>{s.short}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 6 }}>{s.city}</div>
                {typeof s.hackathonsHosted === "number" && s.hackathonsHosted > 0 && (
                  <div style={{ fontSize: 12, color: "#0a6f20", marginTop: 4 }}>
                    {s.hackathonsHosted} hackathon{s.hackathonsHosted === 1 ? "" : s.hackathonsHosted < 5 ? "y" : "ů"}
                  </div>
                )}
                {s.websiteUrl && (
                  <a
                    href={s.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: "#0066cc", marginTop: 6, display: "inline-block" }}
                  >
                    Web školy ↗
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
