import type { ApiErrorBody } from "./server";

/** Thrown for any non-2xx response; carries the API's message and per-field errors */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}

/** fetch() for /api routes: sends JSON (or FormData as-is) and returns the `data` field */
export async function apiFetch<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const { method = "GET", body } = init;
  const isForm = body instanceof FormData;

  let response: Response;
  try {
    const request: RequestInit = { method, credentials: "same-origin" };
    if (isForm) request.body = body;
    else if (body !== undefined) {
      request.body = JSON.stringify(body);
      request.headers = { "Content-Type": "application/json" };
    }
    response = await fetch(path, request);
  } catch {
    throw new ApiError(0, "Could not reach the server. Check your connection.");
  }

  if (response.status === 204) return undefined as T;
  const payload = (await response.json().catch(() => null)) as ({ data: T } & Partial<ApiErrorBody>) | null;
  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload?.error?.message ?? "Something went wrong.",
      payload?.error?.fieldErrors,
    );
  }
  return payload!.data;
}
