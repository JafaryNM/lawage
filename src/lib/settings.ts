import "server-only";

import { getDb } from "@/lib/db";
import { DEFAULT_SITE_SETTINGS } from "./db-cms-seed";

export type SiteSettings = {
  firm_name: string;
  tagline: string;
  phone_call: string;
  phone_whatsapp: string;
  email_primary: string;
  address_dodoma: string;
  address_dar: string;
  vision: string;
  mission: string;
  social_linkedin: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  [key: string]: string;
};

export function getSiteSettings(): SiteSettings {
  try {
    const rows = getDb().prepare("SELECT key, value FROM site_settings").all() as { key: string; value: string }[];
    const settings: Record<string, string> = { ...DEFAULT_SITE_SETTINGS };
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    return settings as SiteSettings;
  } catch (error) {
    console.error("Failed to load site settings from DB:", error);
    return DEFAULT_SITE_SETTINGS as SiteSettings;
  }
}

export function updateSiteSettings(updates: Record<string, string>): void {
  const db = getDb();
  const upsert = db.prepare(`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);
  for (const [key, value] of Object.entries(updates)) {
    upsert.run(key, value);
  }
}

