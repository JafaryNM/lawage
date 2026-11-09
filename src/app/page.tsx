import { HomePage } from "@/components/pages/HomePage";
import { getDbFeaturedTeam, getDbPosts, getDbServices } from "@/lib/cms-server";
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

export default function Page() {
  const slides = getPublicSlides();
  const posts = getDbPosts({ onlyActive: true });
  const team = getDbFeaturedTeam();
  const services = getDbServices({ onlyActive: true });

  return (
    <HomePage
      slides={slides}
      posts={posts}
      team={team}
      services={services}
    />
  );
}
