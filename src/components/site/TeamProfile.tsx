import { FileDown, GraduationCap, Linkedin, Mail, Sparkles } from "lucide-react";

import { FIRM_EMAIL, type TeamMember } from "@/lib/team";

// Profile pieces shared by the full page (/team/[slug]) and the pop-up opened from team cards

export const profileEmail = (member: TeamMember) => member.email ?? FIRM_EMAIL;
export const firstNameOf = (member: TeamMember) => member.name.split(" ")[0] ?? member.name;

const buttonClass =
  "inline-flex items-center gap-2 border px-5 py-3 text-xs uppercase tracking-[0.15em] transition-colors duration-300";

/** Department, name, title and credentials, for use on the dark brand background */
export function ProfileHeading({
  member,
  as: Heading = "h1",
}: {
  member: TeamMember;
  as?: "h1" | "h2";
}) {
  return (
    <>
      <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold-soft">
        <span className="h-0.5 w-8 shrink-0 bg-gold" />
        {member.department}
      </p>
      <Heading className="mt-4 text-3xl leading-[1.1] text-white md:text-5xl">
        {member.name}
      </Heading>
      {member.title && (
        <p className="mt-3 text-base leading-snug text-white/90 md:text-xl">{member.title}</p>
      )}
      {member.credentials && (
        <p className="mt-2 text-sm text-white/60 md:text-base">{member.credentials}</p>
      )}
    </>
  );
}

/** Email, LinkedIn and CV buttons, for use on the dark brand background */
export function ProfileActions({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`mailto:${profileEmail(member)}`}
        className={`${buttonClass} border-white bg-white text-brand hover:border-gold hover:bg-gold hover:text-white`}
      >
        <Mail className="size-4" /> Email
      </a>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} border-white/40 text-white hover:border-white hover:bg-white hover:text-brand`}
        >
          <Linkedin className="size-4" /> LinkedIn
        </a>
      )}
      {member.cvUrl && (
        <a
          href={member.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} border-gold bg-gold text-white hover:bg-gold/90`}
        >
          <FileDown className="size-4" /> Download CV
        </a>
      )}
    </div>
  );
}

/** Biography: the first paragraph as a lead, or a note while the profile is being written */
export function ProfileBio({ member }: { member: TeamMember }) {
  const [lead, ...rest] = member.bio ?? [];
  if (!lead) {
    return (
      <p className="mt-6 border-l-4 border-gold bg-[#f4f3f8] px-6 py-5 text-base leading-relaxed text-muted-foreground">
        {firstNameOf(member)}&rsquo;s full profile is being prepared and will be published here
        soon.
      </p>
    );
  }
  return (
    <>
      <p className="mt-6 border-l-2 border-gold pl-5 text-lg leading-relaxed text-foreground md:text-2xl">
        {lead}
      </p>
      {rest.map((paragraph) => (
        <p
          key={paragraph}
          className="mt-6 text-base leading-[1.9] text-muted-foreground md:text-[1.05rem]"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function ProfileQualifications({ member }: { member: TeamMember }) {
  if (!member.qualifications?.length) return null;
  return (
    <div className="bg-[#f4f3f8] p-7">
      <h2 className="flex items-center gap-3 text-xl text-foreground">
        <GraduationCap className="size-5 text-gold" strokeWidth={1.5} /> Qualifications
      </h2>
      <ul className="mt-5 grid gap-4">
        {member.qualifications.map((q) => {
          // "Award, Institution" shows the institution on its own line
          const [award, ...from] = q.split(", ");
          return (
            <li key={q} className="border-l-2 border-brand/15 pl-4">
              <p className="text-base leading-snug text-foreground">{award}</p>
              {from.length > 0 && (
                <p className="mt-0.5 text-sm text-muted-foreground">{from.join(", ")}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ProfileExpertise({ member }: { member: TeamMember }) {
  if (!member.expertise?.length) return null;
  return (
    <div className="bg-[#f4f3f8] p-7">
      <h2 className="flex items-center gap-3 text-xl text-foreground">
        <Sparkles className="size-5 text-gold" strokeWidth={1.5} /> Areas of Expertise
      </h2>
      <ul className="mt-5 flex flex-wrap gap-2">
        {member.expertise.map((area) => (
          <li key={area} className="border border-brand/15 bg-white px-3 py-1.5 text-sm text-brand">
            {area}
          </li>
        ))}
      </ul>
    </div>
  );
}
