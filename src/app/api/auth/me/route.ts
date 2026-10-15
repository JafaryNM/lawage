import { ok, withAdmin } from "@/lib/api/server";

export const GET = withAdmin(async (_request, { admin }) => ok(admin));
