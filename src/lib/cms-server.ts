import "server-only";
import { revalidatePath } from "next/cache";

import { getDb } from "@/lib/db";
import type { Post } from "@/lib/posts";
import type { TeamMember, Department } from "@/lib/team";
import type { Service } from "@/lib/services";
import type { FlatIconName } from "@/components/site/FlatIcon";
import { DEFAULT_SITE_SETTINGS } from "@/lib/db-cms-seed";
import type { SiteSettings } from "@/lib/settings";

/* =========================================================================
   POSTS / LEGAL UPDATES
========================================================================= */

type DbPostRow = {
  id: number;
  slug: string;
  title: string;
  area: string;
  excerpt: string;
  body: string; // JSON array
  image: string;
  author: string;
  date: string;
  is_active: number;
  sort_order: number;
};

export type CmsPost = Post & {
  id: number;
  isActive: boolean;
  sortOrder: number;
};

function postFromRow(r: DbPostRow): CmsPost {
  let body: string[] = [];
  try {
    body = JSON.parse(r.body);
    if (!Array.isArray(body)) body = [r.body];
  } catch {
    body = r.body ? r.body.split("\n\n") : [];
  }

  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    area: r.area,
    excerpt: r.excerpt,
    body,
    image: r.image,
    author: r.author,
    date: r.date,
    isActive: Boolean(r.is_active),
    sortOrder: r.sort_order,
  };
}

export function getDbPosts(options?: { onlyActive?: boolean }): CmsPost[] {
  try {
    const where = options?.onlyActive ? "WHERE is_active = 1" : "";
    const rows = getDb()
      .prepare(`SELECT * FROM posts ${where} ORDER BY sort_order ASC, date DESC, id DESC`)
      .all() as DbPostRow[];
    return rows.map(postFromRow);
  } catch (err) {
    console.error("Error fetching db posts:", err);
    return [];
  }
}

export function getDbPostBySlug(slug: string): CmsPost | null {
  try {
    const row = getDb().prepare("SELECT * FROM posts WHERE slug = ? COLLATE NOCASE").get(slug) as
      | DbPostRow
      | undefined;
    return row ? postFromRow(row) : null;
  } catch (err) {
    console.error("Error fetching db post by slug:", err);
    return null;
  }
}

export function getDbPostById(id: number): CmsPost | null {
  try {
    const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as
      | DbPostRow
      | undefined;
    return row ? postFromRow(row) : null;
  } catch (err) {
    console.error("Error fetching db post by id:", err);
    return null;
  }
}

export function createDbPost(data: {
  slug: string;
  title: string;
  area: string;
  excerpt: string;
  body: string[];
  image: string;
  author: string;
  date: string;
  isActive?: boolean;
}): number {
  const db = getDb();
  const info = db
    .prepare(
      `INSERT INTO posts (slug, title, area, excerpt, body, image, author, date, is_active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT MAX(sort_order) + 1 FROM posts), 0))`,
    )
    .run(
      data.slug,
      data.title,
      data.area,
      data.excerpt,
      JSON.stringify(data.body),
      data.image,
      data.author,
      data.date,
      data.isActive ?? true ? 1 : 0,
    );
  revalidateCmsCache();
  return Number(info.lastInsertRowid);
}

export function updateDbPost(
  id: number,
  data: {
    slug: string;
    title: string;
    area: string;
    excerpt: string;
    body: string[];
    image: string;
    author: string;
    date: string;
    isActive?: boolean;
  },
) {
  const db = getDb();
  db.prepare(
    `UPDATE posts
     SET slug = ?, title = ?, area = ?, excerpt = ?, body = ?, image = ?, author = ?, date = ?,
         is_active = ?, updated_at = datetime('now')
     WHERE id = ?`,
  ).run(
    data.slug,
    data.title,
    data.area,
    data.excerpt,
    JSON.stringify(data.body),
    data.image,
    data.author,
    data.date,
    data.isActive ?? true ? 1 : 0,
    id,
  );
  revalidateCmsCache();
}

export function deleteDbPost(id: number) {
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
  revalidateCmsCache();
}

/* =========================================================================
   TEAM MEMBERS
========================================================================= */

type DbTeamRow = {
  id: number;
  slug: string;
  name: string;
  department: string;
  title: string;
  credentials: string;
  photo: string;
  bio: string;
  qualifications: string;
  expertise: string;
  linkedin: string;
  email: string;
  cv_url: string;
  is_active: number;
  sort_order: number;
};

export type CmsTeamMember = TeamMember & {
  id: number;
  isActive: boolean;
  sortOrder: number;
};

