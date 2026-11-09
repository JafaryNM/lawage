import { type DatabaseSync } from "node:sqlite";

export function applyCmsMigrations(db: DatabaseSync) {
  // 1. Posts / Articles
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id         INTEGER PRIMARY KEY,
      slug       TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      title      TEXT    NOT NULL,
      area       TEXT    NOT NULL,
      excerpt    TEXT    NOT NULL DEFAULT '',
      body       TEXT    NOT NULL, -- JSON array of strings
      image      TEXT    NOT NULL DEFAULT '',
      author     TEXT    NOT NULL DEFAULT 'LawAge Advocates',
      date       TEXT    NOT NULL,
      is_active  INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id             INTEGER PRIMARY KEY,
      slug           TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      name           TEXT    NOT NULL,
      department     TEXT    NOT NULL,
      title          TEXT    NOT NULL DEFAULT '',
      credentials    TEXT    NOT NULL DEFAULT '',
      photo          TEXT    NOT NULL DEFAULT '',
      bio            TEXT    NOT NULL DEFAULT '[]', -- JSON array of strings
      qualifications TEXT    NOT NULL DEFAULT '[]', -- JSON array of strings
      expertise      TEXT    NOT NULL DEFAULT '[]', -- JSON array of strings
      linkedin       TEXT    NOT NULL DEFAULT '',
      email          TEXT    NOT NULL DEFAULT '',
      cv_url         TEXT    NOT NULL DEFAULT '',
      is_active      INTEGER NOT NULL DEFAULT 1,
      sort_order     INTEGER NOT NULL DEFAULT 0,
      updated_at     TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS services (
      id          INTEGER PRIMARY KEY,
      slug        TEXT    NOT NULL UNIQUE COLLATE NOCASE,
      title       TEXT    NOT NULL,
      icon        TEXT    NOT NULL DEFAULT 'briefcase',
      text        TEXT    NOT NULL DEFAULT '',
      headline    TEXT    NOT NULL DEFAULT '',
      intro       TEXT    NOT NULL DEFAULT '[]', -- JSON array
      scope       TEXT    NOT NULL DEFAULT '[]', -- JSON array
      approach    TEXT    NOT NULL DEFAULT '',
      image       TEXT    NOT NULL DEFAULT '',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1,
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      key         TEXT PRIMARY KEY,
      value       TEXT NOT NULL,
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id         INTEGER PRIMARY KEY,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL,
      phone      TEXT    NOT NULL DEFAULT '',
      area       TEXT    NOT NULL DEFAULT '',
      message    TEXT    NOT NULL,
      is_read    INTEGER NOT NULL DEFAULT 0,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

