import type { Metadata } from "next";
import { TeamMemberForm } from "../TeamMemberForm";

export const metadata: Metadata = {
  title: "Add Team Member | Admin | LawAge Advocates",
};

export default function NewTeamMemberPage() {
  return <TeamMemberForm member={null} />;
}

