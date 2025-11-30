// src/lib/apiClient.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
  console.warn("VITE_API_BASE_URL is not set. Check your .env.local file.");
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions {
  path: string;
  method?: HttpMethod;
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
}

export async function apiRequest<T = unknown>({
  path,
  method = "GET",
  body,
  query,
}: ApiRequestOptions): Promise<T> {
  const url = new URL(path, API_BASE_URL);

  // add query parameters if any
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(String(key), String(value));
      }
    });
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();

  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(
      `Request failed with status ${res.status}: ${JSON.stringify(data)}`
    );
  }

  return data as T;
}
