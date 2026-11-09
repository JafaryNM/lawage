import { fail, noContent, ok, withAdmin } from "@/lib/api/server";
import { deleteDbPost, getDbPostById, updateDbPost } from "@/lib/cms-server";
import { saveUploadedFile } from "@/lib/uploads";

export const GET = withAdmin(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = getDbPostById(Number(id));
  if (!post) return fail(404, "Post not found");
  return ok(post);
});

export const PUT = withAdmin(async (request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const numericId = Number(id);
  const existing = getDbPostById(numericId);
  if (!existing) return fail(404, "Post not found");

  const contentType = request.headers.get("content-type") || "";
  let title = existing.title;
  let slug = existing.slug;
  let area = existing.area;
  let excerpt = existing.excerpt;
  let author = existing.author;
  let date = existing.date;
  let body: string[] = existing.body;
  let image = existing.image;
  let isActive = existing.isActive;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    if (formData.has("title")) title = String(formData.get("title") || "").trim();
    if (formData.has("slug")) slug = String(formData.get("slug") || "").trim();
    if (formData.has("area")) area = String(formData.get("area") || "").trim();
    if (formData.has("excerpt")) excerpt = String(formData.get("excerpt") || "").trim();
    if (formData.has("author")) author = String(formData.get("author") || "").trim();
    if (formData.has("date")) date = String(formData.get("date") || "").trim();
    if (formData.has("isActive")) isActive = formData.get("isActive") !== "false";

    const bodyRaw = formData.get("body");
    if (typeof bodyRaw === "string") {
      try {
        body = JSON.parse(bodyRaw);
      } catch {
        body = bodyRaw
          .split("\n\n")
          .map((p) => p.trim())
          .filter(Boolean);
      }
    }

    const imageFile = formData.get("imageFile");
    if (imageFile instanceof File && imageFile.size > 0) {
      image = await saveUploadedFile("posts", imageFile);
    } else if (formData.has("image")) {
      image = String(formData.get("image") || "").trim();
    }
  } else {
    const json = await request.json();
    if (json.title !== undefined) title = json.title.trim();
    if (json.slug !== undefined) slug = json.slug.trim();
    if (json.area !== undefined) area = json.area.trim();
    if (json.excerpt !== undefined) excerpt = json.excerpt.trim();
    if (json.author !== undefined) author = json.author.trim();
    if (json.date !== undefined) date = json.date.trim();
    if (Array.isArray(json.body)) body = json.body;
    if (json.image !== undefined) image = json.image.trim();
    if (json.isActive !== undefined) isActive = Boolean(json.isActive);
  }

  if (!title) return fail(400, "Title is required", { title: "Please enter a title." });
  if (!slug) return fail(400, "Slug is required", { slug: "Please enter a slug." });

  try {
    updateDbPost(numericId, {
      title,
      slug,
      area,
      excerpt,
      author,
      date,
      body,
      image,
      isActive,
    });
    return ok({ id: numericId, slug });
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint failed: posts.slug")) {
      return fail(400, "A post with this URL slug already exists.", {
        slug: "Slug already exists. Please choose a different slug.",
      });
    }
    throw err;
  }
});

export const DELETE = withAdmin(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  deleteDbPost(Number(id));
  return noContent();
});

