import { fail, noContent, ok, withAdmin } from "@/lib/api/server";
import { deleteDbTeamMember, getDbTeamMemberById, updateDbTeamMember } from "@/lib/cms-server";
import { saveUploadedFile } from "@/lib/uploads";

export const GET = withAdmin(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const member = getDbTeamMemberById(Number(id));
  if (!member) return fail(404, "Team member not found");
  return ok(member);
});

export const PUT = withAdmin(async (request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const numericId = Number(id);
  const existing = getDbTeamMemberById(numericId);
  if (!existing) return fail(404, "Team member not found");

  const contentType = request.headers.get("content-type") || "";
  let name = existing.name;
  let slug = existing.slug;
  let department: string = existing.department;
  let title: string = existing.title || "";
  let credentials = existing.credentials || "";
  let email = existing.email || "";
  let linkedin = existing.linkedin || "";
  let cvUrl = existing.cvUrl || "";
  let photo = existing.photo;
  let bio = existing.bio || [];
  let qualifications = existing.qualifications || [];
  let expertise = existing.expertise || [];
  let isActive = existing.isActive;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    if (formData.has("name")) name = String(formData.get("name") || "").trim();
    if (formData.has("slug")) slug = String(formData.get("slug") || "").trim();
    if (formData.has("department")) department = String(formData.get("department") || "").trim();
    if (formData.has("title")) title = String(formData.get("title") || "").trim();
    if (formData.has("credentials")) credentials = String(formData.get("credentials") || "").trim();
    if (formData.has("email")) email = String(formData.get("email") || "").trim();
    if (formData.has("linkedin")) linkedin = String(formData.get("linkedin") || "").trim();
    if (formData.has("cvUrl")) cvUrl = String(formData.get("cvUrl") || "").trim();
    if (formData.has("isActive")) isActive = formData.get("isActive") !== "false";

    const bioRaw = formData.get("bio");
    if (typeof bioRaw === "string") {
      try {
        bio = JSON.parse(bioRaw);
      } catch {
        bio = bioRaw.split("\n\n").map((p) => p.trim()).filter(Boolean);
      }
    }

    const qualRaw = formData.get("qualifications");
    if (typeof qualRaw === "string") {
      try {
        qualifications = JSON.parse(qualRaw);
      } catch {
        qualifications = qualRaw.split("\n").map((p) => p.trim()).filter(Boolean);
      }
    }

    const expRaw = formData.get("expertise");
    if (typeof expRaw === "string") {
      try {
        expertise = JSON.parse(expRaw);
      } catch {
        expertise = expRaw.split("\n").map((p) => p.trim()).filter(Boolean);
      }
    }

    const photoFile = formData.get("photoFile");
    if (photoFile instanceof File && photoFile.size > 0) {
      photo = await saveUploadedFile("team", photoFile);
    } else if (formData.has("photo")) {
      photo = String(formData.get("photo") || "").trim();
    }
  } else {
    const json = await request.json();
    if (json.name !== undefined) name = json.name.trim();
    if (json.slug !== undefined) slug = json.slug.trim();
    if (json.department !== undefined) department = json.department.trim();
    if (json.title !== undefined) title = json.title.trim();
    if (json.credentials !== undefined) credentials = json.credentials.trim();
    if (json.email !== undefined) email = json.email.trim();
    if (json.linkedin !== undefined) linkedin = json.linkedin.trim();
    if (json.cvUrl !== undefined) cvUrl = json.cvUrl.trim();
    if (json.photo !== undefined) photo = json.photo.trim();
    if (Array.isArray(json.bio)) bio = json.bio;
    if (Array.isArray(json.qualifications)) qualifications = json.qualifications;
    if (Array.isArray(json.expertise)) expertise = json.expertise;
    if (json.isActive !== undefined) isActive = Boolean(json.isActive);
  }

  if (!name) return fail(400, "Name is required", { name: "Please enter a name." });
  if (!slug) return fail(400, "Slug is required", { slug: "Please enter a slug." });

  try {
    updateDbTeamMember(numericId, {
      name,
      slug,
      department,
      title,
      credentials,
      photo,
      email,
      linkedin,
      cvUrl,
      bio,
      qualifications,
      expertise,
      isActive,
    });
    return ok({ id: numericId, slug });
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint failed: team_members.slug")) {
      return fail(400, "A team member with this URL slug already exists.", {
        slug: "Slug already exists. Please choose a different slug.",
      });
    }
    throw err;
  }
});

export const DELETE = withAdmin(async (_req, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  deleteDbTeamMember(Number(id));
  return noContent();
});

