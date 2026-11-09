import { fail, ok, withAdmin } from "@/lib/api/server";
import { createDbPost, getDbPosts } from "@/lib/cms-server";
import { saveUploadedFile } from "@/lib/uploads";

export const GET = withAdmin(async () => {
  const posts = getDbPosts();
  return ok(posts);
});

export const POST = withAdmin(async (request) => {
  const contentType = request.headers.get("content-type") || "";
  let title = "";
  let slug = "";
  let area = "";
  let excerpt = "";
  let author = "LawAge Advocates";
  let date = new Date().toISOString().split("T")[0]!;
  let body: string[] = [];
  let image = "";
  let isActive = true;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    title = String(formData.get("title") || "").trim();
    slug = String(formData.get("slug") || "").trim();
    area = String(formData.get("area") || "").trim();
    excerpt = String(formData.get("excerpt") || "").trim();
    author = String(formData.get("author") || "LawAge Advocates").trim();
    date = String(formData.get("date") || date).trim();
    isActive = formData.get("isActive") !== "false";

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
    } else {
      image = String(formData.get("image") || "").trim();
    }
  } else {
    const json = await request.json();
    title = (json.title || "").trim();
    slug = (json.slug || "").trim();
    area = (json.area || "").trim();
    excerpt = (json.excerpt || "").trim();
    author = (json.author || "LawAge Advocates").trim();
    date = (json.date || date).trim();
    body = Array.isArray(json.body) ? json.body : [];
    image = (json.image || "").trim();
    isActive = json.isActive !== false;
  }

  if (!title) return fail(400, "Title is required", { title: "Please enter a title." });
  if (!slug) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  if (!area) return fail(400, "Practice area is required", { area: "Please select a practice area." });
  if (!excerpt) return fail(400, "Excerpt is required", { excerpt: "Please provide a short summary." });
  if (!body.length) return fail(400, "Article content is required", { body: "Please enter article paragraphs." });

  try {
    const id = createDbPost({
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
    return ok({ id, slug }, 201);
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint failed: posts.slug")) {
      return fail(400, "A post with this URL slug already exists.", {
        slug: "Slug already exists. Please choose a different slug.",
      });
    }
    throw err;
  }
});

