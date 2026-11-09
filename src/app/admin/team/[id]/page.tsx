import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getDbTeamMemberById } from "@/lib/cms-server";
import { TeamMemberForm } from "../TeamMemberForm";

export const metadata: Metadata = {
  title: "Edit Team Member | Admin | LawAge Advocates",
};

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = getDbTeamMemberById(Number(id));
  if (!member) notFound();

  return <TeamMemberForm member={member} />;
}

