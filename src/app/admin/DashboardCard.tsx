import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type DashboardCardProps = {
  title: string;
  text: string;
  count: number | null;
  Icon: LucideIcon;
  href?: string;
};

const cardClass = "block bg-white p-6 shadow-[0_16px_40px_rgba(33,28,79,0.06)]";

export function DashboardCard({ title, text, count, Icon, href }: DashboardCardProps) {
  const body = (
    <>
      <span className="flex size-11 items-center justify-center bg-brand/10 text-brand">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className="mt-5 text-3xl text-foreground">{count ?? "—"}</p>
      <h2 className="mt-1 text-lg text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      <p className={`mt-4 text-xs uppercase tracking-[0.15em] ${href ? "text-brand" : "text-gold"}`}>
        {href ? "Manage →" : "Editing coming soon"}
      </p>
    </>
  );
  return href ? (
    <Link href={href} className={`${cardClass} transition-shadow hover:shadow-[0_20px_50px_rgba(33,28,79,0.14)]`}>
      {body}
    </Link>
  ) : (
    <article className={cardClass}>{body}</article>
  );
}
