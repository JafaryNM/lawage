import { ContactPage } from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us | LawAge Advocates & Consult",
  description:
    "Get in touch with LawAge Advocates & Consult in Dodoma and Dar es Salaam, Tanzania. Call, WhatsApp, email or send us a message about your legal matter.",
});

export default function Page() {
  return <ContactPage />;
}
