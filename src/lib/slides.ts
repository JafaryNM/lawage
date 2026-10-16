import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { DATA_DIR, getDb } from "@/lib/db";
import { DEFAULT_SLIDES, type SlideFields, type SlideFocus } from "@/lib/slides-data";

import lawLibrary from "@/assets/law-library-justice.jpg";
import handshakeFile from "@/assets/hero-handshake-file.jpg";
// Lawyer at a laptop with case files, Pexels (pexels.com/photo/5668888), free under the Pexels
// licence; the law-firm name on the laptop screen is blurred out
import legalTech from "@/assets/hero-legal-tech.jpg";

export type Slide = SlideFields & { id: number; sortOrder: number; isActive: boolean };

/** A slide as the admin API returns it, with a ready-to-use image URL */
export type AdminSlide = Slide & { imageUrl: string };

/** What the public slideshow needs: a ready-to-use image URL and optional buttons */
export type PublicSlide = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  focus: SlideFocus;
  primary: { label: string; href: string } | null;
  secondary: { label: string; href: string } | null;
};

const BUILTIN_URLS: Record<string, string> = {
  "builtin:law-library": lawLibrary.src,
  "builtin:handshake-file": handshakeFile.src,
  "builtin:legal-tech": legalTech.src,
};

export const SLIDE_UPLOAD_DIR = path.join(DATA_DIR, "uploads", "slides");

// Keys of the replaced built-in photos (October 2026), in case a database has not migrated yet
const RETIRED_BUILTINS: Record<string, string> = {
  "builtin:advocate-desk": "builtin:law-library",
  "builtin:contract-review": "builtin:handshake-file",
  "builtin:advocate-handshake": "builtin:legal-tech",
};

export function slideImageUrl(image: string): string {
  if (image.startsWith("upload:")) return `/uploads/slides/${image.slice("upload:".length)}`;
  return BUILTIN_URLS[RETIRED_BUILTINS[image] ?? image] ?? lawLibrary.src;
}

type SlideRow = {
  id: number;
  title: string;
  description: string;
  image: string;
  image_alt: string;
  focus: SlideFocus;
  primary_label: string;
  primary_href: string;
  secondary_label: string;
  secondary_href: string;
  sort_order: number;
  is_active: number;
};

const fromRow = (r: SlideRow): Slide => ({
  id: r.id,
  title: r.title,
  description: r.description,
  image: r.image,
  imageAlt: r.image_alt,
  focus: r.focus,
  primaryLabel: r.primary_label,
  primaryHref: r.primary_href,
  secondaryLabel: r.secondary_label,
  secondaryHref: r.secondary_href,
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

export const toAdminSlide = (s: Slide): AdminSlide => ({ ...s, imageUrl: slideImageUrl(s.image) });

export function listSlides(): Slide[] {
  const rows = getDb()
    .prepare("SELECT * FROM hero_slides ORDER BY sort_order, id")
    .all() as SlideRow[];
  return rows.map(fromRow);
}

export function getSlide(id: number): Slide | null {
  const row = getDb().prepare("SELECT * FROM hero_slides WHERE id = ?").get(id) as
    SlideRow | undefined;
  return row ? fromRow(row) : null;
}

const toPublic = (s: SlideFields & { id: number }): PublicSlide => ({
  id: s.id,
  title: s.title,
  description: s.description,
  imageUrl: slideImageUrl(s.image),
  imageAlt: s.imageAlt,
  focus: s.focus,
  primary: s.primaryLabel && s.primaryHref ? { label: s.primaryLabel, href: s.primaryHref } : null,
  secondary:
    s.secondaryLabel && s.secondaryHref ? { label: s.secondaryLabel, href: s.secondaryHref } : null,
});

/** Active slides for the home page; the built-in slides stand in if none are active or the database is unavailable */
export function getPublicSlides(): PublicSlide[] {
  try {
    const active = listSlides().filter((s) => s.isActive);
    if (active.length) return active.map(toPublic);
  } catch (error) {
    console.error("Hero slides unavailable, using defaults:", error);
  }
  return DEFAULT_SLIDES.map((s, i) => toPublic({ ...s, id: -(i + 1) }));
}

export function createSlide(fields: SlideFields & { isActive: boolean }): number {
  const db = getDb();
  const { next } = db
    .prepare("SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM hero_slides")
    .get() as {
    next: number;
  };
  const result = db
    .prepare(
      `INSERT INTO hero_slides (title, description, image, image_alt, focus, primary_label, primary_href,
         secondary_label, secondary_href, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      fields.title,
      fields.description,
      fields.image,
      fields.imageAlt,
      fields.focus,
      fields.primaryLabel,
      fields.primaryHref,
      fields.secondaryLabel,
      fields.secondaryHref,
      next,
      fields.isActive ? 1 : 0,
    );
  return Number(result.lastInsertRowid);
}

export function updateSlide(id: number, fields: SlideFields & { isActive: boolean }) {
  getDb()
    .prepare(
      `UPDATE hero_slides SET title = ?, description = ?, image = ?, image_alt = ?, focus = ?,
         primary_label = ?, primary_href = ?, secondary_label = ?, secondary_href = ?, is_active = ?,
         updated_at = datetime('now')
       WHERE id = ?`,
    )
    .run(
      fields.title,
      fields.description,
      fields.image,
      fields.imageAlt,
      fields.focus,
      fields.primaryLabel,
      fields.primaryHref,
      fields.secondaryLabel,
      fields.secondaryHref,
      fields.isActive ? 1 : 0,
      id,
    );
}

export function deleteSlide(id: number) {
  getDb().prepare("DELETE FROM hero_slides WHERE id = ?").run(id);
}

export function setSlideActive(id: number, isActive: boolean) {
  getDb()
    .prepare("UPDATE hero_slides SET is_active = ?, updated_at = datetime('now') WHERE id = ?")
    .run(isActive ? 1 : 0, id);
}

/** Swap a slide with its neighbour above (-1) or below (+1) */
export function moveSlide(id: number, direction: -1 | 1) {
  const slides = listSlides();
  const index = slides.findIndex((s) => s.id === id);
  const other = slides[index + direction];
  const current = slides[index];
  if (!current || !other) return;

  const db = getDb();
  const setOrder = db.prepare("UPDATE hero_slides SET sort_order = ? WHERE id = ?");
  db.exec("BEGIN");
  try {
    // Renumber everything so equal or missing sort orders cannot block the swap
    slides.forEach((s, i) => setOrder.run(i + 1, s.id));
    setOrder.run(index + direction + 1, current.id);
    setOrder.run(index + 1, other.id);
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

export const UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Saves an uploaded photo and returns its stored image key ("upload:<file>") */
export async function saveSlideUpload(file: File): Promise<string> {
  const ext = UPLOAD_TYPES[file.type];
  if (!ext) throw new Error("Unsupported image type");
  const name = `${randomUUID()}.${ext}`;
  await mkdir(SLIDE_UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(SLIDE_UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `upload:${name}`;
}

/** Removes an uploaded photo once no slide uses it; built-in photos are never touched */
export async function removeUnusedUpload(image: string) {
  if (!image.startsWith("upload:")) return;
  const { n } = getDb()
    .prepare("SELECT COUNT(*) AS n FROM hero_slides WHERE image = ?")
    .get(image) as {
    n: number;
  };
  if (n > 0) return;
  await unlink(path.join(SLIDE_UPLOAD_DIR, path.basename(image.slice("upload:".length)))).catch(
    () => {},
  );
}
