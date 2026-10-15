import { noContent, withErrors } from "@/lib/api/server";
import { deleteSession } from "@/lib/auth/session";

export const POST = withErrors(async () => {
  await deleteSession();
  return noContent();
});
