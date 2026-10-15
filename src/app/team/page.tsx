import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TeamGrid } from "@/components/site/TeamGrid";
import { TEAM_BY_DEPARTMENT } from "@/lib/team";
import { pageMetadata } from "@/lib/seo";

import banner from "@/assets/hero-advocate-handshake.jpg";

export const metadata = pageMetadata({
  title: "Our Team | LawAge Advocates & Consult",
  description:
    "Meet the advocates, consultants and support team of LawAge Advocates & Consult, a full-service Tanzanian law firm in Dodoma and Dar es Salaam.",
});

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Our Team" crumbs={[{ label: "Our Team" }]} image={banner.src} />

      <section id="team" className="section-pad bg-[#e4e6ee]">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionTitle>
            Our Team of <span className="text-brand">Experts</span>
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Our greatest strength lies in our people. Our team combines diverse legal expertise,
            commercial insight, and a shared commitment to delivering practical, client-focused
            solutions. Select anyone to read their profile.
          </p>

          {/* One block per department heading (see DEPARTMENTS in src/lib/team.ts) */}
          {TEAM_BY_DEPARTMENT.map(({ department, members }) => (
            <div key={department} className="mt-16 first-of-type:mt-14">
              <h2 className="flex items-center gap-4 text-2xl text-foreground md:text-3xl">
                <span className="h-0.5 w-10 shrink-0 bg-gold" />
                {department}
              </h2>
              <TeamGrid members={members} className="mt-8" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
