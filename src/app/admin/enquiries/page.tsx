import type { Metadata } from "next";
import { EnquiriesManager } from "./EnquiriesManager";

export const metadata: Metadata = {
  title: "Client Enquiries | Admin | LawAge Advocates",
};

export default function EnquiriesPage() {
  return <EnquiriesManager />;
}

