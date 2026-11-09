import { fail, ok, withAdmin } from "@/lib/api/server";
import { createDbService, getDbServices } from "@/lib/cms-server";
import { saveUploadedFile } from "@/lib/uploads";

export const GET = withAdmin(async () => {
  const services = getDbServices();
  return ok(services);
});

export const POST = withAdmin(async (request) => {
  const contentType = request.headers.get("content-type") || "";
  let title = "";
  let slug = "";
  let icon = "briefcase";
  let text = "";
  let headline = "";
  let intro: string[] = [];
  let scope: string[] = [];
  let approach = "";
  let image = "";
  let isActive = true;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    title = String(formData.get("title") || "").trim();
    slug = String(formData.get("slug") || "").trim();
    icon = String(formData.get("icon") || "briefcase").trim();
    text = String(formData.get("text") || "").trim();
    headline = String(formData.get("headline") || "").trim();
    approach = String(formData.get("approach") || "").trim();
    isActive = formData.get("isActive") !== "false";

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
    } else {
      image = String(formData.get("image") || "").trim();
    }
  } else {
    const json = await request.json();
    title = (json.title || "").trim();
    slug = (json.slug || "").trim();
    icon = (json.icon || "briefcase").trim();
    text = (json.text || "").trim();
    headline = (json.headline || "").trim();
    approach = (json.approach || "").trim();
    image = (json.image || "").trim();
    intro = Array.isArray(json.intro) ? json.intro : [];
    scope = Array.isArray(json.scope) ? json.scope : [];
    isActive = json.isActive !== false;
  }

  if (!title) return fail(400, "Title is required", { title: "Please enter a practice area title." });
  if (!slug) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  if (!text) return fail(400, "Short summary is required", { text: "Please enter a summary." });
  if (!headline) headline = title;

  try {
    const id = createDbService({
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
    return ok({ id, slug }, 201);
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint failed: services.slug")) {
      return fail(400, "A practice area with this URL slug already exists.", {
        slug: "Slug already exists. Please choose a different slug.",
      });
    }
    throw err;
  }
});

