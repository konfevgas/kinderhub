// src/components/JsonViewer.tsx
interface JsonViewerProps {
  data: unknown;
  title?: string;
}

export function JsonViewer({ data, title }: JsonViewerProps) {
  return (
    <div
      style={{
        marginTop: "1rem",
        backgroundColor: "#020617",
        borderRadius: "0.5rem",
        border: "1px solid #1f2937",
        padding: "0.75rem",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
        fontSize: "0.85rem",
        overflowX: "auto",
      }}
    >
      {title && (
        <div
          style={{
            marginBottom: "0.5rem",
            fontSize: "0.8rem",
            color: "#9ca3af",
          }}
        >
          {title}
        </div>
      )}
      <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {data === undefined ? "No data" : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
