// src/components/Layout.tsx
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f172a",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <header
        style={{
          padding: "1rem 2rem",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.4rem" }}>API Playground</h1>
        <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#9ca3af" }}>
          Minimal React frontend to test your FastAPI endpoints
        </p>
      </header>

      <main
        style={{
          flex: 1,
          padding: "1.5rem 2rem",
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {children}
      </main>

      <footer
        style={{
          padding: "0.75rem 2rem",
          borderTop: "1px solid #1f2937",
          fontSize: "0.8rem",
          color: "#6b7280",
        }}
      >
        Backend: <code>{import.meta.env.VITE_API_BASE_URL || "not set"}</code>
      </footer>
    </div>
  );
}
