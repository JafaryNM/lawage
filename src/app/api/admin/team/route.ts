import { fail, ok, withAdmin } from "@/lib/api/server";
import { createDbTeamMember, getDbTeam } from "@/lib/cms-server";
import { saveUploadedFile } from "@/lib/uploads";

export const GET = withAdmin(async () => {
  const team = getDbTeam();
  return ok(team);
});

export const POST = withAdmin(async (request) => {
  const contentType = request.headers.get("content-type") || "";
  let name = "";
  let slug = "";
  let department = "";
  let title = "";
  let credentials = "";
  let email = "";
  let linkedin = "";
  let cvUrl = "";
  let photo = "";
  let bio: string[] = [];
  let qualifications: string[] = [];
  let expertise: string[] = [];
  let isActive = true;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    name = String(formData.get("name") || "").trim();
    slug = String(formData.get("slug") || "").trim();
    department = String(formData.get("department") || "").trim();
    title = String(formData.get("title") || "").trim();
    credentials = String(formData.get("credentials") || "").trim();
    email = String(formData.get("email") || "").trim();
    linkedin = String(formData.get("linkedin") || "").trim();
    cvUrl = String(formData.get("cvUrl") || "").trim();
    isActive = formData.get("isActive") !== "false";

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
    } else {
      photo = String(formData.get("photo") || "").trim();
    }
  } else {
    const json = await request.json();
    name = (json.name || "").trim();
    slug = (json.slug || "").trim();
    department = (json.department || "").trim();
    title = (json.title || "").trim();
    credentials = (json.credentials || "").trim();
    email = (json.email || "").trim();
    linkedin = (json.linkedin || "").trim();
    cvUrl = (json.cvUrl || "").trim();
    photo = (json.photo || "").trim();
    bio = Array.isArray(json.bio) ? json.bio : [];
    qualifications = Array.isArray(json.qualifications) ? json.qualifications : [];
    expertise = Array.isArray(json.expertise) ? json.expertise : [];
    isActive = json.isActive !== false;
  }

  if (!name) return fail(400, "Name is required", { name: "Please enter the member's full name." });
  if (!slug) {
    slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  if (!department) return fail(400, "Department is required", { department: "Please select a department." });
  if (!title) return fail(400, "Title is required", { title: "Please enter a role or position title." });

  try {
    const id = createDbTeamMember({
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
    return ok({ id, slug }, 201);
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint failed: team_members.slug")) {
      return fail(400, "A team member with this URL slug already exists.", {
        slug: "Slug already exists. Please choose a different slug.",
      });
    }
    throw err;
  }
});

