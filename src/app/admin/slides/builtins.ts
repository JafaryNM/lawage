import { slideImageUrl } from "@/lib/slides";
import { BUILTIN_IMAGES } from "@/lib/slides-data";

/** Built-in photos offered in the slide form, with their URLs */
export const builtinChoices = () =>
  Object.entries(BUILTIN_IMAGES).map(([key, label]) => ({ key, label, url: slideImageUrl(key) }));
