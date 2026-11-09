import { fail, noContent, ok, withAdmin } from "@/lib/api/server";
import { deleteDbService, getDbServiceById, updateDbService } from "@/lib/cms-server";
import { saveUploadedFile } from "@/lib/uploads";

export const GET = withAdmin(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const service = getDbServiceById(Number(id));
  if (!service) return fail(404, "Practice area not found");
  return ok(service);
});

export const PUT = withAdmin(async (request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const numericId = Number(id);
  const existing = getDbServiceById(numericId);
  if (!existing) return fail(404, "Practice area not found");

  const contentType = request.headers.get("content-type") || "";
  let title = existing.title;
  let slug = existing.slug;
  let icon = existing.icon;
  let text = existing.text;
  let headline = existing.headline;
  let intro = existing.intro || [];
  let scope = existing.scope || [];
  let approach = existing.approach || "";
  let image = existing.image;
  let isActive = existing.isActive;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    if (formData.has("title")) title = String(formData.get("title") || "").trim();
    if (formData.has("slug")) slug = String(formData.get("slug") || "").trim();
    if (formData.has("icon")) icon = String(formData.get("icon") || "briefcase").trim() as any;
    if (formData.has("text")) text = String(formData.get("text") || "").trim();
    if (formData.has("headline")) headline = String(formData.get("headline") || "").trim();
    if (formData.has("approach")) approach = String(formData.get("approach") || "").trim();
    if (formData.has("isActive")) isActive = formData.get("isActive") !== "false";

    const introRaw = formData.get("intro");
    if (typeof introRaw === "string") {
      try {
        intro = JSON.parse(introRaw);
      } catch {
        intro = introRaw.split("\n\n").map((p) => p.trim()).filter(Boolean);
      }
    }

    const scopeRaw = formData.get("scope");
    if (typeof scopeRaw === "string") {
      try {
        scope = JSON.parse(scopeRaw);
      } catch {
        scope = scopeRaw.split("\n").map((p) => p.trim()).filter(Boolean);
      }
    }

    const imageFile = formData.get("imageFile");
    if (imageFile instanceof File && imageFile.size > 0) {
      image = await saveUploadedFile("services", imageFile);
    } else if (formData.has("image")) {
      image = String(formData.get("image") || "").trim();
    }
  } else {
    const json = await request.json();
    if (json.title !== undefined) title = json.title.trim();
    if (json.slug !== undefined) slug = json.slug.trim();
    if (json.icon !== undefined) icon = json.icon.trim();
    if (json.text !== undefined) text = json.text.trim();
    if (json.headline !== undefined) headline = json.headline.trim();
    if (json.approach !== undefined) approach = json.approach.trim();
    if (json.image !== undefined) image = json.image.trim();
    if (Array.isArray(json.intro)) intro = json.intro;
    if (Array.isArray(json.scope)) scope = json.scope;
    if (json.isActive !== undefined) isActive = Boolean(json.isActive);
  }

  if (!title) return fail(400, "Title is required", { title: "Please enter a title." });
  if (!slug) return fail(400, "Slug is required", { slug: "Please enter a slug." });

  try {
    updateDbService(numericId, {
      title,
      slug,
      icon,
      text,
      headline,
      intro,
      scope,
      approach,
      image,
      isActive,
    });
    return ok({ id: numericId, slug });
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint failed: services.slug")) {
      return fail(400, "A practice area with this URL slug already exists.", {
        slug: "Slug already exists. Please choose a different slug.",
      });
    }
    throw err;
  }
});

export const DELETE = withAdmin(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  deleteDbService(Number(id));
  return noContent();
});

