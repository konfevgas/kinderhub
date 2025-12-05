// src/components/ApiPlayground.tsx
import { useState } from "react";
import { apiRequest } from "../lib/apiClient";
import { EndpointSelector } from "./EndpointSelector";
import { JsonViewer } from "./JsonViewer";

// Local HttpMethod + EndpointConfig types – keep it simple
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type EndpointConfig = {
  id: string;
  label: string;
  path: string;
  method: HttpMethod;
  description?: string;
  sampleBody?: unknown;
};

const DEFAULT_ENDPOINTS: EndpointConfig[] = [
  {
    id: "list_airports",
    label: "List Airports",
    path: "/list_airports",
    method: "GET",
    description: "Retrieve a list of all airports in the database.",
  },
];

export function ApiPlayground() {
  const [endpoints] = useState<EndpointConfig[]>(DEFAULT_ENDPOINTS);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_ENDPOINTS[0].id);
  const [bodyInput, setBodyInput] = useState<string>("{}");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<unknown>();
  const [error, setError] = useState<string | null>(null);

  const selected = endpoints.find((e) => e.id === selectedId)!;

  const handleSend = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(undefined);

    let parsedBody: unknown = undefined;

    // Only parse JSON for methods that send a body
    if (selected.method !== "GET" && selected.method !== "DELETE") {
      try {
        parsedBody = bodyInput.trim() ? JSON.parse(bodyInput) : undefined;
      } catch (e) {
        setError("Invalid JSON in request body.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const data = await apiRequest({
        path: selected.path,
        method: selected.method,
        body: parsedBody,
      });
      setResponse(data);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const showBodyEditor = selected.method !== "GET" && selected.method !== "DELETE";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1.5fr)",
        gap: "1.25rem",
        alignItems: "flex-start",
      }}
    >
      {/* Left: Request */}
      <div
        style={{
          padding: "1rem",
          borderRadius: "0.75rem",
          border: "1px solid #1f2937",
          backgroundColor: "#020617",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: "1rem", marginBottom: "0.75rem" }}>
          Request
        </h2>

        <EndpointSelector
          endpoints={endpoints}
          selectedId={selectedId}
          onChange={setSelectedId}
        />

        <div
          style={{
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: "#e5e7eb",
          }}
        >
          <div
            style={{
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                padding: "0.1rem 0.4rem",
                borderRadius: "0.375rem",
                border: "1px solid #374151",
                fontSize: "0.75rem",
              }}
            >
              {selected.method}
            </span>
            <code>{selected.path}</code>
          </div>
        </div>

        {showBodyEditor && (
          <div style={{ marginTop: "0.75rem" }}>
            <label
              style={{
                fontSize: "0.85rem",
                color: "#9ca3af",
                marginBottom: "0.25rem",
                display: "block",
              }}
            >
              Request Body (JSON)
            </label>
            <textarea
              rows={8}
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #374151",
                backgroundColor: "#020617",
                color: "#e5e7eb",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                fontSize: "0.85rem",
                resize: "vertical",
              }}
            />
          </div>
        )}

        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{
            marginTop: "0.75rem",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background:
              "linear-gradient(to right, #22c55e, #16a34a, #22c55e)",
            color: "#020617",
            fontWeight: 600,
            fontSize: "0.9rem",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Sending..." : "Send Request"}
        </button>

        {error && (
          <div
            style={{
              marginTop: "0.75rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "#450a0a",
              border: "1px solid #b91c1c",
              fontSize: "0.8rem",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Right: Response */}
      <div
        style={{
          padding: "1rem",
          borderRadius: "0.75rem",
          border: "1px solid #1f2937",
          backgroundColor: "#020617",
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: "1rem", marginBottom: "0.75rem" }}>
          Response
        </h2>
        <JsonViewer data={response} />
      </div>
    </div>
  );
}