function teamFromRow(r: DbTeamRow): CmsTeamMember {
  const safeJson = (val: string): string[] => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return val ? [val] : [];
    }
  };

  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    department: r.department as Department,
    title: r.title,
    credentials: r.credentials || undefined,
    photo: r.photo,
    bio: safeJson(r.bio),
    qualifications: safeJson(r.qualifications),
    expertise: safeJson(r.expertise),
    linkedin: r.linkedin || undefined,
    email: r.email || undefined,
    cvUrl: r.cv_url || undefined,
    isActive: Boolean(r.is_active),
    sortOrder: r.sort_order,
  };
}

export function getDbTeam(options?: { onlyActive?: boolean }): CmsTeamMember[] {
  try {
    const where = options?.onlyActive ? "WHERE is_active = 1" : "";
    const rows = getDb()
      .prepare(`SELECT * FROM team_members ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as DbTeamRow[];
    return rows.map(teamFromRow);
  } catch (err) {
    console.error("Error fetching db team:", err);
    return [];
  }
}

export function getDbTeamMemberBySlug(slug: string): CmsTeamMember | null {
  try {
    const row = getDb()
      .prepare(
        "SELECT * FROM team_members WHERE slug = ? COLLATE NOCASE OR (slug = 'olivia-costa' AND ? = 'oliver-costa')",
      )
      .get(slug, slug) as DbTeamRow | undefined;
    return row ? teamFromRow(row) : null;
  } catch (err) {
    console.error("Error fetching db team member by slug:", err);
    return null;
  }
}

export function getDbTeamMemberById(id: number): CmsTeamMember | null {
  try {
    const row = getDb().prepare("SELECT * FROM team_members WHERE id = ?").get(id) as
      | DbTeamRow
      | undefined;
    return row ? teamFromRow(row) : null;
  } catch (err) {
    console.error("Error fetching db team member by id:", err);
    return null;
  }
}

export function createDbTeamMember(data: {
  slug: string;
  name: string;
  department: string;
  title: string;
  credentials?: string;
  photo: string;
  bio?: string[];
  qualifications?: string[];
  expertise?: string[];
  linkedin?: string;
  email?: string;
  cvUrl?: string;
  isActive?: boolean;
}): number {
  const db = getDb();
  const info = db
    .prepare(
      `INSERT INTO team_members (
        slug, name, department, title, credentials, photo, bio, qualifications,
        expertise, linkedin, email, cv_url, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT MAX(sort_order) + 1 FROM team_members), 0))`,
    )
    .run(
      data.slug,
      data.name,
      data.department,
      data.title,
      data.credentials ?? "",
      data.photo,
      JSON.stringify(data.bio ?? []),
      JSON.stringify(data.qualifications ?? []),
      JSON.stringify(data.expertise ?? []),
      data.linkedin ?? "",
      data.email ?? "",
      data.cvUrl ?? "",
      data.isActive ?? true ? 1 : 0,
    );
  revalidateCmsCache();
  return Number(info.lastInsertRowid);
}

export function updateDbTeamMember(
  id: number,
  data: {
    slug: string;
    name: string;
    department: string;
    title: string;
    credentials?: string;
    photo: string;
    bio?: string[];
    qualifications?: string[];
    expertise?: string[];
    linkedin?: string;
    email?: string;
    cvUrl?: string;
    isActive?: boolean;
  },
) {
  const db = getDb();
  db.prepare(
    `UPDATE team_members
     SET slug = ?, name = ?, department = ?, title = ?, credentials = ?, photo = ?,
         bio = ?, qualifications = ?, expertise = ?, linkedin = ?, email = ?, cv_url = ?,
         is_active = ?, updated_at = datetime('now')
     WHERE id = ?`,
  ).run(
    data.slug,
    data.name,
    data.department,
    data.title,
    data.credentials ?? "",
    data.photo,
    JSON.stringify(data.bio ?? []),
    JSON.stringify(data.qualifications ?? []),
    JSON.stringify(data.expertise ?? []),
    data.linkedin ?? "",
    data.email ?? "",
    data.cvUrl ?? "",
    data.isActive ?? true ? 1 : 0,
    id,
  );
  revalidateCmsCache();
}

export function deleteDbTeamMember(id: number) {
  getDb().prepare("DELETE FROM team_members WHERE id = ?").run(id);
  revalidateCmsCache();
}

export function getDbTeamByDepartment(): { department: Department; members: CmsTeamMember[] }[] {
  const members = getDbTeam({ onlyActive: true });
  const DEPARTMENTS: Department[] = [
    "Commercial & Strategic Sectors",
    "Technology, Digital Rights, Policy & Litigation",
    "Advocates",
    "Governance, Compliance & Investment",
    "Consultancy & Business Development",
    "Legal Support & Administration",
    "Technology & Data",
  ];
  return DEPARTMENTS.map((dept) => ({
    department: dept,
    members: members.filter((m) => m.department === dept),
  })).filter((group) => group.members.length > 0);
}

export function getDbFeaturedTeam(): CmsTeamMember[] {
  const FEATURED_DEPTS = [
    "Commercial & Strategic Sectors",
    "Technology, Digital Rights, Policy & Litigation",
    "Advocates",
    "Governance, Compliance & Investment",
    "Consultancy & Business Development",
  ];
  const members = getDbTeam({ onlyActive: true });
  return members.filter((m) => FEATURED_DEPTS.includes(m.department));
}

/* =========================================================================
   PRACTICE AREAS / SERVICES
========================================================================= */

type DbServiceRow = {
  id: number;
  slug: string;
  title: string;
  icon: string;
  text: string;
  headline: string;
  intro: string;
  scope: string;
  approach: string;
  image: string;
  sort_order: number;
  is_active: number;
};

export type CmsService = Service & {
  id: number;
  isActive: boolean;
  sortOrder: number;
};

function serviceFromRow(r: DbServiceRow): CmsService {
  const safeJson = (val: string): string[] => {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return val ? [val] : [];
    }
  };

  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    icon: r.icon as FlatIconName,
    text: r.text,
    headline: r.headline,
    intro: safeJson(r.intro),
    scope: safeJson(r.scope),
    approach: r.approach || "",
    image: r.image,
    isActive: Boolean(r.is_active),
    sortOrder: r.sort_order,
  };
}

export function getDbServices(options?: { onlyActive?: boolean }): CmsService[] {
  try {
    const where = options?.onlyActive ? "WHERE is_active = 1" : "";
    const rows = getDb()
      .prepare(`SELECT * FROM services ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as DbServiceRow[];
    return rows.map(serviceFromRow);
  } catch (err) {
    console.error("Error fetching db services:", err);
    return [];
  }
}

