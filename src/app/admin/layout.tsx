import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentAdmin } from "@/lib/auth/session";
import { LogoutButton } from "./LogoutButton";

import logo from "@/assets/lawage-logo.png";

export const metadata: Metadata = {
  title: "Admin | LawAge Advocates & Consult",
  robots: { index: false, follow: false },
};

// The real access check: every admin page verifies the session against the database
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/login");

  return (
    <QueryProvider>
      <div className="min-h-screen bg-[#e4e6ee]">
        <header className="border-b border-black/5 bg-white">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-6 md:gap-10">
              <Link href="/admin" className="flex items-center gap-3">
                <img src={logo.src} alt="" className="h-10 w-auto" width={679} height={770} />
                <span className="hidden text-xs uppercase tracking-[0.2em] text-brand sm:inline">
                  Admin
                </span>
              </Link>
              <nav className="flex items-center gap-5 text-sm">
                {[
                  ["Dashboard", "/admin"],
                  ["Slideshow", "/admin/slides"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href!}
                    className="text-muted-foreground transition-colors hover:text-brand"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/"
                target="_blank"
                className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand sm:inline-flex"
              >
                View site <ExternalLink className="size-3.5" />
              </Link>
              <span className="hidden text-sm text-foreground md:inline">{admin.name}</span>
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">{children}</main>
      </div>
      <Toaster position="bottom-right" />
    </QueryProvider>
  );
}
