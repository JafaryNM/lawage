import { FileText, Inbox, Scale, Users } from "lucide-react";

import { getCurrentAdmin } from "@/lib/auth/session";
import { POSTS } from "@/lib/posts";
import { SERVICES } from "@/lib/services";
import { TEAM_MEMBERS } from "@/lib/team";
import { DashboardCard, type DashboardCardProps } from "./DashboardCard";
import { SlidesCard } from "./SlidesCard";

// Sections still edited in code; counts come from the site's content files
const SECTIONS: DashboardCardProps[] = [
  { title: "Legal Updates", text: "Legal updates and briefings", count: POSTS.length, Icon: FileText },
  { title: "Team", text: "People across all departments", count: TEAM_MEMBERS.length, Icon: Users },
  { title: "Practice Areas", text: "Services offered", count: SERVICES.length, Icon: Scale },
  { title: "Enquiries", text: "Messages from the contact form", count: null, Icon: Inbox },
];

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();

  return (
    <>
      <h1 className="text-3xl text-foreground md:text-4xl">
        Welcome, <span className="text-brand">{admin?.name}</span>
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Here is an overview of the website content.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SlidesCard />
        {SECTIONS.map((section) => (
          <DashboardCard key={section.title} {...section} />
        ))}
      </div>
    </>
  );
}
