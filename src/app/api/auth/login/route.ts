import { fail, fieldErrorsOf, ok, withErrors } from "@/lib/api/server";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { LoginSchema } from "@/lib/validation/schemas";

// Compared against when the username does not exist, so both failures take the same time
const dummyHash = hashPassword("lawage-timing-guard");

export const POST = withErrors(async (request) => {
  const parsed = LoginSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return fail(400, "Check your details.", fieldErrorsOf(parsed.error));

  const admin = getDb()
    .prepare("SELECT id, username, name, password_hash FROM admins WHERE username = ?")
    .get(parsed.data.username) as { id: number; username: string; name: string; password_hash: string } | undefined;

  const valid = await verifyPassword(parsed.data.password, admin?.password_hash ?? (await dummyHash));
  if (!admin || !valid) return fail(401, "Incorrect username or password.");

  await createSession(admin.id);
  return ok({ id: admin.id, username: admin.username, name: admin.name });
});
