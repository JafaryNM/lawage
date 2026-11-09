import type { Metadata } from "next";
import { ServiceForm } from "../ServiceForm";

export const metadata: Metadata = {
  title: "New Practice Area | Admin | LawAge Advocates",
};

export default function NewServicePage() {
  return <ServiceForm service={null} />;
}

