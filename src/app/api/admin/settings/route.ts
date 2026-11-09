import { ok, withAdmin } from "@/lib/api/server";
import { getDbSettings, updateDbSettings } from "@/lib/cms-server";

export const GET = withAdmin(async () => {
  const settings = getDbSettings();
  return ok(settings);
});

export const PUT = withAdmin(async (request) => {
  const json = await request.json();
  if (json && typeof json === "object") {
    updateDbSettings(json);
  }
  const updated = getDbSettings();
  return ok(updated);
});

