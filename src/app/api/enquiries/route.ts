import { fail, ok, withErrors } from "@/lib/api/server";
import { createEnquiry } from "@/lib/enquiries";

export const POST = withErrors(async (request) => {
  const json = await request.json().catch(() => null);
  if (!json) return fail(400, "Invalid JSON");

  const name = String(json.name || "").trim();
  const email = String(json.email || "").trim();
  const phone = String(json.phone || "").trim();
  const area = String(json.area || "").trim();
  const message = String(json.message || "").trim();

  if (!name) return fail(400, "Name is required", { name: "Please enter your name." });
  if (!email || !email.includes("@")) {
    return fail(400, "Valid email is required", { email: "Please enter a valid email address." });
  }
  if (!message) {
    return fail(400, "Message is required", { message: "Please describe your matter." });
  }

  const id = createEnquiry({ name, email, phone, area, message });
  return ok({ id, success: true }, 201);
});

