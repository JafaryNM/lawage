import "server-only";

import { getDb } from "@/lib/db";

export type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type DbEnquiryRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  is_read: number;
  created_at: string;
};

export function getEnquiries(): Enquiry[] {
  try {
    const rows = getDb()
      .prepare("SELECT * FROM enquiries ORDER BY id DESC")
      .all() as DbEnquiryRow[];
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      area: r.area,
      message: r.message,
      isRead: Boolean(r.is_read),
      createdAt: r.created_at,
    }));
  } catch (error) {
    console.error("Failed to load enquiries from DB:", error);
    return [];
  }
}

export function createEnquiry(data: {
  name: string;
  email: string;
  phone?: string;
  area?: string;
  message: string;
}): number {
  const info = getDb()
    .prepare(
      "INSERT INTO enquiries (name, email, phone, area, message) VALUES (?, ?, ?, ?, ?)",
    )
    .run(data.name, data.email, data.phone ?? "", data.area ?? "", data.message);
  return Number(info.lastInsertRowid);
}

export function markEnquiryRead(id: number, isRead: boolean) {
  getDb()
    .prepare("UPDATE enquiries SET is_read = ? WHERE id = ?")
    .run(isRead ? 1 : 0, id);
}

export function deleteEnquiry(id: number) {
  getDb().prepare("DELETE FROM enquiries WHERE id = ?").run(id);
}

