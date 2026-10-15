import { fail, ok } from "@/lib/api/server";
import { search } from "@/lib/search";

// Public: GET /api/search?q=<words>&limit=<1-50> → { data: SearchResult[] }
export function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const q = (params.get("q") ?? "").slice(0, 100);
  const limit = Math.min(Math.max(Number(params.get("limit")) || 8, 1), 50);
  if (!q.trim()) return fail(400, "Add a search term with ?q=.");
  return ok(search(q, limit));
}
