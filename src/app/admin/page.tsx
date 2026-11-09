import { FileText, Inbox, Scale, Settings, Users } from "lucide-react";

import { getCurrentAdmin } from "@/lib/auth/session";
import { getDbPosts, getDbServices, getDbTeam } from "@/lib/cms-server";
import { getEnquiries } from "@/lib/enquiries";
import { DashboardCard, type DashboardCardProps } from "./DashboardCard";
import { SlidesCard } from "./SlidesCard";

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();
  const postsCount = getDbPosts().length;
  const teamCount = getDbTeam().length;
  const servicesCount = getDbServices().length;
  const enquiries = getEnquiries();
  const unreadCount = enquiries.filter((e) => !e.isRead).length;

  const sections: DashboardCardProps[] = [
    {
      title: "Legal Updates",
      text: "Articles, briefings & news publications",
      count: postsCount,
      Icon: FileText,
      href: "/admin/posts",
    },
    {
      title: "Team Members",
      text: "Lawyers, partners & administrative staff",
      count: teamCount,
      Icon: Users,
      href: "/admin/team",
    },
    {
      title: "Practice Areas",
      text: "Legal practice areas & advisory services",
      count: servicesCount,
      Icon: Scale,
      href: "/admin/services",
    },
    {
      title: "Site Settings",
      text: "Addresses, phones, emails & firm bio",
      count: null,
      Icon: Settings,
      href: "/admin/settings",
    },
    {
      title: "Client Enquiries",
      text: unreadCount > 0 ? `${unreadCount} unread message(s)` : "All messages read",
      count: enquiries.length,
      Icon: Inbox,
      href: "/admin/enquiries",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Welcome, <span className="text-brand">{admin?.name}</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Manage and edit every aspect of the LawAge website.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SlidesCard />
        {sections.map((section) => (
          <DashboardCard key={section.title} {...section} />
        ))}
      </div>
    </>
  );
}
