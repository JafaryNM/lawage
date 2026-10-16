import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import { DEFAULT_SLIDES } from "./slides-data.ts";

/** Folder for the SQLite file and uploaded images; kept out of git */
export const DATA_DIR = process.env["DATA_DIR"] ?? path.join(process.cwd(), "data");
const DB_PATH = process.env["DATABASE_PATH"] ?? path.join(DATA_DIR, "lawage.db");

/**
 * Schema changes, applied in order. PRAGMA user_version records how many have run, so each
 * runs once per database. Only ever append new entries.
 */
const MIGRATIONS: ((db: DatabaseSync) => void)[] = [
  (db) =>
    db.exec(`
      CREATE TABLE IF NOT EXISTS admins (
        id            INTEGER PRIMARY KEY,
        username      TEXT    NOT NULL UNIQUE COLLATE NOCASE,
        name          TEXT    NOT NULL,
        password_hash TEXT    NOT NULL,
        created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS sessions (
        token_hash TEXT    PRIMARY KEY,
        admin_id   INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
        expires_at INTEGER NOT NULL
      );
    `),

  (db) => {
    db.exec(`
      CREATE TABLE hero_slides (
        id              INTEGER PRIMARY KEY,
        title           TEXT    NOT NULL,
        description     TEXT    NOT NULL DEFAULT '',
        image           TEXT    NOT NULL,
        image_alt       TEXT    NOT NULL DEFAULT '',
        focus           TEXT    NOT NULL DEFAULT 'center',
        primary_label   TEXT    NOT NULL DEFAULT '',
        primary_href    TEXT    NOT NULL DEFAULT '',
        secondary_label TEXT    NOT NULL DEFAULT '',
        secondary_href  TEXT    NOT NULL DEFAULT '',
        sort_order      INTEGER NOT NULL,
        is_active       INTEGER NOT NULL DEFAULT 1,
        updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
      );
    `);
    const insert = db.prepare(
      `INSERT INTO hero_slides (title, description, image, image_alt, focus, primary_label,
         primary_href, secondary_label, secondary_href, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    );
    DEFAULT_SLIDES.forEach((s, i) =>
      insert.run(
        s.title,
        s.description,
        s.image,
        s.imageAlt,
        s.focus,
        s.primaryLabel,
        s.primaryHref,
        s.secondaryLabel,
        s.secondaryHref,
        i + 1,
      ),
    );
  },

  // Built-in hero photos replaced with ones that show no faces (client request, October 2026)
  (db) =>
    db.exec(`
      UPDATE hero_slides SET image = 'builtin:law-library', focus = 'center'
        WHERE image = 'builtin:advocate-desk';
      UPDATE hero_slides SET image = 'builtin:handshake-file', focus = 'center'
        WHERE image = 'builtin:contract-review';
      UPDATE hero_slides SET image = 'builtin:legal-tech', focus = 'center'
        WHERE image = 'builtin:advocate-handshake';
    `),

  // Screen-reader descriptions for the new built-in photos, where the original text was untouched
  (db) =>
    db.exec(`
      UPDATE hero_slides SET image_alt = 'Law library with a scales of justice statue on the desk'
        WHERE image = 'builtin:law-library'
          AND image_alt = 'Advocate writing at his desk beside the scales of justice';
      UPDATE hero_slides SET image_alt = 'Advocate shaking hands with a client holding a case file'
        WHERE image = 'builtin:handshake-file'
          AND image_alt = 'Advocate guiding a client through a contract';
      UPDATE hero_slides SET image_alt = 'Lawyer working on a laptop beside case files and notebooks'
        WHERE image = 'builtin:legal-tech'
          AND image_alt = 'Advocate in court robes shaking hands with a client';
    `),
];

function migrate(db: DatabaseSync) {
  const { user_version: version } = db.prepare("PRAGMA user_version").get() as {
    user_version: number;
  };
  for (let v = version; v < MIGRATIONS.length; v++) {
    db.exec("BEGIN");
    try {
      MIGRATIONS[v]!(db);
      db.exec(`PRAGMA user_version = ${v + 1}`);
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }
}

// Reuse one connection across dev hot reloads
const globalForDb = globalThis as typeof globalThis & { lawageDb?: DatabaseSync };

export function getDb(): DatabaseSync {
  if (!globalForDb.lawageDb) {
    mkdirSync(path.dirname(DB_PATH), { recursive: true });
    const db = new DatabaseSync(DB_PATH);
    db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
    globalForDb.lawageDb = db;
  }
  // Checked on every call (one PRAGMA read) so a long-running dev server also picks up
  // migrations added after it started, not just a fresh connection
  migrate(globalForDb.lawageDb);
  return globalForDb.lawageDb;
}
