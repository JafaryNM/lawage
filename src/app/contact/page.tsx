import { ContactPage } from "@/components/pages/ContactPage";
import { getDbServices, getDbSettings } from "@/lib/cms-server";
import { SERVICES } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us | LawAge Advocates",
  description:
    "Get in touch with LawAge Advocates in Dodoma and Dar es Salaam, Tanzania. Call, WhatsApp, email or send us a message about your legal matter.",
});

export default function Page() {
  const settings = getDbSettings();
  const allServices = getDbServices({ onlyActive: true });
  const services = allServices.length ? allServices : SERVICES;

  return <ContactPage settings={settings} services={services} />;
}
