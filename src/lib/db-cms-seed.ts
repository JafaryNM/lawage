import { type DatabaseSync } from "node:sqlite";

import defaultPosts from "./default-posts.json";
import defaultServices from "./default-services.json";
import defaultTeam from "./default-team.json";

export const DEFAULT_SITE_SETTINGS: Record<string, string> = {
  firm_name: "LawAge Advocates",
  tagline: "A Class Above Legal Excellence",
  phone_call: "+255 713 282263",
  phone_whatsapp: "+255 777 626294",
  email_primary: "info@lawage.co.tz",
  address_dodoma: "Plot 33, Block AC, Medeli, Tambukareli, First Floor, P.O. Box 1909, Dodoma, Tanzania",
  address_dar: "3rd Floor, Sukari House, Sokoine Drive/Ohio Street, P.O. Box 75841, Dar es Salaam",
  vision: "To be a leading law firm in Tanzania and beyond, recognized for delivering innovative legal solutions, shaping business success, and advancing justice with integrity and excellence.",
  mission: "To deliver innovative legal solutions shaping business success and advancing justice with integrity and excellence.",
  social_linkedin: "https://www.linkedin.com/company/lawage-advocates",
  social_facebook: "https://facebook.com",
  social_twitter: "https://twitter.com",
  social_instagram: "https://www.instagram.com/lawage_consult",
};

export function seedCmsData(db: DatabaseSync) {
  // 1. Settings
  const settingCount = (db.prepare("SELECT COUNT(*) AS count FROM site_settings").get() as { count: number }).count;
  if (settingCount === 0) {
    const insertSetting = db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?)");
    for (const [key, value] of Object.entries(DEFAULT_SITE_SETTINGS)) {
      insertSetting.run(key, value);
    }
  }

  // 2. Posts
  const postCount = (db.prepare("SELECT COUNT(*) AS count FROM posts").get() as { count: number }).count;
  if (postCount === 0) {
    const insertPost = db.prepare(`
      INSERT INTO posts (slug, title, area, excerpt, body, image, author, date, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    (defaultPosts as any[]).forEach((p: any, idx: number) => {
      insertPost.run(
        p.slug,
        p.title,
        p.area,
        p.excerpt,
        JSON.stringify(p.body),
        p.image,
        p.author,
        p.date,
        idx,
      );
    });
  }

  // 3. Team
  const teamCount = (db.prepare("SELECT COUNT(*) AS count FROM team_members").get() as { count: number }).count;
  if (teamCount === 0) {
    const insertMember = db.prepare(`
      INSERT INTO team_members (
        slug, name, department, title, credentials, photo, bio, qualifications, expertise, linkedin, email, cv_url, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    (defaultTeam as any[]).forEach((m: any, idx: number) => {
      insertMember.run(
        m.slug,
        m.name,
        m.department,
        m.title ?? "",
        m.credentials ?? "",
        m.photo ?? "",
        JSON.stringify(m.bio ?? []),
        JSON.stringify(m.qualifications ?? []),
        JSON.stringify(m.expertise ?? []),
        m.linkedin ?? "",
        m.email ?? "",
        m.cvUrl ?? "",
        idx,
      );
    });
  }

  // 4. Services
  const serviceCount = (db.prepare("SELECT COUNT(*) AS count FROM services").get() as { count: number }).count;
  if (serviceCount === 0) {
    const insertService = db.prepare(`
      INSERT INTO services (
        slug, title, icon, text, headline, intro, scope, approach, image, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    (defaultServices as any[]).forEach((s: any, idx: number) => {
      insertService.run(
        s.slug,
        s.title,
        s.icon,
        s.text,
        s.headline,
        JSON.stringify(s.intro ?? []),
        JSON.stringify(s.scope ?? []),
        s.approach ?? "",
        s.image ?? "",
        idx,
      );
    });
  }
}
