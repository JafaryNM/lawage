import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getDbServiceById } from "@/lib/cms-server";
import { ServiceForm } from "../ServiceForm";

export const metadata: Metadata = {
  title: "Edit Practice Area | Admin | LawAge Advocates",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getDbServiceById(Number(id));
  if (!service) notFound();

  return <ServiceForm service={service} />;
}

