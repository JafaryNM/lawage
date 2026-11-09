import type { Metadata } from "next";
import { TeamManager } from "./TeamManager";

export const metadata: Metadata = {
  title: "Team | Admin | LawAge Advocates",
};

export default function TeamPage() {
  return <TeamManager />;
}

