import { refreshHomePage, parseSlideForm } from "@/lib/api/slide-form";
import { fail, fieldErrorsOf, noContent, ok, parseId, withAdmin } from "@/lib/api/server";
import {
  deleteSlide,
  getSlide,
  removeUnusedUpload,
  setSlideActive,
  toAdminSlide,
  updateSlide,
} from "@/lib/slides";
import { SlideToggleSchema } from "@/lib/validation/schemas";

type Context = { params: Promise<{ id: string }> };

const findSlide = async ({ params }: Context) => {
  const id = parseId((await params).id);
  return id === null ? null : getSlide(id);
};

export const GET = withAdmin<Context>(async (_request, context) => {
  const slide = await findSlide(context);
  return slide ? ok(toAdminSlide(slide)) : fail(404, "Slide not found.");
});

// Full edit from the slide form; leaving out the photo keeps the current one
export const PUT = withAdmin<Context>(async (request, context) => {
  const slide = await findSlide(context);
  if (!slide) return fail(404, "Slide not found.");

  const result = await parseSlideForm(await request.formData(), slide.image);
  if (!result.ok) return fail(400, "Please fix the highlighted fields.", result.fieldErrors);

  updateSlide(slide.id, result.fields);
  if (slide.image !== result.fields.image) await removeUnusedUpload(slide.image);
  refreshHomePage();
  return ok(toAdminSlide(getSlide(slide.id)!));
});

// Show or hide on the website
export const PATCH = withAdmin<Context>(async (request, context) => {
  const slide = await findSlide(context);
  if (!slide) return fail(404, "Slide not found.");

  const parsed = SlideToggleSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return fail(400, "Send { isActive: boolean }.", fieldErrorsOf(parsed.error));

  setSlideActive(slide.id, parsed.data.isActive);
  refreshHomePage();
  return ok(toAdminSlide(getSlide(slide.id)!));
});

export const DELETE = withAdmin<Context>(async (_request, context) => {
  const slide = await findSlide(context);
  if (!slide) return fail(404, "Slide not found.");

  deleteSlide(slide.id);
  await removeUnusedUpload(slide.image);
  refreshHomePage();
  return noContent();
});
