import type { Metadata } from "next";
import { ServicesManager } from "./ServicesManager";

export const metadata: Metadata = {
  title: "Practice Areas | Admin | LawAge Advocates",
};

export default function ServicesPage() {
  return <ServicesManager />;
}

