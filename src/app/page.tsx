import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { getPublicSlides } from "@/lib/slides";

export const metadata = pageMetadata({
  title: "LawAge Advocates | Trusted Legal Excellence for Every Client",
  description:
    "LawAge Advocates is a full-service Tanzanian law firm with offices in Dodoma and Dar es Salaam, delivering practical, innovative and results-oriented legal solutions.",
  ogTitle: "LawAge Advocates",
  ogDescription:
    "High-impact legal and advisory solutions across Tanzania, East Africa and international markets.",
});

// Rebuilt whenever a slide is changed in the admin (see revalidatePath in admin/slides/actions)
export default function Page() {
  return <HomePage slides={getPublicSlides()} />;
}
