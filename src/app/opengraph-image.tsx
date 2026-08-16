import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b1120",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#4f46e5",
            color: "#ffffff",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          R
        </div>
        <div style={{ fontSize: 30, fontWeight: 600, color: "#ffffff" }}>
          RemoteJob
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Track every remote application in one place.
        </div>
        <div style={{ fontSize: 26, color: "#94a3b8", maxWidth: 760 }}>
          A modern dashboard for monitoring your remote job search pipeline,
          interviews, and offers.
        </div>
      </div>
    </div>,
    { ...size },
  );
}
