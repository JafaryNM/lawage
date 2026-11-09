import { ok, withAdmin } from "@/lib/api/server";
import { getEnquiries } from "@/lib/enquiries";

export const GET = withAdmin(async () => {
  const list = getEnquiries();
  return ok(list);
});

