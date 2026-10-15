import { refreshHomePage, parseSlideForm } from "@/lib/api/slide-form";
import { fail, ok, withAdmin } from "@/lib/api/server";
import { createSlide, getSlide, listSlides, toAdminSlide } from "@/lib/slides";

export const GET = withAdmin(async () => ok(listSlides().map(toAdminSlide)));

export const POST = withAdmin(async (request) => {
  const result = await parseSlideForm(await request.formData(), null);
  if (!result.ok) return fail(400, "Please fix the highlighted fields.", result.fieldErrors);

  const slide = getSlide(createSlide(result.fields))!;
  refreshHomePage();
  return ok(toAdminSlide(slide), 201);
});
