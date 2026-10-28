import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { QueryProvider } from "@/components/providers/QueryProvider";
import { getCurrentAdmin } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";

import sideImage from "@/assets/law-library-justice.jpg";

export const metadata: Metadata = {
  title: "Admin Sign In | LawAge Advocates",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  // Already signed in → straight to the dashboard (a database error just shows the form)
  const admin = await getCurrentAdmin().catch(() => null);
  if (admin) redirect("/admin");

  return (
    <main className="grid min-h-screen bg-[#e4e6ee] lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel */}
      <section className="relative isolate hidden overflow-hidden lg:flex lg:flex-col lg:justify-end lg:p-14">
        <img
          src={sideImage.src}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-deep via-brand-deep/85 to-brand/70" />

        <div className="max-w-md text-white">
          <span className="block h-0.5 w-12 bg-gold" />
          <h2 className="mt-6 text-4xl leading-tight">Admin Portal</h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Manage the LawAge Advocates website: legal updates, team profiles,
            practice areas and client enquiries.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md bg-white p-8 shadow-[0_24px_60px_rgba(33,28,79,0.12)] sm:p-12">
          <h1 className="text-3xl text-foreground md:text-4xl">
            Welcome <span className="text-brand">Back</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sign in with your admin username and password.
          </p>

          <QueryProvider>
            <LoginForm />
          </QueryProvider>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" /> Back to website
          </Link>
        </div>
      </section>
    </main>
  );
}
