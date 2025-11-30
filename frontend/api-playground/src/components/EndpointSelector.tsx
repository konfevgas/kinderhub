// src/components/EndpointSelector.tsx

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type EndpointConfig = {
  id: string;
  label: string;
  path: string;
  method: HttpMethod;
  description?: string;
  sampleBody?: unknown;
};

interface EndpointSelectorProps {
  endpoints: EndpointConfig[];
  selectedId: string;
  onChange: (id: string) => void;
}

export function EndpointSelector({
  endpoints,
  selectedId,
  onChange,
}: EndpointSelectorProps) {
  return (
    <div
      style={{
        marginBottom: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <label style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
        Choose endpoint
      </label>
      <select
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "0.5rem 0.75rem",
          borderRadius: "0.375rem",
          border: "1px solid #374151",
          background: "#020617",
          color: "white",
        }}
      >
        {endpoints.map((ep) => (
          <option key={ep.id} value={ep.id}>
            [{ep.method}] {ep.path} – {ep.label}
          </option>
        ))}
      </select>
      <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: 0 }}>
        {endpoints.find((e) => e.id === selectedId)?.description}
      </p>
    </div>
  );
}