export function getDbServiceBySlug(slug: string): CmsService | null {
  try {
    const row = getDb().prepare("SELECT * FROM services WHERE slug = ? COLLATE NOCASE").get(slug) as
      | DbServiceRow
      | undefined;
    return row ? serviceFromRow(row) : null;
  } catch (err) {
    console.error("Error fetching db service by slug:", err);
    return null;
  }
}

export function getDbServiceById(id: number): CmsService | null {
  try {
    const row = getDb().prepare("SELECT * FROM services WHERE id = ?").get(id) as
      | DbServiceRow
      | undefined;
    return row ? serviceFromRow(row) : null;
  } catch (err) {
    console.error("Error fetching db service by id:", err);
    return null;
  }
}

export function createDbService(data: {
  slug: string;
  title: string;
  icon: string;
  text: string;
  headline: string;
  intro: string[];
  scope: string[];
  approach?: string;
  image: string;
  isActive?: boolean;
}): number {
  const db = getDb();
  const info = db
    .prepare(
      `INSERT INTO services (
        slug, title, icon, text, headline, intro, scope, approach, image, is_active, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE((SELECT MAX(sort_order) + 1 FROM services), 0))`,
    )
    .run(
      data.slug,
      data.title,
      data.icon,
      data.text,
      data.headline,
      JSON.stringify(data.intro),
      JSON.stringify(data.scope),
      data.approach ?? "",
      data.image,
      data.isActive ?? true ? 1 : 0,
    );
  revalidateCmsCache();
  return Number(info.lastInsertRowid);
}

export function updateDbService(
  id: number,
  data: {
    slug: string;
    title: string;
    icon: string;
    text: string;
    headline: string;
    intro: string[];
    scope: string[];
    approach?: string;
    image: string;
    isActive?: boolean;
  },
) {
  const db = getDb();
  db.prepare(
    `UPDATE services
     SET slug = ?, title = ?, icon = ?, text = ?, headline = ?, intro = ?, scope = ?,
         approach = ?, image = ?, is_active = ?, updated_at = datetime('now')
     WHERE id = ?`,
  ).run(
    data.slug,
    data.title,
    data.icon,
    data.text,
    data.headline,
    JSON.stringify(data.intro),
    JSON.stringify(data.scope),
    data.approach ?? "",
    data.image,
    data.isActive ?? true ? 1 : 0,
    id,
  );
  revalidateCmsCache();
}

export function deleteDbService(id: number) {
  getDb().prepare("DELETE FROM services WHERE id = ?").run(id);
  revalidateCmsCache();
}

/* =========================================================================
   SITE SETTINGS
========================================================================= */

export function getDbSettings(): SiteSettings {
  try {
    const rows = getDb().prepare("SELECT key, value FROM site_settings").all() as {
      key: string;
      value: string;
    }[];
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

export function updateDbSettings(updates: Record<string, string>): void {
  const db = getDb();
  const upsert = db.prepare(`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);
  for (const [key, value] of Object.entries(updates)) {
    upsert.run(key, value);
  }
  revalidateCmsCache();
}

/* =========================================================================
   CACHE REVALIDATION
========================================================================= */

export function revalidateCmsCache() {
  try {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/team");
    revalidatePath("/services");
    revalidatePath("/contact");
    revalidatePath("/about");
  } catch {
    // Outside request context (e.g. migration script)
  }
}

