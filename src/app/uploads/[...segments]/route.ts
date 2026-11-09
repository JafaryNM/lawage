import { readFile } from "node:fs/promises";
import path from "node:path";

import { UPLOAD_DIR } from "@/lib/uploads";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ segments: string[] }> },
) {
  const { segments } = await params;
  if (!segments || segments.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  // Sanitize path segments to prevent traversal
  for (const part of segments) {
    if (!/^[a-zA-Z0-9_.-]+$/.test(part) || part === ".." || part === ".") {
      return new Response("Not found", { status: 404 });
    }
  }

  const filePath = path.join(UPLOAD_DIR, ...segments);
  const ext = path.extname(filePath).toLowerCase();

  try {
    const data = await readFile(filePath);
    return new Response(data, {
      headers: {
        "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

