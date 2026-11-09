import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { DATA_DIR } from "@/lib/db";

export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
};

/**
 * Saves an uploaded file to `data/uploads/<folder>/<uuid>.<ext>`
 * and returns the public URL: `/uploads/<folder>/<uuid>.<ext>`.
 */
export async function saveUploadedFile(folder: string, file: File): Promise<string> {
  const ext =
    MIME_EXTENSIONS[file.type] ??
    path.extname(file.name).toLowerCase() ??
    ".jpg";

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error("Only JPG, PNG, WebP, and SVG images are supported.");
  }

  const safeFolder = folder.replace(/[^a-z0-9_-]/gi, "");
  const targetDir = path.join(UPLOAD_DIR, safeFolder);
  await mkdir(targetDir, { recursive: true });

  const filename = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(targetDir, filename), buffer);

  return `/uploads/${safeFolder}/${filename}`;
}

/**
 * Deletes an uploaded file if it starts with `/uploads/<folder>/...` or `upload:...`.
 */
export async function deleteUploadedFile(storedKey: string): Promise<void> {
  let relative = "";
  if (storedKey.startsWith("upload:")) {
    relative = storedKey.slice("upload:".length);
  } else if (storedKey.startsWith("/uploads/")) {
    relative = storedKey.slice("/uploads/".length);
  } else {
    return;
  }
  const safePath = path.normalize(relative).replace(/^(\.\.(\/|\\|$))+/, "");
  const targetFile = path.join(UPLOAD_DIR, safePath);
  await unlink(targetFile).catch(() => undefined);
}

/**
 * Resolves any stored image reference into a usable URL string for <img src="..." />
 */
export function resolveImageUrl(storedImage?: string | null, fallbackUrl = ""): string {
  if (!storedImage) return fallbackUrl;
  if (storedImage.startsWith("upload:")) {
    return `/uploads/${storedImage.slice("upload:".length)}`;
  }
  return storedImage;
}
