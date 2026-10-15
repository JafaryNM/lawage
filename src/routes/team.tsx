import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { SectionTitle } from "@/components/site/SectionTitle";
import { TeamGrid } from "@/components/site/TeamGrid";
import { SUPPORT_TEAM, TEAM } from "@/lib/team";

import logo from "@/assets/lawage-logo.png";
import banner from "@/assets/hero-advocate-handshake.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team | LawAge Advocates & Consult" },
      {
        name: "description",
        content:
          "Meet the advocates, consultants and support team of LawAge Advocates & Consult, a full-service Tanzanian law firm in Dodoma and Dar es Salaam.",
      },
      { property: "og:title", content: "Our Team | LawAge Advocates & Consult" },
      { property: "og:image", content: logo },
      { name: "twitter:image", content: logo },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Our Team" crumbs={[{ label: "Our Team" }]} image={banner} />

      <section id="team" className="section-pad bg-[#e4e6ee]">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionTitle>
            Our Team of <span className="text-brand">Experts</span>
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Our greatest strength lies in our people. Our team combines diverse legal expertise,
            commercial insight, and a shared commitment to delivering practical, client-focused
            solutions.
          </p>
          <TeamGrid members={TEAM} className="mt-14" />
        </div>
      </section>

      <section id="support" className="section-pad">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionTitle>
            Our Professional <span className="text-brand">Support Team</span>
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            Our legal practice is supported by a multidisciplinary team that ensures efficient
            service delivery and seamless client support.
          </p>
          <TeamGrid members={SUPPORT_TEAM} className="mt-14" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
