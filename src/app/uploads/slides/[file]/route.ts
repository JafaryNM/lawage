import { readFile } from "node:fs/promises";
import path from "node:path";

import { SLIDE_UPLOAD_DIR } from "@/lib/slides";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

// Uploaded slide photos live in the data folder, outside public/, so they are served from here
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  // Stored names are "<uuid>.<ext>"; anything else (e.g. "../") is rejected
  if (!/^[0-9a-f-]{36}\.(jpg|png|webp)$/.test(file))
    return new Response("Not found", { status: 404 });

  try {
    const data = await readFile(path.join(SLIDE_UPLOAD_DIR, file));
    return new Response(data, {
      headers: {
        "Content-Type": CONTENT_TYPES[path.extname(file)] ?? "application/octet-stream",
        // File names are random and never reused, so the browser can cache them for good
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
