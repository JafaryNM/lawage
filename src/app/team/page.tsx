import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TeamList } from "@/components/site/TeamList";
import { TEAM_BY_DEPARTMENT } from "@/lib/team";
import { pageMetadata } from "@/lib/seo";

import banner from "@/assets/hero-handshake-file.jpg";

export const metadata = pageMetadata({
  title: "Our Team | LawAge Advocates",
  description:
    "Meet the advocates, consultants and support team of LawAge Advocates, a full-service Tanzanian law firm in Dodoma and Dar es Salaam.",
});

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Our Team" crumbs={[{ label: "Our Team" }]} image={banner.src} />

      <section id="team" className="section-pad bg-[#e4e6ee]">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionTitle>
            Our Team of <span className="text-brand">Experts</span>
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Our greatest strength lies in our people. Our team combines diverse legal expertise,
            commercial insight, and a shared commitment to delivering practical, client-focused
            solutions. Select anyone to read their profile.
          </p>

          {/* Everyone in one list, ordered by department (see DEPARTMENTS in src/lib/team.ts) */}
          <TeamList
            members={TEAM_BY_DEPARTMENT.flatMap((group) => group.members)}
            className="mt-14"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
