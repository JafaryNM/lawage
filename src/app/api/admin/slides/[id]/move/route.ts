import { refreshHomePage } from "@/lib/api/slide-form";
import { fail, fieldErrorsOf, ok, parseId, withAdmin } from "@/lib/api/server";
import { getSlide, listSlides, moveSlide, toAdminSlide } from "@/lib/slides";
import { SlideMoveSchema } from "@/lib/validation/schemas";

type Context = { params: Promise<{ id: string }> };

// Swap with the neighbouring slide; returns the full new order
export const POST = withAdmin<Context>(async (request, { params }) => {
  const id = parseId((await params).id);
  if (id === null || !getSlide(id)) return fail(404, "Slide not found.");

  const parsed = SlideMoveSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return fail(400, 'Send { direction: "up" | "down" }.', fieldErrorsOf(parsed.error));

  moveSlide(id, parsed.data.direction === "up" ? -1 : 1);
  refreshHomePage();
  return ok(listSlides().map(toAdminSlide));
});
