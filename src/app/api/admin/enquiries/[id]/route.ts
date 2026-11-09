import { fail, noContent, ok, withAdmin } from "@/lib/api/server";
import { deleteEnquiry, markEnquiryRead } from "@/lib/enquiries";

export const PATCH = withAdmin(async (request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const json = await request.json().catch(() => ({}));
  if (json.isRead === undefined) {
    return fail(400, "Missing isRead property");
  }
  markEnquiryRead(Number(id), Boolean(json.isRead));
  return ok({ id: Number(id), isRead: Boolean(json.isRead) });
});

export const DELETE = withAdmin(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  deleteEnquiry(Number(id));
  return noContent();
});

