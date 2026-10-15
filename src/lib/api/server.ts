import { NextResponse } from "next/server";
import type { z } from "zod";

import { getCurrentAdmin, type Admin } from "@/lib/auth/session";

/** Error body shared by every API route (see docs/API.md) */
export type ApiErrorBody = { error: { message: string; fieldErrors?: Record<string, string> } };

export const ok = <T>(data: T, status = 200) => NextResponse.json({ data }, { status });
export const noContent = () => new NextResponse(null, { status: 204 });
export const fail = (status: number, message: string, fieldErrors?: Record<string, string>) =>
  NextResponse.json<ApiErrorBody>({ error: fieldErrors ? { message, fieldErrors } : { message } }, { status });

/** First message per field, keyed by field name */
export function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) errors[String(issue.path[0] ?? "form")] ??= issue.message;
  return errors;
}

// The session cookie is SameSite=Lax; this also rejects data-changing requests from other sites
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // same-origin fetches from older browsers and server-side tools
  return origin === new URL(request.url).origin;
}

type Handler<C> = (request: Request, context: C & { admin: Admin }) => Promise<Response>;

/** Wraps an admin route: checks origin and session, and turns unexpected errors into JSON */
export function withAdmin<C extends object>(handler: Handler<C>) {
  return async (request: Request, context: C): Promise<Response> => {
    if (request.method !== "GET" && !isSameOrigin(request)) return fail(403, "Cross-site request refused.");
    try {
      const admin = await getCurrentAdmin();
      if (!admin) return fail(401, "Please sign in.");
      return await handler(request, { ...context, admin });
    } catch (error) {
      console.error(error);
      return fail(500, "Something went wrong. Please try again.");
    }
  };
}

/** Same as withAdmin but for routes that work without a session (login) */
export function withErrors<C extends object>(handler: (request: Request, context: C) => Promise<Response>) {
  return async (request: Request, context: C): Promise<Response> => {
    if (request.method !== "GET" && !isSameOrigin(request)) return fail(403, "Cross-site request refused.");
    try {
      return await handler(request, context);
    } catch (error) {
      console.error(error);
      return fail(500, "Something went wrong. Please try again.");
    }
  };
}

/** Parses a positive integer route id, or null */
export const parseId = (raw: string) => (/^\d+$/.test(raw) ? Number(raw) : null);
