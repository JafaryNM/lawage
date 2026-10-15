import { ok } from "@/lib/api/server";
import { getPublicSlides } from "@/lib/slides";

// Public: the visible hero slides, in order
export async function GET() {
  return ok(getPublicSlides());
}

export const dynamic = "force-dynamic";
