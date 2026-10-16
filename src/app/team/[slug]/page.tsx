import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Mail } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TeamGrid } from "@/components/site/TeamGrid";
import {
  ProfileActions,
  ProfileBio,
  ProfileExpertise,
  ProfileHeading,
  ProfileQualifications,
  firstNameOf,
  profileEmail,
} from "@/components/site/TeamProfile";
import { TEAM_MEMBERS, findTeamMember } from "@/lib/team";
import { pageMetadata } from "@/lib/seo";

import banner from "@/assets/hero-handshake-file.jpg";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TEAM_MEMBERS.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const member = findTeamMember((await params).slug);
  if (!member) return {};
  return pageMetadata({
    title: `${member.name} | LawAge Advocates & Consult`,
    description:
      member.bio?.[0] ??
      `${member.name}, ${member.department}, LawAge Advocates & Consult, Tanzania.`,
    image: member.photo,
  });
}

export default async function TeamMemberPage({ params }: Props) {
  const member = findTeamMember((await params).slug);
  if (!member) notFound();

  const firstName = firstNameOf(member);
  const colleagues = TEAM_MEMBERS.filter(
    (m) => m.department === member.department && m.slug !== member.slug,
  );
  const email = profileEmail(member);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* PROFILE HEADER — photo in an offset gold frame beside name, title and contact buttons */}
      <section className="relative isolate overflow-hidden bg-brand-deep pt-[130px] pb-16 text-white md:pt-[150px] md:pb-20">
        <img
          src={banner.src}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 size-full object-cover opacity-15"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep via-brand-deep/95 to-brand-deep/70" />

        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:grid-cols-[minmax(0,340px)_1fr] lg:gap-20">
          <div className="relative mr-6 mb-6 max-w-[340px]">
            <div className="absolute inset-0 translate-x-5 translate-y-5 border-2 border-gold" />
            <div className="relative aspect-[4/5] overflow-hidden bg-[#5b6168]">
              <img
                src={member.photo}
                alt={member.name}
                className={`size-full ${member.logo ? "bg-white object-contain p-12" : "object-cover object-top"}`}
              />
            </div>
          </div>

          <div>
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-white/60"
            >
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <Link href="/team" className="transition-colors hover:text-white">
                Our Team
              </Link>
            </nav>

            <div className="mt-8">
              <ProfileHeading member={member} />
            </div>
            <div className="mt-9">
              <ProfileActions member={member} />
            </div>
          </div>
        </div>
      </section>

      {/* BIO beside a sidebar with qualifications, expertise and contact */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 lg:grid-cols-[1fr_360px] lg:gap-16">
          <article>
            <h2 className="text-3xl text-foreground md:text-4xl">
              About <span className="text-brand">{firstName}</span>
            </h2>
            <ProfileBio member={member} />

            <Link
              href="/team"
              className="mt-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
            >
              <ArrowLeft className="size-4" /> All team members
            </Link>
          </article>

          <aside className="grid gap-6 lg:sticky lg:top-28">
            <ProfileQualifications member={member} />
            <ProfileExpertise member={member} />

            <div className="bg-brand p-7 text-white">
              <h2 className="text-xl">Work with {firstName}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Get in touch to discuss your matter or book a consultation.
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-5 flex items-center gap-3 text-sm text-white transition-colors hover:text-gold-soft"
              >
                <Mail className="size-4 shrink-0 text-gold-soft" /> {email}
              </a>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-gold px-5 py-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-brand"
              >
                Book a consultation <ArrowRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {colleagues.length > 0 && (
        <section className="section-pad bg-[#e4e6ee]">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="flex items-center gap-4 text-2xl text-foreground md:text-3xl">
              <span className="h-0.5 w-10 shrink-0 bg-gold" />
              Also in {member.department}
            </h2>
            <TeamGrid members={colleagues} className="mt-8" />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
