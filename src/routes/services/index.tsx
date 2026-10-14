import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { ServicesGrid } from "@/components/site/ServicesGrid";

import logo from "@/assets/lawage-logo.png";
import banner from "@/assets/law-library-justice.jpg";
import servicesBg from "@/assets/services-dots-bg.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Our Services | LawAge Advocates & Consult" },
      {
        name: "description",
        content:
          "Litigation, corporate and investment, mining, energy, insurance, debt recovery, real estate, intellectual property and social justice legal services from LawAge Advocates & Consult.",
      },
      { property: "og:title", content: "Our Services | LawAge Advocates & Consult" },
      { property: "og:image", content: logo },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Our Services" crumbs={[{ label: "Our Services" }]} image={banner} />

      {/* All practice areas, same cards as the homepage */}
      <section
        className="bg-[#f7f5f2] bg-cover bg-center py-[70px] md:py-24"
        style={{ backgroundImage: `url(${servicesBg})` }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <ServicesGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
