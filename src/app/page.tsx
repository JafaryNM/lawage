import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "LawAge Advocates & Consult | Trusted Legal Excellence for Every Client",
  description:
    "LawAge Advocates & Consult is a full-service Tanzanian law firm with offices in Dodoma and Dar es Salaam, delivering practical, innovative and results-oriented legal solutions.",
  ogTitle: "LawAge Advocates & Consult",
  ogDescription:
    "High-impact legal and advisory solutions across Tanzania, East Africa and international markets.",
});

export default function Page() {
  return <HomePage />;
}
