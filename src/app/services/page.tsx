import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageBanner } from "@/components/site/PageBanner";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { pageMetadata } from "@/lib/seo";

import banner from "@/assets/law-library-justice.jpg";
import servicesBg from "@/assets/services-dots-bg.jpg";

export const metadata = pageMetadata({
  title: "Our Services | LawAge Advocates",
  description:
    "Corporate, litigation, mining, energy, intellectual property, data protection, tax, debt recovery, insurance, real estate, employment and public sector legal services from LawAge Advocates.",
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageBanner title="Our Services" crumbs={[{ label: "Our Services" }]} image={banner.src} />

      {/* All practice areas, same cards as the homepage */}
      <section
        className="bg-[#f7f5f2] bg-cover bg-center py-[70px] md:py-24"
        style={{ backgroundImage: `url(${servicesBg.src})` }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <ServicesGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
