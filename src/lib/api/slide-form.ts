import { revalidatePath } from "next/cache";

import { fieldErrorsOf } from "@/lib/api/server";
import { MAX_UPLOAD_BYTES, UPLOAD_TYPES, saveSlideUpload } from "@/lib/slides";
import { BUILTIN_IMAGES, type SlideFields } from "@/lib/slides-data";
import { SlideFieldsSchema } from "@/lib/validation/schemas";

type Parsed =
  | { ok: true; fields: SlideFields & { isActive: boolean } }
  | { ok: false; fieldErrors: Record<string, string> };

/**
 * Validates the multipart slide form and stores an uploaded photo.
 * `currentImage` is kept when an existing slide is saved without a new photo.
 */
export async function parseSlideForm(formData: FormData, currentImage: string | null): Promise<Parsed> {
  const text = (name: string) => String(formData.get(name) ?? "");
  const parsed = SlideFieldsSchema.safeParse({
    title: text("title"),
    description: text("description"),
    imageAlt: text("imageAlt"),
    focus: text("focus") || "center",
    primaryLabel: text("primaryLabel"),
    primaryHref: text("primaryHref"),
    secondaryLabel: text("secondaryLabel"),
    secondaryHref: text("secondaryHref"),
    isActive: text("isActive") !== "false",
  });

  const file = formData.get("imageFile");
  const upload = file instanceof File && file.size > 0 ? file : null;
  const builtin = text("builtinImage");

  let imageError: string | undefined;
  if (upload && !UPLOAD_TYPES[upload.type]) imageError = "Upload a JPG, PNG or WebP image.";
  else if (upload && upload.size > MAX_UPLOAD_BYTES) imageError = "The image must be 5 MB or smaller.";
  else if (!upload && builtin && !(builtin in BUILTIN_IMAGES)) imageError = "Choose one of the built-in photos.";
  else if (!upload && !builtin && !currentImage) imageError = "Choose a photo for this slide.";

  if (!parsed.success || imageError) {
    const fieldErrors = parsed.success ? {} : fieldErrorsOf(parsed.error);
    if (imageError) fieldErrors["image"] = imageError;
    return { ok: false, fieldErrors };
  }

  // Only save the file once everything else is valid, so failed saves leave nothing behind
  const image = upload ? await saveSlideUpload(upload) : builtin || currentImage!;
  return { ok: true, fields: { ...parsed.data, image, imageAlt: parsed.data.imageAlt || parsed.data.title } };
}

/** The home page is pre-built; regenerate it after any slide change */
export const refreshHomePage = () => revalidatePath("/");
