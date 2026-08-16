"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#0b1120",
          color: "#e2e8f0",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Application error
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#94a3b8", maxWidth: 380 }}>
            A critical error occurred. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          style={{
            height: "2.5rem",
            padding: "0 1.25rem",
            borderRadius: "0.5rem",
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            fontSize: "0.875rem",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
